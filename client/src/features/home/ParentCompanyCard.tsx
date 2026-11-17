import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { parentCompany, site } from "@/data/site";
import { cn } from "@/lib/utils";

/** "Solveitly is a product of MVAPS & Company" — links out to the parent company website. */
export function ParentCompanyCard() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 text-white sm:px-12 sm:py-14">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots" />
      <div aria-hidden className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-navy-600/60 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-24 -z-10 size-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <p className="text-sm font-semibold tracking-[0.14em] text-gold-400 uppercase">Our parent company</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            {site.name} is the EdTech brand of <span className="text-gold-500">{parentCompany.name}</span>
          </h2>
          <p className="mt-5 leading-relaxed text-white/75">{parentCompany.description}</p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <CalendarDays className="size-4 text-gold-500" /> Established {parentCompany.founded}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-gold-500" /> {parentCompany.location}
            </li>
          </ul>

          <p className="mt-6 border-l-2 border-gold-500 pl-4 text-sm font-medium text-gold-400 italic">
            “{parentCompany.tagline}”
          </p>

          <a
            href={parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-gold-500 px-7 font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-400"
          >
            Visit {parentCompany.name} <ArrowUpRight className="size-5" />
          </a>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-white/60">More from {parentCompany.name}</p>
          <ul className="space-y-3">
            {parentCompany.products.map((product) => {
              const body = (
                <>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-bold whitespace-nowrap text-white">{product.name}</span>
                      <span className="text-xs text-white/50">{product.area}</span>
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-white/65">{product.description}</span>
                  </span>
                  {product.current ? (
                    <span className="shrink-0 rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-900">
                      You are here
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="hidden items-center gap-1.5 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-semibold text-green-300 sm:inline-flex">
                        <span className="size-1.5 rounded-full bg-green-400" /> Live
                      </span>
                      <ArrowUpRight className="size-5 text-white/60 transition-colors group-hover:text-gold-400" />
                    </span>
                  )}
                </>
              );
              const rowClass = cn(
                "flex items-center justify-between gap-4 rounded-2xl border px-5 py-4",
                product.current ? "border-gold-500/60 bg-gold-500/10" : "border-white/10 bg-white/5",
              );

              return (
                <li key={product.name}>
                  {product.url ? (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${product.name} (opens in a new tab)`}
                      className={cn(rowClass, "group transition-colors hover:border-gold-500/50 hover:bg-white/10")}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={rowClass}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
