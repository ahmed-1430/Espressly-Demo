import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { pillars } from "@/config/home";

/**
 * Pillars — what makes Espressly different.
 *
 * An editorial index rather than four equal cards: the argument on the left,
 * four numbered rulings on the right. Each row opens on hover, so the section
 * rewards exploration without hiding any of the copy.
 */
export function Pillars() {
  return (
    <Section tone="light">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Why Espressly"
              title={
                <>
                  Four decisions we made early and <em className="text-copper-600">never reversed</em>
                </>
              }
              body="None of these are marketing. They are the reason the coffee tastes the same in February as it does in September."
            />
          </div>

          <Stagger
            as="ul"
            className="border-t border-line-light lg:col-span-7 lg:col-start-6"
            step={0.08}
          >
            {pillars.map((pillar) => (
              <StaggerItem
                key={pillar.index}
                as="li"
                className="group/pillar border-b border-line-light"
              >
                <div className="grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 gap-y-3 py-7 transition-colors duration-300 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-8">
                  <span className="pt-1.5 font-mono text-[0.625rem] tabular-nums tracking-[0.1em] text-copper-600">
                    {pillar.index}
                  </span>

                  <div className="min-w-0">
                    <h3 className="font-display text-title-md leading-tight text-ink-900 transition-colors duration-300 group-hover/pillar:text-copper-600 sm:text-title-lg">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-body-sm leading-relaxed text-text-body">
                      {pillar.body}
                    </p>
                    <p className="mt-4 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-text-muted">
                      {pillar.detail}
                    </p>
                  </div>

                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.3}
                    className="mt-2 size-4 text-ink-900/25 transition-all duration-500 ease-out-expo group-hover/pillar:-translate-y-0.5 group-hover/pillar:translate-x-0.5 group-hover/pillar:text-copper-600"
                  >
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
