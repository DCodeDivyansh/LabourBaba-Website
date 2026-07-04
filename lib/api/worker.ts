"use server";
import { apiCall } from "./api";

export interface Worker {
  id: string;
  phone: string;
  name: string;
  skill_type?: string;
  is_online?: boolean;
  verification_status?: string;
  worker_score?: number;
  aadhaar_last4?: string;
  skill_category_id?: string;
  created_at?: string;
  deleted_at?: string;
}

export interface WorkerDocument {
  id: string;
  worker_id?: string;
  document_type?: string;
  file_url?: string;
  status?: string;
}

export interface WorkerAnalytics {
  id: string;
  worker_id?: string;
  avg_response_time_s?: number;
  acceptance_rate?: number;
  completion_rate?: number;
  calculated_at?: string;
}

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

export interface RegisterWorkerRequest {
  phone: string;
  name: string;
  password: string;
  skill_type: string;
  skill_category_id: string;
  aadhaar_last4?: string;
  device_token?: string;
}

export interface LoginWorkerRequest {
  phone: string;
  password: string;
}

export interface UpdateWorkerProfileRequest {
  name?: string;
  phone?: string;
  skill_type?: string;
}

export interface UpdateWorkerLocationRequest {
  worker_id?: string;
  latitude?: number;
  longitude?: number;
  location?: string;
}

export interface UpdateWorkerOnlineStatusRequest {
  is_online: boolean;
}

export interface UploadWorkerDocumentRequest {
  worker_id?: string;
  document_type: "AADHAAR" | "PAN" | "SELFIE";
  file_url: string;
}

export async function registerWorker(data: RegisterWorkerRequest) {
  const response = await apiCall.post("/api/workers/registerWorker", data);
  return response.data;
}

export async function loginWorker(data: LoginWorkerRequest) {
  const response = await apiCall.post("/api/workers/login", data);
  return response.data;
}

export async function getMe() {
  const response = await apiCall.get("/api/workers/me");
  return response.data;
}

export async function updateMe(data: UpdateWorkerProfileRequest) {
  const response = await apiCall.patch("/api/workers/me", data);
  return response.data;
}

export async function updateLocation(data: UpdateWorkerLocationRequest) {
  const response = await apiCall.patch("/api/workers/me/location", data);
  return response.data;
}

export async function updateOnline(data: UpdateWorkerOnlineStatusRequest) {
  const response = await apiCall.patch("/api/workers/me/online", data);
  return response.data;
}

export async function uploadDocument(data: UploadWorkerDocumentRequest) {
  const response = await apiCall.post("/api/workers/me/documents", data);
  return response.data;
}

export async function getDocuments() {
  const response = await apiCall.get("/api/workers/me/documents");
  return response.data;
}

export async function getAnalytics() {
  const response = await apiCall.get("/api/workers/me/analytics");
  return response.data;
}

export async function getBookings() {
  const response = await apiCall.get("/api/workers/me/bookings");
  return response.data;
}

export async function getEarnings() {
  const response = await apiCall.get("/api/workers/me/earnings");
  return response.data;
}
