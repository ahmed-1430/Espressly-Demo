"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { menuCategoryNav } from "@/config/menu";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

type CategoryRailProps = {
  /** Ids of the category sections, in order. */
  ids: readonly string[];
  className?: string;
};

/**
 * Sticky category navigation.
 *
 * Pins below the site header on `lg` and up, and collapses to a swipeable chip
 * rail on smaller screens — recomposed rather than shrunk. Active state comes
 * from IntersectionObserver, so it stays correct without a scroll listener.
 */
export function CategoryRail({ ids, className }: CategoryRailProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      // A band near the top third of the viewport decides the active category.
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids]);

  const handleJump = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    const headerOffset = 96;
    const top = node.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Menu categories"
      className={cn(
        "border-b border-line-light bg-paper-50/92 backdrop-blur-xl supports-[backdrop-filter]:bg-paper-50/78",
        "lg:sticky lg:top-[var(--rail-top)] lg:z-40",
        className,
      )}
      style={{ "--rail-top": "4.75rem" } as React.CSSProperties}
    >
      <div className="mx-auto w-full max-w-[var(--container-page)] px-6 sm:px-10 lg:px-14">
        <ul className="hide-scrollbar rail snap-x snap-mandatory gap-1 py-3 lg:flex lg:justify-center lg:overflow-visible lg:py-0">
          {menuCategoryNav.map((category) => {
            const isActive = active === category.id;
            return (
              <li key={category.id} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => handleJump(category.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative inline-flex h-10 shrink-0 items-center rounded-pill px-4 text-meta font-medium tracking-[0.01em] transition-colors duration-400 lg:h-11 lg:px-5",
                    isActive
                      ? "text-ink-900"
                      : "text-text-muted hover:text-ink-900",
                  )}
                >
                  {isActive && !reduce ? (
                    <motion.span
                      layoutId="category-pill"
                      className="absolute inset-0 -z-10 rounded-pill bg-sand-200"
                      transition={tween(duration.base, ease.out)}
                    />
                  ) : null}
                  {isActive && reduce ? (
                    <span className="absolute inset-0 -z-10 rounded-pill bg-sand-200" />
                  ) : null}
                  <span className="relative z-10">{category.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}