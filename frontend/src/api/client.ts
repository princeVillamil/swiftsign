import axios from "axios";

// In production, we use the absolute URL provided by VITE_API_URL
// In development, we use /api which is proxied by Vite
export const API_URL = import.meta.env.VITE_API_URL || "/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Unwrap error responses automatically
apiClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err?.response?.data ?? err)
);