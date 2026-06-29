'use server'
import axios from "axios";
import { getAuthToken } from "./auth";

export const apiCall = axios.create({
  baseURL: process.env.BACKEND_URL,
});
apiCall.interceptors.request.use(async (config) => {
const token = await getAuthToken();
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