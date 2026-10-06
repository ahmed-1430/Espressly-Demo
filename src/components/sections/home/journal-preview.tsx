import { BlogCard } from "@/components/cards/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredPost, recentPosts } from "@/config/blog";

/**
 * Journal preview.
 *
 * One large lead article on the left, and a compact index of dispatches on the
 * right. The right-hand list is deliberately a list rather than another stack
 * of image cards, so the section reads as an editorial spread instead of a grid
 * of tiles.
 */
export function JournalPreview() {
  const supporting = recentPosts.slice(0, 3);

  return (
    <Section tone="bright">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The dispatch"
            title={
              <>
                Field notes on coffee, brewing and <em className="text-copper-600">craft</em>
              </>
            }
            body="Long enough to be useful, short enough to read on the way to work."
            className="sm:max-w-[54ch]"
          />
          <ButtonLink href="/blog" variant="outline" className="shrink-0" arrow>
            All articles
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-14 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <BlogCard post={featuredPost} variant="tile" priority />
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label border-b border-line-light pb-4 text-copper-600">
              Also in the dispatch
            </p>
            <div className="flex flex-col">
              {supporting.map((post, index) => (
                <Reveal key={post.slug} delay={0.06 * (index + 1)}>
                  <BlogCard post={post} variant="row" />
                </Reveal>
              ))}
            </div>
            <ButtonLink href="/blog" variant="link" className="mt-7" arrow>
              Read every dispatch
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
