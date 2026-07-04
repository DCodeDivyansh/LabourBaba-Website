"use server";
import { apiCall } from "./api";

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency?: string;
  status?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  created_at?: string;
}

export interface CreatePaymentOrderRequest {
  amount: number;
}

export async function createPaymentOrder(bookingId: string, data: CreatePaymentOrderRequest) {
  const response = await apiCall.post(`/api/payments/${bookingId}/create-order`, data);
  return response.data;
}

export async function handlePaymentWebhook(payload: Record<string, unknown>) {
  const response = await apiCall.post("/api/payments/webhook", payload);
  return response.data;
}

export async function getPaymentStatus(bookingId: string) {
  const response = await apiCall.get(`/api/payments/${bookingId}`);
  return response.data;
}

export async function refundPayment(bookingId: string) {
  const response = await apiCall.post(`/api/payments/${bookingId}/refund`, {});
  return response.data;
}
