import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { useCurrentUser } from "@/features/auth/hooks";

export function CtaSection() {
  const { data: user } = useCurrentUser();

  return (
    <section className="pb-20 lg:pb-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-800 px-6 py-16 text-center text-white sm:px-16">
          <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
          <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-navy-600/70 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-navy-900/60 blur-3xl" />

          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Ready to start your learning journey?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Join {site.name} today and take the first step towards the skills — and the career — you want.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link to={user ? "/dashboard" : "/register"}>
                {user ? "Go to Dashboard" : "Create Free Account"} <ArrowRight className="size-5" />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/#courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
