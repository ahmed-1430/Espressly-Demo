"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { useCart } from "@/components/shop/cart-provider";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

const CONDENSE_AT = 24;
const HIDE_AFTER = 360;

/**
 * Site header.
 * ---------------------------------------------------------------------------
 * A three-part instrument bar: identity, index-numbered navigation, utilities.
 *
 *  - Transparent on arrival, then a paper sheet with a hairline rule once the
 *    visitor leaves the top of the page.
 *  - Retracts while scrolling down and returns on the first upward gesture, so
 *    reading is never obstructed but navigation is always one gesture away.
 *  - The navigation label runs through a masked two-copy swap on hover: the
 *    same micro-interaction used across the site's links, so the whole
 *    interface feels like one hand made it.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const { count, open: openCart } = useCart();

  useMotionValueEvent(scrollY, "change", (value) => {
    const nextCondensed = value > CONDENSE_AT;
    setCondensed((current) => (current === nextCondensed ? current : nextCondensed));

    if (reduce) return;
    const delta = value - lastY.current;
    if (Math.abs(delta) < 8) return;
    const nextHidden = delta > 0 && value > HIDE_AFTER && !menuOpen;
    setHidden((current) => (current === nextHidden ? current : nextHidden));
    lastY.current = value;
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        data-tone="light"
        className={cn(
          "fixed inset-x-0 top-0 z-header border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          condensed
            ? "border-line-light bg-paper-50/92 backdrop-blur-xl supports-backdrop-filter:bg-paper-50/78"
            : "border-transparent bg-transparent",
        )}
        animate={hidden ? { y: "-102%" } : { y: "0%" }}
        transition={tween(reduce ? 0 : duration.fast, ease.out)}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-5 transition-[height] duration-500 ease-out-expo sm:px-8 lg:px-12",
            condensed ? "h-16" : "h-20 sm:h-22",
          )}
        >
          <Logo tone="dark" height={condensed ? 26 : 30} priority />

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-center">
              {primaryNav.map((item, index) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group/nav relative flex h-full items-center gap-2 px-4 text-micro uppercase tracking-[0.1em] transition-colors duration-300",
                        active ? "text-ink-900" : "text-text-muted hover:text-ink-900",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "font-mono text-[0.5625rem] tabular-nums tracking-[0.08em] transition-colors duration-300",
                          active
                            ? "text-copper-500"
                            : "text-text-muted/50 group-hover/nav:text-copper-500",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="relative block overflow-hidden py-1">
                        <span className="block transition-transform duration-500 ease-out-expo group-hover/nav:-translate-y-full">
                          {item.label}
                        </span>
                        <span
                          aria-hidden
                          className="absolute inset-0 translate-y-full text-copper-600 transition-transform duration-500 ease-out-expo group-hover/nav:translate-y-0"
                        >
                          {item.label}
                        </span>
                      </span>

                      {active ? (
                        <span
                          aria-hidden
                          className="absolute inset-x-4 bottom-0 h-px bg-copper-500"
                        />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <p className="hidden items-center gap-2 xl:flex">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-moss-600 [animation:status-pulse_2.8s_ease-in-out_infinite] motion-reduce:animate-none"
              />
              <span className="label text-text-muted">Open daily · 07:30–18:00</span>
            </p>

            <span aria-hidden className="mx-1 hidden h-4 w-px bg-line-light xl:block" />

            <button
              type="button"
              onClick={openCart}
              className="group/cart relative inline-flex size-10 items-center justify-center rounded-pill border border-ink-900/15 text-ink-900 transition-colors duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-25"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-[1.05rem]">
                <path d="M5.5 8h13l-1.1 11.5h-10.8L5.5 8Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Open bag</span>
              <AnimatePresence>
                {count > 0 ? (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={tween(duration.fast, ease.out)}
                    className="absolute -right-1 -top-1 flex size-[1.15rem] items-center justify-center rounded-pill bg-copper-500 font-mono text-[0.625rem] font-medium tabular-nums text-paper-25"
                  >
                    {count}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>

            <Link
              href="/contact#visit"
              className="group/visit hidden h-10 items-center gap-2 rounded-pill bg-ink-900 px-5 font-mono text-eyebrow uppercase tracking-[0.14em] text-paper-25 transition-colors duration-300 hover:bg-copper-500 sm:inline-flex"
            >
              Visit us
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="size-3 transition-transform duration-500 ease-out-expo group-hover/visit:-translate-y-0.5 group-hover/visit:translate-x-0.5"
              >
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              className="inline-flex size-10 items-center justify-center rounded-pill border border-ink-900/15 text-ink-900 transition-colors duration-300 hover:border-ink-900 lg:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span className="absolute inset-x-0 top-0 h-px bg-current" />
                <span className="absolute inset-x-0 bottom-0 h-px bg-current" />
              </span>
            </button>
          </div>
        </div>

        <ScrollProgress className="absolute inset-x-0 bottom-0 h-px origin-left bg-copper-500 motion-reduce:hidden" />
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
