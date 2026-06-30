"use client";

import { useEffect, useState } from "react";
import { requestForToken, onMessageListener } from "@/services/firebase";

// FCM configuration
const FCM_ENABLED = true; // Set to true in production

interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
  };
  data?: Record<string, any>;
}

export function useFCM() {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationPayload | null>(null);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize FCM on component mount - only if FCM is enabled
  useEffect(() => {
    if (!FCM_ENABLED) return;
    
    // Check if we're in a browser environment
    if (typeof window === "undefined") return;
    
    // Check current permission
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    // Try to get token silently if permission is already granted
    const initFCM = async () => {
      if (Notification.permission === "granted") {
        setIsLoading(true);
        setError(null);
        try {
          const fcmToken = await requestForToken();
          if (fcmToken) {
            setToken(fcmToken);
          }
        } catch (err) {
          console.error("Failed to get FCM token on init:", err);
          // Don't show error on silent init
        } finally {
          setIsLoading(false);
        }
      }
    };

    initFCM();

    // Listen for foreground messages - only if FCM is enabled
    const setupMessageListener = async () => {
      try {
        const listener = await onMessageListener();
        if (listener) {
          setNotification(listener as NotificationPayload);
        }
      } catch (err) {
        console.warn("Message listener not set up:", err);
      }
    };

    setupMessageListener();
  }, []);

  // Request notification permission manually
  const requestPermission = async () => {
    if (!FCM_ENABLED) {
      console.log("FCM is disabled. Set FCM_ENABLED=true in lib/hooks/useFCM.ts to enable.");
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const fcmToken = await requestForToken();
      if (fcmToken) {
        setToken(fcmToken);
      }
      
      if (typeof window !== "undefined" && "Notification" in window) {
        setPermission(Notification.permission);
      }
      
      return fcmToken;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to enable notifications";
      setError(errorMsg);
      console.error("Error requesting notification permission:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear notification
  const clearNotification = () => {
    setNotification(null);
  };

  return {
    token,
    notification,
    permission,
    isLoading,
    error,
    isFCMEnabled: FCM_ENABLED,
    requestPermission,
    clearNotification,
  };
}
