"use client";

import { io, Socket } from "socket.io-client";

// Initialize socket with proper configuration
let socket: Socket | null = null;

// Flag to disable socket.io by default - change to true when backend socket.io is ready
const SOCKET_ENABLED = true;

// Get socket instance - singleton pattern
export const getSocket = (): Socket | null => {
  if (!SOCKET_ENABLED) {
    console.log("[socket.io] Socket.io is disabled");
    return null;
  }

  if (!socket) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    console.log(`[socket.io] Connecting to: ${backendUrl}`);

    socket = io(backendUrl!, {
      transports: ["polling", "websocket"],
      upgrade: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
    console.log("Socket.IO instance created");

    socket.on("connect", () => {
      console.log("[socket.io] Connected to server with ID:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket.io] Disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("[socket.io] Connection error:", error);
    });
  }
  return socket;
};
// Wait for socket to connect
export const waitForSocketConnection = async (timeoutMs: number = 10000): Promise<boolean> => {
  if (!SOCKET_ENABLED) {
    console.log("[socket.io] Socket.io is disabled - not waiting for connection");
    return false;
  }

  const socketInstance = getSocket();
  if (!socketInstance) return false;

  // Already connected
  if (socketInstance.connected) {
    console.log("[socket.io] Socket already connected");
    return true;
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log("[socket.io] Socket connection timed out");
      resolve(false);
    }, timeoutMs);

    const onConnect = () => {
      clearTimeout(timeout);
      console.log("[socket.io] Socket connected successfully");
      resolve(true);
    };

    const onError = (error: any) => {
      clearTimeout(timeout);
      console.error("[socket.io] Socket connection error:", error);
      resolve(false);
    };

    socketInstance.once("connect", onConnect);
    socketInstance.once("connect_error", onError);
  });
};

// Join customer room - this should be called when customer creates a job
export const joinCustomerRoom = async (customerId: string): Promise<void> => {
  if (!SOCKET_ENABLED) {
    console.log("[socket.io] Socket.io is disabled - skipping room join");
    return;
  }

  if (!customerId) {
    console.error("[socket.io] Cannot join room - customerId is missing");
    return;
  }

  try {
    const socketInstance = getSocket();
    if (socketInstance) {
      // Wait for connection if not already connected
      if (!socketInstance.connected) {
        await waitForSocketConnection(5000);
      }

      socketInstance.emit("join:customer", customerId);
      console.log(`[socket.io] Joining room for customer ${customerId}`);
    }
  } catch (error) {
    console.error("[socket.io] Error joining customer room:", error);
  }
};

// Disconnect socket manually if needed
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { socket };
