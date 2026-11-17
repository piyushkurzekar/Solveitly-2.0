import { CheckCircle2, Quote } from "lucide-react";
import { missionPoints, site } from "@/data/site";
import { ParentCompanyCard } from "./ParentCompanyCard";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 bg-muted py-20 lg:py-28">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* image + mission card */}
          <div className="relative order-last lg:order-first">
            <img
              src="/images/auth-illustration.webp"
              alt="Students learning together on laptops and tablets in a bright classroom"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-[4/3.4] w-full rounded-3xl object-cover shadow-xl"
            />
            <figure className="absolute -bottom-8 left-4 max-w-xs rounded-2xl bg-navy-800 p-6 text-white shadow-2xl sm:left-auto sm:-right-6">
              <Quote className="mb-3 size-6 text-gold-500" />
              <blockquote className="text-sm leading-relaxed text-white/85">
                With {site.name}, learning is not just a process — it’s a journey of discovery, innovation, and
                success.
              </blockquote>
            </figure>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow={`About ${site.name}`}
              title="Transforming the way the world learns"
              description={
                <>
                  {site.name} is developed by{" "}
                  <span className="font-semibold text-navy-800">{site.organization}</span>, dedicated to providing
                  high-quality e-learning experiences that empower learners worldwide.
                </>
              }
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Leveraging cutting-edge technology and expert-curated content, we offer courses that blend theoretical
              knowledge with practical application, so every learner can unlock their full potential and achieve
              their educational and career goals.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-navy-900">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-600" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* parent company */}
        <div className="mt-28">
          <ParentCompanyCard />
        </div>
      </div>
    </section>
  );
}
