import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
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
 * Espressly typography
 * ---------------------------------------------------------------------------
 * Instrument Serif:
 * High-contrast editorial display face. Used sentence-case at large sizes for
 * the brand voice, and in italic for emphasis inside a line.
 *
 * Manrope:
 * Geometric humanist sans for body copy, controls and interface text.
 *
 * IBM Plex Mono:
 * Instrument labels, indices and metadata — the roastery's panel lettering.
 *
 * Fonts are loaded through next/font so they are self-hosted by Next.js,
 * avoiding third-party font requests and reducing layout instability.
 */

const display = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  preload: true,
});

const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  preload: true,
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  preload: true,
});

export const metadata: Metadata = {
  ...siteMetadata,

  applicationName: site.name,

  authors: [
    {
      name: site.legalName,
    },
  ],

  creator: site.legalName,
  publisher: site.legalName,

  keywords: [
    "specialty coffee",
    "coffee roastery",
    "espresso",
    "single origin coffee",
    "filter coffee",
    "coffee subscription",
    "artisan coffee",
    "café",
  ],

  alternates: {
    canonical: site.url,
  },

  icons: {
    icon: [
      {
        url: brand.logo.mark.src,
        type: "image/png",
        sizes: "258x240",
      },
      {
        url: brand.logo.markDark.src,
        type: "image/png",
        sizes: "258x240",
      },
    ],
    apple: [
      {
        url: brand.logo.mark.src,
        sizes: "258x240",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const jsonLd = serialiseJsonLd([
    organisationJsonLd(),
    cafeJsonLd(),
    websiteJsonLd(),
  ]);

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-paper-50 font-sans text-ink-900 antialiased">
        {/* Progressive enhancement:
            reveal content normally when JavaScript is unavailable. */}
        <noscript>
          <style>{`
            [data-reveal] {
              opacity: 1 !important;
              transform: none !important;
              clip-path: none !important;
              visibility: visible !important;
            }
          `}</style>
        </noscript>

        {/* Keyboard accessibility */}
        <a
          href="#main"
          className="
            sr-only
            fixed
            left-4
            top-4
            z-top
            rounded-pill
            bg-ink-950
            px-5
            py-3
            text-meta
            font-semibold
            text-cream-100
            outline-none
            ring-offset-2
            transition-transform
            focus:not-sr-only
            focus-visible:ring-2
            focus-visible:ring-copper-500
            focus-visible:ring-offset-ink-950
          "
        >
          Skip to content
        </a>

        <CartProvider>
          <SiteHeader />

          <main
            id="main"
            className="relative min-h-px outline-none"
            tabIndex={-1}
          >
            {children}
          </main>

          <SiteFooter />

          <CartDrawer />
        </CartProvider>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />
      </body>
    </html>
  );
}