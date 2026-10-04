"use client";

import { useState } from "react";
import { useCart } from "@/components/shop/cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/config/products";
import { formatMoney } from "@/lib/format";

/**
 * Quantity selector plus add-to-bag for the product detail page.
 * Mirrors the cart contract so a real checkout can replace the handler later.
 */
export function ProductActions({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.slug, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-title-lg display-type tabular-nums text-ink-900">
          {formatMoney(product.price)}
        </span>
        <span className="text-caption uppercase tracking-[0.16em] text-text-muted">
          Free shipping over €40
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-stretch gap-3">
        <div className="inline-flex items-center rounded-pill border border-ink-900/15">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            className="inline-flex size-12 items-center justify-center rounded-pill text-ink-900 transition-colors hover:bg-ink-900/5 disabled:opacity-35"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Decrease quantity</span>
          </button>
          <span
            aria-live="polite"
            className="w-8 text-center text-body tabular-nums text-ink-900"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(20, value + 1))}
            className="inline-flex size-12 items-center justify-center rounded-pill text-ink-900 transition-colors hover:bg-ink-900/5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Increase quantity</span>
          </button>
        </div>

        <Button onClick={handleAdd} size="lg" className="flex-1" arrow>
          {added ? "Added to bag" : "Add to bag"}
        </Button>
      </div>

      <p className="mt-3 text-meta text-text-muted" aria-live="polite">
        {added
          ? `${quantity} × ${product.name} is in your bag.`
          : `Tell us your brewer at checkout and we will grind for it.`}
      </p>
    </div>
  );
}