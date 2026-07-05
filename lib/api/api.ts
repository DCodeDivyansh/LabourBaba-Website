import axios from "axios";
import { getClientAuthToken } from "../client-cookies";

export const apiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

if (typeof window !== 'undefined') {
  apiCall.interceptors.request.use((config) => {
    const token = getClientAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  apiCall.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}