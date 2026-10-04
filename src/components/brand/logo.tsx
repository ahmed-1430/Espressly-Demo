import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/images";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** `dark` = dark ink for light surfaces, `light` = cream for dark surfaces. */
  tone?: "dark" | "light";
  className?: string;
  /** Rendered height in `rem`; width follows the lockup's intrinsic ratio. */
  height?: number;
  priority?: boolean;
  /** Renders the compact cup-and-steam mark instead of the full lockup. */
  markOnly?: boolean;
};

/**
 * Brand lockup.
 * ---------------------------------------------------------------------------
 * Both variants come from `scripts/build-logo-assets.mjs`, which derives a
 * transparent colour version and a cream silhouette from the single source file
 * in `resource/`. To swap the logo: replace that file, re-run the script, then
 * update the two paths in `src/config/images.ts` if the file names changed.
 */
export function Logo({
  tone = "dark",
  className,
  height = 34,
  priority = false,
  markOnly = false,
}: LogoProps) {
  const asset =
    markOnly
      ? tone === "dark"
        ? brand.logo.mark
        : brand.logo.markDark
      : tone === "dark"
        ? brand.logo.light
        : brand.logo.dark;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group/logo inline-flex items-center outline-offset-8",
        className,
      )}
    >
      <span
        className="relative block overflow-hidden transition-[filter,opacity] duration-700 ease-out-expo"
        style={{ height: `${height}px`, width: `${(height * asset.width) / asset.height}px` }}
      >
        <Image
          src={asset.src}
          alt={site.name}
          width={asset.width}
          height={asset.height}
          priority={priority}
          sizes={`${Math.round((height * asset.width) / asset.height)}px`}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </span>
    </Link>
  );
}