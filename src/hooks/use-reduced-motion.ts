"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * SSR-safe `prefers-reduced-motion`.
 *
 * Motion's own hook reads the media query on the first client render, while the
 * server has no media query to read. When the preference is set, the first
 * client tree differs from the server tree — Motion's `initial` styles and
 * conditional animation markup get out of sync and React reports a hydration
 * mismatch.
 *
 * `useSyncExternalStore` deliberately returns `false` from its server snapshot
 * during hydration, then switches to the real media query once the tree is
 * mounted. Animations still settle on their final state; reduced-motion users
 * skip the travel instead of receiving a tree React cannot reconcile.
 */
function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
