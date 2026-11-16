import axios, { isAxiosError } from "axios";

/** All requests go to /api; Vite proxies it to the Express server in dev. */
export const api = axios.create({
  baseURL: "/api",
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
