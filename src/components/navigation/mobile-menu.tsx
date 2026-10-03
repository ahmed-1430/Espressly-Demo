"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef } from "react";
import { Logo } from "@/components/brand/logo";
import { SocialLinkList } from "@/components/brand/social-icon";
import { useCart } from "@/components/shop/cart-provider";
import { primaryNav, socialLinks } from "@/config/navigation";
import { contact } from "@/config/site";
import { cn } from "@/lib/cn";
import { duration, ease, tween } from "@/lib/motion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const ITEM_STEP = 0.055;

/**
 * Full-screen navigation for viewports below `lg`.
 *
 * Recomposed rather than shrunken: the primary links become a tall list with
 * index numbers and per-route descriptors, and secondary routes move into a
 * separate block at the bottom.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { count, open: openCart } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelId = useId();

  const focusables = useCallback(
    () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ),
    [],
  );

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
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
    };
  }, [open, onClose, focusables]);

  // Close on route change so a tap never leaves the sheet covering the new page.
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: tween(duration.base, ease.out, 0.08 + index * ITEM_STEP),
    }),
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id={panelId}
          className="fixed inset-0 z-[95] flex flex-col bg-espresso-950 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={tween(duration.fast)}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <Logo tone="light" height={28} priority />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-pill border border-cream-100/25 text-cream-100"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-5">
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-4">
            <ul className="flex flex-col">
              {primaryNav.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <motion.li
                    key={item.href}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    className="border-b border-cream-100/10 last:border-b-0"
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-4 py-4"
                    >
                      <span className="w-6 shrink-0 text-[0.6875rem] tabular-nums text-copper-400/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            "block text-[1.5rem] leading-tight display-type transition-colors duration-300",
                            active ? "text-copper-300" : "text-cream-100",
                          )}
                        >
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="mt-1 block max-w-[28ch] text-[0.8125rem] leading-relaxed text-cream-100/55">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.3}
                        className="size-4 shrink-0 self-center text-cream-100/40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                      >
                        <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={tween(duration.slow, ease.out, 0.32)}
            className="mt-auto space-y-5 border-t border-cream-100/10 px-6 py-6"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-cream-100/70">
              <a href={`tel:${contact.phoneHref}`} className="link-wipe">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="link-wipe">
                {contact.email}
              </a>
              <button type="button" onClick={openCart} className="link-wipe">
                Bag{count > 0 ? ` (${count})` : ""}
              </button>
            </div>
            <SocialLinkList links={socialLinks} tone="light" size="sm" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}