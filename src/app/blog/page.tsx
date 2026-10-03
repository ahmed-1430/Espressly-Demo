import type { Metadata } from "next";
import { BlogArchive } from "@/components/blog/blog-archive";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/sections/page-header";
import { Container, Section } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { journalImages } from "@/config/images";
import { posts, recentPosts } from "@/config/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "The Dispatch — Brewing, Craft & Origin Notes",
  description:
    "Field notes from the Espressly roastery: how to taste coffee like a professional, what actually happens between bean and cup, and how to pick the right brew for your morning.",
  path: "/blog",
  image: { src: journalImages.banner.src, alt: journalImages.banner.alt },
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="The dispatch"
        title={["Field notes on", "coffee and craft."]}
        body="Six pieces on tasting, roasting, grinding and choosing a brewer. Written by the people who do the work, edited to be read rather than skimmed."
        image={journalImages.banner}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]}
        rail={[
          { label: "Brewing", href: "/blog#top" },
          { label: "Craft", href: "/blog#top" },
          { label: "Origin", href: "/blog#top" },
          { label: "Guides", href: "/blog#top" },
        ]}
      />

      <Section id="top" tone="light" spacing="default">
        <Container>
          <BlogArchive />
        </Container>
      </Section>

      {/* Recent, compact */}
      <Section tone="sand" spacing="tight">
        <Container>
          <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow>Latest</Eyebrow>
              <h2 className="mt-5 text-display-2xs text-ink-900">
                Everything we have published so far
              </h2>
              <p className="mt-5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-text-body">
                One letter a month, plus new pieces whenever we have something
                worth arguing about.
              </p>
              <ButtonLink href="/#newsletter" variant="outline" className="mt-7" arrow>
                Join the dispatch
              </ButtonLink>
            </div>

            <ul className="divide-y divide-line-light lg:col-span-7 lg:col-start-6">
              {recentPosts.slice(0, 4).map((post, index) => (
                <Reveal key={post.slug} as="li" delay={index * 0.05}>
                  <a
                    href={`/blog/${post.slug}`}
                    className="group flex items-baseline justify-between gap-6 py-5"
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.75rem] uppercase tracking-[0.18em] text-copper-700">
                        {post.category}
                      </span>
                      <span className="mt-2 block text-[1.0625rem] leading-snug display-type text-ink-900 transition-colors duration-300 group-hover:text-copper-700 sm:text-[1.25rem]">
                        {post.title}
                      </span>
                    </span>
                    <span className="shrink-0 text-[0.75rem] uppercase tracking-[0.16em] text-text-muted">
                      {post.readingTime.replace(" read", "")}
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <section className="sr-only" aria-label="Article index">
        <p>{`${posts.length} articles published.`}</p>
      </section>
    </>
  );
}