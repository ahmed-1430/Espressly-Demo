import type { Metadata } from "next";
import { MenuList } from "@/components/cards/menu-card";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { CategoryRail } from "@/components/navigation/category-rail";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { bannerImages, menuImages } from "@/config/images";
import { menuCategories, menuHighlights } from "@/config/menu";
import { buildMetadata, menuJsonLd, serialiseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Menu — Espresso, Filter, Cold Brew & Kitchen",
  description:
    "The full Espressly board: espresso and milk drinks, rotating single-origin filter, eighteen-hour cold brew, whole-leaf tea and a laminated pastry case baked twice a day.",
  path: "/menu",
  image: { src: bannerImages.menu.src, alt: bannerImages.menu.alt },
});

const categoryIds = menuCategories.map((category) => category.id);

export default function MenuPage() {
  const itemCount = menuCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <>
      <PageHeader
        eyebrow="Our menu"
        title={["Short by design.", "Rewritten every season."]}
        body="Nineteen drinks and five things from the oven. Everything else on the board is a question about what is best that week, not a fixed line item."
        image={bannerImages.menu}
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Menu", href: "/menu" }]}
        meta={[
          { label: "Items", value: `${itemCount} on the board` },
          { label: "Filter", value: "Free refills" },
          { label: "Milk", value: "Alternatives free" },
        ]}
        rail={[
          { label: "Espresso", href: "#espresso" },
          { label: "Milk & cold", href: "#milk" },
          { label: "Filter", href: "#filter" },
          { label: "Tea", href: "#tea-and-not-tea" },
          { label: "Kitchen", href: "#kitchen" },
        ]}
      />

      <CategoryRail ids={categoryIds} />

      {/* Standing promises */}
      <Section spacing="tight" tone="bright">
        <Container>
          <Reveal>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-3">
              {menuHighlights.map((highlight) => (
                <div key={highlight.id} className="border-t border-line-light pt-5">
                  <dt className="eyebrow text-copper-700">{highlight.label}</dt>
                  <dd className="mt-3 flex flex-col gap-2">
                    <span className="text-[1.125rem] display-type text-ink-900">
                      {highlight.value}
                    </span>
                    <span className="text-[0.8125rem] leading-relaxed text-text-muted">
                      {highlight.detail}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Categories */}
      {menuCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          tone={index % 2 === 0 ? "light" : "bright"}
          labelledBy={`${category.id}-heading`}
        >
          <Container>
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionHeading
                  as="h2"
                  id={`${category.id}-heading`}
                  eyebrow={`${String(index + 1).padStart(2, "0")} / ${category.label}`}
                  title={category.label}
                  body={category.intro}
                  className="lg:sticky lg:top-[9rem]"
                  bodyWidth="wide"
                />

                {category.items.some((item) => item.image) ? (
                  <Reveal delay={0.1} className="mt-8 hidden lg:block">
                    <ImageReveal
                      image={
                        category.items.find((item) => item.image)?.image ?? menuImages.counter
                      }
                      from="left"
                      ratio="4 / 3"
                      sizes="(min-width: 1024px) 32vw, 92vw"
                      className="w-full"
                      quality={74}
                    />
                  </Reveal>
                ) : null}
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <MenuList items={category.items} />
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* Closing band */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Take it home"
                title="Whichever of these you liked, we roast it every week"
                body="Order ahead from the bar or browse the retail range — whole bean or ground to your brewer, roasted the week it is ordered."
                tone="light"
              />
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <ButtonLink href="/shop" arrow>
                Shop the coffee
              </ButtonLink>
              <ButtonLink href="/what-we-offer" variant="inverse">
                Catering & events
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" tone="bright">
        <Container>
          <div className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>Still deciding?</Eyebrow>
            <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-text-body">
              Order ahead from the menu page and skip the counter entirely — it
              is the fastest way to a coffee that is still hot when you reach
              the door.
            </p>
            <ButtonLink href="/contact" variant="outline" arrow>
              Ask us anything
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(menuJsonLd()) }}
      />
    </>
  );
}