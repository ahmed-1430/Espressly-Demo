import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Media } from "@/components/ui/media";
import { Tag } from "@/components/ui/badge";
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
      <div className="relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-b border-line-light pb-6 pt-6 transition-colors duration-500 sm:gap-x-8">
        <span
          aria-hidden
          className="pt-1 text-eyebrow tabular-nums tracking-[0.1em] text-text-muted/70"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1">
            <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-title-xs leading-snug display-type text-ink-900">
              {item.name}
              {signature ? (
                <span className="rounded-pill bg-copper-600/12 px-2 py-0.5 align-middle font-sans text-micro font-semibold uppercase tracking-[0.18em] text-copper-700">
                  Signature
                </span>
              ) : null}
            </h3>

            <p className="mt-2 max-w-[62ch] text-body-sm leading-relaxed text-text-body">
              {item.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {item.notes.map((note) => (
                <li key={note}>
                  <Tag>{note}</Tag>
                </li>
              ))}
            </ul>
          </div>

          <p className="shrink-0 text-body-md tabular-nums text-ink-900 sm:pt-1 sm:text-body-lg">
            {formatMoney(item.price)}
          </p>
        </div>
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
 * Wide card used in the horizontally scrolling signature rail. Photography is
 * optional in the data, so the card degrades to a typographic treatment
 * instead of an empty box if an image slot is empty.
 */
export function MenuCard({ item, index }: MenuCardProps) {
  return (
    <StaggerItem
      as="article"
      className="flex h-full w-[78vw] shrink-0 snap-start flex-col border border-line-light bg-paper-25 sm:w-[24rem] lg:w-[26rem]"
    >
      {item.image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Media
            image={item.image}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 24rem, 78vw"
            className="h-full w-full transition-transform duration-1000 ease-out-expo hover:scale-[1.04]"
            placeholderTone="light"
          />
          <span className="absolute left-5 top-5 font-sans text-eyebrow tracking-[0.24em] text-cream-100/80 mix-blend-difference">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      ) : (
        <div className="relative flex aspect-[4/3] w-full items-end bg-espresso-900 p-5">
          <span className="font-sans text-eyebrow tracking-[0.24em] text-cream-100/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-title-md leading-tight display-type text-ink-900">{item.name}</h3>
          <p className="shrink-0 text-body-md tabular-nums text-copper-700">
            {formatMoney(item.price)}
          </p>
        </div>

        <p className="text-body-sm leading-relaxed text-text-body">{item.description}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
          {item.notes.map((note) => (
            <li key={note}>
              <Tag>{note}</Tag>
            </li>
          ))}
        </ul>

        <Link
          href="/menu"
          className="mt-2 inline-flex items-center gap-2 text-caption uppercase tracking-[0.18em] text-ink-900"
        >
          <span className="link-wipe">See the full menu</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-3.5">
            <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </StaggerItem>
  );
}