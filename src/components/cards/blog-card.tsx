import Link from "next/link";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import type { BlogPost } from "@/config/blog";
import { cn } from "@/lib/cn";

type BlogCardProps = {
  post: BlogPost;
  /** `hero` is the lead article; `tile` is the compact grid entry. */
  variant?: "hero" | "tile" | "row";
  className?: string;
  priority?: boolean;
};

export function BlogCard({ post, variant = "tile", className, priority = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;

  if (variant === "row") {
    return (
      <article className={cn("group/row", className)}>
        <Link
          href={href}
          className="grid grid-cols-[6rem_1fr] gap-5 py-6 sm:grid-cols-[8rem_1fr] sm:gap-7"
        >
          <ImageReveal
            image={post.image}
            from="left"
            scale={1.02}
            ratio="1 / 1"
            sizes="128px"
            className="aspect-square w-full"
          />
          <div className="flex min-w-0 flex-col justify-center gap-2">
            <p className="eyebrow text-copper-700">{post.category}</p>
            <h3 className="text-[1.0625rem] leading-snug display-type text-ink-900 sm:text-[1.25rem]">
              <span className="transition-colors duration-300 group-hover/row:text-copper-700">
                {post.title}
              </span>
            </h3>
            <p className="text-[0.8125rem] text-text-muted">
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden> · </span>
              {post.readingTime}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  const hero = variant === "hero";

  return (
    <article
      className={cn(
        "group/post flex flex-col",
        hero && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-12",
        className,
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={cn("block overflow-hidden", hero ? "lg:col-span-7" : "")}
      >
        <ImageReveal
          image={post.image}
          from="up"
          scale={1.06}
          ratio={hero ? "16 / 11" : "4 / 3"}
          sizes={
            hero
              ? "(min-width: 1024px) 56vw, 92vw"
              : "(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
          }
          priority={priority}
          className="w-full"
        />
      </Link>

      <div className={cn("flex flex-1 flex-col", hero ? "lg:col-span-5" : "pt-6")}>
        <div className="flex items-center gap-3">
          <Eyebrow ornament={false}>{post.category}</Eyebrow>
          <span aria-hidden className="h-px w-6 bg-line-light" />
          <span className="text-[0.75rem] uppercase tracking-[0.16em] text-text-muted">
            {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 leading-[1.12] display-type text-ink-900",
            hero
              ? "text-[1.75rem] sm:text-[2.25rem] lg:text-[2.5rem]"
              : "text-[1.25rem] sm:text-[1.375rem]",
          )}
        >
          <Link href={href} className="transition-colors duration-300 group-hover/post:text-copper-700">
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-4 leading-relaxed text-text-body",
            hero ? "max-w-[52ch] text-[0.9375rem]" : "text-[0.875rem]",
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.75rem] uppercase tracking-[0.16em] text-text-muted">
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span aria-hidden className="text-copper-600/60">
            ·
          </span>
          <span>{post.author.name}</span>
        </div>
      </div>
    </article>
  );
}

/** Evenly weighted grid of articles. */
export function BlogGrid({
  posts,
  className,
}: {
  posts: readonly BlogPost[];
  className?: string;
}) {
  return (
    <Stagger
      className={cn(
        "grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
      step={0.08}
    >
      {posts.map((post) => (
        <StaggerItem key={post.slug} className="flex">
          <BlogCard post={post} className="w-full" />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Animated wrapper for a single lead article. */
export function BlogHeroCard({ post }: { post: BlogPost }) {
  return (
    <Reveal>
      <BlogCard post={post} variant="hero" priority />
    </Reveal>
  );
}