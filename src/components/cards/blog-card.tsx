import Link from "next/link";
import { ImageReveal } from "@/components/motion/image-reveal";
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
            <h3 className="text-body-lg leading-snug display-type text-ink-900 sm:text-title-sm">
              <span className="transition-colors duration-300 group-hover/row:text-copper-700">
                {post.title}
              </span>
            </h3>
            <p className="text-meta text-text-muted">
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
        // The split only engages at `xl`, where the article owns the full
        // container width. Below that it stacks, so nesting it inside a narrow
        // column can never squeeze it.
        hero && "xl:grid xl:grid-cols-12 xl:items-center xl:gap-10",
        className,
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={cn("block overflow-hidden", hero ? "xl:col-span-7" : "")}
      >
        <ImageReveal
          image={post.image}
          from="up"
          scale={1.06}
          ratio={hero ? "16 / 11" : "4 / 3"}
          sizes={
            hero
              ? "(min-width: 1280px) 54vw, 92vw"
              : "(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
          }
          priority={priority}
          className="w-full"
        />
      </Link>

      <div className={cn("flex flex-1 flex-col", hero ? "xl:col-span-5" : "pt-6")}>
        <div className="flex items-center gap-3">
          <Eyebrow ornament={false}>{post.category}</Eyebrow>
          <span aria-hidden className="h-px w-6 bg-line-light" />
          <span className="text-caption uppercase tracking-[0.16em] text-text-muted">
            {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 leading-[1.12] display-type text-ink-900",
            hero
              ? "text-title-xl sm:text-title-2xl xl:text-title-3xl"
              : "text-title-sm sm:text-title-md",
          )}
        >
          <Link href={href} className="transition-colors duration-300 group-hover/post:text-copper-700">
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-4 leading-relaxed text-text-body",
            hero ? "max-w-[52ch] text-body" : "text-body-sm",
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-caption uppercase tracking-[0.16em] text-text-muted">
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