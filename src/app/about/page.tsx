import type { Metadata } from "next";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { MarqueeBandDark } from "@/components/sections/marquee-band";
import { PageHeader } from "@/components/sections/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, faqs } from "@/config/about";
import { buildMetadata, faqJsonLd, serialiseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — A Roastery With a Café Attached",
  description:
    "How Espressly started in 2016 with a five-kilo roaster, why we buy four lots a year, how we roast them, and what we can evidence about our footprint.",
  path: "/about",
  image: { src: about.hero.image.src, alt: about.hero.image.alt },
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.hero.eyebrow}
        title={["A roastery that", "happens to have", "a café attached."]}
        body={about.hero.body}
        image={about.hero.image}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }]}
        rail={[
          { label: "Our story", href: "#story" },
          { label: "Values", href: "#values" },
          { label: "Sourcing", href: "#sourcing" },
          { label: "Roasting", href: "#roasting" },
          { label: "People", href: "#people" },
          { label: "FAQ", href: "#faq" },
        ]}
      />

      {/* Story */}
      <Section id="story" tone="light" labelledBy="story-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="story-heading"
                eyebrow={about.story.kicker}
                title="It began because a bag was wrong"
                className="lg:sticky lg:top-[7.5rem]"
                bodyWidth="wide"
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="flex flex-col gap-6 text-body-lg leading-relaxed text-text-body">
                {about.story.body.map((paragraph) => (
                  <Reveal key={paragraph.slice(0, 24)} as="p">
                    {paragraph}
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <blockquote className="mt-12 border-l border-copper-600 pl-6">
                  <p className="text-title-sm leading-snug display-type text-ink-900 sm:text-title-xl">
                    “{about.story.pullQuote}”
                  </p>
                  <footer className="mt-5 text-caption uppercase tracking-[0.18em] text-text-muted">
                    {about.story.attribution}
                  </footer>
                </blockquote>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline on a photographic band */}
      <Section spacing="flush" tone="deeper" className="relative isolate overflow-hidden">
        <ParallaxImage
          image={about.roasting.image}
          ratio="21 / 9"
          travel={64}
          sizes="100vw"
          reveal
          className="w-full opacity-30"
          quality={72}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/90 to-ink-950"
        />

        <Container className="relative py-20 sm:py-28">
          <SectionHeading
            eyebrow="Ten years, compressed"
            title="How the roastery became what it is"
            tone="light"
            className="max-w-[50ch]"
          />

          <Stagger
            as="ol"
            className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
            step={0.07}
          >
            {about.timeline.map((entry) => (
              <StaggerItem
                key={entry.year}
                as="li"
                className="flex flex-col gap-3 border-t border-cream-100/20 pt-5"
              >
                <span className="text-title-sm display-type tabular-nums text-copper-400">
                  {entry.year}
                </span>
                <span className="text-body-sm leading-relaxed text-cream-100/70">
                  {entry.event}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Values */}
      <Section id="values" tone="bright" labelledBy="values-heading">
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="What we hold to"
            title="Four rules that have never been renegotiated"
            align="center"
            bodyWidth="wide"
          />

          <Stagger
            as="ul"
            className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2"
            step={0.08}
          >
            {about.values.map((value) => (
              <StaggerItem
                key={value.index}
                as="li"
                className="flex flex-col gap-4 border-t border-line-light pt-7"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-caption tabular-nums tracking-[0.2em] text-copper-700">
                    {value.index}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-line-light" />
                </div>
                <h3 className="text-title-md leading-snug display-type text-ink-900 sm:text-title-xl">
                  {value.title}
                </h3>
                <p className="max-w-[44ch] text-body leading-relaxed text-text-body">
                  {value.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Sourcing + Roasting, alternating editorial spreads */}
      <MarqueeBandDark />

      <Section id="sourcing" tone="light" labelledBy="sourcing-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SectionHeading
                id="sourcing-heading"
                eyebrow={about.sourcing.eyebrow}
                title={about.sourcing.headline}
                body={about.sourcing.body}
                bodyWidth="wide"
              />
              <Reveal delay={0.08}>
                <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                  {about.sourcing.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body-sm text-text-body">
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
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <ImageReveal
                image={about.sourcing.image}
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

      <Section id="roasting" tone="sand" labelledBy="roasting-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
            <div className="order-2 lg:order-1 lg:col-span-5">
              <ImageReveal
                image={about.roasting.image}
                from="left"
                ratio="1 / 1"
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="w-full"
                quality={78}
              />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
              <SectionHeading
                id="roasting-heading"
                eyebrow={about.roasting.eyebrow}
                title={about.roasting.headline}
                body={about.roasting.body}
                bodyWidth="wide"
              />
              <Reveal delay={0.08}>
                <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                  {about.roasting.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-body-sm text-text-body">
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
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sustainability */}
      <Section tone="deeper">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={about.sustainability.eyebrow}
                title={about.sustainability.headline}
                body={about.sustainability.body}
                tone="light"
              />
              <Reveal delay={0.08}>
                <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                  {about.sustainability.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-body-sm leading-relaxed text-cream-100/70"
                    >
                      <span aria-hidden className="mt-2 size-1 shrink-0 rotate-45 bg-copper-400" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-center">
              <div className="border border-cream-100/15 p-8">
                <p className="text-[clamp(2.75rem,5vw,3.75rem)] leading-none display-type tabular-nums text-cream-100">
                  {about.sustainability.stat.value}
                </p>
                <p className="mt-4 text-body-sm leading-relaxed text-cream-100/65">
                  {about.sustainability.stat.label}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* People */}
      <Section id="people" tone="light" labelledBy="people-heading">
        <Container>
          <SectionHeading
            id="people-heading"
            eyebrow="The people"
            title="Fourteen of us, three of whom you will meet"
            body="The person who roasted your bag is usually the person who pours it. That is not a slogan — it is how a fourteen-person roastery works."
            className="max-w-[58ch]"
          />

          <Stagger
            as="ul"
            className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            step={0.08}
          >
            {about.people.map((person) => (
              <StaggerItem
                key={person.name}
                as="li"
                className="flex flex-col gap-4 border-t border-line-light pt-6"
              >
                <span
                  aria-hidden
                  className="flex size-14 items-center justify-center rounded-pill bg-ink-900 font-sans text-body font-semibold tracking-[0.06em] text-cream-100"
                >
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <h3 className="text-title-sm display-type text-ink-900">{person.name}</h3>
                  <p className="mt-1 text-caption uppercase tracking-[0.18em] text-copper-700">
                    {person.role}
                  </p>
                </div>
                <p className="text-body-sm leading-relaxed text-text-body">{person.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="sand" spacing="default" labelledBy="faq-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="faq-heading"
                eyebrow="Questions"
                title="The six we are asked most"
                className="lg:sticky lg:top-[7.5rem]"
              />
              <ButtonLink href="/contact#form" variant="outline" className="mt-8" arrow>
                Ask something else
              </ButtonLink>
            </div>

            <Stagger as="ul" className="lg:col-span-7 lg:col-start-6" step={0.06}>
              {faqs.map((item) => (
                <StaggerItem
                  key={item.question}
                  as="li"
                  className="border-t border-ink-900/15 py-6 first:border-t-0 first:pt-0"
                >
                  <h3 className="text-title-xs leading-snug display-type text-ink-900 sm:text-title-md">
                    {item.question}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-body leading-relaxed text-text-body">
                    {item.answer}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(faqJsonLd([...faqs])) }}
      />
    </>
  );
}