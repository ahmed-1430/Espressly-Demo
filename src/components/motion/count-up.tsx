"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/format";
import { site } from "@/config/site";

type CountUpProps = {
  value: number;
  suffix?: string;
  /** Milliseconds for the full count. */
  durationMs?: number;
  className?: string;
};

/**
 * Counts a statistic up once, the first time it scrolls into view.
 *
 * Uses a rAF loop against a single state value, and bails out entirely under
 * reduced motion so the final figure renders immediately. The animated digits
 * are `aria-hidden`; the final value is exposed once so a screen reader never
 * hears a number ticking.
 */
export function CountUp({
  value,
  suffix = "",
  durationMs = 1500,
  className,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(() => (reduce ? value : 0));

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // expo-out
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, durationMs]);

  const spoken = `${formatNumber(value, site.locale)}${suffix}`;

  return (
    <span ref={ref} className={className}>
      <span aria-hidden className="tabular-nums">
        {`${formatNumber(display, site.locale)}${suffix}`}
      </span>
      <span className="sr-only">{spoken}</span>
    </span>
  );
}