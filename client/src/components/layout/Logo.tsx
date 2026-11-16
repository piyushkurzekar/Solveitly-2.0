import { Link } from "react-router";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "dark" = on a dark background: the owl sits on a white badge and the wordmark is white. */
  tone?: "light" | "dark";
  className?: string;
}

export function Logo({ tone = "light", className }: LogoProps) {
  return (
    <Link to="/" aria-label={`${site.name} home`} className={cn("flex items-center gap-2.5 select-none", className)}>
      <span className={cn("flex shrink-0 items-center justify-center", tone === "dark" && "rounded-xl bg-white p-1")}>
        <img src="/brand/logo-mark.webp" alt="" width={40} height={40} className="size-10" />
      </span>
      <span
        className={cn(
          "text-xl font-bold tracking-[0.18em] uppercase",
          tone === "dark" ? "text-white" : "text-navy-800",
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
