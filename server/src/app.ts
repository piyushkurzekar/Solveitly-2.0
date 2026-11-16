import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env, isProd } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { coursesRouter, meRouter } from "./modules/courses/courses.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  if (isProd) app.set("trust proxy", env.TRUST_PROXY);

  // The website may live on another domain (e.g. Netlify), so allow it to read API responses.
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());
  if (!isProd) app.use(morgan("dev"));

  // ---- API routes ----
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
  });
  app.use("/api/auth", authRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/me", meRouter);
  app.use("/api", notFound);

  // ---- Production: serve the built React app from the same origin ----
  const clientDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");
  if (isProd && existsSync(clientDist)) {
    app.use(express.static(clientDist, { index: false, maxAge: "1d" }));
    app.get("/{*splat}", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
  }

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
