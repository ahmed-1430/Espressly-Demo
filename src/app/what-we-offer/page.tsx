import type { Metadata } from "next";
import { ServiceGrid } from "@/components/cards/service-card";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ScrollRail } from "@/components/motion/scroll-rail";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { bannerImages, serviceImages } from "@/config/images";
import { serviceBands, serviceChapters, services } from "@/config/services";
import { buildMetadata, breadcrumbJsonLd, serialiseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "What We Offer — Wholesale, Events, Workshops & Gifts",
  description:
    "Espressly supplies hotels, restaurants and offices with a coffee programme rather than a bag of beans, and runs private tastings, mobile catering bars and barista workshops.",
  path: "/what-we-offer",
  image: { src: bannerImages.services.src, alt: bannerImages.services.alt },
});

export default function WhatWeOfferPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we offer"
        title={["Six ways to", "work with Espressly."]}
        body="The café is one of them, not the whole of it. We also roast for other kitchens, travel with a bar, teach the craft and assemble gifts by hand."
        image={bannerImages.services}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "What We Offer", href: "/what-we-offer" },
        ]}
        rail={services.map((service) => ({
          label: service.title,
          href: `#${service.id}`,
        }))}
      />

      {/* Numbered services — the page's spine */}
      <Section tone="light">
        <Container>
          <SectionHeading
            eyebrow="The list"
            title="Everything we do, in the order we would recommend it"
            body="Six offerings, each with a named person attached. No tiers, no packages, no sales process to sit through."
            className="max-w-[62ch]"
          />

          <ServiceGrid services={services} className="mt-16 lg:mt-24" />
        </Container>
      </Section>

      {/* Sticky chapters — how a wholesale programme actually runs */}
      <Section tone="dark" className="relative isolate overflow-hidden">
        <ParallaxImage
          image={serviceImages.bar}
          ratio="21 / 9"
          travel={70}
          sizes="100vw"
          reveal
          className="w-full opacity-45"
          quality={72}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-espresso-900 via-espresso-900/85 to-ink-950"
        />

        <Container className="relative py-20 sm:py-28 lg:py-36">
          <SectionHeading
            eyebrow="How it works"
            title="Three chapters of a coffee programme"
            body="Whether it is one filter or forty outlets, the sequence is the same — and it starts long before any equipment is ordered."
            tone="light"
            className="max-w-[58ch]"
          />

          <Stagger
            as="ol"
            className="mt-14 grid gap-x-10 gap-y-12 lg:mt-20 lg:grid-cols-3"
            step={0.1}
          >
            {serviceChapters.map((chapter) => (
              <StaggerItem key={chapter.id} as="li" className="flex flex-col gap-5">
                <ImageReveal
                  image={chapter.image}
                  from="up"
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  className="w-full"
                  quality={76}
                />
                <div className="flex items-baseline gap-4">
                  <span className="text-[0.75rem] tabular-nums tracking-[0.24em] text-copper-400">
                    {chapter.number}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-cream-100/20" />
                </div>
                <h3 className="text-[1.375rem] leading-snug display-type text-cream-100 sm:text-[1.625rem]">
                  {chapter.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-cream-100/65">
                  {chapter.copy}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Horizontal programmes */}
      <Section tone="bright" spacing="flush">
        <div className="pt-20 sm:pt-28">
          <Container>
            <SectionHeading
              eyebrow="Programmes"
              title="Built around how you actually operate"
              body="Two recurring briefs. Both start with a conversation and end with something your team can run without us."
            />
          </Container>
        </div>

        <ScrollRail
          progress
          progressClassName="text-ink-900"
          trackClassName="gap-6 pb-10 pt-10"
        >
          {serviceBands.map((band) => (
            <StaggerItem
              key={band.id}
              as="article"
              className="flex h-full w-[86vw] shrink-0 snap-start flex-col justify-between gap-8 border border-line-light bg-paper-25 p-7 sm:w-[32rem] lg:w-[38rem] lg:p-10"
            >
              <div className="flex flex-col gap-5">
                <p className="eyebrow text-copper-700">{band.kicker}</p>
                <h3 className="text-[1.5rem] leading-tight display-type text-ink-900 sm:text-[1.875rem]">
                  {band.title}
                </h3>
                <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-text-body">
                  {band.copy}
                </p>
              </div>

              <ul className="grid gap-2.5 border-t border-line-light pt-6 text-[0.875rem] text-text-body">
                {band.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45 bg-copper-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}

          <StaggerItem
            as="article"
            className="flex h-full w-[86vw] shrink-0 snap-start flex-col justify-center gap-6 bg-espresso-900 p-7 text-center sm:w-[32rem] lg:w-[38rem] lg:p-10"
          >
            <p className="eyebrow text-copper-400">Next step</p>
            <p className="text-[1.5rem] leading-snug display-type text-cream-100 sm:text-[1.875rem]">
              Tell us what you are trying to fix, and we will tell you whether
              we are the right people for it.
            </p>
            <ButtonLink href="/contact#form" variant="inverse" className="mx-auto" arrow>
              Start a conversation
            </ButtonLink>
          </StaggerItem>
        </ScrollRail>
      </Section>

      {/* Events anchor — the page's most requested offering gets a full block */}
      <Section id="events" tone="light" labelledBy="events-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                id="events-heading"
                eyebrow="Private events"
                title="A buy-out that starts with a tasting flight, not a canapés menu"
                body="Six to forty guests, the whole room, and a menu built around whatever is on the roast schedule that week. No shared tables, no music you did not choose, and you leave with the coffee."
                className="max-w-[54ch]"
              />

              <Reveal delay={0.1}>
                <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                  {services
                    .find((service) => service.id === "private-events")
                    ?.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.875rem] text-text-body">
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          className="mt-1 size-3.5 shrink-0 text-copper-600"
                        >
                          <path
                            d="m4 12.5 5 5L20 6.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href="/contact#form" arrow>
                    Check a date
                  </ButtonLink>
                  <ButtonLink href="/menu" variant="outline">
                    See the drinks
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <ImageReveal
                image={serviceImages.events}
                from="right"
                ratio="4 / 5"
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="w-full"
                quality={78}
              />
            </div>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialiseJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "What We Offer", path: "/what-we-offer" },
            ]),
          ),
        }}
      />
    </>
  );
}