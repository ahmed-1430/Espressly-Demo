import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { stats } from "@/config/home";

/**
 * Statistics band.
 *
 * Four figures, no chrome. A proper definition list (dt → dd only, no extra
 * siblings) so screen readers announce each statistic as one unit.
 */
export function StatsBand() {
  return (
    <Section spacing="tight" tone="sand" className="grain">
      <Container>
        <Eyebrow className="justify-center">By the numbers</Eyebrow>

        <Stagger
          as="dl"
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4"
          step={0.08}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="border-t border-ink-900/15 pt-5">
              <dt className="text-body-sm text-ink-900">{stat.label}</dt>
              <dd className="mt-3 flex flex-col gap-2">
                <span className="text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none display-type tabular-nums text-ink-900">
                  {stat.value === 0 ? (
                    <span>Zero</span>
                  ) : (
                    <>
                      <CountUp value={stat.value} />
                      {stat.suffix}
                    </>
                  )}
                </span>
                <span className="text-meta leading-relaxed text-text-muted">
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