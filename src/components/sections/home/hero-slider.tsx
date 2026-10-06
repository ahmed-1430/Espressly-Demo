"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCallback, useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { hero } from "@/config/home";
import { heroSlides } from "@/config/images";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

const AUTOPLAY_MS = 6800;

/** Masked line that rises from beneath its own baseline on mount. */
function RiseLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block"
        initial={reduce ? undefined : { y: "112%" }}
        animate={{ y: 0 }}
        transition={tween(1.15, ease.out, delay)}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Home hero.
 * ---------------------------------------------------------------------------
 * An editorial opening rather than a fullscreen slider: the argument on the
 * left, a living photograph on the right, and a numbered index that lets the
 * visitor move through the three frames without leaving the page.
 *
 * Motion is deliberately layered:
 *   1. The headline rises line by line, masked, on arrival.
 *   2. The photograph lifts behind a curtain while settling from a slight
 *      overscale.
 *   3. Slide changes are a slow crossfade with a gentle scale, never a slide.
 *   4. The seal rotates continuously — the only looping motion on the page.
 *
 * Autoplay pauses on hover, on focus and while the tab is hidden, so a reading
 * visitor never has a frame change under them mid-sentence. Reduced motion
 * removes the loop entirely and swaps frames instantly.
 */
export function HeroSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (reduce || paused || total < 2) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setIndex((current) => (current + 1) % total);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [reduce, paused, total]);

  const slide = heroSlides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      data-tone="light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="grain relative isolate overflow-hidden bg-paper-50 pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32"
    >
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="flex flex-col lg:col-span-7">
            <motion.p
              initial={reduce ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={tween(duration.base, ease.out)}
              className="label flex items-center gap-3 text-copper-600"
            >
              <span aria-hidden className="h-px w-8 bg-copper-500" />
              {hero.eyebrow}
            </motion.p>

            <h1 className="mt-7 text-display-sm text-ink-900">
              <RiseLine delay={0.08}>
                Roasted <em className="text-copper-600">slowly.</em>
              </RiseLine>
              <RiseLine delay={0.2}>Served precisely.</RiseLine>
            </h1>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tween(duration.slow, ease.out, 0.42)}
              className="mt-8 max-w-[44ch] text-body-md leading-relaxed text-text-body"
            >
              {hero.body}
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={tween(duration.slow, ease.out, 0.54)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.dl
              initial={reduce ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={tween(duration.slow, ease.out, 0.7)}
              className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line-light pt-5 sm:mt-16"
            >
              {hero.rail.map((item) => (
                <div key={item.label}>
                  <dt className="label text-text-muted">{item.label}</dt>
                  <dd className="mt-2 font-display text-title-xs leading-tight text-ink-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Living photograph */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={reduce ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={tween(1.25, ease.inOut, 0.16)}
              className="relative aspect-[4/5] w-full overflow-hidden bg-espresso-900 sm:aspect-[5/6] lg:aspect-[4/5]"
            >
              {heroSlides.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  aria-hidden={i !== index}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={tween(reduce ? 0 : 1.2, ease.inOut)}
                >
                  <motion.div
                    className="size-full"
                    initial={false}
                    animate={reduce ? undefined : { scale: i === index ? 1 : 1.07 }}
                    transition={tween(2.6, ease.out)}
                  >
                    <Media
                      image={entry.image}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 40vw, 92vw"
                      quality={82}
                      className="size-full"
                    />
                  </motion.div>
                </motion.div>
              ))}

              {/* Frame lines + top progress */}
              <span aria-hidden className="pointer-events-none absolute inset-0 border border-cream-100/15" />
              <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-cream-100/20">
                <motion.span
                  key={`bar-${index}`}
                  className="block h-px origin-left bg-copper-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused || reduce ? 0.35 : 1 }}
                  transition={
                    paused || reduce
                      ? tween(duration.base, ease.out)
                      : { duration: AUTOPLAY_MS / 1000, ease: "linear" }
                  }
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/20 to-transparent p-5 pt-16 text-cream-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={reduce ? undefined : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6 }}
                    transition={tween(duration.base, ease.out)}
                  >
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-copper-300">
                      On the bar
                    </p>
                    <p className="mt-1.5 font-display text-title-sm leading-tight text-cream-100">
                      {slide.title}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Rotating seal */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={tween(duration.slow, ease.out, 0.9)}
              aria-hidden
              className="absolute -left-5 top-8 hidden size-28 place-items-center rounded-full bg-paper-50 text-ink-900 shadow-lift sm:grid lg:-left-10 lg:size-32"
            >
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full [animation:spin-slow_30s_linear_infinite] motion-reduce:animate-none"
              >
                <defs>
                  <path
                    id="hero-seal-path"
                    d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  fontSize="7"
                  letterSpacing="1.55"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <textPath href="#hero-seal-path">
                    SMALL BATCH · ROASTED ON THE QUAY · EST. 2016 ·
                  </textPath>
                </text>
              </svg>
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.2}>
                <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Slide index */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <ul className="flex items-center gap-1.5" aria-label="Hero frames">
                {heroSlides.map((entry, i) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show frame ${i + 1}: ${entry.title}`}
                      aria-current={i === index ? "true" : undefined}
                      className="group/idx inline-flex h-8 items-center gap-2 px-2"
                    >
                      <span
                        className={cn(
                          "font-mono text-[0.625rem] tabular-nums tracking-[0.08em] transition-colors duration-300",
                          i === index ? "text-ink-900" : "text-text-muted/60 group-hover/idx:text-ink-900",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "block h-px transition-all duration-500 ease-out-expo",
                          i === index ? "w-8 bg-copper-500" : "w-4 bg-ink-900/20 group-hover/idx:w-6",
                        )}
                      />
                    </button>
                  </li>
                ))}
              </ul>

              <span className="label hidden text-text-muted sm:block">
                Scroll to explore
                <span aria-hidden className="ml-2 inline-block h-3 w-px translate-y-1 overflow-hidden bg-ink-900/25">
                  <span className="block h-full w-full bg-copper-500 [animation:scrollcue_2.4s_ease-in-out_infinite]" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Container>

      <p aria-live="polite" className="sr-only">
        Frame {index + 1} of {total}: {slide.title}
      </p>
    </section>
  );
}
