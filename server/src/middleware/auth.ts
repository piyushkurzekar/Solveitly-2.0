import type { RequestHandler } from "express";
import type { UserRole } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AUTH_COOKIE, verifyToken } from "../utils/jwt.js";

/** Rejects the request with 401 unless it carries a valid auth cookie. */
export const requireAuth: RequestHandler = (req, _res, next) => {
  const token: unknown = req.cookies?.[AUTH_COOKIE];
  if (typeof token !== "string" || !token) throw ApiError.unauthorized();

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, role: payload.role };
  } catch {
    throw ApiError.unauthorized("Session expired, please log in again");
  }
  next();
};

/** Sets req.user when a valid auth cookie is present, but never rejects the request. */
export const optionalAuth: RequestHandler = (req, _res, next) => {
  const token: unknown = req.cookies?.[AUTH_COOKIE];
  if (typeof token === "string" && token) {
    try {
      const payload = verifyToken(token);
      req.user = { id: payload.sub, role: payload.role };
    } catch {
      // Invalid or expired token: treat the visitor as logged out.
    }
  }
  next();
};

/** Use after requireAuth to limit a route to certain roles. */
export function requireRole(...roles: UserRole[]): RequestHandler {
  return (req, _res, next) => {
    if (!req.user) throw ApiError.unauthorized();
    if (!roles.includes(req.user.role)) throw ApiError.forbidden();
    next();
  };
}
