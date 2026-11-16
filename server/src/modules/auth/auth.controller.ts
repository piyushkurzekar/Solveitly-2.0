import type { Request, Response } from "express";
import type { PublicUser } from "../../models/user.model.js";
import { AUTH_COOKIE, authCookieOptions, signToken } from "../../utils/jwt.js";
import * as authService from "./auth.service.js";

function setSession(res: Response, user: PublicUser) {
  res.cookie(AUTH_COOKIE, signToken({ sub: user.id, role: user.role }), authCookieOptions);
}

export async function register(req: Request, res: Response) {
  const user = await authService.registerUser(req.body);
  setSession(res, user);
  res.status(201).json({ user });
}

export async function login(req: Request, res: Response) {
  const user = await authService.loginUser(req.body);
  setSession(res, user);
  res.json({ user });
}

export function logout(_req: Request, res: Response) {
  const { maxAge: _maxAge, ...clearOptions } = authCookieOptions;
  res.clearCookie(AUTH_COOKIE, clearOptions);
  res.status(204).end();
}

export async function me(req: Request, res: Response) {
  const user = await authService.getUserById(req.user!.id);
  res.json({ user });
}
