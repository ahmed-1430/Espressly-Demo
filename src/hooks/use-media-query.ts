"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook.
 *
 * Built on `useSyncExternalStore` so the value is read from the browser during
 * render (no `setState` inside an effect, no cascading render), while
 * `getServerSnapshot` keeps the server and the first client render identical.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === "undefined") return () => {};
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => (typeof window === "undefined" ? false : window.matchMedia(query).matches),
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Mirrors Tailwind's `lg` breakpoint for JS that must match the CSS grid. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");