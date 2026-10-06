"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { ReactNode } from "react";
import { duration, ease, tween } from "@/lib/motion";

/**
 * Route transition.
 * ---------------------------------------------------------------------------
 * `template.tsx` remounts on every navigation, so this is the seam where a new
 * page can arrive with a little ceremony instead of snapping in.
 *
 * Deliberately restrained, because a route change is a navigation the visitor
 * has already committed to and is waiting on:
 *
 *  - 300 ms, faster than any reveal on the page, so it never reads as a gate.
 *  - Opacity plus 10 px of rise. No scale, no blur, no sliding panel — those
 *    read as an app rather than a coffee brand.
 *  - Fade in only, no fade out. The outgoing page leaves immediately, so the
 *    browser's own navigation feels instant and nothing stacks up in time.
 *
 * The wrapper carries `data-reveal`, which the noscript rule in the root layout
 * uses to force the final state, so the content is never hidden without JS.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      initial={reduce ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={tween(duration.route, ease.out)}
    >
      {children}
    </motion.div>
  );
}