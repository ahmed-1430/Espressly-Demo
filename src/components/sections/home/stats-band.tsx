import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { stats } from "@/config/home";

/**
 * Statistics band.
 *
 * Four figures, no chrome. A proper definition list (dt → dd only) so screen
 * readers announce each statistic as one unit.
 */
export function StatsBand() {
  return (
    <Section spacing="tight" tone="sand" className="grain">
      <Container>
        <div className="flex flex-col gap-3 border-b border-ink-900/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <Eyebrow>By the numbers</Eyebrow>
          <p className="max-w-[34ch] text-body-sm leading-relaxed text-text-muted">
            The numbers we actually run the roastery by, not the ones that look
            good on a slide.
          </p>
        </div>

        <Stagger
          as="dl"
          className="grid grid-cols-2 gap-x-6 gap-y-10 pt-8 sm:gap-x-10 lg:grid-cols-4"
          step={0.08}
        >
          {stats.map((stat, index) => (
            <StaggerItem
              key={stat.label}
              className={index > 0 ? "lg:border-l lg:border-ink-900/15 lg:pl-8" : ""}
            >
              <dt className="label text-copper-700">{stat.label}</dt>
              <dd className="mt-4 flex flex-col gap-3">
                <span className="font-display text-display-sm leading-[0.9] tabular-nums text-ink-900">
                  {stat.value === 0 ? (
                    <span className="italic">Zero</span>
                  ) : (
                    <>
                      <CountUp value={stat.value} />
                      <span className="text-copper-600">{stat.suffix}</span>
                    </>
                  )}
                </span>
                <span className="max-w-[24ch] text-body-sm leading-relaxed text-text-muted">
                  {stat.detail}
                </span>
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
