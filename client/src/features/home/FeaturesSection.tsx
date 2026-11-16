import { ArrowRight, Award, Clock, FolderKanban, Presentation, type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { features, site } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

const icons: Record<(typeof features)[number]["icon"], LucideIcon> = {
  teacher: Presentation,
  clock: Clock,
  projects: FolderKanban,
  certificate: Award,
};

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-16 py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            align="left"
            eyebrow={`Why ${site.name}`}
            title="Everything you need to learn with confidence"
            description="Learning designed around real-world skills, flexible schedules and recognised outcomes — so you can focus on growing."
          />
          <Button asChild size="lg" className="mt-8">
            <Link to="/register">
              Join {site.name} <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = icons[feature.icon];
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-7 transition-all hover:-translate-y-1 hover:border-navy-100 hover:shadow-lg hover:shadow-navy-900/5"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-navy-800 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                  <Icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-900">{feature.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
