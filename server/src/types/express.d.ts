import type { UserRole } from "../models/user.model.js";

declare global {
  namespace Express {
    interface Request {
      /** Set by the requireAuth middleware. */
      user?: { id: string; role: UserRole };
    }
  }
}

export {};
