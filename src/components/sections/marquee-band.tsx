import { Marquee } from "@/components/motion/marquee";
import { marqueeWords } from "@/config/navigation";

/** Thin rotating band of brand promises, used as a section separator. */
export function MarqueeBand() {
  return (
    <div className="border-y border-line-light bg-sand-100 py-4 text-ink-900">
      <Marquee
        items={marqueeWords}
        className="font-sans text-caption uppercase tracking-[0.24em] text-ink-900/70"
      />
    </div>
  );
}

/** Same treatment inverted, for use on the dark espresso bands. */
export function MarqueeBandDark() {
  return (
    <div className="border-y border-cream-100/12 bg-ink-950 py-4 text-cream-100">
      <Marquee
        items={marqueeWords}
        durationSeconds={44}
        className="font-sans text-caption uppercase tracking-[0.24em] text-cream-100/55"
      />
    </div>
  );
}