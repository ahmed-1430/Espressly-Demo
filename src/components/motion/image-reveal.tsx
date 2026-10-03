"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/cn";
import { duration, ease, tween, viewportEarly } from "@/lib/motion";
import { Media } from "@/components/ui/media";

type ImageRevealProps = {
  image: ImageAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
  fit?: "cover" | "contain";
  quality?: number;
  /**
   * Direction the mask curtain travels from.
   * `up` is the default editorial reveal; `left` reads as a page turn.
   */
  from?: "up" | "down" | "left" | "right";
  /** Slow scale from 1.08 → 1 as the curtain lifts. */
  scale?: number;
  delay?: number;
  /** Swaps to a still frame for reduced motion. */
  placeholderTone?: "dark" | "light";
};

const hidden: Record<NonNullable<ImageRevealProps["from"]>, { clipPath: string }> = {
  up: { clipPath: "inset(100% 0% 0% 0%)" },
  down: { clipPath: "inset(0% 0% 100% 0%)" },
  left: { clipPath: "inset(0% 0% 0% 100%)" },
  right: { clipPath: "inset(0% 100% 0% 0%)" },
};

/**
 * Curtain reveal: a clip-path panel lifts while the photograph settles from a
 * slight overscale. Only `clip-path` and `transform` are animated, both of
 * which the compositor can handle without layout work.
 */
export function ImageReveal({
  image,
  className,
  imgClassName,
  sizes,
  priority = false,
  ratio,
  fit,
  quality,
  from = "up",
  scale = 1.08,
  delay = 0,
  placeholderTone,
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);

  if (reduce) {
    return (
      <Media
        image={image}
        className={className}
        imgClassName={imgClassName}
        sizes={sizes}
        priority={priority}
        ratio={ratio}
        fit={fit}
        quality={quality}
        {...(placeholderTone ? { placeholderTone } : {})}
      />
    );
  }

  return (
    <motion.div
      ref={frame}
      data-reveal=""
      className={cn("overflow-hidden", className)}
      initial={hidden[from]}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewportEarly}
      transition={tween(duration.reveal, ease.inOut, delay)}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale }}
        whileInView={{ scale: 1 }}
        viewport={viewportEarly}
        transition={tween(duration.cinematic, ease.out, delay)}
      >
        <Media
          image={image}
          className="h-full w-full"
          imgClassName={imgClassName}
          sizes={sizes}
          priority={priority}
          {...(ratio ? { ratio } : {})}
          {...(fit ? { fit } : {})}
          {...(quality ? { quality } : {})}
          {...(placeholderTone ? { placeholderTone } : {})}
        />
      </motion.div>
    </motion.div>
  );
}
