import { ParallaxImage } from "@/components/motion/parallax-image";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";
import { Eyebrow } from "@/components/ui/section-heading";
import { heroImages } from "@/config/images";
import { hero } from "@/config/home";

/**
 * Opening frame.
 * ---------------------------------------------------------------------------
 * Asymmetric on purpose: the photograph carries its subject on the left, so the
 * type block sits in the negative space on the right and the "on the bar today"
 * plate anchors the opposite corner. This is the site's first structural
 * decision and everything below it stacks from the same 12-column grid.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-espresso-950 text-cream-100">
      <ParallaxImage
        image={heroImages.primary}
        travel={80}
        priority
        quality={82}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
      />

      {/* Layered scrims: left for the plate card, bottom for the metadata rail. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso-950/92 via-espresso-950/60 to-espresso-950/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso-950 via-espresso-950/55 to-espresso-950/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso-950/70 via-transparent to-espresso-950/30"
      />

      <Container className="relative flex flex-1 flex-col justify-end pb-8 pt-32 lg:pb-10">
        <div className="grid items-end gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Type block — right of the frame's negative space on desktop. */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>

            <h1 className="mt-6 text-display-lg text-cream-100">
              {hero.headline.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <SplitText text={line} delay={0.08 * index + 0.12} durationSeconds={1.05} />
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-[46ch] text-lede text-cream-100/72">{hero.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={hero.primaryCta.href} size="lg" arrow>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} size="lg" variant="inverse">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          {/* Plate card — anchors the opposite corner, stacks last on mobile. */}
          <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-1">
            <div className="w-full max-w-[22rem] border border-cream-100/15 bg-espresso-950/45 p-2 backdrop-blur-md">
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
                <dt className="eyebrow text-cream-100/45">{item.label}</dt>
                <dd className="mt-1.5 text-[0.875rem] text-cream-100/85">{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-[0.24em] text-cream-100/50">
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