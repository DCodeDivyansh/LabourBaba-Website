"use client";

import { useEffect } from "react";
import { getClientCustomerId } from "@/lib/client-cookies";
import { joinCustomerRoom } from "@/services/socket";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // console.log("Socket.IO server version:", require("socket.io/package.json").version);
    // Join customer room when user loads any authenticated page
    const customerId = getClientCustomerId();
    if (customerId) {
      joinCustomerRoom(customerId);
    }
  }, []);

  return <div className="min-h-screen">{children}</div>;
}
