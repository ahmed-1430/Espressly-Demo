import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { newsletter } from "@/config/home";

/**
 * Newsletter CTA.
 *
 * Oversized display headline, a short list of what the letter contains, and a
 * single field. Deliberately not a full-height band — it should feel like the
 * quiet close to the page rather than another section to scroll through.
 */
export function NewsletterCta() {
  return (
    <Section tone="light" className="relative overflow-hidden">
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{newsletter.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-display-sm text-ink-900">
              <span className="block overflow-hidden pb-[0.06em]">
                <SplitText text={newsletter.headline} />
              </span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-lede text-text-body">{newsletter.body}</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <ul className="flex flex-col gap-3">
              {newsletter.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-[0.9375rem] text-text-body">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    className="mt-1 size-3.5 shrink-0 text-copper-600"
                  >
                    <path d="m4 12.5 5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <div className="mt-8">
                <NewsletterForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <div className="mt-16 border-t border-line-light py-5 text-text-muted sm:mt-20">
        <Marquee
          items={[
            "Ground to order",
            "Free filter refills",
            "Direct trade",
            "Roasted in small batches",
          ]}
          durationSeconds={30}
          className="font-sans text-[0.75rem] uppercase tracking-[0.24em] text-text-muted"
        />
      </div>
    </Section>
  );
}