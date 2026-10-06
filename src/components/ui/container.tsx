import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "grid" | "wide" | "narrow" | "copy" | "full";
  as?: ElementType;
};

/**
 * Page gutter.
 *
 * A real editorial measure rather than a fraction of the viewport: content is
 * capped at 1440px and centred, with a gutter that steps 20 → 32 → 48px. That
 * keeps the composition deliberate on a 27-inch display instead of letting a
 * paragraph stretch to 240 characters, and it gives every band one shared
 * left and right edge.
 *
 * `wide` exists for full-width editorial rails that need a little more room.
 * `copy` and `narrow` are for genuinely narrower measures.
 */
const widths = {
  grid: "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12",
  wide: "mx-auto w-full max-w-[1680px] px-5 sm:px-8 lg:px-12",
  narrow: "mx-auto w-full max-w-[68rem] px-5 sm:px-8",
  copy: "mx-auto w-full max-w-[var(--container-copy)] px-5 sm:px-8",
  full: "w-full",
} as const;

/** Page gutter. Every band on the site shares this rhythm. */
export function Container({
  children,
  className,
  width = "grid",
  as,
}: ContainerProps) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn(widths[width], className)}>{children}</Tag>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Vertical rhythm. `tight` for stacked editorial bands. */
  spacing?: "flush" | "tight" | "default" | "loose" | "hero";
  /** Overrides the landmark element. `section` is right for almost everything. */
  as?: "section" | "div" | "header" | "footer" | "article";
  id?: string;
  /** Id of the heading that labels this region. */
  labelledBy?: string;
  tone?: "light" | "bright" | "sand" | "dark" | "deeper" | "ember";
};

/**
 * Section rhythm: 128px top and bottom on a standard band, 88px on a tighter
 * one. Everything measures against these, so sections only ever read as 0, 88
 * or 128 px of air.
 */
const spacing = {
  flush: "",
  tight: "py-[56px] sm:py-[72px] lg:py-[var(--spacing-section-tight)]",
  default: "py-[64px] sm:py-[96px] lg:py-[var(--spacing-section)]",
  loose: "py-[72px] sm:py-[112px] lg:py-[152px]",
  hero: "pt-32 pb-16 sm:pt-36 lg:pt-40",
} as const;

const tones = {
  light: "bg-cream-100 text-text-body",
  bright: "bg-paper-50 text-text-body",
  sand: "bg-sand-200 text-text-body",
  dark: "bg-espresso-900 text-text-inverse-muted",
  deeper: "bg-ink-950 text-text-inverse-muted",
  ember: "bg-copper-500 text-ink-950",
} as const;

/** Section wrapper: owns the vertical rhythm and the tonal palette. */
export function Section({
  children,
  className,
  spacing: space = "default",
  as: Tag = "section",
  id,
  labelledBy,
  tone = "light",
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={cn("relative", spacing[space], tones[tone], className)}
    >
      {children}
    </Tag>
  );
}
