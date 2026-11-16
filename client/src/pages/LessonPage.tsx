import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  FileDown,
  PartyPopper,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FullPageSpinner, Spinner } from "@/components/ui/spinner";
import { Markdown } from "@/features/courses/components/Markdown";
import { ProgressBar } from "@/features/courses/components/ProgressBar";
import { useLesson, useSetLessonComplete } from "@/features/courses/hooks";
import type { LessonResponse } from "@/features/courses/types";
import { isNotFound } from "@/lib/api";
import { cn } from "@/lib/utils";
import NotFoundPage from "./NotFoundPage";

export default function LessonPage() {
  const { slug = "", lessonSlug = "" } = useParams();
  const { data, isPending, error } = useLesson(slug, lessonSlug);
  const setComplete = useSetLessonComplete(slug);

  useEffect(() => {
    if (data) document.title = `${data.lesson.title} · ${data.course.title} | Solveitly`;
    return () => {
      document.title = "Solveitly — Learn. Solve. Grow.";
    };
  }, [data]);

  if (isPending) return <FullPageSpinner />;
  if (isNotFound(error)) return <NotFoundPage />;
  if (!data) {
    return <p className="container-page py-20 text-center text-muted-foreground">Could not load this lesson.</p>;
  }

  const { course, lesson, prev, next, progress } = data;
  const isDone = progress.completedLessons.includes(lesson.slug);

  const toggleComplete = () => {
    setComplete.mutate(
      { lessonSlug: lesson.slug, completed: !isDone },
      {
        onSuccess: (p) => {
          if (!isDone && p?.percent === 100) toast.success(`🎉 You completed ${course.title}!`);
          else if (!isDone) toast.success("Lesson marked as complete");
        },
        onError: () => toast.error("Could not update progress. Please try again."),
      },
    );
  };

  return (
    <div className="bg-muted">
      {/* top bar */}
      <div className="sticky top-16 z-30 border-b bg-white/95 backdrop-blur">
        <div className="container-page flex h-14 items-center gap-4">
          <nav aria-label="Breadcrumb" className="flex min-w-0 flex-1 items-center gap-1.5 text-sm">
            <Link to="/courses" className="hidden text-muted-foreground hover:text-navy-800 sm:inline">
              Courses
            </Link>
            <ChevronRight className="hidden size-4 text-muted-foreground sm:inline" />
            <Link to={`/courses/${course.slug}`} className="truncate font-semibold text-navy-800 hover:underline">
              {course.title}
            </Link>
          </nav>
          <div className="hidden w-48 items-center gap-3 sm:flex">
            <ProgressBar value={progress.percent} />
            <span className="text-xs font-semibold text-navy-800">{progress.percent}%</span>
          </div>
        </div>
      </div>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[300px_1fr] lg:py-10">
        <LessonSidebar data={data} />

        <article className="min-w-0">
          <div className="rounded-2xl border bg-card px-6 py-8 sm:px-10 sm:py-10">
            <p className="mb-3 text-sm font-semibold tracking-wider text-gold-600 uppercase">
              Lesson {lesson.number} of {course.lessons.length}
            </p>
            <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">{lesson.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" /> {lesson.minutes} min read
            </p>
            <hr className="my-8" />

            <Markdown>{lesson.content}</Markdown>

            {/* completion */}
            <div
              className={cn(
                "mt-12 flex flex-col items-start gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between",
                isDone ? "border-green-200 bg-green-50" : "bg-navy-50/60",
              )}
            >
              <div>
                <p className="font-semibold text-navy-900">
                  {isDone ? "Nice work — this lesson is complete!" : "Finished reading?"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isDone
                    ? "You can mark it as incomplete if you want to revisit it later."
                    : "Mark the lesson as complete to track your progress."}
                </p>
              </div>
              <Button
                variant={isDone ? "outline" : "default"}
                onClick={toggleComplete}
                disabled={setComplete.isPending}
              >
                {setComplete.isPending ? <Spinner /> : isDone ? <CheckCircle2 className="text-green-600" /> : <Circle />}
                {isDone ? "Completed" : "Mark as complete"}
              </Button>
            </div>
          </div>

          {/* prev / next */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                to={`/courses/${course.slug}/learn/${prev.slug}`}
                className="group rounded-2xl border bg-card p-5 transition-colors hover:border-navy-100 hover:bg-navy-50"
              >
                <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase">
                  <ArrowLeft className="size-3.5" /> Previous
                </span>
                <span className="mt-1 block font-semibold text-navy-900">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/courses/${course.slug}/learn/${next.slug}`}
                className="group rounded-2xl border bg-card p-5 text-right transition-colors hover:border-navy-100 hover:bg-navy-50"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-muted-foreground uppercase">
                  Next <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-1 block font-semibold text-navy-900">{next.title}</span>
              </Link>
            ) : (
              <Link
                to={`/courses/${course.slug}`}
                className="rounded-2xl border border-gold-500/40 bg-gold-100/60 p-5 text-right transition-colors hover:bg-gold-100"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-gold-600 uppercase">
                  <PartyPopper className="size-3.5" /> Last lesson
                </span>
                <span className="mt-1 block font-semibold text-navy-900">Back to course overview</span>
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function LessonSidebar({ data }: { data: LessonResponse }) {
  const { course, lesson, progress } = data;
  const completed = new Set(progress.completedLessons);

  const list = (
    <ol className="space-y-1">
      {course.lessons.map((item, index) => {
        const active = item.slug === lesson.slug;
        const done = completed.has(item.slug);
        return (
          <li key={item.slug}>
            <Link
              to={`/courses/${course.slug}/learn/${item.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active ? "bg-navy-800 text-white" : "hover:bg-navy-50",
              )}
            >
              {done ? (
                <CheckCircle2 className={cn("mt-0.5 size-4 shrink-0", active ? "text-gold-400" : "text-green-600")} />
              ) : (
                <span
                  className={cn(
                    "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
                    active ? "border-white/50" : "border-navy-100 text-muted-foreground",
                  )}
                >
                  {index + 1}
                </span>
              )}
              <span className="flex-1">
                <span className={cn("block font-medium", active ? "text-white" : "text-navy-900")}>{item.title}</span>
                <span className={cn("text-xs", active ? "text-white/60" : "text-muted-foreground")}>
                  {item.minutes} min
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  const footer = (
    <div className="mt-4 border-t pt-4">
      <div className="mb-2 flex justify-between text-xs text-muted-foreground">
        <span>
          {progress.completedLessons.length} of {course.lessons.length} completed
        </span>
        <span className="font-semibold text-navy-800">{progress.percent}%</span>
      </div>
      <ProgressBar value={progress.percent} />
      <Button asChild variant="outline" size="sm" className="mt-4 w-full">
        <Link to={`/courses/${course.slug}/notes`}>
          <FileDown /> Download notes (PDF)
        </Link>
      </Button>
    </div>
  );

  return (
    <aside className="lg:sticky lg:top-36 lg:max-h-[calc(100vh-10rem)] lg:self-start lg:overflow-y-auto">
      {/* mobile: collapsible */}
      <details className="group rounded-2xl border bg-card p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-navy-900">
          Course content ({lesson.number}/{course.lessons.length})
          <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4">
          {list}
          {footer}
        </div>
      </details>

      {/* desktop */}
      <div className="hidden rounded-2xl border bg-card p-4 lg:block">
        <p className="mb-3 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Course content
        </p>
        {list}
        {footer}
      </div>
    </aside>
  );
}
