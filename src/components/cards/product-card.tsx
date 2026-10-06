"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/shop/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Media } from "@/components/ui/media";
import type { Product } from "@/config/products";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";
import { duration, ease, tween } from "@/lib/motion";

type ProductCardProps = {
  product: Product;
  /** `grid` is the shop listing; `feature` is the wider home-page treatment. */
  variant?: "grid" | "feature";
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Index shown in the feature treatment. */
  index?: number;
};

/**
 * Product card.
 *
 * Hover reveals a second frame of the same product behind the packshot — the
 * image "displaces" rather than simply cross-fading — and a hairline fills
 * along the base of the frame. The add control is always in the layout, so the
 * interaction never depends on hover.
 */
export function ProductCard({
  product,
  variant = "grid",
  priority = false,
  sizes = "(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 90vw",
  className,
  index = 1,
}: ProductCardProps) {
  const reduce = useReducedMotion();
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add(product.slug);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  const wide = variant === "feature";

  return (
    <motion.article
      data-reveal=""
      className={cn(
        "group/card relative flex flex-col",
        wide && "sm:grid sm:grid-cols-12 sm:items-center sm:gap-10",
        className,
      )}
      initial={reduce ? undefined : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={tween(duration.slow, ease.out)}
    >
      <Link
        href={`/shop/${product.slug}`}
        className={cn(
          "relative block overflow-hidden bg-sand-100",
          wide ? "sm:col-span-7" : "",
        )}
        tabIndex={-1}
        aria-hidden
      >
        <div
          className={cn(
            "relative w-full",
            wide ? "aspect-[4/3] sm:aspect-[16/11]" : "aspect-[4/5]",
          )}
        >
          <Media
            image={product.image}
            fill
            sizes={sizes}
            priority={priority}
            quality={82}
            placeholderTone="light"
            className="h-full w-full"
            imgClassName="transition-transform duration-1000 ease-out-expo group-hover/card:scale-[1.045]"
          />

          {product.hoverImage ? (
            <Media
              image={product.hoverImage}
              fill
              sizes={sizes}
              quality={82}
              placeholderTone="light"
              className={cn(
                "h-full w-full opacity-0 transition-opacity duration-700 ease-out-expo group-hover/card:opacity-100",
              )}
              imgClassName="transition-transform duration-1000 ease-out-expo group-hover/card:scale-[1.03]"
            />
          ) : null}

          {product.badge ? (
            <span className="absolute left-4 top-4">
              <Badge tone="ink">{product.badge}</Badge>
            </span>
          ) : null}

          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-copper-500 transition-transform duration-700 ease-out-expo group-hover/card:scale-x-100"
          />
        </div>
      </Link>

      <div className={cn("flex flex-1 flex-col", wide ? "sm:col-span-5 sm:py-2" : "pt-5")}>
        <div className="flex items-center justify-between gap-4">
          <p className="label text-copper-600">
            {product.origin ?? product.weight ?? "Espressly"}
          </p>
          <span className="font-mono text-[0.5625rem] tabular-nums tracking-[0.12em] text-text-muted">
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <h3
          className={cn(
            "mt-3 font-display leading-[1.05] text-ink-900",
            wide ? "text-display-2xs" : "text-title-sm sm:text-title-md",
          )}
        >
          <Link
            href={`/shop/${product.slug}`}
            className="transition-colors duration-300 hover:text-copper-600"
          >
            {product.name}
          </Link>
        </h3>

        <p className={cn("mt-3 text-body-sm leading-relaxed text-text-body", wide && "max-w-[46ch]")}>
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line-light pt-4">
          <span className="font-mono text-body-sm tabular-nums text-ink-900">
            {formatMoney(product.price)}
          </span>
          <span className="label text-text-muted">{product.weight}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className={cn(
              "group/add relative inline-flex h-10 flex-1 items-center justify-center overflow-hidden rounded-pill border font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors duration-300",
              justAdded
                ? "border-copper-500 bg-copper-500 text-paper-25"
                : "border-ink-900/25 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-25",
            )}
          >
            {justAdded ? "Added to bag" : "Add to bag"}
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill border border-ink-900/25 text-ink-900 transition-colors duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-25"
            aria-label={`View details for ${product.name}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-3.5">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
