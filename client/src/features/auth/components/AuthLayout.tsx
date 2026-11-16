import { CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { SocialLinks } from "@/components/layout/SocialLinks";

interface AuthLayoutProps {
  asideTitle: string;
  asideText: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const perks = ["Self-paced courses", "Expert instructors", "Certificates on completion"];

/** Two-column card used by the login and register pages. */
export function AuthLayout({ asideTitle, asideText, title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-muted px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border bg-card shadow-xl shadow-navy-900/5 md:grid-cols-2">
        <aside className="relative isolate hidden flex-col justify-between overflow-hidden bg-navy-800 p-10 text-white md:flex">
          <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
          <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-navy-600/70 blur-3xl" />

          <div className="flex size-24 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
            <img src="/brand/logo-mark.webp" alt="Solveitly owl logo" width={88} height={88} />
          </div>

          <div className="my-10">
            <h2 className="text-3xl font-extrabold">{asideTitle}</h2>
            <p className="mt-4 leading-relaxed text-white/70">{asideText}</p>
            <ul className="mt-8 space-y-3 text-sm">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-5 text-gold-500" /> {perk}
                </li>
              ))}
            </ul>
          </div>

          <SocialLinks className="text-white/60 [&_a:hover]:text-gold-400" />
        </aside>

        <section className="p-8 sm:p-12">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-navy-900">{title}</h1>
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </header>
          {children}
        </section>
      </div>
    </div>
  );
}
