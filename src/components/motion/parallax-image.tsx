"use client";

import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useRef } from "react";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/cn";
import { ease, tween } from "@/lib/motion";
import { Media } from "@/components/ui/media";

type ParallaxImageProps = {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  /** CSS aspect ratio of the frame. Defaults to the asset's intrinsic ratio. */
  ratio?: string;
  /** Pixels of vertical travel across the scroll range. */
  travel?: number;
  priority?: boolean;
  quality?: number;
  /** Applies the curtain reveal before parallax engages. */
  reveal?: boolean;
  revealFrom?: "up" | "left" | "right" | "down";
  /**
   * Mount-time entrance.
   *
   * `settle` starts the frame slightly overscaled and eases it back, which
   * reads as the photograph coming to rest rather than as an animation playing.
   * It is deliberately a transform rather than a curtain: a clip reveal on a
   * `priority` image would hold back Largest Contentful Paint, whereas a scale
   * settles while the bitmap is already on screen.
   */
  entrance?: "none" | "settle";
  placeholderTone?: "dark" | "light";
};

const clipFor = (from: NonNullable<ParallaxImageProps["revealFrom"]>) => {
  switch (from) {
    case "left":
      return "inset(0% 0% 0% 100%)";
    case "right":
      return "inset(0% 100% 0% 0%)";
    case "down":
      return "inset(0% 0% 100% 0%)";
    default:
      return "inset(100% 0% 0% 0%)";
  }
};

/**
 * Scroll-linked parallax inside a fixed frame.
 *
 * The moving layer is over-scanned by `2 × travel` and offset by `-travel`, so
 * its edges never enter the viewport. Only a composited transform runs while
 * scrolling — no layout, no reflow.
 *
 * Both the over-scan and the offset are expressed against `--parallax-travel`,
 * which globals.css zeroes out below `lg`. That disables the effect on phones
 * without a JS breakpoint, and because the over-scan is derived from the same
 * variable the frame falls back to an exact crop rather than a cropped-and-
 * scaled one.
 */
export function ParallaxImage({
  image,
  className,
  imgClassName,
  sizes,
  ratio,
  travel = 70,
  priority = false,
  quality,
  reveal = false,
  revealFrom = "up",
  entrance = "none",
  placeholderTone,
}: ParallaxImageProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  /* Unitless, so the same value can be scaled by whatever travel the current
     breakpoint allows. `useMotionTemplate` builds the length from it — a motion
     value cannot be written straight into a CSS variable, and doing so
     silently stringifies to "[object Object]", which invalidates the calc and
     kills the effect. */
  const shift = useTransform(smooth, [0, 1], [-1, 1]);
  const y = useMotionTemplate`calc(${shift} * var(--parallax-travel))`;

  const frameStyle = {
    aspectRatio: ratio ?? `${image.width} / ${image.height}`,
    "--travel-desktop": reduce ? "0px" : `${travel}px`,
  } as CSSProperties;

  const settle = entrance === "settle" && !reduce;

  const moving = (
    <div
      className="absolute inset-x-0"
      style={{
        top: "calc(-1 * var(--parallax-travel))",
        height: "calc(100% + 2 * var(--parallax-travel))",
      }}
    >
      <motion.div className="h-full w-full" style={reduce ? undefined : { y }}>
        {/* Separate node from the scroll layer on purpose: both write
            `transform`, so they cannot share an element. */}
        <motion.div
          className="h-full w-full"
          initial={settle ? { scale: 1.07 } : false}
          animate={{ scale: 1 }}
          transition={settle ? tween(1.7, ease.out) : undefined}
        >
          <Media
            image={image}
            fill
            className="h-full w-full"
            imgClassName={imgClassName}
            sizes={sizes}
            priority={priority}
            {...(quality ? { quality } : {})}
            {...(placeholderTone ? { placeholderTone } : {})}
          />
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn("parallax-frame relative overflow-hidden", className)}
      style={frameStyle}
    >
      {reveal && !reduce ? (
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: clipFor(revealFrom) }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.15 }}
          transition={tween(1.35, ease.inOut)}
        >
          {moving}
        </motion.div>
      ) : (
        moving
      )}
    </div>
  );
}