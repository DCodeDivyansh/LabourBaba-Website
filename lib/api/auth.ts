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

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  data?: Record<string, unknown>;
}
// export interface
export const logout = async () => {
  await removeAuthToken();
  await removeCustomerId();
};

export async function clientSignup(data: SignupRequest): Promise<AuthResponse> {
  const response = await apiCall.post(
    "/api/clients/signup",
    data
  );
  if (response.data.token) {
    await setAuthToken(response.data.token);
  }
  if (response.data.customer_id || (response.data.data && response.data.data.customer_id)) {
    await setCustomerId(response.data.customer_id || response.data.data.customer_id);
  }
  return response.data;
}

export async function clientLogin(data: LoginRequest): Promise<AuthResponse | undefined> {
  try {
    const response = await apiCall.post(
      "/api/clients/login",
      data
    );
    console.log("Login response:", response.data.data);
    if (response.data.token) {
      await setAuthToken(response.data.token);
    }
    if (response.data.data.id) {
      await setCustomerId(response.data.data.id);
    }
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error("Login error:", err.response?.data || err.message);
  }
}

export async function refreshAuthToken(token: string) {
  const response = await apiCall.post("/api/auth/refresh", { token });
  if (response.data.token) {
    await setAuthToken(response.data.token);
  }
  return response.data;
}

export async function logoutUser() {
  const token = await getAuthToken();
  if (token) {
    try {
      await apiCall.post("/api/auth/logout", { token });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  await logout();
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}
export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}

export async function removeAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function setCustomerId(customer_id: string) {
  const cookieStore = await cookies();
  cookieStore.set("customer_id", customer_id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getCustomerId() {
  const cookieStore = await cookies();
  return cookieStore.get("customer_id")?.value;
}

export async function removeCustomerId() {
  const cookieStore = await cookies();
  cookieStore.delete("customer_id");
}
