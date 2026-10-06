"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/hooks/use-media-query";

/** Layout-only measurement: runs before paint on the client, no SSR warning. */
const useIsoLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

type ScrollRailProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Page gutter applied as inline padding on the track. */
  gutter?: string;
  /** Extra vertical scroll distance as a multiple of the overflow width. */
  lengthFactor?: number;
  /** Shows a thin progress rule under the rail. */
  progress?: boolean;
  progressClassName?: string;
  ariaLabel?: string;
};

/**
 * Scroll-driven horizontal storytelling.
 * ---------------------------------------------------------------------------
 * Desktop (≥ 1024 px, pointer: fine): the page scrolls vertically while the
 * track translates horizontally, pinned for exactly as long as the overflow
 * requires. The extra section height is set from a measured value so nothing
 * is guessed and nothing reflows mid-scroll.
 *
 * Below that: the same track becomes a native, snap-aligned swipeable rail.
 * Vertical scroll is never hijacked on touch.
 */
export function ScrollRail({
  children,
  className,
  trackClassName,
  /* Pinned to the same 1/12 gutter as the site grid, so a pinned rail's
     items line up with the content in the sections above and below it.
     calc() is used rather than a token because the margin is a fraction of
     the viewport, which is what lets the edges agree at every width. */
  gutter = "gutter-x",
  lengthFactor = 0.85,
  progress = false,
  progressClassName,
  ariaLabel,
}: ScrollRailProps) {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const enabled = isDesktop && !reduce;

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);

  useIsoLayoutEffect(() => {
    if (!enabled) return;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const parent = track.parentElement;
      if (!parent) return;
      setOverflow((current) => {
        const next = Math.max(0, track.scrollWidth - parent.clientWidth);
        return current === next ? current : next;
      });
    };

    measure();

    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    if (track.parentElement) observer.observe(track.parentElement);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);

  // Only hand Motion a target it can actually measure. When the desktop rail is
  // not the thing being rendered, its ref is deliberately left unattached and
  // passing it anyway makes Motion wait for a hydration that never comes.
  const { scrollYProgress } = useScroll(
    enabled ? { target: outerRef, offset: ["start start", "end end"] } : {},
  );
  const x = useTransform(scrollYProgress, [0, 1], [0, -overflow]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  if (!enabled) {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "rail snap-x snap-mandatory gap-5 pb-2",
            gutter,
            trackClassName,
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={cn("relative", className)}
      style={{ height: `calc(100svh + ${overflow * lengthFactor}px)` }}
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          className={cn("flex w-max items-stretch", gutter, trackClassName)}
          style={{ x }}
          role={ariaLabel ? "group" : undefined}
          aria-label={ariaLabel}
        >
          {children}
        </motion.div>

        {progress ? (
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 mx-auto h-px w-full bg-current/10",
              progressClassName,
            )}
            aria-hidden
          >
            <motion.div
              className="h-px origin-left bg-copper-500"
              style={{ scaleX }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}