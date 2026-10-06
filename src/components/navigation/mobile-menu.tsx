"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
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

/**
 * Full-screen navigation for viewports below `lg`.
 *
 * Recomposed rather than shrunken: a numbered editorial index in the site's
 * display face, with the route descriptor set underneath and the utilities
 * anchored to the bottom of the sheet.
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

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-overlay flex flex-col overflow-y-auto bg-espresso-950 text-cream-100 lg:hidden"
          data-tone="dark"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={tween(reduce ? 0 : duration.base, ease.inOut)}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <Logo tone="light" height={28} priority />
            <button
              type="button"
              onClick={onClose}
              className="group/close inline-flex h-10 items-center gap-2 rounded-pill border border-cream-100/25 px-4 text-cream-100 transition-colors duration-300 hover:border-cream-100 hover:bg-cream-100 hover:text-ink-950"
            >
              <span className="font-mono text-eyebrow uppercase tracking-[0.14em]">Close</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="size-3.5">
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 px-5 pt-6 sm:px-8">
            <ul className="flex flex-col">
              {primaryNav.map((item, index) => {
                const active = pathname === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={reduce ? undefined : { opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={tween(duration.base, ease.out, 0.1 + index * 0.045)}
                    className="border-b border-cream-100/10"
                  >
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="group/link grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-3 py-4"
                    >
                      <span
                        className={cn(
                          "font-mono text-[0.625rem] tabular-nums tracking-[0.1em]",
                          active ? "text-copper-400" : "text-cream-100/35",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block text-title-lg leading-none transition-colors duration-300",
                            active
                              ? "text-copper-300"
                              : "text-cream-100 group-hover/link:text-copper-300",
                          )}
                        >
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="mt-1.5 block max-w-[30ch] text-body-sm leading-snug text-cream-100/45">
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
                        className="size-4 self-center text-cream-100/30 transition-transform duration-500 ease-out-expo group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      >
                        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tween(duration.slow, ease.out, 0.42)}
            className="mt-8 space-y-5 border-t border-cream-100/10 px-5 py-6 sm:px-8"
          >
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-cream-100/70">
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
