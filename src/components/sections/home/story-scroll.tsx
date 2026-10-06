"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useEffect, useRef, useState } from "react";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { storyChapters } from "@/config/home";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

/**
 * Sticky story — origin, roast, ritual.
 *
 * A sticky heading rail on the left tracks which chapter is in view on the
 * right. The rail uses IntersectionObserver rather than a scroll listener, so
 * work only happens at chapter boundaries.
 */
export function StoryScroll() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = chapterRefs.current.filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <Section tone="bright">
      <Container>
        <div className="grid gap-x-12 gap-y-4 lg:grid-cols-12">
          {/* Sticky rail */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[7.5rem]">
              <Eyebrow>How the cup happens</Eyebrow>
              <h2 className="mt-5 text-display-2xs text-ink-900">
                Three stages, one continuous piece of work
              </h2>

              <ol className="mt-10 hidden flex-col border-t border-line-light lg:flex">
                {storyChapters.map((chapter, index) => {
                  const isActive = index === active;
                  return (
                    <li key={chapter.id} className="border-b border-line-light">
                      <button
                        type="button"
                        onClick={() =>
                          chapterRefs.current[index]?.scrollIntoView({
                            behavior: reduce ? "auto" : "smooth",
                            block: "center",
                          })
                        }
                        aria-current={isActive ? "true" : undefined}
                        className="group/chapter flex w-full items-center gap-4 py-4 text-left"
                      >
                        <span className="relative flex h-px w-10 shrink-0 items-center">
                          {isActive ? (
                            <motion.span
                              layoutId="story-rail"
                              className="h-px w-full bg-copper-500"
                              transition={tween(duration.base, ease.out)}
                            />
                          ) : (
                            <span className="h-px w-5 bg-ink-900/20 transition-[width] duration-500 ease-out-expo group-hover/chapter:w-8" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-[0.625rem] tabular-nums tracking-[0.1em] transition-colors duration-300",
                            isActive ? "text-copper-600" : "text-text-muted",
                          )}
                        >
                          {chapter.chapter}
                        </span>
                        <span
                          className={cn(
                            "font-display text-title-xs transition-colors duration-300",
                            isActive
                              ? "text-ink-900"
                              : "text-text-muted group-hover/chapter:text-ink-900",
                          )}
                        >
                          {chapter.kicker}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-7 hidden max-w-[32ch] text-body-sm leading-relaxed text-text-muted lg:block">
                Scrolling is the only interaction this section needs. Select a
                stage above to jump straight to it.
              </p>
            </div>
          </div>

          {/* Chapters */}
          <div className="lg:col-span-8">
            {storyChapters.map((chapter, index) => (
              <article
                key={chapter.id}
                ref={(node) => {
                  chapterRefs.current[index] = node;
                }}
                className="relative flex min-h-[72vh] flex-col justify-center gap-6 border-t border-line-light py-14 first:border-t-0 first:pt-0 lg:py-20"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[7rem] leading-none tracking-[-0.04em] text-ink-900/[0.045] sm:text-[9rem]"
                >
                  {chapter.chapter}
                </span>

                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.625rem] tabular-nums tracking-[0.12em] text-copper-600">
                    {chapter.chapter}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-line-light" />
                  <span className="label text-text-muted">{chapter.kicker}</span>
                </div>

                <ParallaxImage
                  image={chapter.image}
                  ratio={index % 2 === 0 ? "16 / 10" : "4 / 3"}
                  travel={54}
                  reveal
                  revealFrom={index % 2 === 0 ? "up" : "left"}
                  sizes="(min-width: 1024px) 60vw, 92vw"
                  className="w-full"
                  quality={78}
                />

                <div className="flex flex-col gap-4 lg:max-w-[52ch]">
                  <h3 className="text-display-2xs text-ink-900">{chapter.title}</h3>
                  <p className="text-body leading-relaxed text-text-body sm:text-body-md">
                    {chapter.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
