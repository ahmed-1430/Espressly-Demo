import { extendTailwindMerge } from "tailwind-merge";

export type ClassValue = string | false | null | undefined;

/**
 * Every name in the type scale declared as `--text-*` in `src/app/globals.css`.
 *
 * This list has to exist because `tailwind-merge` classifies an unfamiliar
 * `text-*` utility as a *colour*, not a font size. Left unconfigured, any
 * `cn("text-display-2xs", "text-ink-900")` collapsed to `text-ink-900`: the size
 * was discarded as a duplicate of the colour and the element silently fell back
 * to inherited body size. That is not a rare edge case — essentially every text
 * element in the site pairs a type token with a colour, so the entire typographic
 * hierarchy was collapsing to one size.
 *
 * Kept honest by `npm run check:type-tokens`, which fails the build if this list
 * and the `@theme` block drift apart.
 */
const TYPE_SCALE = [
  "micro",
  "eyebrow",
  "caption",
  "meta",
  "body-sm",
  "body",
  "body-md",
  "body-lg",
  "title-xs",
  "title-sm",
  "title-md",
  "title-lg",
  "title-xl",
  "lede",
  "display-2xs",
  "display-xs",
  "display-sm",
  "display-lg",
  "display-xl",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TYPE_SCALE] }],
    },
  },
});

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