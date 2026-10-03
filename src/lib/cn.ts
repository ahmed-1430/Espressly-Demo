export type ClassValue = string | false | null | undefined;

/**
 * Tiny class name joiner. Deliberately not a `clsx` dependency — the site only
 * ever passes strings, and a 200-byte helper beats an extra package.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}