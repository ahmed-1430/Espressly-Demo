import { BrandStatement } from "@/components/sections/home/brand-statement";
import { CraftBand } from "@/components/sections/home/craft-band";
import { FeaturedProducts } from "@/components/sections/home/featured-products";
import { HeroSlider } from "@/components/sections/home/hero-slider";
import { JournalPreview } from "@/components/sections/home/journal-preview";
import { NewsletterCta } from "@/components/sections/home/newsletter-cta";
import { Pillars } from "@/components/sections/home/pillars";
import { SignatureDrinks } from "@/components/sections/home/signature-drinks";
import { StatsBand } from "@/components/sections/home/stats-band";
import { StoryScroll } from "@/components/sections/home/story-scroll";
import { Testimonials } from "@/components/sections/home/testimonials";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { bannerImages } from "@/config/images";
import { contact, site } from "@/config/site";
import { buildMetadata, serialiseJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Espressly — Small-Batch Specialty Coffee & Micro-Roastery",
  description: site.description,
  path: "/",
  image: {
    src: bannerImages.home.src,
    alt: "Espressly — freshly pulled espresso and roasted beans",
  },
});

/**
 * Home.
 * ---------------------------------------------------------------------------
 * Composition order, and why:
 *   1. HeroSlider      — orientation and a single, confident first impression.
 *   2. Marquee         — brand promises, a breath between statement and proof.
 *   3. Statement       — who we are, argued rather than listed.
 *   4. Signature rail  — the product, shown as an object of desire.
 *   5. Pillars         — the reasoning behind the decisions (light band).
 *   6. Story scroll    — craft, told in three sticky chapters.
 *   7. Products        — commerce, once the brand has earned the click.
 *   8. Craft band      — the dark, process-heavy counterpoint.
 *   9. Stats           — hard numbers, quiet band.
 *  10. Journal         — editorial voice and internal links.
 *  11. Voices          — social proof.
 *  12. Newsletter      — the ask, once and only once.
 */
export default function HomePage() {
  const faq = [
    {
      question: "Where is the roastery?",
      answer: `${contact.address.street}, ${contact.address.locality}. Two minutes from the harbour footbridge, and the drum is visible through the glass on the lane side.`,
    },
    {
      question: "Do you grind the coffee to order?",
      answer:
        "Always. Whole bean at home, ground to your brewer at no extra charge, and ground to dose in the shop.",
    },
    {
      question: "How often do you change the filter coffee?",
      answer:
        "Four times a year, with the harvest. When a lot is finished it is finished — we do not blend it into the next one.",
    },
  ];

  return (
    <>
      <HeroSlider />
      <MarqueeBand />
      <BrandStatement />
      <SignatureDrinks />
      <Pillars />
      <StoryScroll />
      <FeaturedProducts />
      <CraftBand />
      <StatsBand />
      <JournalPreview />
      <Testimonials />
      <NewsletterCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialiseJsonLd({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </>
  );
}