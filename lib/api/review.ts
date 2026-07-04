"use server";
import { apiCall } from "./api";

export interface Review {
  id: string;
  booking_id: string;
  worker_id: string;
  customer_id: string;
  rating?: number;
  comment?: string;
  created_at?: string;
}

export interface CreateReviewRequest {
  rating: number;
  comment?: string;
}

export async function createReview(bookingId: string, data: CreateReviewRequest) {
  const response = await apiCall.post(`/api/reviews/${bookingId}`, data);
  return response.data;
}

export async function getWorkerReviews(workerId: string) {
  const response = await apiCall.get(`/api/reviews/worker/${workerId}`);
  return response.data;
}

export async function getBookingReview(bookingId: string) {
  const response = await apiCall.get(`/api/reviews/${bookingId}`);
  return response.data;
}
