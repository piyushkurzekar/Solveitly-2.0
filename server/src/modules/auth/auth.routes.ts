import { Router } from "express";
import rateLimit from "express-rate-limit";
import { isProd } from "../../config/env.js";
import { requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import * as auth from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  // In development every request arrives through the Vite proxy (one IP), so allow more.
  limit: isProd ? 20 : 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts, please try again in a few minutes" },
});

export const authRouter = Router();

authRouter.post("/register", authLimiter, validateBody(registerSchema), auth.register);
authRouter.post("/login", authLimiter, validateBody(loginSchema), auth.login);
authRouter.post("/logout", auth.logout);
authRouter.get("/me", requireAuth, auth.me);
