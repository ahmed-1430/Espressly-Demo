import { Fragment } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Eyebrow } from "@/components/ui/section-heading";
import { bannerImages } from "@/config/images";
import { hero } from "@/config/home";

/**
 * Opening frame.
 * ---------------------------------------------------------------------------
 * The photograph carries its subject on the left, so the composition is built
 * around that: an oversized headline runs almost the full measure in the
 * upper half, the supporting copy and calls to action sit under it on the left,
 * and the "on the bar today" plate anchors the lower right. Below `lg` it
 * recomposes into a single column with the plate last.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-espresso-950 text-cream-100">
      <ParallaxImage
        image={bannerImages.home}
        travel={80}
        priority
        quality={82}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
      />

      {/* Layered scrims: left for the plate card, bottom for the metadata rail. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso-950/94 via-espresso-950/58 to-espresso-950/32"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso-950 via-espresso-950/55 to-espresso-950/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso-950/70 via-transparent to-espresso-950/30"
      />

      <Container className="relative flex flex-1 flex-col justify-end pb-8 pt-28 sm:pt-32 lg:pt-40">
        <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>

        <h1 className="mt-6 max-w-[22ch] text-display-lg text-cream-100 lg:max-w-[none]">
          {hero.headline.map((line, index, all) => (
            <Fragment key={line}>
              <span className="block overflow-hidden pb-[0.06em]">
                <SplitText
                  text={line}
                  delay={0.08 * index + 0.12}
                  durationSeconds={1.05}
                />
              </span>
              {/* Keeps the accessible name readable as sentences. */}
              {index < all.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <div className="mt-14 grid gap-x-10 gap-y-10 lg:grid-cols-12 lg:items-end">
          {/* Copy + calls to action */}
          <div className="lg:col-span-6">
            <p className="max-w-[46ch] text-lede text-cream-100/72">{hero.body}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic strength={7}>
                <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
                  {hero.primaryCta.label}
                </ButtonLink>
              </Magnetic>
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="inverse">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          {/* Plate card — anchors the lower right, stacks last on small screens */}
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="w-full max-w-[21rem] border border-cream-100/15 bg-espresso-950/50 p-2 backdrop-blur-md">
              <div className="flex gap-4">
                <Media
                  image={hero.plate.image}
                  ratio="1 / 1"
                  sizes="112px"
                  quality={72}
                  className="aspect-square w-24 shrink-0 sm:w-28"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 pr-3">
                  <p className="eyebrow text-copper-400">{hero.plate.kicker}</p>
                  <p className="truncate text-[1.125rem] display-type text-cream-100">
                    {hero.plate.name}
                  </p>
                  <p className="text-[0.75rem] uppercase tracking-[0.14em] text-cream-100/55">
                    {hero.plate.meta}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata rail + scroll cue */}
        <div className="mt-12 flex flex-col gap-6 border-t border-cream-100/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <dl className="grid grid-cols-3 gap-x-6 gap-y-3 sm:flex sm:gap-x-12">
            {hero.rail.map((item) => (
              <div key={item.label}>
                <dt className="eyebrow text-cream-100/55">{item.label}</dt>
                <dd className="mt-1.5 text-[0.875rem] text-cream-100/85">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.24em] text-cream-100/55">
            {hero.scrollHint}
            <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-cream-100/20">
              <span className="absolute inset-x-0 top-0 block h-4 bg-copper-400 motion-safe:animate-[scrollcue_2.4s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}