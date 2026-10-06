import { Marquee } from "@/components/motion/marquee";
import { marqueeWords } from "@/config/navigation";

/**
 * Rotating band of brand promises.
 *
 * A dark instrument strip between the hero and the argument: display-face
 * words, ember asterisks, and enough air that it reads as a considered pause
 * rather than decoration.
 */
export function MarqueeBand() {
  return (
    <div className="border-y border-cream-100/10 bg-ink-950 py-5 text-cream-100">
      <Marquee
        items={marqueeWords}
        durationSeconds={42}
        separator={
          <span aria-hidden className="text-copper-400">
            ✳
          </span>
        }
        className="font-display text-title-xs italic tracking-[-0.01em] text-cream-100/85 sm:text-title-sm"
      />
    </div>
  );
}

/** Same treatment inverted, for use on the dark espresso bands. */
export function MarqueeBandDark() {
  return (
    <div className="border-y border-cream-100/10 bg-ink-950 py-5 text-cream-100">
      <Marquee
        items={marqueeWords}
        durationSeconds={46}
        reverse
        separator={
          <span aria-hidden className="text-copper-400">
            ✳
          </span>
        }
        className="font-display text-title-xs italic tracking-[-0.01em] text-cream-100/85 sm:text-title-sm"
      />
    </div>
  );
}
