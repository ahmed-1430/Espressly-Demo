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
 * A single rAF loop drives one state value; nothing is set during the effect
 * itself, so there is no cascading render. Under reduced motion the final
 * figure is derived during render and no animation runs at all.
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
  const [ticked, setTicked] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // expo-out
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setTicked(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value, durationMs]);

  const display = reduce ? value : ticked;

  return (
    <span ref={ref} className={className}>
      {/* Animated digits are hidden from assistive tech; the settled value is
          announced once, so a screen reader never hears a number ticking. */}
      <span aria-hidden className="tabular-nums">
        {`${formatNumber(display, site.locale)}${suffix}`}
      </span>
      <span className="sr-only">{`${formatNumber(value, site.locale)}${suffix}`}</span>
    </span>
  );
}