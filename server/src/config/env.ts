import { config } from "dotenv";
import { z } from "zod";

config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN_DAYS: z.coerce.number().int().positive().default(7),
  /**
   * Website URL(s) allowed to call the API with cookies (CORS).
   * Comma-separated, e.g. "https://solveitly.netlify.app,https://solveitly.com".
   */
  CLIENT_URL: z
    .string()
    .default("http://localhost:5173")
    .transform((value) =>
      value
        .split(",")
        .map((url) => url.trim().replace(/\/+$/, ""))
        .filter(Boolean),
    )
    .pipe(z.array(z.url("CLIENT_URL must contain valid URLs")).min(1)),
  /**
   * SameSite attribute of the login cookie.
   * "lax"  → website and API on the same site (local dev, or a proxy).
   * "none" → website and API on different domains (Netlify + Render). Forces Secure.
   */
  COOKIE_SAMESITE: z.enum(["lax", "strict", "none"]).default("lax"),
  /** Number of reverse proxies in front of the API in production (Render = 1). */
  TRUST_PROXY: z.coerce.number().int().min(0).default(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === "production";
