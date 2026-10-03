import type { Metadata } from "next";
import { contact, site } from "@/config/site";
import { absoluteUrl } from "@/lib/format";

/**
 * SEO helpers.
 * ---------------------------------------------------------------------------
 * `buildMetadata` produces a unique title/description/canonical/OG set per
 * route, and `JsonLd` renders schema.org payloads as application/ld+json.
 *
 * Structured data is deliberately conservative: it only states facts that the
 * brand can evidence (products we list, posts we publish, an organisation with
 * the details in `config/site.ts`).
 */

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Path to a 1200×630 social image inside `/public`. */
  image?: { src: string; alt: string; width?: number; height?: number };
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
};

const titleTemplate = "%s — Espressly";

export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  authors,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? {
        url: absoluteUrl(image.src),
        width: image.width ?? 1200,
        height: image.height ?? 630,
        alt: image.alt,
      }
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: site.openGraphLocale,
      ...(type === "article" ? { publishedTime, authors } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
  };
}

export const siteMetadata: Metadata = buildMetadata({
  title: titleTemplate.replace("%s — Espressly", "Espressly — Small-Batch Specialty Coffee"),
  description: site.description,
  path: "/",
  image: { src: "/images/hero/hero-espresso-pour.jpg", alt: "Espressly hero" },
});

/* -------------------------------------------------------------------------
 * Structured data
 * ---------------------------------------------------------------------- */

export type JsonLdInput = Record<string, unknown> | Record<string, unknown>[];

/**
 * Serialises JSON-LD. `JSON.stringify` on plain config-derived objects is safe:
 * there is no untrusted HTML and no HTML is ever embedded in these payloads.
 */
export function serialiseJsonLd(data: JsonLdInput): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.shortDescription,
    logo: absoluteUrl("/brand/logo-full.png"),
    email: contact.email,
    foundingDate: String(site.founded),
    sameAs: ["https://instagram.com/espressly.coffee"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: contact.email,
        telephone: contact.phone,
        availableLanguage: ["en"],
        areaServed: "IE",
      },
    ],
  };
}

export function cafeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/#cafe`,
    name: site.name,
    description: site.shortDescription,
    url: site.url,
    image: absoluteUrl("/images/hero/hero-espresso-pour.jpg"),
    logo: absoluteUrl("/brand/logo-full.png"),
    email: contact.email,
    telephone: contact.phone,
    priceRange: "€€",
    servesCuisine: "Coffee",
    currenciesAccepted: site.currency,
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.coordinates.latitude,
      longitude: contact.coordinates.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "08:30",
        closes: "16:00",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${site.url}/menu#menu`,
    name: `${site.name} menu`,
    url: absoluteUrl("/menu"),
    inLanguage: site.language,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Espresso & milk",
        description:
          "Espresso, long black, cortado, flat white, cappuccino and latte, brewed on our two-group machine.",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Espresso", description: "36 g ristretto shot with brown-sugar crema." },
          { "@type": "MenuItem", name: "Flat White", description: "Two ristretto shots under a thin layer of microfoam." },
          { "@type": "MenuItem", name: "Caffè Latte", description: "Two shots stretched into 260 ml of milk." },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Filter, cold & kitchen",
        description: "Batch filter, pour over, cold brew, tea and the morning pastry case.",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Batch Filter", description: "Whatever is singing on the batch that day." },
          { "@type": "MenuItem", name: "Cold Brew", description: "Steeped eighteen hours at 4 °C, served over ice." },
          { "@type": "MenuItem", name: "Almond Croissant", description: "Three-day laminated dough with frangipane." },
        ],
      },
    ],
  };
}

export function productJsonLd(input: {
  name: string;
  description: string;
  image: string;
  url: string;
  priceMinor: number;
  availability?: "InStock" | "OutOfStock";
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    image: absoluteUrl(input.image),
    url: input.url,
    sku: input.url.split("/").pop(),
    brand: { "@type": "Brand", name: input.brand ?? site.name },
    offers: {
      "@type": "Offer",
      url: input.url,
      priceCurrency: site.currency,
      price: (input.priceMinor / 100).toFixed(2),
      availability: `https://schema.org/${input.availability ?? "InStock"}`,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${site.url}/#organization` },
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  author: string;
  readingTime: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image),
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: site.language,
    author: { "@type": "Person", name: input.author },
    publisher: { "@id": `${site.url}/#organization` },
    isAccessibleForFree: true,
    ...(input.readingTime
      ? { timeRequired: input.readingTime.replace(/[^\d]/g, "") }
      : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}