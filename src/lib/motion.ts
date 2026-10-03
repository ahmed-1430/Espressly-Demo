import type { Transition, Variants } from "motion/react";

/**
 * Espressly — motion language.
 * ---------------------------------------------------------------------------
 * Durations are deliberately long enough to feel considered (0.6 – 1.4 s) and
 * easings are expo-out so motion decelerates like something heavy settling
 * rather than springing. No bounce, no overshoot.
 */

export const duration = {
  instant: 0.24,
  fast: 0.42,
  base: 0.72,
  slow: 1.05,
  reveal: 1.35,
  cinematic: 1.6,
} as const;

export const ease = {
  /** Decelerating ease for entrances and reveals. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Symmetric ease for two-way transitions and loops. */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** Quick, precise ease for micro-interactions. */
  precise: [0.22, 0.61, 0.36, 1] as const,
} as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 26,
  mass: 0.9,
};

export function tween(
  seconds: number = duration.base,
  curve: readonly number[] = ease.out,
  delay = 0,
): Transition {
  return { duration: seconds, ease: curve as unknown as Transition["ease"], delay };
}

/** Parent wrapper that staggers its children. */
export function stagger(step = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: step, delayChildren },
    },
  };
}

/**
 * Scroll-trigger defaults. `amount` is tuned so an element fires when roughly
 * a third of it is visible — early enough to feel responsive, late enough that
 * the animation is actually seen.
 */
export const viewportOnce = { once: true, amount: 0.3 } as const;
export const viewportEarly = { once: true, amount: 0.12 } as const;

/** Distance a masked image travels during its reveal. */
export const maskTravel = "8%";