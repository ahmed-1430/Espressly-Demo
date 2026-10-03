"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Reading-progress hairline for the top of the viewport.
 * Driven by a spring on `scrollYProgress` so it settles rather than snapping.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className={className}
      style={{ scaleX, transformOrigin: "0% 50%" }}
    />
  );
}