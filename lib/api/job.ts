"use server";
import { apiCall } from "./api";

export interface JobBooking {
  id: string;
  job_id: string;
  worker_id?: string;
  customer_id?: string;
  status?: string;
  created_at?: string;
}

export async function getJobBookings(jobId: string) {
  const response = await apiCall.get(`/api/jobs/${jobId}/bookings`);
  return response.data;
}

export async function cancelJob(jobId: string) {
  const response = await apiCall.patch(`/api/jobs/${jobId}/cancel`, {});
  return response.data;
}
