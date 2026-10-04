import { CountUp } from "@/components/motion/count-up";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { craft } from "@/config/home";

/**
 * Craft band.
 *
 * A dark, full-bleed editorial band: numbered roast process on one side,
 * parallaxed photography and two hard numbers on the other. No icons, no
 * illustration — the process list and the numbers do the work.
 */
export function CraftBand() {
  return (
    <Section
      spacing="flush"
      tone="deeper"
      className="relative isolate overflow-hidden bg-ink-950"
    >
      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={craft.eyebrow}
              title={craft.headline}
              body={craft.body}
              tone="light"
            />

            <Stagger as="ol" className="mt-12 flex flex-col" step={0.07}>
              {craft.steps.map((step) => (
                <StaggerItem
                  key={step.index}
                  as="li"
                  className="flex items-start gap-6 border-t border-cream-100/12 py-5"
                >
                  <span className="w-8 shrink-0 pt-1 font-sans text-eyebrow tabular-nums tracking-[0.2em] text-copper-400">
                    {step.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-body-lg display-type text-cream-100">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-[46ch] text-body-sm leading-relaxed text-cream-100/60">
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
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="w-full"
              quality={78}
            />

            <Reveal delay={0.1}>
              <dl className="mt-6 grid grid-cols-2 gap-6">
                <div className="border-t border-cream-100/15 pt-5">
                  <dt className="eyebrow text-copper-400">Development</dt>
                  <dd className="mt-3 text-title-3xl display-type tabular-nums text-cream-100">
                    <CountUp value={12} suffix="%" />
                  </dd>
                </div>
                <div className="border-t border-cream-100/15 pt-5">
                  <dt className="eyebrow text-copper-400">Cuppings per batch</dt>
                  <dd className="mt-3 text-title-3xl display-type tabular-nums text-cream-100">
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