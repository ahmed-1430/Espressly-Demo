import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Draws the leading hairline + diamond. */
  ornament?: boolean;
  tone?: "dark" | "light";
};

/** Small uppercase label with an optional hairline ornament. */
export function Eyebrow({ children, className, ornament = true, tone = "dark" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-copper-700" : "text-copper-300",
        className,
      )}
    >
      {ornament ? (
        <span aria-hidden className="flex items-center gap-2">
          <span
            className={cn(
              "h-px w-8",
              tone === "dark" ? "bg-copper-700/50" : "bg-copper-300/50",
            )}
          />
          <span
            className={cn(
              "size-1 rotate-45",
              tone === "dark" ? "bg-copper-600" : "bg-copper-400",
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
  medium: "max-w-[52ch]",
  wide: "max-w-[64ch]",
} as const;

/**
 * The section header used everywhere. Deliberately restrained: an eyebrow, one
 * display heading, and at most one paragraph — never a stack of decorations.
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
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} ornament={centered}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Heading
        id={id}
        className={cn(
          "text-display-2xs text-wrap-balance",
          tone === "dark" ? "text-ink-900" : "text-cream-100",
        )}
      >
        {title}
      </Heading>

      {body ? (
        <p
          className={cn(
            "text-[0.9375rem] leading-relaxed sm:text-base",
            bodyWidths[bodyWidth],
            tone === "dark" ? "text-text-body" : "text-text-inverse-muted",
          )}
        >
          {body}
        </p>
      ) : null}

      {children}
    </div>
  );
}