import { steps } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-16 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="How it works"
          title="Start learning in three simple steps"
          description="No complicated setup — just sign up, choose what you want to learn and get going."
        />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connector line between the step numbers (desktop) */}
          <div
            aria-hidden
            className="absolute top-7 right-[16.66%] left-[16.66%] hidden border-t-2 border-dashed border-navy-100 md:block"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <span className="relative mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-navy-800 text-xl font-extrabold text-gold-500 shadow-lg shadow-navy-900/20 ring-8 ring-white">
                {index + 1}
              </span>
              <h3 className="mb-2 text-lg font-bold text-navy-900">{step.title}</h3>
              <p className="mx-auto max-w-xs leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
