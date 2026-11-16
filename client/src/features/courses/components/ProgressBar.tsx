import { cn } from "@/lib/utils";

export function ProgressBar({ value, className, tone = "light" }: { value: number; className?: string; tone?: "light" | "dark" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Course progress"
      className={cn("h-2 w-full overflow-hidden rounded-full", tone === "dark" ? "bg-white/15" : "bg-navy-100", className)}
    >
      <div className="h-full rounded-full bg-gold-500 transition-[width] duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
