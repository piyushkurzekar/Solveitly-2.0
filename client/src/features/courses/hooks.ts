import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "./api";
import type { LessonResponse } from "./types";

export const courseKeys = {
  all: ["courses"] as const,
  list: () => [...courseKeys.all, "list"] as const,
  detail: (slug: string) => [...courseKeys.all, "detail", slug] as const,
  lesson: (slug: string, lessonSlug: string) => [...courseKeys.all, "lesson", slug, lessonSlug] as const,
  notes: (slug: string) => [...courseKeys.all, "notes", slug] as const,
  mine: () => [...courseKeys.all, "mine"] as const,
};

export function useCourses() {
  return useQuery({ queryKey: courseKeys.list(), queryFn: coursesApi.list, staleTime: 5 * 60 * 1000 });
}

export function useCourse(slug: string) {
  // staleTime 0: progress changes while learning, so refetch whenever the page opens.
  return useQuery({ queryKey: courseKeys.detail(slug), queryFn: () => coursesApi.get(slug), staleTime: 0 });
}

export function useLesson(slug: string, lessonSlug: string) {
  return useQuery({
    queryKey: courseKeys.lesson(slug, lessonSlug),
    queryFn: () => coursesApi.lesson(slug, lessonSlug),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCourseNotes(slug: string) {
  return useQuery({ queryKey: courseKeys.notes(slug), queryFn: () => coursesApi.notes(slug) });
}

export function useMyCourses() {
  return useQuery({ queryKey: courseKeys.mine(), queryFn: coursesApi.myCourses, staleTime: 0 });
}

export function useSetLessonComplete(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonSlug, completed }: { lessonSlug: string; completed: boolean }) =>
      coursesApi.setComplete(slug, lessonSlug, completed),
    onSuccess: (progress) => {
      // Update progress in every cached lesson of this course so the sidebar ticks update instantly.
      queryClient.setQueriesData<LessonResponse>({ queryKey: [...courseKeys.all, "lesson", slug] }, (old) =>
        old ? { ...old, progress } : old,
      );
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(slug) });
      queryClient.invalidateQueries({ queryKey: courseKeys.mine() });
    },
  });
}
