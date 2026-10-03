import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { pillars } from "@/config/home";
import { cn } from "@/lib/cn";

/**
 * Pillars — what makes Espressly different.
 *
 * A 12-column asymmetric grid rather than four equal cards: the first pillar
 * takes a double column so the section opens with hierarchy instead of a flat
 * four-across band.
 */
export function Pillars() {
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <SectionHeading
            eyebrow="Why Espressly"
            title="Four decisions we made early and never reversed"
            body="None of these are marketing. They are the reason the coffee tastes the same in February as it does in September."
            className="lg:col-span-5"
          />

          <Stagger
            as="ul"
            className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:gap-y-14"
            step={0.08}
          >
            {pillars.map((pillar, index) => (
              <StaggerItem
                key={pillar.index}
                as="li"
                className={cn(
                  "flex flex-col gap-4 border-t border-line-light pt-6",
                  index === 0 && "sm:col-span-2",
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-sans text-[0.75rem] tabular-nums tracking-[0.2em] text-copper-700">
                    {pillar.index}
                  </span>
                  <span className="h-px flex-1 bg-line-light" aria-hidden />
                </div>

                <h3 className="text-[1.375rem] leading-snug display-type text-ink-900 sm:text-[1.625rem]">
                  {pillar.title}
                </h3>
                <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-text-body">
                  {pillar.body}
                </p>
                <p className="mt-auto text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
                  {pillar.detail}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}