import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { primaryNav } from "@/config/navigation";

export const metadata = {
  title: "Page not found — Espressly",
  description:
    "That page has moved or never existed. Here is the way back to the coffee.",
};

/**
 * 404.
 *
 * Light, typographic and useful: the missing address is the artwork, and the
 * real navigation is offered immediately rather than after an apology.
 */
export default function NotFound() {
  return (
    <Section
      spacing="flush"
      tone="bright"
      className="grain relative flex min-h-svh items-center overflow-hidden pb-20 pt-28 sm:pt-32"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[6vw] top-1/2 -z-behind hidden -translate-y-1/2 select-none font-display text-[34vw] leading-none tracking-[-0.06em] text-ink-900/[0.035] lg:block"
      >
        404
      </span>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Error 404</Eyebrow>
            <p
              aria-hidden
              className="mt-6 font-display text-display-xl leading-[0.8] tracking-[-0.05em] text-copper-500"
            >
              404
            </p>
            <h1 className="mt-4 max-w-[16ch] text-display-sm text-ink-900">
              This page has been drunk and forgotten.
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] text-body-md leading-relaxed text-text-body">
              The link you followed does not exist any more. The coffee, the
              menu and the roastery are all still exactly where you left them.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/" size="lg" arrow>
                Back to the bar
              </ButtonLink>
              <ButtonLink href="/menu" size="lg" variant="outline">
                See the menu
              </ButtonLink>
            </div>

            <nav aria-label="Site sections" className="mt-10 border-t border-line-light pt-5">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {primaryNav.slice(1).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted transition-colors duration-300 hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </Section>
  );
}
