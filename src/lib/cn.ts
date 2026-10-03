import { twMerge } from "tailwind-merge";

export type ClassValue = string | false | null | undefined;

/**
 * Class name joiner.
 *
 * Backed by `tailwind-merge` so a caller's `className` reliably overrides a
 * component's defaults. Without it, two competing Tailwind utilities in the
 * same group (for example a component's `relative` and a caller's `absolute`)
 * both land in the stylesheet and the winner depends on CSS order rather than
 * intent — which silently broke every absolutely-positioned parallax frame.
 */
export function cn(...values: ClassValue[]): string {
  return twMerge(values.filter(Boolean).join(" "));
}