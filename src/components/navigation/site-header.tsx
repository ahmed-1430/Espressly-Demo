"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Magnetic } from "@/components/motion/magnetic";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { useCart } from "@/components/shop/cart-provider";
import { ButtonLink } from "@/components/ui/button";
import { hasBannerRoute, primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

const CONDENSE_AT = 72;

/**
 * Site header.
 * ---------------------------------------------------------------------------
 * Two behaviours, one component:
 *
 *  - Banner routes (home and the six section pages) open on a full-bleed dark
 *    image, so the header starts transparent with cream ink and condenses into
 *    a frosted cream bar once the visitor passes the fold point.
 *  - Detail routes (products, articles) open on light paper, so the header
 *    starts already solid — cream ink on a cream background would be invisible.
 *
 * The change is a single height/colour tween rather than a swap, so it reads as
 * the page settling rather than a component appearing.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open: openCart } = useCart();

  useMotionValueEvent(scrollY, "change", (value) => {
    const next = value > CONDENSE_AT;
    setCondensed((current) => (current === next ? current : next));
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const solid = !hasBannerRoute(pathname) || condensed;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        /* While transparent the header sits on a dark banner photograph, so it
           declares the dark tone and inherits the lighter focus ring. */
        data-tone={solid ? "light" : "dark"}
        className={cn(
          "fixed inset-x-0 top-0 z-header transition-[background-color,box-shadow,border-color] duration-700 ease-out-expo",
          solid
            ? "border-b border-line-light bg-paper-50/88 backdrop-blur-xl supports-[backdrop-filter]:bg-paper-50/72"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[var(--container-grid)] items-center justify-between gap-6 px-6 transition-[height] duration-700 ease-out-expo sm:px-8",
            /* 100px is the reference's own bar height; the condensed state
               drops to 76px so the page settles into it on scroll. */
            solid ? "h-[76px]" : "h-[100px]",
          )}
        >
          <Logo tone={solid ? "dark" : "light"} height={solid ? 32 : 40} priority />

          <nav aria-label="Primary" className="hidden h-full self-stretch lg:block">
            <ul className="flex h-full items-stretch">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        /* Reference nav: 15px, uppercase, 400 weight, 23px line-height, 23px
                         horizontal padding. */
                        "group relative inline-flex h-full items-center px-[23px] text-[15px] font-normal uppercase leading-[23px] tracking-[0.02em] transition-colors duration-400",
                        solid
                          ? active
                            ? "text-ink-900"
                            : "text-text-muted hover:text-ink-900"
                          : active
                            ? "text-cream-100"
                            : "text-cream-100/70 hover:text-cream-100",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-[23px] bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-400 ease-out-expo group-hover:scale-x-100",
                          active ? "scale-x-100" : "",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              className={cn(
                "relative inline-flex size-11 items-center justify-center rounded-pill border transition-colors duration-400 sm:size-10",
                solid
                  ? "border-ink-900/15 text-ink-900 hover:border-copper-600 hover:text-copper-700"
                  : "border-cream-100/30 text-cream-100 hover:border-cream-100/70",
              )}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-[1.05rem]">
                <path d="M6 8h12l-1 11H7L6 8Zm3 0a3 3 0 0 1 6 0" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="sr-only">Open bag</span>
              <AnimatePresence>
                {count > 0 ? (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={tween(duration.fast, ease.out)}
                    className={cn(
                      "absolute -right-0.5 -top-0.5 flex size-[1.15rem] items-center justify-center rounded-pill text-micro font-semibold tabular-nums",
                      solid ? "bg-copper-600 text-paper-25" : "bg-copper-400 text-ink-950",
                    )}
                  >
                    {count}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>

            <div className="hidden xl:block">
              <Magnetic strength={5}>
                <ButtonLink
                  href="/what-we-offer#events"
                  size="sm"
                  variant={solid ? "solid" : "inverse"}
                >
                  Book an event
                </ButtonLink>
              </Magnetic>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-pill border transition-colors duration-400 lg:hidden",
                solid ? "border-ink-900/15 text-ink-900" : "border-cream-100/30 text-cream-100",
              )}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500",
                    !menuOpen && "translate-y-[5px] rotate-[14deg]",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500",
                    !menuOpen && "-translate-y-[5px] -rotate-[14deg]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {!reduce ? (
          <ScrollProgress className="absolute inset-x-0 bottom-0 h-px bg-copper-500" />
        ) : null}
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}