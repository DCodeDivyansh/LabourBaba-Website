"use server";
import axios from "axios";
import { cookies } from "next/headers";

export interface SignupRequest {
  phone: string;
  name: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  customer?: any;
}

export async function clientSignup(data: SignupRequest): Promise<AuthResponse> {
  const response = await axios.post(
    `${process.env.BACKEND_URL}/api/clients/signup`,
    data
  );
  return response.data;
}

export async function clientLogin(data: LoginRequest): Promise<AuthResponse> {
  const response = await axios.post(
    `${process.env.BACKEND_URL}/api/clients/login`,
    data
  );
  return response.data;
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
