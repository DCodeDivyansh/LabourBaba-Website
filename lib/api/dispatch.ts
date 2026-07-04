"use server";
import { apiCall } from "./api";

export interface JobDispatch {
  id?: string;
  requirement_id?: string;
  worker_id?: string;
  status?: string;
  created_at?: string;
}

export interface DispatchWave {
  id?: string;
  requirement_id?: string;
  wave_number?: number;
  status?: string;
  created_at?: string;
}

export interface IncomingJob {
  job: Record<string, unknown>;
  requirement: Record<string, unknown>;
  waves: DispatchWave[];
  dispatches: JobDispatch[];
}

export async function getIncomingDispatch() {
  const response = await apiCall.get("/api/dispatch/incoming");
  return response.data;
}

export async function acceptDispatch(requirementId: string) {
  const response = await apiCall.post(`/api/dispatch/${requirementId}/accept`, {});
  return response.data;
}

export async function declineDispatch(requirementId: string) {
  const response = await apiCall.post(`/api/dispatch/${requirementId}/decline`, {});
  return response.data;
}

export async function getDispatchWaves(requirementId: string) {
  const response = await apiCall.get(`/api/dispatch/${requirementId}/waves`);
  return response.data;
}
