import Image from "next/image";
import type { ImageAsset } from "@/config/images";
import { cn } from "@/lib/cn";

type MediaProps = {
  image: ImageAsset;
  /** Applied to the sizing frame — usually the aspect-ratio box. */
  className?: string;
  imgClassName?: string;
  /** Responsive `sizes` hint. Defaults to full viewport width. */
  sizes?: string;
  priority?: boolean;
  /**
   * CSS aspect ratio for the frame, e.g. `"4 / 3"`. Defaults to the asset's
   * intrinsic ratio so nothing shifts while decoding.
   */
  ratio?: string;
  /**
   * Fill the parent instead of reserving an intrinsic ratio. Use inside
   * parallax or masked frames that already control their own height.
   */
  fill?: boolean;
  fit?: "cover" | "contain";
  quality?: number;
  /** Renders a flat colour wash behind the image while it decodes. */
  placeholderTone?: "dark" | "light";
};

/**
 * The only place `next/image` is instantiated for photography.
 *
 * Every frame reserves its space with an explicit aspect ratio, so swapping the
 * underlying file for a different orientation crops rather than shifts layout.
 *
 * `ImageAsset.plate` opts a slot into the packshot treatment: the image is
 * multiplied into the frame's own paper colour, so a supplier's flat-white
 * studio background disappears instead of reading as an unfilled rectangle
 * once it is cropped into a cream card. Declared in config rather than passed at
 * the call site, so swapping in a real packshot needs no component changes.
 *
 * Two deliberate choices, both of which came out of looking at the result:
 *
 *  - The frame still crops (`cover`) rather than containing with an inset. A
 *    square packshot contained inside a 4:5 frame floats small in a mostly empty
 *    cream rectangle, which reads as a missing image. Cropping only trims the
 *    outer margin, which is white anyway once it is multiplied out.
 *  - The plate is forced light. Multiplying onto a dark surface would render the
 *    whole packshot black, so this must not depend on the caller passing
 *    `placeholderTone="light"`.
 */
export function Media({
  image,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  ratio,
  fill = false,
  fit = "cover",
  quality = 78,
  placeholderTone = "dark",
}: MediaProps) {
  const plate = image.plate === true;
  const style: React.CSSProperties = fill
    ? {}
    : { aspectRatio: ratio ?? `${image.width} / ${image.height}` };

  return (
    <div
      className={cn(
        /* `fill` is used inside frames that already own their height. An
           absolutely-positioned root fills that frame without feeding a
           percentage height back into it — which is what made an aspect-ratio
           frame compute double height while its image was still decoding. */
        fill ? "absolute inset-0 isolate overflow-hidden" : "relative isolate overflow-hidden",
        plate ? "bg-sand-100" : placeholderTone === "dark" ? "bg-espresso-800" : "bg-sand-100",
        className,
      )}
      style={style}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={cn(
          fit === "contain" ? "object-contain" : "object-cover",
          plate && "mix-blend-multiply",
          imgClassName,
        )}
        style={{ objectPosition: image.focus ?? "50% 50%" }}
      />
    </div>
  );
}