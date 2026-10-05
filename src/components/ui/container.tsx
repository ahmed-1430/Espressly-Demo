import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: "grid" | "wide" | "narrow" | "copy" | "full";
  as?: ElementType;
};

/**
 * `grid` is the reference's own 1100px measure — the width its section titles,
 * offer rows and editorial columns are composed on. `wide` is the outer frame
 * at 1300px, which full-bleed bands align to. `copy` caps prose.
 */
const widths = {
  grid: "mx-auto w-full max-w-[var(--container-grid)] px-6 sm:px-8",
  wide: "mx-auto w-full max-w-[var(--container-page)] px-6 sm:px-10",
  narrow: "mx-auto w-full max-w-[64rem] px-6 sm:px-8",
  copy: "mx-auto w-full max-w-[var(--container-copy)] px-6 sm:px-8",
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
  tone?: "light" | "bright" | "sand" | "dark" | "deeper";
};

/**
 * The reference's own rhythm: 130px top and bottom on a standard band, 85px
 * on a tighter one. Everything on the site measures against these, so sections
 * only ever read as 0, 85 or 130 px of air.
 */
const spacing = {
  flush: "",
  tight: "py-[50px] sm:py-[70px] lg:py-[var(--spacing-section-tight)]",
  default: "py-[60px] sm:py-[95px] lg:py-[var(--spacing-section)]",
  loose: "py-[70px] sm:py-[110px] lg:py-[150px]",
  hero: "pt-32 pb-16 sm:pt-36 lg:pt-40",
} as const;

const tones = {
  light: "bg-cream-100 text-text-body",
  bright: "bg-paper-50 text-text-body",
  sand: "bg-sand-200 text-text-body",
  dark: "bg-espresso-900 text-text-inverse-muted",
  deeper: "bg-ink-950 text-text-inverse-muted",
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
      /* Exposed so the focus ring can step up to a lighter copper on the dark
         band without any descendant needing to know its own surface. */
      data-tone={tone}
      className={cn("relative", spacing[space], tones[tone], className)}
    >
      {children}
    </Tag>
  );
}