"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SeparatorMark } from "@/components/brand/separator-mark";
import { heroSlides } from "@/config/images";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

const AUTOPLAY_MS = 7000;

/**
 * Home hero slider.
 * ---------------------------------------------------------------------------
 * The reference opens on a fullscreen Revolution Slider: a large photograph
 * per slide, an uppercase display heading, a short line, a call to action,
 * and previous/next arrows in the lower corners with a bullet index.
 *
 * What is kept is the structure and the feel — full-bleed frames, centred
 * display type, slow crossfade, arrows and bullets — rebuilt with Motion
 * rather than a slider plugin, so it costs one small client component instead
 * of a library.
 *
 * Behaviour notes:
 *  - Autoplay pauses on hover, on focus and while the tab is hidden, so a
 *    reading visitor never has a slide change under them mid-sentence.
 *  - The section is `aria-roledescription="carousel"`, each slide is a labelled
 *    group, and the region is `aria-live="polite"` so a manual change is
 *    announced without an automatic one being made disruptive.
 *  - Under reduced motion the crossfade and the scale settle are dropped and
 *    the slides swap instantly.
 */
export function HeroSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;
  const region = useRef<HTMLElement>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  /* Autoplay, suspended whenever the visitor is engaged or away. */
  useEffect(() => {
    if (reduce || paused || total < 2) return;

    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setIndex((current) => (current + 1) % total);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [reduce, paused, total]);

  /* Arrow keys, since the region is focusable and this is a carousel. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  const slide = heroSlides[index];

  return (
    <section
      ref={region}
      aria-roledescription="carousel"
      aria-label="Featured"
      data-tone="dark"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-espresso-950 text-cream-100"
    >
      {/* Frames. Kept mounted so a crossfade has something to fade between. */}
      {heroSlides.map((entry, i) => (
        <div
          key={entry.id}
          aria-hidden={i !== index}
          className="absolute inset-0"
          style={{ zIndex: i === index ? 0 : -1 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={
              reduce ? { duration: 0 } : tween(duration.reveal, ease.inOut)
            }
          >
            <motion.img
              src={entry.image.src}
              alt={i === index ? entry.image.alt : ""}
              className="size-full object-cover"
              style={{ objectPosition: entry.image.focus ?? "50% 50%" }}
              initial={false}
              animate={
                reduce ? undefined : { scale: i === index ? 1 : 1.06 }
              }
              transition={tween(2.4, ease.out)}
            />
          </motion.div>
        </div>
      ))}

      {/* Scrim. The reference darkens its slides enough for white type to hold. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-behind bg-espresso-950/55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-behind bg-gradient-to-t from-espresso-950 via-espresso-950/25 to-espresso-950/45"
      />

      {/* Copy */}
      <Container className="relative flex flex-1 flex-col items-center justify-center py-32 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="flex max-w-[54rem] flex-col items-center"
            initial={reduce ? undefined : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={tween(duration.base, ease.out)}
          >
            <SeparatorMark tone="light" className="mb-8" />

            <h1 className="display-type text-display-lg text-cream-100">
              {slide.title}
            </h1>

            <p className="mt-8 max-w-[46ch] text-body-lg leading-[1.75] text-cream-100/85">
              {slide.description}
            </p>

            <ButtonLink
              href={slide.cta.href}
              variant="inverse"
              size="lg"
              className="mt-11"
            >
              {slide.cta.label}
            </ButtonLink>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Controls */}
      <div className="relative pb-12">
        <Container className="flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="group inline-flex size-12 items-center justify-center rounded-pill border border-cream-100/35 text-cream-100 transition-colors duration-300 ease-out-expo hover:border-cream-100 hover:bg-cream-100 hover:text-ink-900"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              className="size-5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5"
            >
              <path d="M20 12H5M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <ul className="flex items-center gap-3">
            {heroSlides.map((entry, i) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}: ${entry.title}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group inline-flex h-10 w-6 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-px transition-all duration-500 ease-out-expo",
                      i === index
                        ? "w-8 bg-cream-100"
                        : "w-4 bg-cream-100/45 group-hover:bg-cream-100/80",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="group inline-flex size-12 items-center justify-center rounded-pill border border-cream-100/35 text-cream-100 transition-colors duration-300 ease-out-expo hover:border-cream-100 hover:bg-cream-100 hover:text-ink-900"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              className="size-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
            >
              <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Container>
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {index + 1} of {total}: {slide.title}
      </p>
    </section>
  );
}