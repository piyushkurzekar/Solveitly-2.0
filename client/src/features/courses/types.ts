export const COURSE_CATEGORIES = ["Web Development", "Programming", "Cloud & DevOps", "Databases"] as const;
export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export interface CourseSummary {
  slug: string;
  title: string;
  description: string;
  category: CourseCategory;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  imageAlt: string;
  popular: boolean;
  lessonCount: number;
  totalMinutes: number;
}

export interface LessonOutline {
  slug: string;
  title: string;
  minutes: number;
}

export interface CourseProgress {
  completedLessons: string[];
  lastLessonSlug: string | null;
  percent: number;
  completedAt: string | null;
}

export interface CourseDetail extends CourseSummary {
  overview: string;
  outcomes: string[];
  lessons: LessonOutline[];
  /** null when the visitor is logged out or not enrolled yet. */
  progress: CourseProgress | null;
}

export interface LessonResponse {
  course: { slug: string; title: string; category: CourseCategory; lessons: LessonOutline[] };
  lesson: { slug: string; title: string; minutes: number; number: number; content: string };
  prev: LessonOutline | null;
  next: LessonOutline | null;
  progress: CourseProgress;
}

export interface CourseNotes {
  course: { slug: string; title: string; category: CourseCategory; level: string };
  lessons: { slug: string; title: string; number: number; content: string }[];
}

export interface MyCourse extends CourseSummary {
  progress: CourseProgress;
  nextLessonSlug: string | null;
  lastActivityAt: string;
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Lesson a learner should open next: where they left off, else the first unfinished one. */
export function resumeLessonSlug(lessons: LessonOutline[], progress: CourseProgress | null) {
  if (progress?.lastLessonSlug && lessons.some((l) => l.slug === progress.lastLessonSlug)) {
    return progress.lastLessonSlug;
  }
  const done = new Set(progress?.completedLessons ?? []);
  return lessons.find((l) => !done.has(l.slug))?.slug ?? lessons[0]?.slug ?? null;
}
