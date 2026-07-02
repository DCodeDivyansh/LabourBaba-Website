"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging, getToken, onMessage, Messaging } from "firebase/messaging";

// Configuration - FCM is disabled by default for development
const FCM_ENABLED = false; // Set to true in production when you have proper VAPID key

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  projectId: process.env.FIRE_PROJECT_ID,
  storageBucket: process.env.FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_APP_ID,
  measurementId: process.env.FIRE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Messaging - only if FCM is enabled
let messaging: Messaging | null = null;
if (FCM_ENABLED && typeof window !== 'undefined') {
  try {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      messaging = getMessaging(app);
    } else {
      console.warn("Service Workers not supported in this browser");
    }
  } catch (error) {
    console.warn("FCM not supported in this environment:", error);
  }
}

// VAPID Key - only used when FCM is enabled
const vapidKey = process.env.VAPID_KEY;

/**
 * Request notification permission and get FCM token
 */
export async function requestForToken() {
  if (!FCM_ENABLED) {
    console.log("FCM is disabled. Set FCM_ENABLED=true in services/firebase.ts to enable.");
    return null;
  }

  if (!messaging) {
    console.warn("FCM not initialized");
    return null;
  }

  try {
    // First request permission
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      console.log("Notification permission granted");

      let currentToken: string | null = null;

      // Try with VAPID key first
      try {
        if (vapidKey) {
          currentToken = await getToken(messaging, { vapidKey });
        }
      } catch (vapidError) {
        console.warn("VAPID key failed, trying without:", vapidError);
        // Fallback: try without VAPID key (works on localhost)
        try {
          currentToken = await getToken(messaging);
        } catch (fallbackError) {
          console.error("Both VAPID and fallback methods failed:", fallbackError);
          throw fallbackError;
        }
      }

      if (currentToken) {
        console.log("FCM Token received:", currentToken.substring(0, 50) + "...");
        // TODO: Send this token to your backend to save it for the user
        return currentToken;
      } else {
        console.log("No registration token available");
        return null;
      }
    } else {
      console.warn("Notification permission denied:", permission);
      return null;
    }
  } catch (error) {
    console.error("Error in requestForToken:", error);
    // Don't throw, just return null and continue gracefully
    return null;
  }
}

/**
 * Listen for foreground messages
 */
export function onMessageListener() {
  if (!FCM_ENABLED || !messaging) {
    return null;
  }
  return new Promise((resolve) => {
    if (messaging != null)
      onMessage(messaging, (payload) => {
        console.log("Received foreground message:", payload);
        resolve(payload);
      });
  });
}

export { app, analytics, messaging };
