import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { CartProvider } from "@/components/shop/cart-provider";
import { brand } from "@/config/images";
import { site } from "@/config/site";
import {
  cafeJsonLd,
  organisationJsonLd,
  serialiseJsonLd,
  siteMetadata,
  websiteJsonLd,
} from "@/lib/seo";

/**
 * Typography
 * ---------------------------------------------------------------------------
 * Fraunces — a variable serif with optical sizing, used for every display
 * setting. Its slightly wonky terminals give the brand an editorial voice
 * without resorting to a high-contrast fashion serif.
 * Inter Tight — a tight, modern grotesque for UI, navigation and body copy.
 * Both are self-hosted by `next/font`, so there is no third-party request and
 * no flash of unstyled text.
 */
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-fraunces",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  ...siteMetadata,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    "specialty coffee",
    "coffee roastery",
    "espresso",
    "single origin",
    "filter coffee",
    "coffee subscription",
    "café",
  ],
  alternates: {
    canonical: site.url,
  },
  icons: {
    icon: [
      { url: brand.logo.mark.src, type: "image/png", sizes: "258x240" },
      { url: brand.logo.markDark.src, type: "image/png", sizes: "258x240" },
    ],
    apple: [{ url: brand.logo.mark.src, sizes: "258x240" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh antialiased">
        <noscript>
          {/* Without JS the mount/entrance animations never run, so anything
              they would have hidden is forced into its final state. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-top focus:rounded-pill focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-meta focus:font-medium focus:text-cream-100"
        >
          Skip to content
        </a>

        <CartProvider>
          <SiteHeader />
          <main id="main" className="relative">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>

        {/* Several entities, so they go out as one top-level array rather than
            concatenated documents: a <script type="application/ld+json"> holds a
            single JSON document, and three objects joined by newlines is not one.
            Content is config-derived only — no user input reaches this. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serialiseJsonLd([
              organisationJsonLd(),
              cafeJsonLd(),
              websiteJsonLd(),
            ]),
          }}
        />
      </body>
    </html>
  );
}