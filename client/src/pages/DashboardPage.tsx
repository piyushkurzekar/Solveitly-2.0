import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, Mail, PlayCircle, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/features/auth/hooks";
import { ProgressBar } from "@/features/courses/components/ProgressBar";
import { useMyCourses } from "@/features/courses/hooks";
import type { MyCourse } from "@/features/courses/types";

export default function DashboardPage() {
  // ProtectedRoute guarantees the user is loaded here.
  const { data: user } = useCurrentUser();
  const { data: myCourses, isPending } = useMyCourses();
  if (!user) return null;

  const joined = new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: "long" });
  const inProgress = myCourses?.filter((c) => c.progress.percent < 100) ?? [];
  const completed = myCourses?.filter((c) => c.progress.percent === 100) ?? [];
  const lessonsDone = myCourses?.reduce((sum, c) => sum + c.progress.completedLessons.length, 0) ?? 0;

  return (
    <div className="bg-muted">
      <div className="container-page py-10 lg:py-14">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold text-navy-900 md:text-4xl">Hi, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-muted-foreground">Pick up where you left off, or start something new.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Courses in progress" value={inProgress.length} icon={<PlayCircle />} />
          <Stat label="Courses completed" value={completed.length} icon={<CheckCircle2 />} />
          <Stat label="Lessons completed" value={lessonsDone} icon={<BookOpen />} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl text-navy-900">My Courses</CardTitle>
              <CardDescription>Courses you have started appear here with your progress.</CardDescription>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="space-y-3">
                  {[0, 1].map((i) => (
                    <div key={i} className="h-24 animate-pulse rounded-xl bg-navy-50" />
                  ))}
                </div>
              ) : myCourses && myCourses.length > 0 ? (
                <ul className="space-y-3">
                  {myCourses.map((course) => (
                    <MyCourseRow key={course.slug} course={course} />
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed py-12 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
                    <BookOpen className="size-7 text-primary" />
                  </div>
                  <p className="text-muted-foreground">You haven&apos;t started any courses yet.</p>
                  <Button asChild>
                    <Link to="/courses">Browse courses</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:self-start">
            <CardHeader>
              <CardTitle className="text-xl text-navy-900">Profile</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-navy-800 text-xl font-bold text-gold-500">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
              <dl className="space-y-3 text-sm">
                <ProfileRow icon={<Mail />} label="Email" value={user.email} />
                <ProfileRow icon={<CalendarDays />} label="Age" value={String(user.age)} />
                <ProfileRow icon={<ShieldCheck />} label="Member since" value={joined} />
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MyCourseRow({ course }: { course: MyCourse }) {
  const done = course.progress.percent === 100;
  const href = course.nextLessonSlug
    ? `/courses/${course.slug}/learn/${course.nextLessonSlug}`
    : `/courses/${course.slug}`;

  return (
    <li className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
      <img
        src={course.image}
        alt=""
        width={160}
        height={100}
        className="aspect-[16/10] w-full rounded-lg object-cover object-[50%_75%] sm:w-36"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold tracking-wider text-gold-600 uppercase">{course.category}</p>
        <Link to={`/courses/${course.slug}`} className="font-bold text-navy-900 hover:underline">
          {course.title}
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <ProgressBar value={course.progress.percent} />
          <span className="text-xs font-semibold whitespace-nowrap text-navy-800">{course.progress.percent}%</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {course.progress.completedLessons.length} of {course.lessonCount} lessons completed
        </p>
      </div>
      <Button asChild variant={done ? "outline" : "default"} className="shrink-0">
        <Link to={href}>
          {done ? "Review" : "Continue"} <ArrowRight />
        </Link>
      </Button>
    </li>
  );
}

function Stat({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
      <span className="flex size-11 items-center justify-center rounded-xl bg-navy-800 text-gold-500 [&_svg]:size-5">
        {icon}
      </span>
      <div>
        <p className="text-2xl font-extrabold text-navy-900">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function ProfileRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="ml-auto truncate font-medium">{value}</dd>
    </div>
  );
}
