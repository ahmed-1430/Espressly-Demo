"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { BlogCard } from "@/components/cards/blog-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogCategories, posts } from "@/config/blog";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

type Filter = string;

/**
 * Full-width editorial archive. No sidebar, by design: the lead article gets a
 * wide two-column treatment and everything else sits in a measured grid.
 * Category filtering is a local derivation, so the URL stays clean.
 */
export function BlogArchive() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(
    () => [
      { id: "all", label: "All writing" },
      ...blogCategories.map((category) => ({ id: category.id, label: category.label })),
    ],
    [],
  );

  const filtered = useMemo(
    () =>
      filter === "all"
        ? posts
        : posts.filter(
            (post) =>
              post.category.toLowerCase() === filter ||
              post.tags.some((tag) => tag.toLowerCase() === filter),
          ),
    [filter],
  );

  const [lead, ...rest] = filtered;

  return (
    <div>
      <SectionHeading
        as="h2"
        eyebrow="Six pieces"
        title="Field notes, newest first"
        className="mb-8 max-w-[40ch]"
      />

      <div
        role="group"
        aria-label="Filter articles by category"
        className="hide-scrollbar rail gap-2 border-b border-line-light pb-6"
      >
        {filters.map((option) => {
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setFilter(option.id)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex h-10 shrink-0 items-center rounded-pill border px-5 text-meta font-medium transition-colors duration-400",
                isActive
                  ? "border-ink-900 bg-ink-900 text-paper-50"
                  : "border-ink-900/15 text-text-muted hover:border-ink-900/40 hover:text-ink-900",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {`${filtered.length} ${filtered.length === 1 ? "article" : "articles"}`}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={tween(duration.base, ease.out)}
          className="mt-14 flex flex-col gap-16 lg:gap-24"
        >
          {lead ? (
            <BlogCard post={lead} variant="hero" />
          ) : (
            <p className="text-body text-text-muted">
              Nothing published in this category yet.
            </p>
          )}

          {rest.length > 0 ? (
            <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <motion.li
                  key={post.slug}
                  initial={reduce ? undefined : { opacity: 0, y: 22 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={tween(duration.slow, ease.out, 0.06 * index)}
                >
                  <BlogCard post={post} />
                </motion.li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}