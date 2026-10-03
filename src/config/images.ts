/**
 * Espressly — the single image registry.
 * ---------------------------------------------------------------------------
 * Every photograph in the product ships through this file. Components never
 * contain a hard-coded `/images/...` string; they receive an `ImageAsset` from
 * config and render it inside a fixed aspect-ratio box with `fill`, so
 * swapping the file (or dropping in a different crop or orientation) can
 * change composition but never layout, spacing or CLS.
 *
 * Workflow for replacing art direction assets:
 *   1. Drop the new file into the matching `public/images/<folder>/` slot.
 *   2. Update `src` (and `alt` if the subject changed) below.
 *   3. Optionally tune `focus` (object-position) to reframe the crop.
 */

export type ImageAsset = {
  /** Path relative to `/public`. Keep it inside `public/images`. */
  readonly src: string;
  /** Meaningful description. Never decorative filler. */
  readonly alt: string;
  /** Intrinsic size of the current file — used for intrinsic sizing fallbacks. */
  readonly width: number;
  readonly height: number;
  /** CSS `object-position` hint for art-directed crops. */
  readonly focus?: string;
};

const asset = (
  src: string,
  alt: string,
  width: number,
  height: number,
  focus?: string,
): ImageAsset => ({ src, alt, width, height, focus });

/* -------------------------------------------------------------------------
 * Brand
 * ---------------------------------------------------------------------- */
export const brand = {
  logo: {
    /** Full lockup for light surfaces. */
    light: {
      src: "/brand/logo-full.png",
      alt: "Espressly",
      width: 1124,
      height: 512,
    },
    /** Full lockup for dark surfaces. */
    dark: {
      src: "/brand/logo-full-cream.png",
      alt: "Espressly",
      width: 1124,
      height: 512,
    },
    /** Cup-and-steam device, used for compact lockups and favicons. */
    mark: { src: "/brand/logo-mark.png", alt: "Espressly", width: 258, height: 240 },
    markDark: {
      src: "/brand/logo-mark-cream.png",
      alt: "Espressly",
      width: 258,
      height: 240,
    },
  },
} as const;

/* -------------------------------------------------------------------------
 * Hero
 * ---------------------------------------------------------------------- */
export const heroImages = {
  /** Full-bleed opening frame. 16:9, dark, generous negative space. */
  primary: asset(
    "/images/hero/hero-espresso-pour.jpg",
    "Freshly pulled espresso beside a wooden scoop of roasted beans on dark slate",
    1920,
    1100,
    "58% 50%",
  ),
  /** Split-panel companion frame. */
  panel: asset(
    "/images/hero/hero-cafe-bar.jpg",
    "Barista pulling a shot behind the espresso machine at the Espressly bar",
    1920,
    1100,
    "60% 45%",
  ),
  /** Supporting frame used behind the signature-menu band. */
  tertiary: asset(
    "/images/hero/hero-latte-art.jpg",
    "Milk being poured into a cup to build a rosetta latte pattern",
    1920,
    1100,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Editorial / full-bleed bands
 * ---------------------------------------------------------------------- */
export const editorialImages = {
  beans: asset(
    "/images/editorial/editorial-beans.jpg",
    "Roasted coffee beans spread across a dark worktop",
    1920,
    860,
    "50% 50%",
  ),
  pourOver: asset(
    "/images/editorial/editorial-pour-over.jpg",
    "Water poured over a filter cone into a glass server",
    2560,
    1333,
    "50% 50%",
  ),
  pastry: asset(
    "/images/editorial/editorial-pastry.jpg",
    "Freshly baked laminated pastry on a tray beside a cup of coffee",
    1920,
    1004,
    "50% 50%",
  ),
  texture: asset(
    "/images/editorial/editorial-texture.jpg",
    "Faint line drawing of coffee beans on warm paper",
    1920,
    200,
  ),
} as const;

/* -------------------------------------------------------------------------
 * Menu
 * ---------------------------------------------------------------------- */
export const menuImages = {
  banner: asset(
    "/images/menu/menu-hero.jpg",
    "Overhead view of the Espressly counter with cups, grinder and tamping mat",
    1920,
    910,
    "50% 50%",
  ),
  heading: asset(
    "/images/menu/menu-heading.jpg",
    "Warmly lit coffee bar interior with hanging pendant lights",
    2560,
    1000,
    "50% 40%",
  ),
  espresso: asset(
    "/images/lifestyle/lifestyle-02.jpg",
    "Barista tamping espresso into a portafilter",
    1100,
    1065,
    "50% 50%",
  ),
  latte: asset(
    "/images/lifestyle/lifestyle-03.jpg",
    "Latte with a poured tulip pattern in a ceramic cup",
    1100,
    1065,
    "50% 50%",
  ),
  coldBrew: asset(
    "/images/lifestyle/lifestyle-04.jpg",
    "Cold brew coffee poured over ice in a tall glass",
    1100,
    1065,
    "50% 50%",
  ),
  pastry: asset(
    "/images/lifestyle/lifestyle-05.jpg",
    "Almond croissant broken open on a ceramic plate",
    1100,
    1065,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * What we offer
 * ---------------------------------------------------------------------- */
export const serviceImages = {
  banner: asset(
    "/images/services/service-heading.jpg",
    "Long communal table in a warm café interior lit by low evening light",
    2560,
    1000,
    "50% 45%",
  ),
  atelier: asset(
    "/images/services/service-wide-a.jpg",
    "Spoons of ground coffee lined up for a tasting comparison",
    800,
    800,
    "50% 50%",
  ),
  bakery: asset(
    "/images/services/service-wide-b.jpg",
    "Baker shaping dough on a floured wooden bench",
    800,
    800,
    "50% 50%",
  ),
  events: asset(
    "/images/services/service-wide-c.jpg",
    "Guests gathered around a long table during an evening tasting",
    800,
    800,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * About
 * ---------------------------------------------------------------------- */
export const aboutImages = {
  banner: asset(
    "/images/about/about-heading.jpg",
    "Green coffee beans and a notebook on a roastery bench",
    2560,
    1000,
    "50% 45%",
  ),
  origin: asset(
    "/images/about/about-origin.jpg",
    "Barista serving guests at the Espressly counter",
    2560,
    1600,
    "50% 45%",
  ),
  roasting: asset(
    "/images/about/about-roasting.jpg",
    "Roasted coffee cooling in the drum after a batch",
    800,
    545,
    "50% 50%",
  ),
  people: asset(
    "/images/about/about-barista.jpg",
    "Two guests sharing a flat white at a window seat",
    800,
    545,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Shop
 * ---------------------------------------------------------------------- */
export const shopImages = {
  banner: asset(
    "/images/products/shop-heading.jpg",
    "Retail coffee bags, brew gear and a grinder arranged on a shop counter",
    2560,
    1000,
    "50% 45%",
  ),
  /** Square packshots for product cards and the detail gallery. */
  frenchPress: asset(
    "/images/products/product-02.jpg",
    "Glass and matte black cafetière filled with roasted beans",
    800,
    800,
    "50% 50%",
  ),
  espressoCup: asset(
    "/images/products/product-04.jpg",
    "Green ceramic espresso cup with a removable brew basket",
    800,
    800,
    "50% 50%",
  ),
  kettle: asset(
    "/images/products/product-06.jpg",
    "Stainless steel gooseneck kettle with a black handle",
    800,
    800,
    "50% 50%",
  ),
  mokaPot: asset(
    "/images/products/product-09.jpg",
    "Compact stovetop moka pot in brushed steel",
    800,
    800,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Journal
 * ---------------------------------------------------------------------- */
export const journalImages = {
  banner: asset(
    "/images/blog/blog-heading.jpg",
    "Stacked journals and a notebook beside a cup on a linen cloth",
    1920,
    750,
    "50% 50%",
  ),
  brewing: asset(
    "/images/blog/article-01.jpg",
    "Steam rising from a glass carafe as coffee is poured",
    1300,
    1050,
    "50% 50%",
  ),
  origin: asset(
    "/images/blog/article-02.jpg",
    "Coffee cherries being sorted by hand at origin",
    1300,
    1050,
    "50% 50%",
  ),
  latte: asset(
    "/images/blog/article-03.jpg",
    "Hands holding two cups of latte art at a café table",
    1300,
    1050,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Lifestyle / gallery
 * ---------------------------------------------------------------------- */
export const lifestyleImages = {
  gallery: [
    asset(
      "/images/lifestyle/lifestyle-01.jpg",
      "Hands pouring steamed milk into a cup at the bar",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-02.jpg",
      "Coffee being tamped into a portafilter basket",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-03.jpg",
      "Milk poured into a finished latte with a tulip pattern",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-04.jpg",
      "Cold brew coffee poured over a tall glass of ice",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-05.jpg",
      "A pastry served alongside a filter coffee on a wooden table",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-06.jpg",
      "Guests talking over coffee in a sunlit corner",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-07.jpg",
      "A barista checking the grind setting on an espresso grinder",
      1100,
      1065,
      "50% 50%",
    ),
    asset(
      "/images/lifestyle/lifestyle-08.jpg",
      "Two filter coffees and an espresso set on a marble counter",
      1100,
      1065,
      "50% 50%",
    ),
  ],
} as const;

/* -------------------------------------------------------------------------
 * Contact
 * ---------------------------------------------------------------------- */
export const contactImages = {
  banner: asset(
    "/images/contact/contact-heading.jpg",
    "Espressly counter with a brass espresso machine and stacked cups",
    2560,
    1000,
    "50% 45%",
  ),
} as const;

/**
 * Derive an art-directed variant of an existing asset.
 *
 * Used where one photograph serves two purposes (for example a product packshot
 * and its hover frame) and only the crop or the description differs. Keeps a
 * single source per file while letting each slot declare its own framing.
 */
export function withImage(
  base: ImageAsset,
  overrides: Partial<ImageAsset> = {},
): ImageAsset {
  return { ...base, ...overrides };
}