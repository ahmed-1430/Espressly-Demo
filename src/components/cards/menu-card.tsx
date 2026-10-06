import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Media } from "@/components/ui/media";
import type { MenuItem } from "@/config/menu";
import { cn } from "@/lib/cn";
import { formatMoney } from "@/lib/format";

type MenuItemRowProps = {
  item: MenuItem;
  /** Index inside the category, shown as a quiet counter. */
  index: number;
  /** Show the category signature marker. */
  signature?: boolean;
};

export function MenuItemRow({ item, index, signature = false }: MenuItemRowProps) {
  return (
    <StaggerItem as="li" className="group/menu">
      <div className="relative grid grid-cols-[2rem_1fr_auto] gap-x-4 gap-y-2 border-b border-line-light py-5 transition-colors duration-300 hover:border-ink-900/30 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-x-6 sm:py-6">
        <span
          aria-hidden
          className="pt-1 font-mono text-[0.625rem] tabular-nums tracking-[0.08em] text-text-muted/60"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0">
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-title-xs leading-tight text-ink-900">
            <span className="transition-colors duration-300 group-hover/menu:text-copper-600">
              {item.name}
            </span>
            {signature ? (
              <span className="rounded-pill border border-copper-500/30 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-copper-700">
                Signature
              </span>
            ) : null}
          </h3>

          <p className="mt-1.5 max-w-[62ch] text-body-sm leading-relaxed text-text-body">
            {item.description}
          </p>

          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
            {item.notes.map((note) => (
              <li
                key={note}
                className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-text-muted"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>

        <p className="shrink-0 pt-1 font-mono text-body-sm tabular-nums text-ink-900">
          {formatMoney(item.price)}
        </p>
      </div>
    </StaggerItem>
  );
}

type MenuListProps = {
  items: readonly MenuItem[];
  className?: string;
  startIndex?: number;
};

export function MenuList({ items, className, startIndex = 0 }: MenuListProps) {
  return (
    <Stagger as="ul" className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <MenuItemRow
          key={item.id}
          item={item}
          index={startIndex + index}
          signature={Boolean(item.signature)}
        />
      ))}
    </Stagger>
  );
}

type MenuCardProps = {
  item: MenuItem;
  index: number;
};

/**
 * Wide card used in the horizontally scrolling signature rail.
 *
 * Set on espresso rather than paper: the rail is a dark band, and a light card
 * floating in it reads as a widget. Photography is optional in the data, so the
 * card degrades to a typographic panel instead of an empty box.
 */
export function MenuCard({ item, index }: MenuCardProps) {
  return (
    <StaggerItem
      as="article"
      className="group/card flex h-full w-[78vw] shrink-0 snap-start flex-col border border-cream-100/12 bg-espresso-800 transition-colors duration-500 hover:border-copper-500/50 sm:w-[23rem] lg:w-[24rem]"
    >
      {item.image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-espresso-950">
          <Media
            image={item.image}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 23rem, 78vw"
            className="h-full w-full"
            imgClassName="transition-transform duration-1000 ease-out-expo group-hover/card:scale-[1.05]"
            placeholderTone="dark"
          />
          <span className="absolute left-4 top-4 font-mono text-[0.625rem] tracking-[0.12em] text-cream-100/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 rounded-pill bg-paper-50 px-3 py-1.5 font-mono text-[0.625rem] tabular-nums text-ink-900">
            {formatMoney(item.price)}
          </span>
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] w-full items-end bg-espresso-950 p-5">
          <span className="font-mono text-[0.625rem] tracking-[0.12em] text-cream-100/50">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-title-sm leading-tight text-cream-100">
            {item.name}
          </h3>
        </div>

        <p className="mt-3 text-body-sm leading-relaxed text-cream-100/60">{item.description}</p>

        <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 pt-5">
          {item.notes.map((note) => (
            <li
              key={note}
              className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-copper-300/80"
            >
              {note}
            </li>
          ))}
        </ul>

        <Link
          href="/menu"
          className="mt-5 inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cream-100/70 transition-colors duration-300 hover:text-cream-100"
        >
          <span className="link-wipe">Full menu</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="size-3 transition-transform duration-500 ease-out-expo group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
          >
            <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </StaggerItem>
  );
}
