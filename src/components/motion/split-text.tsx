"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import type { ElementType } from "react";
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
  /** Clips each word and slides it up from beneath the baseline. */
  masked?: boolean;
  /** Word box extends past the mask so nothing clips on the way in. */
  maskPadding?: string;
  as?: ElementType;
};

/**
 * Word-level text reveal.
 *
 * Structure per word: an inline-block box, containing a clipping mask, whose
 * only child is the word. The mask is the only block-level box, so a word
 * never silently becomes two lines. Spaces between words are plain text nodes
 * (not inline-block spans), which keeps the word boxes exactly one line tall
 * and their baselines aligned.
 *
 * `text-wrap-normal` deliberately overrides the balanced heading default —
 * these lines are art-directed and must not be re-flowed.
 *
 * Under reduced motion the string is returned verbatim with no transforms,
 * no clips and no extra markup.
 *
 * No `will-change-transform` on the word boxes, deliberately. Motion promotes
 * each element for the length of its own animation and releases it after, so a
 * permanent hint would leave every word on the page as its own compositor layer
 * for the lifetime of the document — a headline-heavy page would hold well over
 * a hundred of them. Plain translate/opacity is already composited.
 */
export function SplitText({
  text,
  className,
  step = 0.055,
  delay = 0,
  durationSeconds = duration.slow,
  masked = true,
  maskPadding = "pb-[0.14em]",
  as,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ").filter(Boolean);
  const Wrapper = (as ?? "span") as ElementType;

  if (reduce) {
    return <Wrapper className={className}>{text}</Wrapper>;
  }

  return (
    <Wrapper data-reveal="" className={cn("inline-block text-wrap-normal", className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span data-reveal="" className="inline-block align-bottom">
            {masked ? (
              <span
                className={cn(
                  "block overflow-hidden",
                  maskPadding,
                )}
              >
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={tween(durationSeconds, ease.out, delay + index * step)}
                >
                  {word}
                </motion.span>
              </span>
            ) : (
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={tween(durationSeconds, ease.out, delay + index * step)}
              >
                {word}
              </motion.span>
            )}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Wrapper>
  );
}