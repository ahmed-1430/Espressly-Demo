import { Fragment } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { SplitText } from "@/components/motion/split-text";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/cn";

type Crumb = { label: string; href: string };

type PageHeaderProps = {
  eyebrow: string;
  /** Rendered as masked lines — keep to 2–3 short lines. */
  title: string[];
  body?: string;
  image: ImageAsset;
  crumbs?: Crumb[];
  /** Small metadata chips rendered under the lede. */
  meta?: { label: string; value: string }[];
  /** Quick links displayed in the base row. */
  rail?: { label: string; href: string }[];
  className?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

/**
 * Shared opening frame for every inner page.
 *
 * Light, typographic and asymmetric: breadcrumb, a large display title with
 * the lede and metadata in the right column, then a full-bleed photograph with
 * a caption rule beneath. The header is always paper, so the fixed navigation
 * never has to guess which surface it is sitting on.
 */
export function PageHeader({
  eyebrow,
  title,
  body,
  image,
  crumbs = [],
  meta,
  rail,
  className,
  align = "left",
  children,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <header
      data-tone="light"
      className={cn(
        "grain relative isolate overflow-hidden bg-paper-50 pb-10 pt-24 sm:pt-28 lg:pb-12 lg:pt-32",
        className,
      )}
    >
      <Container className="relative">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2.5">
                  {index > 0 ? (
                    <span aria-hidden className="text-copper-500">
                      /
                    </span>
                  ) : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink-900">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors duration-300 hover:text-ink-900">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div
          className={cn(
            "mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10",
            centered && "text-center",
          )}
        >
          <div className={cn("lg:col-span-8", centered && "lg:col-span-12")}>
            <Eyebrow>{eyebrow}</Eyebrow>

            <h1 className="mt-5 max-w-[18ch] text-display-sm text-ink-900 lg:max-w-[none]">
              {title.map((line, index, all) => (
                <Fragment key={line}>
                  <span className="block overflow-hidden pb-[0.06em]">
                    <SplitText text={line} delay={0.05 * index + 0.08} />
                  </span>
                  {index < all.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>
          </div>

          <div className={cn("lg:col-span-4", centered && "mx-auto max-w-[52ch]")}>
            {body ? (
              <p className="max-w-[44ch] text-body-md leading-relaxed text-text-body">
                {body}
              </p>
            ) : null}

            {meta && meta.length > 0 ? (
              <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line-light pt-5">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="label text-text-muted">{item.label}</dt>
                    <dd className="mt-1.5 font-display text-title-xs text-ink-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {children}
          </div>
        </div>
      </Container>

      <Container className="relative mt-10 sm:mt-12">
        <div className="relative overflow-hidden border border-ink-900/10">
          <ParallaxImage
            image={image}
            ratio="16 / 9"
            travel={70}
            priority
            sizes="(min-width: 1440px) 1344px, 100vw"
            className="w-full"
            quality={82}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-cream-100/10"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line-light pt-3">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-text-muted">
            Espressly — the old quay, Dublin
          </p>
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-text-muted">
            Roasting since 2016
          </p>
        </div>
      </Container>

      {rail && rail.length > 0 ? (
        <Container className="relative mt-8">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line-light pt-5">
            {rail.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group/rail inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-text-muted transition-colors duration-300 hover:text-ink-900"
              >
                <span className="link-wipe">{item.label}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="size-3 transition-transform duration-500 ease-out-expo group-hover/rail:-translate-y-0.5 group-hover/rail:translate-x-0.5"
                >
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </Container>
      ) : null}
    </header>
  );
}
