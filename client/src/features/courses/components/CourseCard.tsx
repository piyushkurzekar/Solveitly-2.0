import { ArrowRight, BookOpen, Clock, Star } from "lucide-react";
import { Link } from "react-router";
import { formatDuration, type CourseSummary } from "../types";

export function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={course.image}
          alt={course.imageAlt}
          width={1024}
          height={640}
          loading="lazy"
          className="size-full object-cover object-[50%_75%] transition-transform duration-500 group-hover:scale-105"
        />
        {course.popular && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-xs font-bold text-navy-900 shadow">
            <Star className="size-3 fill-current" /> Popular
          </span>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy-800 shadow-sm backdrop-blur">
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold tracking-wider text-gold-600 uppercase">{course.category}</p>
        <h3 className="mb-2 text-lg font-bold text-navy-900">
          {/* stretched link: the whole card is clickable */}
          <Link to={`/courses/${course.slug}`} className="after:absolute after:inset-0">
            {course.title}
          </Link>
        </h3>
        <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

        <div className="flex items-center justify-between border-t pt-4 text-sm">
          <span className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4" /> {course.lessonCount} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" /> {formatDuration(course.totalMinutes)}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-navy-800 group-hover:text-gold-600">
            Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden>
      <div className="aspect-[16/10] animate-pulse bg-navy-50" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-navy-50" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-navy-50" />
        <div className="h-3 w-full animate-pulse rounded bg-navy-50" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-navy-50" />
      </div>
    </div>
  );
}
