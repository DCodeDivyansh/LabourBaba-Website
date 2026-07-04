"use server";
import { apiCall } from "./api";

export interface Booking {
  id: string;
  job_id: string;
  requirement_id: string;
  worker_id: string;
  customer_id: string;
  status?: string;
  otp_hash?: string;
  otp_verified?: boolean;
  created_at?: string;
}

export interface WorkerLocation {
  id: string;
  worker_id?: string;
  latitude?: number;
  longitude?: number;
  location?: string;
  updated_at?: string;
}

export async function getBooking(bookingId: string) {
  const response = await apiCall.get(`/api/bookings/${bookingId}`);
  return response.data;
}

export async function verifyBookingOtp(bookingId: string, otp: string) {
  const response = await apiCall.post(`/api/bookings/${bookingId}/otp/verify`, { otp });
  return response.data;
}

export async function completeBooking(bookingId: string) {
  const response = await apiCall.post(`/api/bookings/${bookingId}/complete`, {});
  return response.data;
}

export async function confirmCompleteBooking(bookingId: string, data: { rating?: number; comment?: string }) {
  const response = await apiCall.post(`/api/bookings/${bookingId}/confirm-complete`, data);
  return response.data;
}

export async function cancelBooking(bookingId: string, reason: string) {
  const response = await apiCall.post(`/api/bookings/${bookingId}/cancel`, { reason });
  return response.data;
}

export async function getBookingWorkerLocation(bookingId: string) {
  const response = await apiCall.get(`/api/bookings/${bookingId}/location`);
  return response.data;
}
