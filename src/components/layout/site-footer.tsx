import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SocialLinkList } from "@/components/brand/social-icon";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { footerNav, socialLinks } from "@/config/navigation";
import { brand } from "@/config/images";
import { contact, hours, site } from "@/config/site";

/**
 * Site footer.
 *
 * Structure: oversized wordmark → utility rail (contact, hours) → link columns
 * → newsletter → legal line. Dark espresso, cream ink, hairline rules.
 */
export function SiteFooter() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-text-inverse-muted">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Wordmark + positioning */}
          <div className="lg:col-span-5">
            <Logo tone="light" height={54} />
            <p className="mt-7 max-w-[34ch] text-body leading-relaxed text-cream-100/65">
              {site.shortDescription}
            </p>
            <SocialLinkList links={socialLinks} tone="light" className="mt-7" />
          </div>

          {/* Utility rail */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            <div>
              <h2 className="eyebrow text-copper-400">Find us</h2>
              <address className="mt-5 space-y-1 text-body-sm leading-relaxed not-italic text-cream-100/70">
                <span className="block">{contact.address.street}</span>
                <span className="block">
                  {contact.address.locality}, {contact.address.postalCode}
                </span>
              </address>
              <div className="mt-4 space-y-1 text-body-sm">
                <a href={`mailto:${contact.email}`} className="link-wipe block text-cream-100/70">
                  {contact.email}
                </a>
                <a href={`tel:${contact.phoneHref}`} className="link-wipe block text-cream-100/70">
                  {contact.phone}
                </a>
              </div>
            </div>

            <div>
              <h2 className="eyebrow text-copper-400">Hours</h2>
              <dl className="mt-5 space-y-2 text-body-sm">
                {hours.map((row) => (
                  <div key={row.days} className="flex flex-col gap-0.5">
                    <dt className="text-cream-100/60">{row.days}</dt>
                    <dd className="tabular-nums text-cream-100/85">{row.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="eyebrow text-copper-400">More</h2>
              <ul className="mt-5 space-y-2 text-body-sm">
                {footerNav.visit.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-wipe text-cream-100/70">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sitemap */}
        <nav aria-label="Footer" className="mt-14 border-t border-cream-100/12 pt-10">
          <ul className="flex flex-wrap gap-x-7 gap-y-3">
            {footerNav.explore.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-meta uppercase tracking-[0.18em] text-cream-100/55 transition-colors duration-400 hover:text-cream-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="mt-14 grid gap-8 border-t border-cream-100/12 pt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="text-title-lg display-type text-cream-100 sm:text-title-2xl">
              One letter a month. Four beans in it.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <NewsletterForm tone="light" />
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col gap-4 border-t border-cream-100/12 pt-8 text-caption text-cream-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Roasted on the old quay</span>
            <span aria-hidden className="text-copper-400/70">
              ·
            </span>
            <span>Registered in {contact.address.countryName}</span>
          </p>
        </div>
      </Container>

      {/* Oversized brand watermark — decorative, so it is an image rather than
          text (avoids reading it out and keeps it out of contrast checks). */}
      <div aria-hidden className="pointer-events-none flex justify-center overflow-hidden px-4 pb-10 sm:px-8">
        <Image
          src={brand.logo.dark.src}
          alt=""
          width={brand.logo.dark.width}
          height={brand.logo.dark.height}
          sizes="(min-width: 1536px) 1100px, 92vw"
          className="w-[min(1100px,92vw)] opacity-[0.07]"
        />
      </div>
    </footer>
  );
}