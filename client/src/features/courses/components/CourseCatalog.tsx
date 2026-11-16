import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCourses } from "../hooks";
import { COURSE_CATEGORIES, type CourseCategory } from "../types";
import { CourseCard, CourseCardSkeleton } from "./CourseCard";

type Filter = "All" | "Popular" | CourseCategory;
const FILTERS: Filter[] = ["All", "Popular", ...COURSE_CATEGORIES];

/** Filterable grid of all published courses, loaded from the API. */
export function CourseCatalog() {
  const [filter, setFilter] = useState<Filter>("All");
  const { data: courses, isPending, isError, refetch } = useCourses();

  const visible = (courses ?? []).filter((course) => {
    if (filter === "All") return true;
    if (filter === "Popular") return course.popular;
    return course.category === filter;
  });

  return (
    <>
      <div role="group" aria-label="Filter courses" className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              filter === item
                ? "border-navy-800 bg-navy-800 text-white"
                : "border-border bg-white text-foreground/70 hover:border-navy-100 hover:text-navy-800",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {isError ? (
        <div className="mt-12 rounded-2xl border border-dashed bg-white p-10 text-center">
          <p className="text-muted-foreground">Courses could not be loaded. Please check your connection.</p>
          <Button className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isPending
            ? Array.from({ length: 6 }, (_, i) => <CourseCardSkeleton key={i} />)
            : visible.map((course) => <CourseCard key={course.slug} course={course} />)}
        </div>
      )}
    </>
  );
}
