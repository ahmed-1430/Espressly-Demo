import { MenuCard } from "@/components/cards/menu-card";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { signature } from "@/config/home";
import { menuCategories } from "@/config/menu";

/** Signature drinks pulled straight from the menu data — one source of truth. */
const signatureItems = menuCategories
  .flatMap((category) => category.items)
  .filter((item) => item.signature)
  .slice(0, 6);

/**
 * Signature rail.
 *
 * Desktop: pinned horizontal track driven by vertical scroll. Mobile: a
 * swipeable, snap-aligned rail — vertical scroll is never hijacked on touch.
 */
export function SignatureDrinks() {
  return (
    <Section
      spacing="flush"
      tone="dark"
      className="relative isolate bg-gradient-to-b from-espresso-900 via-espresso-900 to-ink-950"
    >
      <Container className="pb-12 pt-20 sm:pt-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow={signature.eyebrow}
            title={signature.headline}
            className="lg:col-span-8"
          />
          <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end lg:text-right">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-cream-100/65">
              {signature.body}
            </p>
            <ButtonLink href={signature.cta.href} variant="inverse" arrow>
              {signature.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <ScrollRail
        progress
        progressClassName="text-cream-100"
        ariaLabel="Signature drinks"
        trackClassName="gap-5 pb-10"
      >
        {signatureItems.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}

        <StaggerItem
          as="article"
          className="flex h-full w-[78vw] shrink-0 snap-start items-center justify-center border border-cream-100/15 p-8 text-center sm:w-[24rem] lg:w-[26rem]"
        >
          <div className="max-w-[30ch]">
            <p className="eyebrow text-copper-400">Also on the board</p>
            <p className="mt-5 text-[1.375rem] leading-snug display-type text-cream-100">
              Nineteen more, and every one of them is rewritten when the season
              turns.
            </p>
            <ButtonLink href="/menu" variant="inverse" size="sm" className="mt-7" arrow>
              Open the menu
            </ButtonLink>
          </div>
        </StaggerItem>
      </ScrollRail>
    </Section>
  );
}