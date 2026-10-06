"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { productCategories, products } from "@/config/products";
import type { Product, ProductCategoryId } from "@/config/products";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const sorts: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Alphabetical" },
];

type Filter = ProductCategoryId | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  ...productCategories.map((category) => ({ id: category.id, label: category.label })),
];

function sortProducts(list: readonly Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      );
  }
}

/**
 * Shop listing.
 *
 * Filtering and sorting are pure derivations of the config array, so the URL
 * never needs to encode view state and the markup always matches the server
 * render on first paint.
 */
export function ShopBrowser() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const base = filter === "all" ? products : products.filter((p) => p.category === filter);
    return sortProducts(base, sort);
  }, [filter, sort]);

  const activeCategory = productCategories.find((category) => category.id === filter);

  return (
    <div>
      <SectionHeading
        as="h2"
        eyebrow="The range"
        title="Everything on the shelf"
        className="mb-8 max-w-[40ch]"
      />

      {/* Controls. `min-w-0` matters: as a flex child the chip rail would
          otherwise take its content width and push the row past the viewport,
          since the rail scrolls but the row does not. */}
      <div className="flex min-w-0 flex-col gap-6 border-b border-line-light pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="hide-scrollbar rail min-w-0 gap-2">
          {filters.map((option) => {
            const isActive = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative inline-flex h-10 shrink-0 items-center rounded-pill border px-5 text-meta font-medium tracking-[0.01em] transition-colors duration-400",
                  isActive
                    ? "border-ink-900 bg-ink-900 text-paper-50"
                    : "border-ink-900/15 text-text-muted hover:border-ink-900/40 hover:text-ink-900",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="shop-sort"
            className="shrink-0 text-caption uppercase tracking-[0.18em] text-text-muted"
          >
            Sort
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-10 rounded-pill border border-ink-900/15 bg-paper-25 px-4 pr-9 text-meta text-ink-900 outline-none transition-colors duration-300 hover:border-ink-900/40 focus:border-copper-600"
          >
            {sorts.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category framing line */}
      <p className="mt-8 max-w-[64ch] text-body leading-relaxed text-text-body">
        {activeCategory?.description ??
          "Ten products, none of them filler. Everything is roasted in twelve-kilo batches, ground to your brewer at no extra charge, and shipped in plastic-free packaging."}
      </p>

      {/* Results */}
      <p className="sr-only" role="status" aria-live="polite">
        {`${visible.length} ${visible.length === 1 ? "product" : "products"} shown`}
      </p>

      <motion.div
        key={`${filter}-${sort}`}
        initial={reduce ? undefined : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={tween(duration.base, ease.out)}
        className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-body text-text-muted">
          Nothing in this category yet.
        </p>
      ) : null}
    </div>
  );
}