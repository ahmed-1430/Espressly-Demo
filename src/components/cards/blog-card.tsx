import Link from "next/link";
import { ImageReveal } from "@/components/motion/image-reveal";
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
          className="grid grid-cols-[5.5rem_1fr] items-center gap-5 border-b border-line-light py-5 sm:grid-cols-[7.5rem_1fr] sm:gap-7"
        >
          <ImageReveal
            image={post.image}
            from="left"
            scale={1.02}
            ratio="1 / 1"
            sizes="120px"
            className="aspect-square w-full"
          />
          <div className="flex min-w-0 flex-col justify-center gap-2">
            <p className="label text-copper-600">{post.category}</p>
            <h3 className="font-display text-title-xs leading-tight text-ink-900 sm:text-title-sm">
              <span className="transition-colors duration-300 group-hover/row:text-copper-600">
                {post.title}
              </span>
            </h3>
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-text-muted">
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

      <div className={cn("flex flex-1 flex-col", hero ? "xl:col-span-5" : "pt-5")}>
        <div className="flex items-center gap-3">
          <p className="label text-copper-600">{post.category}</p>
          <span aria-hidden className="h-px w-5 bg-line-light" />
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-text-muted">
            {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display leading-[1.06] text-ink-900",
            hero ? "text-title-xl sm:text-display-2xs" : "text-title-sm sm:text-title-md",
          )}
        >
          <Link href={href} className="transition-colors duration-300 group-hover/post:text-copper-600">
            {post.title}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-text-body",
            hero ? "max-w-[48ch] text-body-md" : "text-body-sm",
          )}
        >
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-line-light pt-4">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-text-muted">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden> · </span>
            {post.author.name}
          </p>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink-900">
            Read
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="size-3 transition-transform duration-500 ease-out-expo group-hover/post:-translate-y-0.5 group-hover/post:translate-x-0.5"
            >
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
