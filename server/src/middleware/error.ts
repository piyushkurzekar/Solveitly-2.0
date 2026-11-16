import type { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";
import { isProd } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export const notFound: RequestHandler = (req) => {
  throw ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message, errors: err.errors });
    return;
  }

  // Unique index violation, e.g. an email that is already registered.
  if (err?.code === 11000) {
    const field = Object.keys(err.keyValue ?? {})[0] ?? "field";
    res.status(409).json({ message: `This ${field} is already in use` });
    return;
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([key, value]) => [key, [value.message]]),
    );
    res.status(400).json({ message: "Validation failed", errors });
    return;
  }

  if (err?.type === "entity.parse.failed") {
    res.status(400).json({ message: "Request body is not valid JSON" });
    return;
  }

  // Other body-parser errors (e.g. payload too large) carry a 4xx status.
  const status = typeof err?.status === "number" && err.status < 500 ? err.status : 500;
  if (status >= 500) console.error(err);

  res.status(status).json({
    message: status >= 500 ? "Something went wrong" : err.message,
    ...(isProd || status < 500 ? {} : { stack: err?.stack }),
  });
};
