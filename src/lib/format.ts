import { site } from "@/config/site";

/** Formats minor units (cents) into the brand currency. */
export function formatMoney(minorUnits: number, currency = site.currency): string {
  return new Intl.NumberFormat(site.currencyLocale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(minorUnits / 100);
}

/** `2026-02-04` → `4 February 2026` without relying on locale data loading. */
export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1));
}

export function formatIsoDate(iso: string, locale = site.locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseIsoDate(iso));
}

export function formatIsoDateShort(iso: string, locale = site.locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseIsoDate(iso));
}

/** `1,240` — used for statistics and counters. */
export function formatNumber(value: number, locale = site.locale): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string, base = site.url): string {
  return new URL(path.startsWith("/") ? path : `/${path}`, base).toString();
}