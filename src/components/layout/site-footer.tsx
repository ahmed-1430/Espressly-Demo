import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { SocialLinkList } from "@/components/brand/social-icon";
import { LocalClock } from "@/components/layout/local-clock";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { footerNav, socialLinks } from "@/config/navigation";
import { brand } from "@/config/images";
import { contact, hours, site } from "@/config/site";

/**
 * Site footer.
 *
 * The closing spread: one direct invitation, the practical details, a compact
 * sign-up, then a hairline utility bar with a live Dublin clock and the
 * oversized wordmark as a watermark.
 */
export function SiteFooter() {
  const year = new Date().getUTCFullYear();

  return (
    <footer
      data-tone="dark"
      className="grain relative overflow-hidden bg-ink-950 text-text-inverse-muted"
    >
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {/* Invitation */}
        <div className="grid gap-10 border-b border-cream-100/10 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-copper-400">Next step</p>
            <h2 className="mt-4 text-display-sm text-cream-100">
              Let’s talk <em className="text-copper-300">coffee.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:col-start-9">
            <a
              href={`mailto:${contact.email}`}
              className="group/contact inline-flex items-center justify-between gap-4 border-b border-cream-100/15 pb-3 text-body-md text-cream-100 transition-colors duration-300 hover:border-copper-400"
            >
              {contact.email}
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                className="size-3.5 transition-transform duration-500 ease-out-expo group-hover/contact:-translate-y-0.5 group-hover/contact:translate-x-0.5"
              >
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={`tel:${contact.phoneHref}`}
              className="link-wipe self-start text-body-sm text-cream-100/70"
            >
              {contact.phone}
            </a>
          </div>
        </div>

        {/* Practical detail */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" height={40} />
            <p className="mt-6 max-w-[30ch] text-body-sm leading-relaxed text-cream-100/55">
              {site.shortDescription}
            </p>
            <SocialLinkList links={socialLinks} tone="light" className="mt-6" />
          </div>

          <div className="lg:col-span-2">
            <h2 className="label text-copper-400">Explore</h2>
            <ul className="mt-4 space-y-2 text-body-sm">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream-100/60 transition-colors duration-300 hover:text-cream-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="label text-copper-400">Visit</h2>
            <ul className="mt-4 space-y-2 text-body-sm">
              {footerNav.visit.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream-100/60 transition-colors duration-300 hover:text-cream-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <address className="mt-5 space-y-0.5 text-body-sm not-italic leading-relaxed text-cream-100/55">
              <span className="block">{contact.address.street}</span>
              <span className="block">
                {contact.address.locality}, {contact.address.postalCode}
              </span>
            </address>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="label text-copper-400">Hours</h2>
            <dl className="mt-4 space-y-2 text-body-sm">
              {hours.map((row) => (
                <div key={row.days} className="flex items-baseline justify-between gap-4">
                  <dt className="text-cream-100/50">{row.days}</dt>
                  <dd className="tabular-nums text-cream-100/85">{row.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 border-t border-cream-100/10 pt-5">
              <h2 className="label text-copper-400">The letter</h2>
              <div className="mt-3">
                <NewsletterForm tone="light" compact />
              </div>
            </div>
          </div>
        </div>

        {/* Utility bar */}
        <div className="flex flex-col gap-4 border-t border-cream-100/10 pt-6 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-cream-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <LocalClock />
            <span>Roasted on the old quay</span>
            <a href="#main" className="text-cream-100/70 transition-colors hover:text-cream-100">
              Back to top ↑
            </a>
          </div>
        </div>
      </Container>

      {/* Oversized watermark */}
      <div
        aria-hidden
        className="pointer-events-none flex justify-center overflow-hidden px-4 pb-8 sm:px-8"
      >
        <Image
          src={brand.logo.dark.src}
          alt=""
          width={brand.logo.dark.width}
          height={brand.logo.dark.height}
          sizes="(min-width: 1536px) 1200px, 92vw"
          className="w-[min(1200px,92vw)] opacity-[0.06]"
        />
      </div>
    </footer>
  );
}
