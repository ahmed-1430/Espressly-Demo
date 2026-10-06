import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Container, Section } from "@/components/ui/container";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { newsletter } from "@/config/home";

/**
 * Newsletter CTA.
 *
 * The page's one hot surface: an ember band that closes the argument with a
 * single field. Deliberately not full-height — it should feel like the quiet
 * close of the page rather than another section to scroll through.
 */
export function NewsletterCta() {
  return (
    <Section
      id="newsletter"
      tone="ember"
      spacing="tight"
      className="grain relative overflow-hidden"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[7vw] left-1/2 -z-behind -translate-x-1/2 select-none whitespace-nowrap font-display text-[18vw] leading-none tracking-[-0.04em] text-ink-950/[0.06]"
      >
        Stay close
      </span>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="label text-ink-950/60">{newsletter.eyebrow}</p>
            <h2 className="mt-5 text-display-sm text-ink-950">
              Four beans, <em className="italic">one letter</em> a month
            </h2>
            <p className="mt-6 max-w-[44ch] text-body-md leading-relaxed text-ink-950/70">
              {newsletter.body}
            </p>

            <ul className="mt-8 flex flex-col gap-2.5">
              {newsletter.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-body-sm text-ink-950/80">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    className="mt-1 size-3.5 shrink-0"
                  >
                    <path d="m4 12.5 5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-10">
            <Reveal delay={0.1}>
              <NewsletterForm tone="dark" />
            </Reveal>
            <p className="mt-5 max-w-[32ch] font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.12em] text-ink-950/50">
              No offers, no daily send. Unsubscribe in one click.
            </p>
          </div>
        </div>
      </Container>

      <div className="relative mt-14 border-t border-ink-950/15 py-5">
        <Marquee
          items={[
            "Ground to order",
            "Free filter refills",
            "Direct trade",
            "Roasted in small batches",
          ]}
          durationSeconds={30}
          separator={<span aria-hidden className="text-ink-950/40">✳</span>}
          className="font-display text-title-xs italic text-ink-950/70 sm:text-title-sm"
        />
      </div>
    </Section>
  );
}
