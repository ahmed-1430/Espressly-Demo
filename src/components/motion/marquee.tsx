"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Seconds for one full pass. */
  durationSeconds?: number;
  separator?: ReactNode;
  /** Duplicated tracks for a seamless loop. */
  reverse?: boolean;
};

/**
 * Seamless marquee built on a single transform — never animates `left`, so it
 * stays on the compositor. The list is duplicated and the track is offset by
 * exactly -50 %.
 */
export function Marquee({
  items,
  className,
  durationSeconds = 38,
  separator = "·",
  reverse = false,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const sequence = [...items, ...items];
  const passes = items.length;

  if (reduce) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {items.map((item) => (
            <li key={item} className="whitespace-nowrap">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      // The track is decorative repetition of visible text.
      aria-hidden
    >
      <motion.div
        className="flex w-max items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: durationSeconds, ease: "linear", repeat: Infinity }}
      >
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center whitespace-nowrap"
          >
            <span className="px-6 sm:px-8">{item}</span>
            <span className="opacity-40" aria-hidden>
              {separator}
            </span>
          </span>
        ))}
        <span className="sr-only">{`${passes} rotating highlights`}</span>
      </motion.div>
    </div>
  );
}