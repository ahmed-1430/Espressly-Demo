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
 * Dark espresso page so it matches the arrival state of every other route, and
 * it offers real navigation rather than an apology.
 */
export default function NotFound() {
  return (
    <Section
      spacing="flush"
      tone="deeper"
      className="flex min-h-[86svh] items-center bg-ink-950"
    >
      <Container className="py-32 text-center">
        <Eyebrow tone="light" className="justify-center">
          Error 404
        </Eyebrow>

        <p
          aria-hidden
          className="mt-8 text-display-lg leading-none display-type text-cream-100/[0.14]"
        >
          404
        </p>

        <h1 className="mx-auto mt-2 max-w-[20ch] text-display-2xs text-cream-100">
          This page has been drunk and forgotten
        </h1>

        <p className="mx-auto mt-6 max-w-[52ch] text-lede text-cream-100/65">
          The link you followed does not exist any more. Here is the way back to
          something warm.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/" size="lg" arrow>
            Back to the bar
          </ButtonLink>
          <ButtonLink href="/menu" size="lg" variant="inverse">
            See the menu
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-16 border-t border-cream-100/12 pt-8">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {primaryNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.8125rem] uppercase tracking-[0.18em] text-cream-100/55 transition-colors duration-400 hover:text-cream-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}