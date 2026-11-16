import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  FileDown,
  Lock,
  PenLine,
  PlayCircle,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { FullPageSpinner } from "@/components/ui/spinner";
import { useCurrentUser } from "@/features/auth/hooks";
import { Markdown } from "@/features/courses/components/Markdown";
import { ProgressBar } from "@/features/courses/components/ProgressBar";
import { useCourse } from "@/features/courses/hooks";
import { formatDuration, resumeLessonSlug } from "@/features/courses/types";
import { isNotFound } from "@/lib/api";
import NotFoundPage from "./NotFoundPage";

export default function CourseDetailPage() {
  const { slug = "" } = useParams();
  const { data: course, isPending, error } = useCourse(slug);
  const { data: user } = useCurrentUser();

  if (isPending) return <FullPageSpinner />;
  if (isNotFound(error)) return <NotFoundPage />;
  if (!course) {
    return <p className="container-page py-20 text-center text-muted-foreground">Could not load this course.</p>;
  }

  const progress = course.progress;
  const completed = new Set(progress?.completedLessons ?? []);
  const targetSlug = resumeLessonSlug(course.lessons, progress);
  const started = !!progress && (progress.percent > 0 || !!progress.lastLessonSlug);
  const ctaLabel = progress?.percent === 100 ? "Review course" : started ? "Continue learning" : "Start learning";
  const learnHref = targetSlug ? `/courses/${course.slug}/learn/${targetSlug}` : "#";

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
        <div aria-hidden className="absolute -top-40 -right-24 -z-10 size-[30rem] rounded-full bg-navy-600/60 blur-3xl" />

        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-white/60">
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
              <ChevronRight className="size-4" />
              <span className="text-white/90">{course.category}</span>
            </nav>

            <h1 className="text-4xl font-extrabold sm:text-5xl">{course.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{course.description}</p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              <li className="flex items-center gap-2">
                <BarChart3 className="size-4 text-gold-500" /> {course.level}
              </li>
              <li className="flex items-center gap-2">
                <BookOpen className="size-4 text-gold-500" /> {course.lessonCount} lessons
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-gold-500" /> {formatDuration(course.totalMinutes)}
              </li>
            </ul>

            {progress && (
              <div className="mt-8 max-w-md">
                <div className="mb-2 flex justify-between text-sm text-white/80">
                  <span>Your progress</span>
                  <span className="font-semibold text-white">{progress.percent}%</span>
                </div>
                <ProgressBar value={progress.percent} tone="dark" />
              </div>
            )}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="xl">
                <Link to={learnHref}>
                  <PlayCircle className="size-5" /> {ctaLabel}
                </Link>
              </Button>
              {!user && (
                <p className="self-center text-sm text-white/60">Free account required to open lessons.</p>
              )}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-2.5 shadow-2xl shadow-black/30">
              <img
                src={course.image}
                alt={course.imageAlt}
                width={1024}
                height={640}
                className="aspect-[16/11] w-full rounded-[1.25rem] object-cover object-[50%_75%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- body ---------- */}
      <section className="bg-muted py-14 lg:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-10">
            <div className="rounded-2xl border bg-card p-7 sm:p-9">
              <h2 className="mb-4 text-2xl font-bold text-navy-900">About this course</h2>
              <Markdown className="prose-p:text-muted-foreground">{course.overview}</Markdown>
            </div>

            <div className="rounded-2xl border bg-card p-7 sm:p-9">
              <h2 className="mb-6 text-2xl font-bold text-navy-900">What you'll learn</h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-600" /> {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-7 sm:p-9">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-bold text-navy-900">Course content</h2>
                <p className="text-sm text-muted-foreground">
                  {course.lessonCount} lessons · {formatDuration(course.totalMinutes)}
                </p>
              </div>
              <ol className="divide-y overflow-hidden rounded-xl border">
                {course.lessons.map((lesson, index) => {
                  const done = completed.has(lesson.slug);
                  return (
                    <li key={lesson.slug}>
                      <Link
                        to={`/courses/${course.slug}/learn/${lesson.slug}`}
                        className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-navy-50"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-50 text-sm font-bold text-navy-800">
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-navy-900">{lesson.title}</span>
                          <span className="text-xs text-muted-foreground">{lesson.minutes} min read</span>
                        </span>
                        {done ? (
                          <CheckCircle2 className="size-5 text-green-600" aria-label="Completed" />
                        ) : user ? (
                          <Circle className="size-5 text-navy-100" aria-hidden />
                        ) : (
                          <Lock className="size-4 text-muted-foreground" aria-label="Login required" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-card p-7">
              <h2 className="mb-5 text-lg font-bold text-navy-900">This course includes</h2>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <BookOpen className="size-5 text-navy-700" /> {course.lessonCount} in-depth lessons
                </li>
                <li className="flex items-center gap-3">
                  <Code2 className="size-5 text-navy-700" /> Code examples you can copy
                </li>
                <li className="flex items-center gap-3">
                  <PenLine className="size-5 text-navy-700" /> Practice exercise in every lesson
                </li>
                <li className="flex items-center gap-3">
                  <FileDown className="size-5 text-navy-700" /> Downloadable PDF notes
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-5 text-navy-700" /> Self-paced — learn anytime
                </li>
              </ul>
              <Button asChild size="lg" className="mt-7 w-full">
                <Link to={learnHref}>
                  {ctaLabel} <ArrowRight />
                </Link>
              </Button>
              {user && (
                <Button asChild variant="outline" size="lg" className="mt-3 w-full">
                  <Link to={`/courses/${course.slug}/notes`}>
                    <FileDown /> Download notes (PDF)
                  </Link>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
