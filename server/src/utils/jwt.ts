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

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
  path: "/",
  maxAge: maxAgeSeconds * 1000,
};
