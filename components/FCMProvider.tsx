"use client";

import { useFCM } from "@/lib/hooks/useFCM";
import NotificationToast from "./NotificationToast";

export default function FCMProvider({ children }: { children: React.ReactNode }) {
  const { notification, clearNotification } = useFCM();

  return (
    <>
      {children}
      <NotificationToast
        title={notification?.notification?.title}
        message={notification?.notification?.body}
        onClose={clearNotification}
      />
    </>
  );
}
