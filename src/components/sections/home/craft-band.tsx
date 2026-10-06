import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { craft } from "@/config/home";

/**
 * Craft band.
 *
 * A dark, full-bleed editorial band: the roast timeline on one side,
 * parallaxed photography and two hard numbers on the other. No icons, no
 * illustration — the process and the numbers do the work.
 */
export function CraftBand() {
  return (
    <Section
      spacing="flush"
      tone="deeper"
      className="grain relative isolate overflow-hidden bg-ink-950"
    >
      <span
        aria-hidden
        className="text-stroke pointer-events-none absolute -bottom-[5vw] -left-[4vw] select-none font-display text-[22vw] leading-none tracking-[-0.05em]"
      >
        12h
      </span>

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={craft.eyebrow}
              title={
                <>
                  Twelve hours from green to <em className="text-copper-400">cup</em>
                </>
              }
              body={craft.body}
              tone="light"
            />

            <Stagger as="ol" className="mt-12 flex flex-col border-t border-cream-100/12" step={0.07}>
              {craft.steps.map((step) => (
                <StaggerItem
                  key={step.index}
                  as="li"
                  className="group/step grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-cream-100/12 py-5"
                >
                  <span className="pt-0.5 font-mono text-[0.625rem] tabular-nums tracking-[0.1em] text-copper-400">
                    {step.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-title-xs text-cream-100 transition-colors duration-300 group-hover/step:text-copper-300">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-[44ch] text-body-sm leading-relaxed text-cream-100/50">
                      {step.copy}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ParallaxImage
              image={craft.image}
              ratio="4 / 5"
              travel={64}
              reveal
              revealFrom="right"
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="w-full"
              quality={80}
            />

            <Reveal delay={0.1}>
              <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-cream-100/12 pt-6">
                <div>
                  <dt className="label text-copper-400">Development</dt>
                  <dd className="mt-2 font-display text-title-xl tabular-nums text-cream-100">
                    <CountUp value={12} suffix="%" />
                  </dd>
                </div>
                <div>
                  <dt className="label text-copper-400">Cuppings per batch</dt>
                  <dd className="mt-2 font-display text-title-xl tabular-nums text-cream-100">
                    <CountUp value={2} />
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
