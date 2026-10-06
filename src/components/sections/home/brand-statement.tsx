"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { statement } from "@/config/home";
import { cn } from "@/lib/cn";

const EMPHASIS = new Set(["place,", "season", "person."]);

/** One word whose ink darkens as the manifesto is scrolled through. */
function ManifestoWord({
  word,
  progress,
  start,
  end,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const emphasized = EMPHASIS.has(word);
  const className = cn(emphasized && "italic text-copper-600");

  if (reduce) {
    return (
      <span data-reveal="" className={className}>
        {word}{" "}
      </span>
    );
  }

  return (
    <motion.span data-reveal="" style={{ opacity }} className={className}>
      {word}{" "}
    </motion.span>
  );
}

/**
 * The Espressly promise.
 * ---------------------------------------------------------------------------
 * The page's argument, set as a scroll-read manifesto: every word begins at a
 * whisper and reaches full ink as it passes the reading line, so the sentence
 * is literally read at the visitor's pace. Supporting photography and the pull
 * quote follow on paper.
 *
 * The effect is one `useScroll` value shared by every word; each word maps its
 * own slice of the range to opacity, so there is no per-word scroll listener and
 * no React state. Reduced motion renders the sentence at full contrast.
 */
export function BrandStatement() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.58"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const words = statement.headline.split(" ").filter(Boolean);

  return (
    <Section tone="bright" spacing="tight" className="overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Eyebrow>{statement.eyebrow}</Eyebrow>
            <p className="mt-6 max-w-[26ch] text-body-sm leading-relaxed text-text-muted">
              A small roastery on the old quay. Four lots a year, roasted by the
              people who serve them.
            </p>
            <p className="mt-8 font-display text-title-md italic text-ink-900">
              Est. 2016
            </p>
          </div>

          <div className="lg:col-span-9" ref={ref}>
            <p className="text-display-xs text-ink-900">
              {words.map((word, index) => (
                <ManifestoWord
                  key={`${word}-${index}`}
                  word={word}
                  progress={progress}
                  start={Math.min(0.92, index / words.length)}
                  end={Math.min(1, (index + 2.4) / words.length)}
                  reduce={Boolean(reduce)}
                />
              ))}
            </p>

            <div className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-12 sm:gap-8">
              <div className="sm:col-span-5">
                <ImageReveal
                  image={statement.detail}
                  from="left"
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 26vw, 92vw"
                  className="w-full"
                  quality={78}
                />
              </div>

              <div className="flex flex-col sm:col-span-6 sm:col-start-7">
                <div className="flex flex-col gap-5 text-body-md leading-relaxed text-text-body">
                  {statement.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>

                <blockquote className="mt-10 border-t border-line-light pt-7">
                  <p className="font-display text-title-md leading-[1.15] text-ink-900 sm:text-title-lg">
                    “{statement.pullQuote}”
                  </p>
                  <footer className="mt-5 label text-text-muted">
                    The rule on the roastery wall
                  </footer>
                </blockquote>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/about" arrow>
                    Read our story
                  </ButtonLink>
                  <ButtonLink href="/what-we-offer" variant="outline">
                    What we offer
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="mt-16 sm:mt-20">
        <ParallaxImage
          image={statement.band}
          ratio="21 / 8"
          travel={54}
          sizes="100vw"
          reveal
          revealFrom="up"
          className="w-full"
          quality={78}
        />
      </div>
    </Section>
  );
}
