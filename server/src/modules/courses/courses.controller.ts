import type { Request, Response } from "express";
import * as courses from "./courses.service.js";

type CourseParams = { slug: string };
type LessonParams = { slug: string; lessonSlug: string };

export async function list(_req: Request, res: Response) {
  res.json({ courses: await courses.listCourses() });
}

export async function detail(req: Request<CourseParams>, res: Response) {
  res.json({ course: await courses.getCourse(req.params.slug, req.user?.id) });
}

export async function enroll(req: Request<CourseParams>, res: Response) {
  res.json({ progress: await courses.enroll(req.user!.id, req.params.slug) });
}

export async function lesson(req: Request<LessonParams>, res: Response) {
  res.json(await courses.getLesson(req.user!.id, req.params.slug, req.params.lessonSlug));
}

export async function setComplete(req: Request<LessonParams>, res: Response) {
  const progress = await courses.setLessonCompleted(
    req.user!.id,
    req.params.slug,
    req.params.lessonSlug,
    req.body.completed,
  );
  res.json({ progress });
}

export async function notes(req: Request<CourseParams>, res: Response) {
  res.json(await courses.getCourseNotes(req.params.slug));
}

export async function myCourses(req: Request, res: Response) {
  res.json({ courses: await courses.listMyCourses(req.user!.id) });
}
