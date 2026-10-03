import { ProductCard } from "@/components/cards/product-card";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProducts } from "@/config/products";

/** Editorial product preview: one lead card plus a stacked pair. */
export function FeaturedProducts() {
  const [lead, ...rest] = featuredProducts;

  return (
    <Section tone="light">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Take it home"
            title="The four things most people order twice"
            body="Roasted the week it is ordered, ground to your brewer at no cost, and shipped in plastic-free packaging."
            className="sm:max-w-[54ch]"
          />
          <ButtonLink href="/shop" variant="outline" className="shrink-0" arrow>
            All ten products
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-x-7 gap-y-14 lg:mt-16 lg:grid-cols-3">
          {lead ? (
            <Reveal className="lg:col-span-3">
              <ProductCard
                product={lead}
                variant="feature"
                sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 55vw, 92vw"
                className="gap-8"
              />
            </Reveal>
          ) : null}

          {rest.slice(0, 3).map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              sizes="(min-width: 1024px) 30vw, 92vw"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}