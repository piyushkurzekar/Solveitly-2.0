import type { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import { env, isProd } from "../config/env.js";
import type { UserRole } from "../models/user.model.js";

export const AUTH_COOKIE = "token";

export interface TokenPayload {
  sub: string;
  role: UserRole;
}

const maxAgeSeconds = env.JWT_EXPIRES_IN_DAYS * 24 * 60 * 60;

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: maxAgeSeconds });
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded === "string" || typeof decoded.sub !== "string") {
    throw new Error("Malformed token");
  }
  return { sub: decoded.sub, role: decoded.role as UserRole };
}

const crossSite = env.COOKIE_SAMESITE === "none";

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  // Browsers only accept SameSite=None cookies over HTTPS.
  secure: isProd || crossSite,
  sameSite: env.COOKIE_SAMESITE,
  // Cross-site: opt into CHIPS so Chrome keeps the cookie even when third-party cookies are restricted.
  ...(crossSite ? { partitioned: true } : {}),
  path: "/",
  maxAge: maxAgeSeconds * 1000,
};
