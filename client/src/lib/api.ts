import axios, { isAxiosError } from "axios";

/**
 * Backend origin, e.g. "https://solveitly-api.onrender.com" (set VITE_API_URL in client/.env.production).
 * Empty in local development: requests go to /api and Vite proxies them to the Express server.
 */
const API_ORIGIN = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

export const api = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/** Error body sent by the server's error handler. */
export interface ApiErrorBody {
  message: string;
  errors?: Record<string, string[] | undefined>;
}

export function getApiError(error: unknown): ApiErrorBody {
  if (isAxiosError<ApiErrorBody>(error)) {
    if (error.response?.data?.message) return error.response.data;
    if (!error.response) return { message: "Cannot reach the server. Is the API running?" };
  }
  return { message: "Something went wrong. Please try again." };
}

export function isUnauthorized(error: unknown) {
  return isAxiosError(error) && error.response?.status === 401;
}

export function isNotFound(error: unknown) {
  return isAxiosError(error) && error.response?.status === 404;
}
