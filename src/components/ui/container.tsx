import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** `wide` matches the header gutter, `copy` caps measure for prose. */
  width?: "wide" | "narrow" | "copy" | "full";
  as?: ElementType;
};

const widths = {
  wide: "mx-auto w-full max-w-[var(--container-page)] px-6 sm:px-10 lg:px-14",
  narrow: "mx-auto w-full max-w-[64rem] px-6 sm:px-10 lg:px-14",
  copy: "mx-auto w-full max-w-[var(--container-copy)] px-6 sm:px-8",
  full: "w-full",
} as const;

/** Page gutter. Every band on the site shares this rhythm. */
export function Container({
  children,
  className,
  width = "wide",
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

const spacing = {
  flush: "",
  tight: "py-14 sm:py-20",
  default: "py-18 sm:py-28 lg:py-36",
  loose: "py-22 sm:py-32 lg:py-44",
  hero: "pt-28 pb-16 sm:pt-32 lg:pt-40",
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
      className={cn("relative", spacing[space], tones[tone], className)}
    >
      {children}
    </Tag>
  );
}