"use server";
import { apiCall } from "./api";
import { getCustomerId } from "./auth";

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

export async function getCurrentClient() {
  const customerId = await getCustomerId();
  if (!customerId) return null;
  
  const response = await apiCall.get(`/api/clients/${customerId}`);
  return response.data;
}
