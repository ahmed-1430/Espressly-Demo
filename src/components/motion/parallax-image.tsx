"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
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
 * The moving layer is deliberately `2 × travel` taller than its frame and
 * offset by `-travel`, so its edges never enter the viewport. Only a
 * composited transform runs while scrolling — no layout, no reflow.
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
  const y = useTransform(smooth, [0, 1], [`-${travel}px`, `${travel}px`]);

  const frameStyle: CSSProperties = {
    aspectRatio: ratio ?? `${image.width} / ${image.height}`,
  };

  const layerStyle: CSSProperties = reduce
    ? { height: "100%" }
    : { height: `calc(100% + ${travel * 2}px)`, top: -travel };

  const moving = (
    <motion.div className="absolute inset-x-0" style={layerStyle}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { y }}>
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
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
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