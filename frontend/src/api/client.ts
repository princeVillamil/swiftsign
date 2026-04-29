import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Unwrap error responses automatically
apiClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err?.response?.data ?? err)
);