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
      tone="deeper"
      className="grain relative isolate overflow-hidden bg-ink-950"
    >
      <Container className="pb-12 pt-20 sm:pt-24 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            eyebrow={signature.eyebrow}
            title={
              <>
                Six drinks we would <em className="text-copper-400">lose sleep</em> over
              </>
            }
            tone="light"
            className="lg:col-span-7"
          />
          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:items-start">
            <p className="max-w-[40ch] text-body leading-relaxed text-cream-100/55">
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
        trackClassName="gap-4 pb-10 sm:gap-5"
      >
        {signatureItems.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}

        <StaggerItem
          as="article"
          className="flex h-full w-[78vw] shrink-0 snap-start items-center justify-center border border-cream-100/12 bg-copper-500 p-8 text-ink-950 sm:w-[23rem] lg:w-[24rem]"
        >
          <div className="max-w-[26ch]">
            <p className="label text-ink-950/60">Also on the board</p>
            <p className="mt-5 font-display text-title-md leading-[1.12] text-ink-950">
              Nineteen more, and every one of them is rewritten when the season
              turns.
            </p>
            <ButtonLink
              href="/menu"
              variant="solid"
              size="sm"
              className="mt-7 border-ink-950 bg-ink-950 text-paper-25 hover:border-ink-950 hover:bg-paper-25 hover:text-ink-950"
              arrow
            >
              Open the menu
            </ButtonLink>
          </div>
        </StaggerItem>
      </ScrollRail>
    </Section>
  );
}
