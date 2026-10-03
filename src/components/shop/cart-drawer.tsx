"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/shop/cart-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { shopImages } from "@/config/images";
import { formatMoney } from "@/lib/format";
import { duration, ease, tween } from "@/lib/motion";

/**
 * Slide-in cart drawer.
 *
 * Handles the full accessibility contract for a modal surface: focus moves in
 * on open and returns to the trigger on close, Tab is trapped, Escape closes,
 * and background scroll is locked without layout shift.
 */
export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQuantity, remove, clear } = useCart();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      previouslyFocused?.focus();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Your bag">
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close bag"
            className="absolute inset-0 h-full w-full cursor-default bg-ink-950/60 backdrop-blur-[2px]"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={tween(duration.fast)}
          />

          <motion.div
            ref={panelRef}
            className="absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col bg-paper-50 shadow-lift"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={tween(reduce ? duration.fast : duration.base, ease.out)}
          >
            <header className="flex items-center justify-between border-b border-line-light px-6 py-5">
              <div className="flex items-baseline gap-3">
                <h2 className="text-[1.375rem] display-type text-ink-900">Your bag</h2>
                <span className="text-[0.75rem] uppercase tracking-[0.2em] text-text-muted">
                  {lines.length > 0 ? `${lines.length} ${lines.length === 1 ? "item" : "items"}` : "Empty"}
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="inline-flex size-10 items-center justify-center rounded-pill border border-ink-900/12 text-ink-900 transition-colors duration-300 hover:border-ink-900/40"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-4">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
                <span className="sr-only">Close bag</span>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <Media
                  image={shopImages.banner}
                  ratio="1 / 1"
                  className="size-28 rounded-pill opacity-90"
                  sizes="112px"
                  placeholderTone="light"
                />
                <div className="space-y-2">
                  <p className="text-[1.125rem] display-type text-ink-900">Nothing in the bag yet</p>
                  <p className="text-[0.875rem] text-text-muted">
                    Whole bean, ground to your brewer, roasted the week it is ordered.
                  </p>
                </div>
                <ButtonLink href="/shop" onClick={close} variant="solid" arrow>
                  Browse the shop
                </ButtonLink>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line-light overflow-y-auto px-6">
                  {lines.map((line) => (
                    <li key={line.slug} className="flex gap-4 py-5">
                      <Link
                        href={`/shop/${line.slug}`}
                        onClick={close}
                        className="shrink-0"
                        aria-hidden
                        tabIndex={-1}
                      >
                        <Media
                          image={{
                            src: line.image,
                            alt: line.name,
                            width: 800,
                            height: 800,
                          }}
                          ratio="1 / 1"
                          className="size-20 bg-sand-100"
                          sizes="80px"
                          placeholderTone="light"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            href={`/shop/${line.slug}`}
                            onClick={close}
                            className="text-[0.9375rem] display-type text-ink-900 hover:text-copper-700"
                          >
                            {line.name}
                          </Link>
                          <span className="shrink-0 text-[0.875rem] text-ink-900">
                            {formatMoney(line.price * line.quantity)}
                          </span>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="inline-flex items-center rounded-pill border border-ink-900/15">
                            <button
                              type="button"
                              className="inline-flex size-8 items-center justify-center rounded-pill text-ink-900 transition-colors hover:bg-ink-900/5"
                              onClick={() => setQuantity(line.slug, line.quantity - 1)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-3.5">
                                <path d="M5 12h14" strokeLinecap="round" />
                              </svg>
                              <span className="sr-only">{`Decrease quantity of ${line.name}`}</span>
                            </button>
                            <span
                              aria-live="polite"
                              className="min-w-7 text-center text-[0.8125rem] tabular-nums text-ink-900"
                            >
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              className="inline-flex size-8 items-center justify-center rounded-pill text-ink-900 transition-colors hover:bg-ink-900/5"
                              onClick={() => setQuantity(line.slug, line.quantity + 1)}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-3.5">
                                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                              </svg>
                              <span className="sr-only">{`Increase quantity of ${line.name}`}</span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => remove(line.slug)}
                            className="text-[0.75rem] uppercase tracking-[0.16em] text-text-muted underline decoration-line-light underline-offset-4 transition-colors hover:text-clay-500"
                          >
                            Remove
                            <span className="sr-only">{` ${line.name} from bag`}</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-line-light px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-text-muted">Subtotal</span>
                    <span className="text-[1.375rem] display-type tabular-nums text-ink-900">
                      {formatMoney(subtotal)}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.8125rem] text-text-muted">
                    Shipping and tax calculated at checkout. Ground to your brewer at no cost.
                  </p>
                  <div className="mt-5 flex flex-col gap-2">
                    <Button fullWidth size="lg" arrow onClick={close}>
                      Checkout
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clear} fullWidth>
                      Empty the bag
                    </Button>
                  </div>
                  <p className="mt-3 text-center text-[0.75rem] text-text-muted">
                    Front-end demo basket — no payment is taken.
                  </p>
                </footer>
              </>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}