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
 * Always dark and always full-bleed so the transparent header reads correctly
 * on arrival, then hands over to the light editorial bands below.
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
      className={cn(
        "relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden bg-espresso-950 pb-10 pt-28 text-cream-100 sm:pb-12 sm:pt-32 lg:min-h-[80svh] lg:pb-14 lg:pt-36",
        className,
      )}
    >
      <ParallaxImage
        image={image}
        travel={90}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
        quality={80}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso-950 via-espresso-950/72 to-espresso-950/45"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-espresso-950/85 to-transparent"
      />

      <Container className="relative">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] uppercase tracking-[0.18em] text-cream-100/55">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden className="text-copper-400/60">
                      /
                    </span>
                  ) : null}
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-cream-100/85">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="transition-colors hover:text-cream-100">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className={cn("flex flex-col gap-6", centered && "items-center text-center")}>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>

          <h1 className="max-w-[18ch] text-display-sm text-cream-100">
            {title.map((line, index, all) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <SplitText
                  text={index === all.length - 1 ? line : `${line} `}
                  delay={0.06 * index + 0.1}
                />
              </span>
            ))}
          </h1>

          {body ? (
            <p
              className={cn(
                "max-w-[54ch] text-lede text-cream-100/72",
                centered && "mx-auto",
              )}
            >
              {body}
            </p>
          ) : null}

          {meta && meta.length > 0 ? (
            <dl
              className={cn(
                "mt-2 flex flex-wrap gap-x-10 gap-y-5",
                centered && "justify-center",
              )}
            >
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="eyebrow text-copper-400">{item.label}</dt>
                  <dd className="mt-2 text-[1.0625rem] display-type text-cream-100">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {children}
        </div>
      </Container>

      {rail && rail.length > 0 ? (
        <Container className="relative mt-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream-100/15 pt-6 text-[0.8125rem] uppercase tracking-[0.16em] text-cream-100/60">
            {rail.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-wipe transition-colors hover:text-cream-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      ) : null}
    </header>
  );
}