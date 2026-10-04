import type { SocialLink } from "@/config/navigation";
import { cn } from "@/lib/cn";

const paths: Record<SocialLink["icon"], string> = {
  instagram:
    "M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm4.5 5.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm5.25-.75h.008v.008H17.25V7.5Z",
  facebook:
    "M13.5 21v-7.5h2.5l.5-3h-3V8.75c0-.86.24-1.5 1.5-1.5h1.5V4.5A22 22 0 0 0 14.25 4C12 4 10.5 5.4 10.5 8.25V10.5H8v3h2.5V21h3Z",
  pinterest:
    "M12 3a9 9 0 0 0-3.3 17.37c-.08-.72-.15-1.83.03-2.62.17-.72 1.1-4.6 1.1-4.6s-.28-.56-.28-1.4c0-1.31.76-2.29 1.7-2.29.8 0 1.19.6 1.19 1.33 0 .8-.52 2.02-.78 3.14-.22.94.47 1.7 1.4 1.7 1.68 0 2.97-1.77 2.97-4.33 0-2.26-1.63-3.85-3.95-3.85-2.69 0-4.28 2.02-4.28 4.1 0 .81.32 1.69.72 2.16a.28.28 0 0 1 .06.27l-.27 1.1c-.04.17-.13.2-.31.12-1.15-.53-1.86-2.2-1.86-3.55 0-2.89 2.1-5.55 6.05-5.55 3.18 0 5.65 2.27 5.65 5.3 0 3.16-2 5.7-4.77 5.7-.93 0-1.8-.48-2.1-1.06l-.57 2.18c-.2.79-.76 1.78-1.14 2.38A9 9 0 1 0 12 3Z",
  spotify:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.6 12.9a.6.6 0 0 1-.83.2 6.9 6.9 0 0 0-6.1-1.04 6.2 6.2 0 0 0-1.5.45.6.6 0 1 1-.34-1.14 7.5 7.5 0 0 1 1.83-.55 7.5 7.5 0 0 1 6.6 1.13c.3.18.38.58.2.85Zm1.3-2.6a.75.75 0 0 1-1.03.24 8.9 8.9 0 0 0-7.9-1.34.75.75 0 1 1-.44-1.43 10.4 10.4 0 0 1 9.13 1.55c.35.22.45.68.24 1.03Zm.1-2.72a9.9 9.9 0 0 0-9.5-1.6.9.9 0 1 1-.54-1.72 11.7 11.7 0 0 1 11.14 1.86.9.9 0 1 1-1.1 1.44Z",
};

/** Inline brand glyph. Decorative by default; the parent link carries the name. */
export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("size-4", className)}
    >
      <path d={paths[icon]} />
    </svg>
  );
}

export function SocialLinkList({
  links,
  className,
  tone = "dark",
  size = "md",
}: {
  links: readonly SocialLink[];
  className?: string;
  tone?: "dark" | "light";
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <li key={link.icon}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center rounded-pill border transition-colors duration-400 ease-out-expo",
              size === "sm" ? "size-9" : "size-10",
              tone === "dark"
                ? "border-ink-900/15 text-ink-900 hover:border-copper-600 hover:text-copper-700"
                : "border-cream-100/25 text-cream-100 hover:border-copper-400 hover:text-copper-300",
            )}
          >
            <SocialIcon icon={link.icon} className={size === "sm" ? "size-3.5" : "size-4"} />
            <span className="sr-only">{`${link.label} (opens in a new tab)`}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}