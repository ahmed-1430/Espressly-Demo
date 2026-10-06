import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/config/home";

/** Three voices, set as a numbered correspondence rather than a carousel. */
export function Testimonials() {
  return (
    <Section tone="light" spacing="tight">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow="In their words"
            title={
              <>
                What people say when the coffee is <em className="text-copper-600">finished</em>
              </>
            }
            className="lg:col-span-6"
          />
          <p className="max-w-[38ch] text-body-sm leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            No review widget, no stars. Three notes from people who come back,
            printed as they were sent.
          </p>
        </div>

        <Stagger as="ul" className="mt-12 grid gap-px bg-line-light lg:grid-cols-3" step={0.1}>
          {testimonials.map((entry, index) => (
            <StaggerItem
              key={entry.name}
              as="li"
              className="group/quote flex flex-col bg-cream-100 p-6 transition-colors duration-500 hover:bg-paper-50 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-title-xl italic leading-none text-copper-500">
                  “
                </span>
                <span className="font-mono text-[0.5625rem] tabular-nums tracking-[0.12em] text-text-muted">
                  {String(index + 1).padStart(2, "0")} / 03
                </span>
              </div>

              <blockquote className="mt-4 flex-1 text-body-md leading-relaxed text-ink-900">
                {entry.quote}
              </blockquote>

              <footer className="mt-8 flex items-center gap-3 border-t border-line-light pt-4">
                <span className="flex size-8 items-center justify-center rounded-full bg-ink-900 font-mono text-[0.5625rem] uppercase tracking-[0.08em] text-paper-25">
                  {entry.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-body-sm text-ink-900">{entry.name}</span>
                  <span className="mt-0.5 block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-text-muted">
                    {entry.role}
                  </span>
                </span>
              </footer>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
