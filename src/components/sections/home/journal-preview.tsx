import { BlogCard } from "@/components/cards/blog-card";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredPost, recentPosts } from "@/config/blog";

/** Journal preview: lead article on the left, two supporting entries right. */
export function JournalPreview() {
  const supporting = recentPosts.slice(0, 2);

  return (
    <Section tone="bright">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="The dispatch"
            title="Field notes on coffee, brewing and craft"
            body="Long enough to be useful, short enough to read on the way to work."
            className="sm:max-w-[50ch]"
          />
          <ButtonLink href="/blog" variant="outline" className="shrink-0" arrow>
            All articles
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-14 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <BlogCard post={featuredPost} variant="hero" />
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5">
            {supporting.map((post, index) => (
              <Reveal key={post.slug} delay={0.08 * (index + 1)}>
                <BlogCard post={post} variant="hero" />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}