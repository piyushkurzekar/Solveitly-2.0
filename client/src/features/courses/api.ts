import { api } from "@/lib/api";
import type { CourseDetail, CourseNotes, CourseProgress, CourseSummary, LessonResponse, MyCourse } from "./types";

export const coursesApi = {
  async list() {
    const { data } = await api.get<{ courses: CourseSummary[] }>("/courses");
    return data.courses;
  },
  async get(slug: string) {
    const { data } = await api.get<{ course: CourseDetail }>(`/courses/${slug}`);
    return data.course;
  },
  async lesson(slug: string, lessonSlug: string) {
    const { data } = await api.get<LessonResponse>(`/courses/${slug}/lessons/${lessonSlug}`);
    return data;
  },
  async setComplete(slug: string, lessonSlug: string, completed: boolean) {
    const { data } = await api.put<{ progress: CourseProgress }>(
      `/courses/${slug}/lessons/${lessonSlug}/complete`,
      { completed },
    );
    return data.progress;
  },
  async notes(slug: string) {
    const { data } = await api.get<CourseNotes>(`/courses/${slug}/notes`);
    return data;
  },
  async myCourses() {
    const { data } = await api.get<{ courses: MyCourse[] }>("/me/courses");
    return data.courses;
  },
};
