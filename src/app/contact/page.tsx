import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { SocialLinkList } from "@/components/brand/social-icon";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { bannerImages } from "@/config/images";
import { contactCopy } from "@/config/contact";
import { contact, hours } from "@/config/site";
import { socialLinks } from "@/config/navigation";
import { buildMetadata, breadcrumbJsonLd, serialiseJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Visit the Roastery or Send a Message",
  description:
    "Find the Espressly roastery on the old quay, check opening hours, or send the team a message about wholesale, events, workshops and catering.",
  path: "/contact",
  image: { src: bannerImages.contact.src, alt: bannerImages.contact.alt },
});

export default function ContactPage() {
  const todayIndex = new Date().getUTCDay();
  const todayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
    todayIndex
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={["Come and find us,", "or just say hello."]}
        body={contactCopy.hero.body}
        image={bannerImages.contact}
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact" }]}
        meta={[
          { label: "Roastery", value: contact.address.locality },
          { label: "Phone", value: contact.phone },
          { label: "Open from", value: hours[0].label.split(" ")[0] },
        ]}
        rail={[
          { label: "Find us", href: "#visit" },
          { label: "Opening hours", href: "#hours" },
          { label: "Send a message", href: "#form" },
        ]}
      />

      {/* Visit + hours */}
      <Section id="visit" tone="light" labelledBy="visit-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="visit-heading"
                eyebrow={contactCopy.visit.kicker}
                title={contactCopy.visit.title}
                body={contactCopy.visit.body}
                bodyWidth="wide"
              />

              <Reveal delay={0.08}>
                <address className="mt-8 flex flex-col gap-1 text-body not-italic text-text-body">
                  <span>{contact.address.street}</span>
                  <span>
                    {contact.address.locality}, {contact.address.region}
                  </span>
                  <span>{contact.address.postalCode}</span>
                  <span>{contact.address.countryName}</span>
                </address>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={`tel:${contact.phoneHref}`} variant="outline" size="sm">
                    Call {contact.phone}
                  </ButtonLink>
                  <ButtonLink href={`mailto:${contact.email}`} variant="outline" size="sm">
                    Email us
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-line-light pt-8 sm:grid-cols-2">
                  {contactCopy.visit.directions.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="text-eyebrow uppercase tracking-[0.2em] text-copper-700">
                        {item.label}
                      </dt>
                      <dd className="text-body-sm leading-relaxed text-text-body">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Map placeholder */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="relative overflow-hidden bg-sand-100">
                <ImageReveal
                  image={bannerImages.contact}
                  from="right"
                  ratio="4 / 3"
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="w-full"
                  quality={74}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-ink-950/45"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-pill border border-cream-100/50 text-cream-100"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-5">
                      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.4" />
                    </svg>
                  </span>
                  <p className="max-w-[28ch] text-body-sm leading-relaxed text-cream-100/85">
                    {contactCopy.visit.mapNote}
                  </p>
                  <ButtonLink
                    href={`https://www.openstreetmap.org/?mlat=${contact.coordinates.latitude}&mlon=${contact.coordinates.longitude}#map=16/${contact.coordinates.latitude}/${contact.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="inverse"
                    size="sm"
                    arrow
                  >
                    Open in maps
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hours */}
      <Section id="hours" tone="sand" spacing="tight" labelledBy="hours-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="hours-heading"
                eyebrow="Opening hours"
                title={contactCopy.hoursTitle}
                className="lg:sticky lg:top-[7.5rem]"
              />
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="border-t border-ink-900/15">
                {hours.map((row) => {
                  const isToday = row.days.includes(todayName);
                  return (
                    <div
                      key={row.days}
                      className="flex items-baseline justify-between gap-6 border-b border-ink-900/15 py-5"
                    >
                      <dt className="flex items-center gap-3 text-body text-ink-900">
                        {row.days}
                        {isToday ? (
                          <span className="rounded-pill bg-copper-600/12 px-2 py-0.5 text-micro font-semibold uppercase tracking-[0.16em] text-copper-700">
                            Today
                          </span>
                        ) : null}
                      </dt>
                      <dd className="tabular-nums text-body text-text-body">{row.label}</dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-5 text-meta text-text-muted">
                {contactCopy.hoursNote}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section id="form" tone="light" labelledBy="form-heading">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                id="form-heading"
                eyebrow="Say hello"
                title="Tell us what you need, and who needs to answer it"
                body="Wholesale, a private booking, a workshop date or a question about a lot — this goes straight to the person who can answer it."
                className="lg:sticky lg:top-[7.5rem]"
                bodyWidth="wide"
              />

              <div className="mt-10 border-t border-line-light pt-8">
                <Eyebrow>Direct</Eyebrow>
                <div className="mt-4 flex flex-col gap-2 text-body">
                  <a href={`mailto:${contact.email}`} className="link-wipe w-fit text-ink-900">
                    {contact.email}
                  </a>
                  <a href={`tel:${contact.phoneHref}`} className="link-wipe w-fit text-ink-900">
                    {contact.phone}
                  </a>
                </div>
                <p className="mt-3 text-meta text-text-muted">
                  Press enquiries:{" "}
                  <a href={`mailto:${contact.pressEmail}`} className="link-wipe">
                    {contact.pressEmail}
                  </a>
                </p>

                <div className="mt-7">
                  <Eyebrow>Follow</Eyebrow>
                  <SocialLinkList links={socialLinks} className="mt-4" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border border-line-light bg-paper-25 p-6 sm:p-10">
                <ContactForm />
              </div>
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
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
    </>
  );
}