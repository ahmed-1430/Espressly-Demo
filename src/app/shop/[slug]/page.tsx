import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ProductActions } from "@/components/shop/product-actions";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProduct, products } from "@/config/products";
import { buildMetadata, productJsonLd, serialiseJsonLd } from "@/lib/seo";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found — Espressly" };

  return buildMetadata({
    title: `${product.name} — Espressly Shop`,
    description: `${product.description} ${product.story.slice(0, 90)}…`,
    path: `/shop/${product.slug}`,
    image: { src: product.image.src, alt: product.image.alt },
    type: "website",
  });
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  const specs = [
    { label: "Origin", value: product.origin },
    { label: "Roast", value: product.roast },
    { label: "Process", value: product.process },
    { label: "Altitude", value: product.altitude },
    { label: "Size", value: product.weight },
  ].filter((spec) => Boolean(spec.value));

  return (
    <>
      <Section tone="light" spacing="default" className="pt-32 sm:pt-36">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
              <li>
                <Link href="/shop" className="transition-colors hover:text-ink-900">
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink-900">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <ImageReveal
                image={product.image}
                from="up"
                ratio="1 / 1"
                sizes="(min-width: 1024px) 56vw, 92vw"
                priority
                className="w-full"
                quality={82}
              />
              {product.hoverImage ? (
                <div className="mt-6 hidden lg:block">
                  <ImageReveal
                    image={product.hoverImage}
                    from="left"
                    ratio="16 / 9"
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className="w-full"
                    quality={78}
                  />
                </div>
              ) : null}
            </div>

            {/* Buy box */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[7rem]">
                <div className="flex flex-wrap items-center gap-3">
                  {product.badge ? <Badge tone="copper">{product.badge}</Badge> : null}
                  <span className="text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
                    {product.weight}
                  </span>
                </div>

                <h1 className="mt-5 text-display-xs text-ink-900">{product.name}</h1>

                <p className="mt-5 text-[1rem] leading-relaxed text-text-body">
                  {product.description}
                </p>

                <ProductActions product={product} className="mt-8" />

                <dl className="mt-9 border-t border-line-light">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line-light py-3.5"
                    >
                      <dt className="text-[0.75rem] uppercase tracking-[0.18em] text-text-muted">
                        {spec.label}
                      </dt>
                      <dd className="text-right text-[0.875rem] text-ink-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-8 flex flex-col gap-3">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-[0.875rem] text-text-body">
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
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="mt-20 grid gap-x-12 gap-y-10 border-t border-line-light pt-16 lg:mt-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="The story" title="Why we make it this way" />
            </div>
            <Reveal className="lg:col-span-7 lg:col-start-6">
              <p className="text-[1.0625rem] leading-relaxed text-text-body">
                {product.story}
              </p>
              <p className="mt-6 text-[0.875rem] leading-relaxed text-text-muted">
                Roasted on the old quay and posted within 48 hours. Tell us your
                brewer at checkout and we will grind for it — there is no charge
                and no guesswork.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 ? (
        <Section tone="bright" spacing="default">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Also on the shelf"
                title="You might want these next"
                className="sm:max-w-[46ch]"
              />
              <Link
                href="/shop"
                className="shrink-0 text-[0.8125rem] uppercase tracking-[0.18em] text-ink-900"
              >
                <span className="link-wipe">Back to the shop</span>
              </Link>
            </div>

            <ul className="mt-12 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} as="li" delay={index * 0.07}>
                  <MediaLink product={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialiseJsonLd(
            productJsonLd({
              name: product.name,
              description: product.description,
              image: product.image.src,
              url: `${site.url}/shop/${product.slug}`,
              priceMinor: product.price,
            }),
          ),
        }}
      />
    </>
  );
}

function MediaLink({ product }: { product: (typeof products)[number] }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group/rel block">
      <ImageReveal
        image={product.image}
        from="up"
        ratio="1 / 1"
        sizes="(min-width: 1024px) 30vw, 90vw"
        className="w-full"
        quality={76}
      />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-[1.0625rem] display-type text-ink-900 transition-colors duration-300 group-hover/rel:text-copper-700">
          {product.name}
        </h3>
        <span className="text-[0.875rem] tabular-nums text-text-muted">
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: site.currency,
          }).format(product.price / 100)}
        </span>
      </div>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-text-muted">
        {product.description}
      </p>
    </Link>
  );
}