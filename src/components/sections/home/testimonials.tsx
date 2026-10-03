import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/config/home";

/** Three voices. Rotating single-quote carousels read as filler; this does not. */
export function Testimonials() {
  return (
    <Section tone="light" spacing="tight">
      <Container>
        <SectionHeading
          eyebrow="In their words"
          title="What people say when the coffee is finished"
          align="center"
          bodyWidth="wide"
        />

        <Stagger as="ul" className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8" step={0.1}>
          {testimonials.map((entry) => (
            <StaggerItem
              key={entry.name}
              as="li"
              className="flex flex-col gap-6 border-t border-line-light pt-7"
            >
              <blockquote className="text-[1.0625rem] leading-relaxed display-type text-ink-900">
                “{entry.quote}”
              </blockquote>
              <footer className="mt-auto">
                <p className="text-[0.875rem] text-ink-900">{entry.name}</p>
                <p className="mt-1 text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
                  {entry.role}
                </p>
              </footer>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}