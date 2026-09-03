"use server";

import { apiCall } from "./api";

export interface Customer {
  id: string;
  phone: string;
  name: string;
  created_at?: Date | string;
  deleted_at?: Date | string | null;
}

export interface CreateCustomerRequest {
  phone: string;
  name: string;
}

export async function getClients() {
  const response = await apiCall.get("/api/clients");
  return response.data;
}

export async function addClient(data: CreateCustomerRequest) {
  const response = await apiCall.post("/api/clients/add", data);
  return response.data;
}

/**
 * Get the currently authenticated customer.
 *
 * IMPORTANT:
 * We do not send customer_id here.
 *
 * The backend identifies the customer from the JWT
 * stored in the httpOnly auth_token cookie.
 */
export async function getCurrentClient(): Promise<Customer | null> {
  try {
    const response = await apiCall.get("/api/clients/me");

    const data = response.data?.data ?? response.data;

    if (!data?.id) {
      return null;
    }

    return {
      id: data.id,
      name: data.name ?? "",
      phone: data.phone ?? "",
      created_at: data.created_at,
      deleted_at: data.deleted_at,
    };
  } catch (error: any) {
    console.error(
      "[getCurrentClient] Failed:",
      error?.response?.data || error?.message || error
    );

    return null;
  }
}