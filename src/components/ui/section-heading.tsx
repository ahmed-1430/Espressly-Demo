import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Draws the leading rule and ember tick. */
  ornament?: boolean;
  tone?: "dark" | "light";
};

/** Instrument label with an optional rule + ember tick. */
export function Eyebrow({ children, className, ornament = true, tone = "dark" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "label flex items-center gap-3",
        tone === "dark" ? "text-copper-600" : "text-copper-400",
        className,
      )}
    >
      {ornament ? (
        <span aria-hidden className="flex items-center gap-1.5">
          <span
            className={cn(
              "h-px w-7",
              tone === "dark" ? "bg-copper-600/45" : "bg-copper-400/45",
            )}
          />
          <span
            className={cn(
              "size-1",
              tone === "dark" ? "bg-copper-500" : "bg-copper-400",
            )}
          />
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Short supporting sentence, capped at a comfortable measure. */
  body?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Heading level — keeps the document outline honest. */
  as?: "h2" | "h3";
  className?: string;
  /** Heading id so a parent section can reference it. */
  id?: string;
  bodyWidth?: "narrow" | "medium" | "wide";
  children?: ReactNode;
};

const bodyWidths = {
  narrow: "max-w-[34ch]",
  medium: "max-w-[48ch]",
  wide: "max-w-[62ch]",
} as const;

/**
 * The section header used everywhere: an instrument label, one large editorial
 * heading, and at most one paragraph. No ornaments, no decoration — the type
 * carries the hierarchy.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "dark",
  as = "h2",
  className,
  id,
  bodyWidth = "medium",
  children,
}: SectionHeadingProps) {
  const Heading = as;
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
      distance={18}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} ornament={!centered}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Heading
        id={id}
        className={cn(
          "mt-5 text-display-2xs",
          tone === "dark" ? "text-ink-900" : "text-cream-100",
        )}
      >
        {title}
      </Heading>

      {body ? (
        <p
          className={cn(
            "mt-6 text-body-md leading-relaxed",
            bodyWidths[bodyWidth],
            tone === "dark" ? "text-text-body" : "text-text-inverse-muted",
          )}
        >
          {body}
        </p>
      ) : null}

      {children}
    </Reveal>
  );
}
