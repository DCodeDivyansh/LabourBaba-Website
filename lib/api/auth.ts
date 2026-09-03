"use server";

import { cookies } from "next/headers";
import { apiCall } from "./api";

export interface SignupRequest {
  phone: string;
  name: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface RefreshTokenRequest {
  token: string;
}

export interface AuthCustomer {
  id: string;
  phone: string;
  name: string;
  created_at?: string;
  deleted_at?: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  refreshToken?: string;
  customer_id?: string;
  data?: AuthCustomer;
}

/**
 * Signup
 */
export async function clientSignup(
  data: SignupRequest
): Promise<AuthResponse> {
  const response = await apiCall.post(
    "/api/clients/signup",
    data
  );

  return response.data;
}

/**
 * Login
 */
export async function clientLogin(
  data: LoginRequest
): Promise<AuthResponse> {
  try {
    const response = await apiCall.post(
      "/api/clients/login",
      data
    );

    const authResponse: AuthResponse = response.data;

    /*
     * Store JWT in an httpOnly cookie.
     */
    if (authResponse.token) {
      await setAuthToken(authResponse.token);
    }

    /*
     * Keep customer_id only for current Socket.IO implementation.
     *
     * It is NOT used to authenticate the user.
     */
    if (authResponse.data?.id) {
      await setCustomerId(authResponse.data.id);
    }

    return authResponse;
  } catch (error: unknown) {
    const err = error as {
      response?: {
        data?: unknown;
      };
      message?: string;
    };

    console.error(
      "[clientLogin] Login failed:",
      err.response?.data || err.message
    );

    /*
     * VERY IMPORTANT:
     * Re-throw the error so LoginCard can show the
     * backend's error message.
     */
    throw error;
  }
}

/**
 * Refresh authentication token.
 */
export async function refreshAuthToken(
  token: string
) {
  const response = await apiCall.post(
    "/api/auth/refresh",
    { token }
  );

  if (response.data.token) {
    await setAuthToken(response.data.token);
  }

  return response.data;
}

/**
 * Logout.
 */
export const logout = async () => {
  await removeAuthToken();
  await removeCustomerId();
};

/**
 * Logout from backend and clear cookies.
 */
export async function logoutUser() {
  const token = await getAuthToken();

  if (token) {
    try {
      await apiCall.post(
        "/api/auth/logout",
        { token }
      );
    } catch (error) {
      console.error(
        "[logoutUser] Logout request failed:",
        error
      );
    }
  }

  await logout();
}

/**
 * Save JWT.
 *
 * The JWT is httpOnly, so client-side JavaScript
 * cannot directly access it.
 */
export async function setAuthToken(
  token: string
) {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

/**
 * Get JWT on the server.
 */
export async function getAuthToken() {
  const cookieStore = await cookies();

  return cookieStore.get("auth_token")?.value;
}

/**
 * Remove JWT.
 */
export async function removeAuthToken() {
  const cookieStore = await cookies();

  cookieStore.delete("auth_token");
}

/**
 * Save customer ID.
 *
 * This exists only because your current Socket.IO
 * implementation needs the ID on the client.
 *
 * It is NOT a security credential.
 */
export async function setCustomerId(
  customer_id: string
) {
  const cookieStore = await cookies();

  cookieStore.set("customer_id", customer_id, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

/**
 * Get customer ID on the server.
 */
export async function getCustomerId() {
  const cookieStore = await cookies();

  return cookieStore.get("customer_id")?.value;
}

/**
 * Remove customer ID.
 */
export async function removeCustomerId() {
  const cookieStore = await cookies();

  cookieStore.delete("customer_id");
}