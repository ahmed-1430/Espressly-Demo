import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { BlogCard } from "@/components/cards/blog-card";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/badge";
import { getPost, posts } from "@/config/blog";
import { absoluteUrl, formatIsoDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata, serialiseJsonLd } from "@/lib/seo";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found — Espressly" };

  return buildMetadata({
    title: `${post.title} — The Espressly Dispatch`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: { src: post.image.src, alt: post.image.alt },
    type: "article",
    publishedTime: post.date,
    authors: [post.author.name],
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((item) => item.slug === post.slug);
  const next = posts[(index + 1) % posts.length];
  const previous = posts[(index - 1 + posts.length) % posts.length];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "The Dispatch", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <Section tone="light" spacing="flush" className="pt-32 pb-14 sm:pt-36 sm:pb-20">
        <Container width="copy">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption uppercase tracking-[0.18em] text-text-muted">
              <li>
                <Link href="/blog" className="transition-colors hover:text-ink-900">
                  The Dispatch
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink-900">
                {post.category}
              </li>
            </ol>
          </nav>

          <Eyebrow className="mt-8">{post.category}</Eyebrow>

          <h1 className="mt-6 text-display-xs text-ink-900">{post.title}</h1>

          <p className="mt-7 text-lede text-text-body">{post.standfirst}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line-light pt-6">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-10 items-center justify-center rounded-pill bg-ink-900 font-sans text-caption font-semibold tracking-[0.06em] text-cream-100"
              >
                {post.author.initials}
              </span>
              <span className="flex flex-col">
                <span className="text-body-sm text-ink-900">{post.author.name}</span>
                <span className="text-caption uppercase tracking-[0.14em] text-text-muted">
                  {post.author.role}
                </span>
              </span>
            </div>

            <span aria-hidden className="h-6 w-px bg-line-light" />

            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-text-muted">
              <time dateTime={post.date}>{formatIsoDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </p>
          </div>
        </Container>

        <Container className="mt-12">
          <ImageReveal
            image={post.image}
            from="up"
            ratio="21 / 9"
            sizes="(min-width: 1536px) 1440px, 100vw"
            priority
            className="w-full"
            quality={80}
          />
        </Container>
      </Section>

      <Section tone="light" spacing="flush" className="pb-20 sm:pb-28">
        <Container width="copy">
          <div className="flex flex-col gap-6">
            {post.body.map((block, index) => {
              const key = `${post.slug}-${index}`;

              switch (block.type) {
                case "heading":
                  return (
                    <Reveal key={key} as="h2" className="mt-6 text-title-lg leading-snug display-type text-ink-900 sm:text-title-2xl">
                      {block.text}
                    </Reveal>
                  );
                case "paragraph":
                  return (
                    <Reveal key={key} as="p" className="text-body-lg leading-[1.75] text-text-body">
                      {block.text}
                    </Reveal>
                  );
                case "quote":
                  return (
                    <Reveal key={key} as="blockquote" className="my-4 border-l border-copper-600 pl-6">
                      <p className="text-title-sm leading-snug display-type text-ink-900 sm:text-title-lg">
                        “{block.text}”
                      </p>
                      {block.attribution ? (
                        <footer className="mt-4 text-caption uppercase tracking-[0.18em] text-text-muted">
                          {block.attribution}
                        </footer>
                      ) : null}
                    </Reveal>
                  );
                case "list":
                  return (
                    <Reveal key={key} as="ul" className="flex flex-col gap-3">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-body-md leading-relaxed text-text-body">
                          <span aria-hidden className="mt-3 size-1 shrink-0 rotate-45 bg-copper-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </Reveal>
                  );
                default:
                  return null;
              }
            })}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-line-light pt-8">
            <span className="text-caption uppercase tracking-[0.18em] text-text-muted">
              Tagged
            </span>
            {post.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Container>
      </Section>

      {/* Prev / next */}
      <Section tone="sand" spacing="tight">
        <Container>
          <nav aria-label="More articles" className="grid gap-8 sm:grid-cols-2">
            <Link href={`/blog/${previous.slug}`} className="group flex flex-col gap-3">
              <span className="text-caption uppercase tracking-[0.18em] text-text-muted">
                ← Previous
              </span>
              <span className="text-title-sm leading-snug display-type text-ink-900 transition-colors duration-300 group-hover:text-copper-700 sm:text-title-lg">
                {previous.title}
              </span>
            </Link>
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-3 sm:items-end sm:text-right"
            >
              <span className="text-caption uppercase tracking-[0.18em] text-text-muted">
                Next →
              </span>
              <span className="text-title-sm leading-snug display-type text-ink-900 transition-colors duration-300 group-hover:text-copper-700 sm:text-title-lg">
                {next.title}
              </span>
            </Link>
          </nav>
        </Container>
      </Section>

      {/* Related */}
      <Section tone="light" spacing="default">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Keep reading</Eyebrow>
              <h2 className="mt-5 text-display-2xs text-ink-900">
                Three more from the roastery
              </h2>
            </div>
            <Link
              href="/blog"
              className="shrink-0 text-meta uppercase tracking-[0.18em] text-ink-900"
            >
              <span className="link-wipe">All articles</span>
            </Link>
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts
              .filter((item) => item.slug !== post.slug)
              .slice(0, 3)
              .map((item, index) => (
                <Reveal key={item.slug} as="li" delay={index * 0.07}>
                  <BlogCard post={item} />
                </Reveal>
              ))}
          </ul>
        </Container>
      </Section>

      {/* Article plus breadcrumbs as one top-level array — a single
          application/ld+json script holds a single JSON document, so the two
          cannot simply be concatenated. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serialiseJsonLd([
            articleJsonLd({
              title: post.title,
              description: post.excerpt,
              image: post.image.src,
              url: absoluteUrl(`/blog/${post.slug}`),
              datePublished: post.date,
              author: post.author.name,
              readingTime: post.readingTime,
            }),
            breadcrumbJsonLd(crumbs),
          ]),
        }}
      />

      <p className="sr-only">Published by {site.name}.</p>
    </>
  );
}