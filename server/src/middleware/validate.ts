import type { RequestHandler } from "express";
import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";

/** Validates req.body against a Zod schema and replaces it with the parsed value. */
export function validateBody(schema: z.ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      throw ApiError.badRequest("Validation failed", z.flattenError(result.error).fieldErrors);
    }
    req.body = result.data;
    next();
  };
}
