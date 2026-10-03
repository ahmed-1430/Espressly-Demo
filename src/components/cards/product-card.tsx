"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/shop/cart-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
};

/**
 * Product card.
 *
 * Hover reveals a second frame of the same product behind the packshot — the
 * image "displaces" rather than simply cross-fading — and the add control is
 * always in the layout (it appears on hover for pointers, but is permanently
 * visible on touch so the interaction never depends on hover).
 */
export function ProductCard({
  product,
  variant = "grid",
  priority = false,
  sizes = "(min-width: 1280px) 24vw, (min-width: 640px) 45vw, 90vw",
  className,
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
        wide && "sm:grid sm:grid-cols-12 sm:gap-8 sm:items-center",
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
        <div className="relative aspect-[4/5] w-full sm:aspect-square lg:aspect-[4/5]">
          <Media
            image={product.image}
            fill
            sizes={sizes}
            priority={priority}
            quality={80}
            placeholderTone="light"
            className="h-full w-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.04]"
          />

          {product.hoverImage ? (
            <Media
              image={product.hoverImage}
              fill
              sizes={sizes}
              quality={80}
              placeholderTone="light"
              className={cn(
                "h-full w-full opacity-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:opacity-100",
              )}
            />
          ) : null}

          {product.badge ? (
            <span className="absolute left-4 top-4">
              <Badge tone="ink">{product.badge}</Badge>
            </span>
          ) : null}
        </div>
      </Link>

      <div className={cn("flex flex-1 flex-col", wide ? "sm:col-span-5 sm:py-2" : "pt-5")}>
        <p className="eyebrow text-copper-700">
          {product.origin ?? product.weight ?? "Espressly"}
        </p>

        <h3 className="mt-3 text-[1.25rem] leading-tight display-type text-ink-900 sm:text-[1.375rem]">
          <Link href={`/shop/${product.slug}`} className="transition-colors duration-300 hover:text-copper-700">
            {product.name}
          </Link>
        </h3>

        <p className="mt-3 text-[0.875rem] leading-relaxed text-text-body">{product.description}</p>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line-light pt-4">
          <span className="text-[1rem] tabular-nums text-ink-900">{formatMoney(product.price)}</span>
          <span className="text-[0.75rem] uppercase tracking-[0.16em] text-text-muted">
            {product.weight}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={handleAdd}
            className="flex-1 justify-center"
          >
            {justAdded ? "Added to bag" : "Add to bag"}
          </Button>
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill border border-ink-900/15 text-ink-900 transition-colors duration-400 hover:border-copper-600 hover:text-copper-700"
            aria-label={`View details for ${product.name}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-4">
              <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}