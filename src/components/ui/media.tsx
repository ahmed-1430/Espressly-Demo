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
 * `ImageAsset.plate` opts a slot into the packshot treatment — contained with an
 * inset and multiplied into the frame's own colour — which is what stops a
 * supplier's flat-white studio background from reading as an unfilled
 * placeholder once it is cropped into a cream card. It is declared in config
 * rather than passed at the call site, so swapping in a real packshot needs no
 * component changes.
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
        "relative isolate overflow-hidden",
        placeholderTone === "dark" ? "bg-espresso-800" : "bg-sand-100",
        plate && "p-[7%]",
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
          fit === "contain" || plate ? "object-contain" : "object-cover",
          plate && "mix-blend-multiply",
          imgClassName,
        )}
        style={{ objectPosition: image.focus ?? "50% 50%" }}
      />
    </div>
  );
}