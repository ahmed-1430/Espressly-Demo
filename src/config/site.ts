/**
 * Espressly — brand, contact and site-wide constants.
 *
 * NOTE FOR MAINTAINERS
 * --------------------
 * Address, phone and social handles below are illustrative brand placeholders
 * (the phone number intentionally uses the reserved 555 range). Replace them
 * with verified details before launch — the structured data in `lib/seo.ts`
 * reads straight from this file.
 */

export const site = {
  name: "Espressly",
  legalName: "Espressly Coffee Roasters",
  shortDescription:
    "Small-batch specialty coffee, roasted in the old harbour quarter and served with intention.",
  description:
    "Espressly is a specialty coffee house and micro-roastery. We source in season, roast in small batches, and brew every cup to the bean rather than to the machine.",
  /** Absolute site origin. Override with NEXT_PUBLIC_SITE_URL in production. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.espressly.coffee",
  /** BCP-47 tag for `Intl` (e.g. "en-GB"). */
  locale: "en-GB",
  /** Open Graph wants the underscore form (e.g. "en_GB"). */
  openGraphLocale: "en_GB",
  language: "en-GB",
  themeColor: "#1d140e",
  founded: 2016,
  currency: "EUR",
  currencyLocale: "en-IE",
} as const;

export const contact = {
  email: "hello@espressly.coffee",
  pressEmail: "press@espressly.coffee",
  phone: "+353 1 555 0148",
  phoneHref: "+35315550148",
  address: {
    street: "18 Harbour Lane, The Old Quay",
    locality: "Eastport",
    region: "County Dublin",
    postalCode: "D02 XK41",
    country: "IE",
    countryName: "Ireland",
  },
  /** Coordinates are illustrative and only used for the map placeholder link. */
  coordinates: { latitude: 53.3498, longitude: -6.2603 },
} as const;

/** `YYYY-MM-DD`, used by JSON-LD and the sitemap. */
export const today = "2026-02-18";

export const hours = [
  { days: "Monday – Thursday", opens: "07:30", closes: "18:00", label: "07:30 – 18:00" },
  { days: "Friday", opens: "07:30", closes: "19:00", label: "07:30 – 19:00" },
  { days: "Saturday", opens: "08:00", closes: "19:00", label: "08:00 – 19:00" },
  { days: "Sunday", opens: "08:30", closes: "16:00", label: "08:30 – 16:00" },
] as const;