import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { Container, Section } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { shopImages } from "@/config/images";
import { buildMetadata, serialiseJsonLd } from "@/lib/seo";
import { products } from "@/config/products";

export const metadata: Metadata = buildMetadata({
  title: "Shop — Coffee, Gear & Gift Collections",
  description:
    "Roasted-to-order coffee, the brewing gear we actually use behind the bar, and hand-assembled gift collections. Ground to your brewer at no extra charge.",
  path: "/shop",
  image: { src: shopImages.banner.src, alt: shopImages.banner.alt },
});

const promises = [
  {
    title: "Roasted the week you order",
    body: "Nothing sits. Every bag is dated, rested for four days, then dispatched — so what you drink is what you bought.",
  },
  {
    title: "Ground to your brewer",
    body: "Tell us the machine and we grind for it. Filter, espresso or cafetière — no charge, no guesswork.",
  },
  {
    title: "Plastic-free packing",
    body: "Letterbox-friendly cartons, compostable inner bags and a hand-written card from the roaster who pulled your batch.",
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={["Take the roastery", "home with you."]}
        body="Whole bean or ground to your brewer, roasted the week it is ordered and posted in plastic-free packaging. The gear list is short and opinionated — everything on it gets used daily behind the bar."
        image={shopImages.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }]}
        meta={[
          { label: "Products", value: `${products.length} in the range` },
          { label: "Dispatch", value: "Within 48 hours" },
          { label: "Grinding", value: "Free, always" },
        ]}
        rail={[
          { label: "Coffee", href: "#coffee" },
          { label: "Gear", href: "#gear" },
          { label: "Collections", href: "#collections" },
        ]}
      />

      <Section tone="light" spacing="default">
        <Container>
          <ShopBrowser />
        </Container>
      </Section>

      {/* Standing promises */}
      <Section tone="sand" spacing="tight">
        <Container>
          <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="How we ship"
                title="Three promises we will put in writing"
                className="lg:sticky lg:top-[7rem]"
              />
            </div>
            <StaggeredPromises />
          </div>
        </Container>
      </Section>

      {/* Wholesale hand-off */}
      <Section tone="dark">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Buying for a kitchen?"
                title="Wholesale is a different conversation"
                body="A dedicated roast profile, ground to your machine, delivered on a schedule that fits your morning — and a barista who visits when your team changes."
                tone="light"
              />
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
              <ButtonLink href="/what-we-offer" arrow>
                See what we offer
              </ButtonLink>
              <ButtonLink href="/contact#form" variant="inverse">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialiseJsonLd({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Espressly coffee and gear",
            numberOfItems: products.length,
            itemListElement: products.slice(0, 6).map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://www.espressly.coffee/shop/${product.slug}`,
              name: product.name,
            })),
          }),
        }}
      />
    </>
  );
}

function StaggeredPromises() {
  return (
    <ul className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
      {promises.map((promise, index) => (
        <Reveal key={promise.title} delay={index * 0.08}>
          <li className="border-t border-ink-900/15 pt-5">
            <p className="text-[1.125rem] leading-snug display-type text-ink-900">
              {promise.title}
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-text-body">
              {promise.body}
            </p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}