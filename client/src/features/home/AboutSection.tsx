import { CheckCircle2, Quote } from "lucide-react";
import { missionPoints, site, team } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

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

        {/* founders */}
        <div className="mt-28">
          <SectionHeader
            eyebrow="Our team"
            title="Meet the co-founders"
            description={`The people building ${site.name} and shaping the future of online education.`}
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10"
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    width={144}
                    height={144}
                    loading="lazy"
                    className="mx-auto size-36 rounded-full object-cover ring-4 ring-gold-100"
                  />
                ) : (
                  <div
                    aria-hidden
                    className="mx-auto flex size-36 items-center justify-center rounded-full bg-navy-800 text-4xl font-bold tracking-wide text-gold-500 ring-4 ring-gold-100"
                  >
                    {initials(member.name)}
                  </div>
                )}
                <div className="mt-5">
                  <h3 className="text-lg font-bold text-navy-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-gold-600">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
