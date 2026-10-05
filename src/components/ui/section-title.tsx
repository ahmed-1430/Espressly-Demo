import type { ReactNode } from "react";
import { SeparatorMark } from "@/components/brand/separator-mark";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  /** Rendered as the heading. The reference sets this in all caps. */
  title: ReactNode;
  /** Short supporting line beneath the separator. */
  description?: ReactNode;
  /** Heading level, so the document outline stays honest. */
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
  tone?: "dark" | "light";
  /** Staggers the children slightly as the block arrives. */
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * The section title system.
 * ---------------------------------------------------------------------------
 * Every band on the site opens with this: a centred uppercase heading, the
 * rule–mark–rule ornament beneath it, then a short lede.
 *
 * The reference composes this on a 6-of-12 column centred inside the 1100px
 * grid, which is what keeps the headings from spanning the full measure and
 * gives the page its characteristic narrow centred column. `align="left"` is
 * available for the bands that break the pattern, but centred is the default
 * because it is what the reference uses almost everywhere.
 */
export function SectionTitle({
  title,
  description,
  as: Heading = "h2",
  align = "center",
  tone = "dark",
  delay = 0,
  className,
  id,
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal
        as={Heading}
        id={id}
        delay={delay}
        className={cn(
          "display-type text-display-2xs",
          tone === "dark" ? "text-ink-900" : "text-cream-100",
        )}
      >
        {title}
      </Reveal>

      <Reveal delay={delay + 0.08}>
        <SeparatorMark
          tone={tone}
          className={cn("mt-[13px] mb-[22px]", !centered && "justify-start")}
        />
      </Reveal>

      {description ? (
        <Reveal
          delay={delay + 0.16}
          className={cn(
            centered ? "max-w-[62ch]" : "max-w-[52ch]",
          )}
        >
          <p
            className={cn(
              "text-lede uppercase",
              tone === "dark" ? "text-copper-500" : "text-copper-300",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}