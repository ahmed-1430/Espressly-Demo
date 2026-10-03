import { cafeJsonLd, organisationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * Machine-readable organisation graph.
 *
 * Serving JSON-LD from a stable endpoint lets crawlers (and any future agent)
 * read Espressly's structured data without parsing the document body.
 */
export function GET() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organisationJsonLd(), cafeJsonLd(), websiteJsonLd()],
  };

  return new Response(JSON.stringify(graph), {
    headers: {
      "content-type": "application/ld+json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}