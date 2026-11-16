import { ArrowLeft, Printer } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { FullPageSpinner } from "@/components/ui/spinner";
import { Markdown } from "@/features/courses/components/Markdown";
import { useCourseNotes } from "@/features/courses/hooks";
import { isNotFound } from "@/lib/api";
import NotFoundPage from "./NotFoundPage";

/** Printable version of a whole course — "Save as PDF" from the print dialog. */
export default function CourseNotesPage() {
  const { slug = "" } = useParams();
  const { data, isPending, error } = useCourseNotes(slug);

  useEffect(() => {
    // The browser uses the document title as the default PDF file name.
    if (data) document.title = `${data.course.title} - Solveitly Notes`;
    return () => {
      document.title = "Solveitly — Learn. Solve. Grow.";
    };
  }, [data]);

  if (isPending) return <FullPageSpinner />;
  if (isNotFound(error)) return <NotFoundPage />;
  if (!data) {
    return <p className="container-page py-20 text-center text-muted-foreground">Could not load the notes.</p>;
  }

  const { course, lessons } = data;

  return (
    <div className="bg-muted py-10 print:bg-white print:py-0">
      <div className="container-page max-w-4xl print:max-w-none print:px-0">
        {/* toolbar (screen only) */}
        <div className="mb-6 flex flex-col justify-between gap-3 rounded-2xl border bg-card p-4 sm:flex-row sm:items-center print:hidden">
          <Button asChild variant="ghost">
            <Link to={`/courses/${course.slug}`}>
              <ArrowLeft /> Back to course
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-muted-foreground md:block">
              Choose <strong>“Save as PDF”</strong> as the printer.
            </p>
            <Button onClick={() => window.print()}>
              <Printer /> Download PDF
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-card px-6 py-10 sm:px-12 print:rounded-none print:border-0 print:p-0">
          {/* cover */}
          <header className="mb-12 border-b pb-10 text-center">
            <img src="/brand/logo-full.webp" alt="Solveitly" width={140} height={134} className="mx-auto mb-6 w-32" />
            <p className="text-sm font-semibold tracking-[0.14em] text-gold-600 uppercase">
              {course.category} · {course.level}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-navy-900">{course.title}</h1>
            <p className="mt-3 text-muted-foreground">Course notes · {lessons.length} lessons</p>

            <ol className="mx-auto mt-8 max-w-md space-y-1 text-left text-sm">
              {lessons.map((l) => (
                <li key={l.slug} className="flex gap-3">
                  <span className="w-6 font-semibold text-gold-600">{l.number}.</span>
                  <span className="text-navy-900">{l.title}</span>
                </li>
              ))}
            </ol>
          </header>

          {lessons.map((lesson, i) => (
            <section key={lesson.slug} className={i > 0 ? "mt-16 print:mt-0 print:break-before-page" : undefined}>
              <p className="text-sm font-semibold tracking-wider text-gold-600 uppercase">Lesson {lesson.number}</p>
              <h2 className="mt-1 mb-6 text-3xl font-extrabold text-navy-900">{lesson.title}</h2>
              <Markdown>{lesson.content}</Markdown>
            </section>
          ))}

          <footer className="mt-16 border-t pt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Solveitly · solveitly.com
          </footer>
        </div>
      </div>
    </div>
  );
}
