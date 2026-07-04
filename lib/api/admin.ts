"use server";
import { apiCall } from "./api";

export interface AdminWorker {
  id: string;
  name?: string;
  phone?: string;
  verification_status?: string;
  is_online?: boolean;
  deleted_at?: string | null;
}

export interface AdminJob {
  id: string;
  title?: string;
  status?: string;
  created_at?: string;
}

export interface VerifyWorkerRequest {
  is_verified: boolean;
  reason?: string;
}

export interface SuspendWorkerRequest {
  reason?: string;
}

export async function getAdminWorkers() {
  const response = await apiCall.get("/api/admin/workers");
  return response.data;
}

export async function verifyAdminWorker(workerId: string, data: VerifyWorkerRequest) {
  const response = await apiCall.patch(`/api/admin/workers/${workerId}/verify`, data);
  return response.data;
}

export async function getAdminJobs() {
  const response = await apiCall.get("/api/admin/jobs");
  return response.data;
}

export async function getFlaggedWorkers() {
  const response = await apiCall.get("/api/admin/flagged");
  return response.data;
}

export async function suspendAdminWorker(workerId: string, data: SuspendWorkerRequest) {
  const response = await apiCall.post(`/api/admin/workers/${workerId}/suspend`, data);
  return response.data;
}
