"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  duration,
  ease,
  stagger as staggerFactory,
  tween,
  viewportOnce,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Travel distance in px. Ignored when reduced motion is requested. */
  distance?: number;
  delay?: number;
  durationSeconds?: number;
  as?: "div" | "li" | "section" | "article" | "span" | "p";
};

/**
 * The single scroll-reveal primitive used across the site.
 *
 * Intentional constraints: it animates only `opacity` and `transform`, it runs
 * once, and it collapses to a plain render under `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  distance = 26,
  delay = 0,
  durationSeconds = duration.base,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={tween(durationSeconds, ease.out, delay)}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  step?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol" | "dl" | "section";
};

/** Parent that staggers its `StaggerItem` children on scroll entry. */
export function Stagger({
  children,
  className,
  step = 0.09,
  delayChildren = 0,
  as = "div",
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerFactory(step, delayChildren)}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article" | "span";
};

export function StaggerItem({
  children,
  className,
  distance = 24,
  as = "div",
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: tween(duration.slow, ease.out),
        },
      }}
    >
      {children}
    </Component>
  );
}