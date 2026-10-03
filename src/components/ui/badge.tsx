import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "copper" | "ink" | "cream";
  size?: "sm" | "md";
};

const tones = {
  copper: "bg-copper-600/12 text-copper-700 ring-copper-700/20",
  ink: "bg-ink-900/[0.06] text-ink-900 ring-ink-900/10",
  cream: "bg-cream-100/10 text-cream-100 ring-cream-100/20",
} as const;

/** Compact label. Never used for interactive affordances. */
export function Badge({ children, className, tone = "copper", size = "sm" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill font-sans font-medium uppercase tracking-[0.18em] ring-1 ring-inset",
        size === "sm" ? "px-2.5 py-1 text-[0.625rem]" : "px-3 py-1.5 text-[0.6875rem]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

type TagProps = {
  children: ReactNode;
  className?: string;
};

/** Quiet inline tag used for tasting notes and product attributes. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-ink-900/12 px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.16em] text-text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}