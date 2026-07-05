import axios from "axios";
import { getClientAuthToken } from "../client-cookies";

export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Attach the auth token to every outgoing request.
//
// IMPORTANT: this file is imported both by client components AND by
// "use server" files (lib/api/*.ts) that run on the Next.js server.
// The old code only attached the Authorization header when
// `typeof window !== 'undefined'`, which meant it registered NO
// interceptor at all when this module was first loaded on the server
// (e.g. inside a Server Action like createJob). That made every
// server-side call to the backend go out with no Authorization header,
// which the backend rejects with 401 "Authorization token missing or
// invalid" - this was the root cause of "create request" (and several
// other server-action calls) failing.
//
// Fix: always register the interceptor. On the client we read the
// (non-httpOnly) cookie via document.cookie. On the server we read the
// httpOnly `auth_token` cookie via next/headers, which is only readable
// server-side anyway.
apiCall.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const token = getClientAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    try {
      // Dynamic import so this never gets bundled into client code.
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const token = cookieStore.get("auth_token")?.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // Not in a request context (e.g. build step) - safe to ignore.
    }
  }
  return config;
});

if (typeof window !== "undefined") {
  apiCall.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}