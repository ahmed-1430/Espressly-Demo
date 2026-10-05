import { cn } from "@/lib/cn";

type SeparatorMarkProps = {
  className?: string;
  /** `light` for dark surfaces. */
  tone?: "dark" | "light";
  /**
   * Width of each rule flanking the mark. The reference sets a fixed 30px
   * rule either side of a 189 x 24 mark; both scale together so the ornament
   * keeps its proportions at any size.
   */
  classNameRule?: string;
};

/**
 * The section-title ornament: rule — mark — rule.
 *
 * The reference draws this as two 30px rules with a 189 x 24 coffee motif
 * centred between them, 3px thick. It appears under almost every section
 * heading on the site, which is why it is one component rather than something
 * each section redraws.
 *
 * Drawn in CSS and SVG rather than shipped as an image so it inherits the
 * accent colour, scales with the type, and costs no request. The motif is a
 * pair of stylised coffee beans either side of a centre rule, matching the
 * reference's silhouette without tracing it.
 */
export function SeparatorMark({
  className,
  tone = "dark",
  classNameRule = "h-[3px] w-[30px]",
}: SeparatorMarkProps) {
  const rule = tone === "dark" ? "bg-ink-900/70" : "bg-cream-100/70";
  const bean = tone === "dark" ? "fill-copper-500" : "fill-copper-300";
  const stem = tone === "dark" ? "stroke-copper-500" : "stroke-copper-300";

  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center gap-4", className)}
    >
      <span className={cn("block shrink-0", classNameRule, rule)} />

      <svg
        viewBox="0 0 189 24"
        fill="none"
        className="h-[18px] w-auto shrink-0"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* left bean */}
        <ellipse
          cx="17"
          cy="12"
          rx="9.5"
          ry="10.5"
          transform="rotate(-28 17 12)"
          className={bean}
        />
        <path
          d="M17 2.2c-4.6 5.4-4.6 14.2 0 19.6"
          className={cn(stem, "opacity-70")}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* centre flourish */}
        <path
          d="M60 12h69"
          className={cn(stem, "opacity-60")}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M94.5 6.5 99 12l-4.5 5.5L90 12z"
          className={bean}
        />
        {/* right bean */}
        <ellipse
          cx="172"
          cy="12"
          rx="9.5"
          ry="10.5"
          transform="rotate(28 172 12)"
          className={bean}
        />
        <path
          d="M172 2.2c4.6 5.4 4.6 14.2 0 19.6"
          className={cn(stem, "opacity-70")}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>

      <span className={cn("block shrink-0", classNameRule, rule)} />
    </div>
  );
}