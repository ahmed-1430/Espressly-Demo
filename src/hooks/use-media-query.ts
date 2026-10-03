"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook.
 *
 * Returns `false` on the server and during the first client render so markup
 * matches, then settles to the real value in an effect. Layouts therefore never
 * flash between mobile and desktop arrangements.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Tailwind's `lg` breakpoint, for JS that must mirror the CSS grid. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");