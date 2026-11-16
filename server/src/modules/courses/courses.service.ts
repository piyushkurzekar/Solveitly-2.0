import { CourseModel, type CourseDocument } from "../../models/course.model.js";
import { EnrollmentModel } from "../../models/enrollment.model.js";
import { LessonModel } from "../../models/lesson.model.js";
import { ApiError } from "../../utils/ApiError.js";

type EnrollmentLike = { completedLessons: string[]; lastLessonSlug?: string | null; completedAt?: Date | null };

function toSummary(course: CourseDocument) {
  return {
    slug: course.slug,
    title: course.title,
    description: course.description,
    category: course.category,
    level: course.level,
    image: course.image,
    imageAlt: course.imageAlt,
    popular: course.popular,
    lessonCount: course.lessons.length,
    totalMinutes: course.lessons.reduce((sum, l) => sum + l.minutes, 0),
  };
}

function toOutline(course: CourseDocument) {
  return course.lessons.map((l) => ({ slug: l.slug, title: l.title, minutes: l.minutes }));
}

function toProgress(course: CourseDocument, enrollment: EnrollmentLike | null) {
  if (!enrollment) return null;
  // Ignore slugs of lessons that were removed from the course.
  const valid = new Set(course.lessons.map((l) => l.slug));
  const completedLessons = enrollment.completedLessons.filter((s) => valid.has(s));
  const total = course.lessons.length || 1;
  return {
    completedLessons,
    lastLessonSlug: enrollment.lastLessonSlug ?? null,
    percent: Math.round((completedLessons.length / total) * 100),
    completedAt: enrollment.completedAt ?? null,
  };
}

async function findCourse(slug: string) {
  const course = await CourseModel.findOne({ slug, published: true });
  if (!course) throw ApiError.notFound("Course not found");
  return course;
}

export async function listCourses() {
  const courses = await CourseModel.find({ published: true }).sort({ order: 1, title: 1 });
  return courses.map(toSummary);
}

export async function getCourse(slug: string, userId?: string) {
  const course = await findCourse(slug);
  const enrollment = userId ? await EnrollmentModel.findOne({ user: userId, course: course._id }).lean() : null;
  return {
    ...toSummary(course),
    overview: course.overview,
    outcomes: course.outcomes,
    lessons: toOutline(course),
    progress: toProgress(course, enrollment),
  };
}

export async function enroll(userId: string, slug: string) {
  const course = await findCourse(slug);
  const enrollment = await EnrollmentModel.findOneAndUpdate(
    { user: userId, course: course._id },
    { $setOnInsert: { user: userId, course: course._id } },
    { upsert: true, returnDocument: "after" },
  ).lean();
  return toProgress(course, enrollment);
}

export async function getLesson(userId: string, courseSlug: string, lessonSlug: string) {
  const course = await findCourse(courseSlug);
  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) throw ApiError.notFound("Lesson not found");

  const lesson = await LessonModel.findOne({ course: course._id, slug: lessonSlug }).lean();
  if (!lesson) throw ApiError.notFound("Lesson not found");

  // Opening a lesson enrolls the learner and remembers where they are.
  const enrollment = await EnrollmentModel.findOneAndUpdate(
    { user: userId, course: course._id },
    { $set: { lastLessonSlug: lessonSlug }, $setOnInsert: { user: userId, course: course._id } },
    { upsert: true, returnDocument: "after" },
  ).lean();

  const outline = toOutline(course);
  return {
    course: { slug: course.slug, title: course.title, category: course.category, lessons: outline },
    lesson: {
      slug: lesson.slug,
      title: lesson.title,
      minutes: lesson.minutes,
      number: index + 1,
      content: lesson.content,
    },
    prev: outline[index - 1] ?? null,
    next: outline[index + 1] ?? null,
    progress: toProgress(course, enrollment),
  };
}

export async function setLessonCompleted(userId: string, courseSlug: string, lessonSlug: string, completed: boolean) {
  const course = await findCourse(courseSlug);
  if (!course.lessons.some((l) => l.slug === lessonSlug)) throw ApiError.notFound("Lesson not found");

  const update = completed
    ? { $addToSet: { completedLessons: lessonSlug }, $setOnInsert: { user: userId, course: course._id } }
    : { $pull: { completedLessons: lessonSlug }, $setOnInsert: { user: userId, course: course._id } };

  const enrollment = await EnrollmentModel.findOneAndUpdate({ user: userId, course: course._id }, update, {
    upsert: true,
    returnDocument: "after",
  });

  // Keep completedAt in sync with whether every lesson is done.
  const done = course.lessons.every((l) => enrollment.completedLessons.includes(l.slug));
  if (done && !enrollment.completedAt) enrollment.completedAt = new Date();
  if (!done && enrollment.completedAt) enrollment.completedAt = null;
  if (enrollment.isModified()) await enrollment.save();

  return toProgress(course, enrollment);
}

/** All lessons of a course in order — used for the printable / PDF notes page. */
export async function getCourseNotes(courseSlug: string) {
  const course = await findCourse(courseSlug);
  const lessons = await LessonModel.find({ course: course._id }).sort({ order: 1 }).lean();
  return {
    course: { slug: course.slug, title: course.title, category: course.category, level: course.level },
    lessons: lessons.map((l, i) => ({ slug: l.slug, title: l.title, number: i + 1, content: l.content })),
  };
}

export async function listMyCourses(userId: string) {
  const enrollments = await EnrollmentModel.find({ user: userId }).sort({ updatedAt: -1 }).lean();
  const courses = await CourseModel.find({ _id: { $in: enrollments.map((e) => e.course) }, published: true });
  const byId = new Map(courses.map((c) => [c._id.toString(), c]));

  return enrollments.flatMap((enrollment) => {
    const course = byId.get(enrollment.course.toString());
    if (!course) return [];
    const progress = toProgress(course, enrollment)!;
    const nextLesson =
      course.lessons.find((l) => !progress.completedLessons.includes(l.slug))?.slug ??
      progress.lastLessonSlug ??
      course.lessons[0]?.slug ??
      null;
    return [{ ...toSummary(course), progress, nextLessonSlug: nextLesson, lastActivityAt: enrollment.updatedAt }];
  });
}
