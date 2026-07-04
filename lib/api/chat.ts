"use server";
import { apiCall } from "./api";

export interface ChatMessage {
  id: string;
  booking_id: string;
  sender_id: string;
  content: string;
  created_at?: string;
}

export interface SendChatMessageRequest {
  content: string;
}

export async function getChatMessages(bookingId: string) {
  const response = await apiCall.get(`/api/chat/${bookingId}/messages`);
  return response.data;
}

export async function sendChatMessage(bookingId: string, data: SendChatMessageRequest) {
  const response = await apiCall.post(`/api/chat/${bookingId}/messages`, data);
  return response.data;
}
