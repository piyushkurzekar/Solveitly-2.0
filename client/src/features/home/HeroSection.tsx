import { ArrowRight, Award, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/features/courses/hooks";
import { site } from "@/data/site";
import { useCurrentUser } from "@/features/auth/hooks";

const highlights = ["Self-paced courses", "Expert instructors", "Certificates on completion"];

export function HeroSection() {
  const { data: user } = useCurrentUser();
  const { data: courses } = useCourses();

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* background decoration */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
      <div aria-hidden className="absolute -top-48 -right-32 -z-10 size-[36rem] rounded-full bg-navy-600/60 blur-3xl" />
      <div aria-hidden className="absolute top-1/3 right-[12%] -z-10 hidden size-72 rounded-full bg-gold-500/10 blur-3xl lg:block" />
      <div aria-hidden className="absolute -bottom-56 -left-40 -z-10 size-[34rem] rounded-full bg-navy-700/70 blur-3xl" />

      <div className="container-page grid items-center gap-16 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-gold-400">
            <Sparkles className="size-4" /> {site.tagline}
          </span>

          <h1 className="mt-6 text-4xl leading-[1.1] font-extrabold sm:text-5xl lg:text-6xl">
            Master in-demand skills and <span className="text-gold-500">solve real problems</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70 lg:mx-0">
            {site.name} is the eLearning platform designed to help you master new skills, solve problems, and
            achieve your goals — with expert-led courses you can take at your own pace.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button asChild variant="gold" size="xl">
              <Link to={user ? "/dashboard" : "/register"}>
                {user ? "Go to Dashboard" : "Start Learning Free"} <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/#courses">Explore Courses</Link>
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/80 lg:justify-start">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-gold-500" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/30">
            <img
              src="/images/hero-student.webp"
              alt="Student smiling while learning online on a laptop"
              width={1024}
              height={1024}
              fetchPriority="high"
              className="aspect-square w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <FloatingCard
            className="top-8 -left-4 sm:-left-10"
            icon={<BookOpen className="size-5 text-white" />}
            iconClass="bg-navy-700"
            title={courses ? `${courses.length} Courses` : "Expert Courses"}
            text="Web, programming & cloud"
          />
          <FloatingCard
            className="-right-3 bottom-10 sm:-right-8"
            icon={<Award className="size-5 text-navy-900" />}
            iconClass="bg-gold-500"
            title="Get Certified"
            text="On every course you finish"
          />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  icon,
  iconClass,
  title,
  text,
}: {
  className: string;
  icon: ReactNode;
  iconClass: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left shadow-xl sm:flex ${className}`}
    >
      <span className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}>{icon}</span>
      <span>
        <span className="block text-sm font-bold text-navy-900">{title}</span>
        <span className="block text-xs text-muted-foreground">{text}</span>
      </span>
    </div>
  );
}
