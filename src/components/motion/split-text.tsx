"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

type SplitTextProps = {
  /** Rendered as words. Keep lines short — long copy wraps badly. */
  text: string;
  className?: string;
  /** Stagger between words in seconds. */
  step?: number;
  delay?: number;
  durationSeconds?: number;
  /** Splits on the mask boundary too, for a curtain-style entrance. */
  masked?: boolean;
  as?: ElementType;
  /** Rendered inside each word; use for line wrappers. */
  renderLine?: (word: string, index: number) => ReactNode;
};

/**
 * Word-level text reveal with an optional clipping mask per word.
 *
 * Each word sits in an `overflow: hidden` shell and slides up from beneath the
 * baseline — the classic editorial reveal. Under reduced motion the words are
 * rendered plainly with no transform or clip.
 */
export function SplitText({
  text,
  className,
  step = 0.055,
  delay = 0,
  durationSeconds = duration.slow,
  masked = true,
  as,
  renderLine,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ").filter(Boolean);
  const Wrapper = (as ?? "span") as ElementType;

  if (reduce) {
    return (
      <Wrapper className={className}>{text}</Wrapper>
    );
  }

  return (
    <Wrapper data-reveal="" className={cn("inline-block", className)}>
      {words.map((word, index) => {
        const content = renderLine ? renderLine(word, index) : word;
        const inner = masked ? (
          <span className="block overflow-hidden pb-[0.12em] leading-[1.02]">
            <motion.span
              className="block will-change-transform"
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={tween(durationSeconds, ease.out, delay + index * step)}
            >
              {content}
            </motion.span>
          </span>
        ) : (
          <motion.span
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tween(durationSeconds, ease.out, delay + index * step)}
          >
            {content}
          </motion.span>
        );

        return (
          <span
            key={`${word}-${index}`}
            data-reveal=""
            className={cn("inline-block", masked ? "pb-[0.12em]" : "mr-[0.26em]")}
          >
            {inner}
            {index < words.length - 1 ? (
              <span className="inline-block">&nbsp;</span>
            ) : null}
          </span>
        );
      })}
    </Wrapper>
  );
}