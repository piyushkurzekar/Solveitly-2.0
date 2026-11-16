import { Router } from "express";
import { z } from "zod";
import { optionalAuth, requireAuth } from "../../middleware/auth.js";
import { validateBody } from "../../middleware/validate.js";
import * as courses from "./courses.controller.js";

const completeSchema = z.object({ completed: z.boolean() });

export const coursesRouter = Router();

coursesRouter.get("/", courses.list);
coursesRouter.get("/:slug", optionalAuth, courses.detail);
coursesRouter.post("/:slug/enroll", requireAuth, courses.enroll);
coursesRouter.get("/:slug/notes", requireAuth, courses.notes);
coursesRouter.get("/:slug/lessons/:lessonSlug", requireAuth, courses.lesson);
coursesRouter.put("/:slug/lessons/:lessonSlug/complete", requireAuth, validateBody(completeSchema), courses.setComplete);

/** Mounted at /api/me */
export const meRouter = Router();
meRouter.get("/courses", requireAuth, courses.myCourses);
