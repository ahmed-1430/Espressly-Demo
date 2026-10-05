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
 *
 * Art direction rules encoded here:
 *   - `banners` are the darkest frames in the library, because cream type sits
 *     on top of them. Never assign a high-key image to a banner slot.
 *   - No photograph appears twice on the same page. Where a section needs a
 *     supporting frame it draws from `lifestyle` rather than reusing the
 *     banner.
 *   - `focus` is set wherever a crop would otherwise slice through the subject.
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
  /**
   * A cut-out product shot rather than a photograph of a scene.
   *
   * Retail packshots arrive on a flat white or pale studio background. Cropped
   * flush into a cream card that white reads as an unfilled placeholder, so
   * these are presented on the brand's own warm plate instead: the frame holds
   * the image contained with generous inset, and the image is multiplied into
   * the plate so the studio background disappears rather than showing as a
   * white rectangle. A future packshot supplied as a transparent PNG works
   * unchanged, because multiply is a no-op over the plate colour.
   */
  readonly plate?: boolean;
};

const asset = (
  src: string,
  alt: string,
  width: number,
  height: number,
  focus?: string,
  plate?: boolean,
): ImageAsset => ({ src, alt, width, height, focus, plate });

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
 * Decorative — never content, never announced
 * ---------------------------------------------------------------------- */
export const decorativeImages = {
  /** Warm paper with a faint bean engraving. Used as a very light wash. */
  paper: asset(
    "/images/decorative/paper-beans.jpg",
    "",
    1920,
    860,
  ),
} as const;

/* -------------------------------------------------------------------------
 * Hero slides
 * ----------------------------------------------------------------------
 * The reference opens the site on a fullscreen slider carrying three to four
 * slides, each a large photograph with an uppercase display heading, a short
 * line of copy and a call to action. These are the Espressly equivalent:
 * three slides, all replaceable from this one file.
 *
 * Art direction: the reference runs its hero fullscreen with type centred over
 * the image, so each frame needs a calm centre and its subject away from the
 * middle. Dark frames are preferred because white display type sits on them.
 */
export const heroSlides = [
  {
    id: "art-of-coffee",
    title: "The Art of Coffee",
    description:
      "Sourced in season, roasted in small batches and brewed to the bean rather than to the machine.",
    image: asset(
      "/images/hero/hero-espresso-pour.jpg",
      "Freshly pulled espresso beside a wooden scoop of roasted beans on dark slate",
      1920,
      1100,
      "58% 50%",
    ),
    cta: { label: "Explore the menu", href: "/menu" },
  },
  {
    id: "brewed-with-intention",
    title: "Brewed with Intention",
    description:
      "Twelve kilos at a time, rested four days, and tasted twice before it is allowed near a cup.",
    image: asset(
      "/images/editorial/editorial-pour-over.jpg",
      "Water poured in a thin spiral over a filter cone into a glass server",
      2560,
      1333,
      "50% 52%",
    ),
    cta: { label: "See the coffee", href: "/shop" },
  },
  {
    id: "daily-ritual",
    title: "Your Daily Ritual",
    description:
      "A quiet room on the old quay, a short menu, and nobody ever rushed out of a seat.",
    image: asset(
      "/images/hero/hero-cafe-bar.jpg",
      "Barista pulling a shot behind the espresso machine at the Espressly bar",
      1920,
      1100,
      "55% 45%",
    ),
    cta: { label: "Find us", href: "/contact" },
  },
] as const;

/* -------------------------------------------------------------------------
 * Banners — full-bleed frames that carry cream display type
 * ---------------------------------------------------------------------- */
export const bannerImages = {
  /** Home hero. Subject sits left, the right third is empty slate. */
  home: asset(
    "/images/hero/hero-espresso-pour.jpg",
    "Freshly pulled espresso beside a wooden scoop of roasted beans on dark slate",
    1920,
    1100,
    "62% 52%",
  ),
  /** /menu — a dim room before service. */
  menu: asset(
    "/images/menu/menu-heading.jpg",
    "Café interior in low light, empty tables set for morning service",
    2560,
    1000,
    "50% 60%",
  ),
  /** /what-we-offer — the machine is the product. */
  services: asset(
    "/images/services/service-heading.jpg",
    "Espresso machine group head mid-extraction, chrome catching the bar light",
    2560,
    1000,
    "50% 45%",
  ),
  /** /shop — the retail range. */
  shop: asset(
    "/images/products/shop-heading.jpg",
    "Coffee gear, a grinder and a wooden counter set up for retail",
    2560,
    1000,
    "50% 50%",
  ),
  /** /blog — warm, but with enough shadow for cream type. */
  blog: asset(
    "/images/lifestyle/lifestyle-06.jpg",
    "A guest laughing over a coffee at a shared table in a warm café",
    1100,
    1065,
    "55% 40%",
  ),
  /** /about — the roastery bench. */
  about: asset(
    "/images/about/about-heading.jpg",
    "The Espressly roastery bench under low light during a roast day",
    2560,
    1000,
    "50% 50%",
  ),
  /** /contact — the counter you actually walk up to. */
  contact: asset(
    "/images/contact/contact-heading.jpg",
    "The Espressly service counter with the machine and stacked cups behind it",
    2560,
    1000,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Home hero supporting frames
 * ---------------------------------------------------------------------- */
export const heroImages = {
  /** Small "on the bar today" plate inside the hero. */
  plate: asset(
    "/images/hero/hero-cafe-bar.jpg",
    "Barista pulling a shot behind the espresso machine at the Espressly bar",
    1920,
    1100,
    "62% 45%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Editorial — full-bleed bands and statement frames
 * ---------------------------------------------------------------------- */
export const editorialImages = {
  /** Brand statement band: slow, dark, contemplative. */
  statement: asset(
    "/images/editorial/editorial-pour-over.jpg",
    "Water poured in a thin spiral over a filter cone into a glass server",
    2560,
    1333,
    "50% 55%",
  ),
  /** Craft band: the finished cup, backlit. */
  craft: asset(
    "/images/hero/hero-latte-art.jpg",
    "A heart drawn in a fresh espresso, seen from directly above",
    1920,
    1100,
    "50% 45%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Menu
 * ---------------------------------------------------------------------- */
export const menuImages = {
  espresso: asset(
    "/images/lifestyle/lifestyle-02.jpg",
    "Ground coffee tamped level into a portafilter basket",
    1100,
    1065,
    "50% 50%",
  ),
  milk: asset(
    "/images/lifestyle/lifestyle-03.jpg",
    "Steamed milk poured into a finished latte to build the rosetta",
    1100,
    1065,
    "50% 50%",
  ),
  coldBrew: asset(
    "/images/lifestyle/lifestyle-04.jpg",
    "Cold brew coffee poured over a tall glass of ice",
    1100,
    1065,
    "50% 50%",
  ),
  pastry: asset(
    "/images/lifestyle/lifestyle-05.jpg",
    "A laminated pastry served beside a filter coffee on a wooden table",
    1100,
    1065,
    "50% 50%",
  ),
  /** Spare frame for the closing band. */
  counter: asset(
    "/images/about/about-origin.jpg",
    "Guests being served at the Espressly counter",
    2560,
    1600,
    "50% 40%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * What we offer
 * ---------------------------------------------------------------------- */
export const serviceImages = {
  /** Tasting comparison — the coffee programme chapter. */
  tasting: asset(
    "/images/services/service-wide-a.jpg",
    "Spoons of ground coffee laid out for a side-by-side tasting",
    800,
    800,
    "50% 50%",
  ),
  /** Kitchen — laminated by hand before four. */
  kitchen: asset(
    "/images/services/service-wide-b.jpg",
    "A pastry and a cup served together on a wooden board",
    800,
    800,
    "50% 50%",
  ),
  /** Private events — a room with people in it. */
  events: asset(
    "/images/services/service-wide-c.jpg",
    "Guests gathered around a table during an evening tasting",
    800,
    800,
    "50% 50%",
  ),
  /** Wholesale and catering — the bar at work. */
  bar: asset(
    "/images/lifestyle/lifestyle-08.jpg",
    "Two filter coffees and an espresso set out on a marble counter",
    1100,
    1065,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * About
 * ---------------------------------------------------------------------- */
export const aboutImages = {
  origin: asset(
    "/images/about/about-origin.jpg",
    "Guests being served at the Espressly counter",
    2560,
    1600,
    "50% 40%",
  ),
  roasting: asset(
    "/images/about/about-roasting.jpg",
    "A roaster working a batch at the Espressly drum",
    800,
    545,
    "50% 50%",
  ),
  people: asset(
    "/images/about/about-barista.jpg",
    "Two guests sharing a coffee at a window seat",
    800,
    545,
    "50% 50%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Shop
 * ---------------------------------------------------------------------- */
export const shopImages = {
  /** Square packshots for gear. They arrive on white, so `plate` presents them
      on the brand's warm paper instead of cropping the white into the card. */
  cafetiere: asset(
    "/images/products/product-02.jpg",
    "Glass and matte black cafetière filled with roasted beans",
    800,
    800,
    "50% 50%",
    true,
  ),
  espressoCup: asset(
    "/images/products/product-04.jpg",
    "Green ceramic espresso cup with its brew basket alongside",
    800,
    800,
    "50% 50%",
    true,
  ),
  kettle: asset(
    "/images/products/product-06.jpg",
    "Stainless steel gooseneck kettle with a black handle",
    800,
    800,
    "50% 50%",
    true,
  ),
  mokaPot: asset(
    "/images/products/product-09.jpg",
    "Compact stovetop moka pot in brushed steel",
    800,
    800,
    "50% 50%",
    true,
  ),
} as const;

/* -------------------------------------------------------------------------
 * Journal
 * ---------------------------------------------------------------------- */
export const journalImages = {
  brewing: asset(
    "/images/blog/article-01.jpg",
    "Steam lifting off a glass carafe as filter coffee is poured",
    1300,
    1050,
    "50% 50%",
  ),
  origin: asset(
    "/images/blog/article-02.jpg",
    "Two colleagues comparing cups over a laptop at the bar",
    1300,
    1050,
    "50% 45%",
  ),
  latte: asset(
    "/images/blog/article-03.jpg",
    "Hands raising two finished lattes across a café table",
    1300,
    1050,
    "50% 50%",
  ),
  /** Spare frame for the archive's closing block. */
  notes: asset(
    "/images/lifestyle/lifestyle-07.jpg",
    "A barista checking the grind setting mid-service",
    1100,
    1065,
    "50% 45%",
  ),
} as const;

/* -------------------------------------------------------------------------
 * Lifestyle — the supporting library
 * ---------------------------------------------------------------------- */
export const lifestyleImages = {
  pour: asset(
    "/images/lifestyle/lifestyle-01.jpg",
    "Milk poured from a jug into a cup at the bar",
    1100,
    1065,
    "50% 50%",
  ),
  tamp: asset(
    "/images/lifestyle/lifestyle-02.jpg",
    "Ground coffee tamped level into a portafilter basket",
    1100,
    1065,
    "50% 50%",
  ),
  latte: asset(
    "/images/lifestyle/lifestyle-03.jpg",
    "Steamed milk poured into a finished latte to build the rosetta",
    1100,
    1065,
    "50% 50%",
  ),
  coldBrew: asset(
    "/images/lifestyle/lifestyle-04.jpg",
    "Cold brew coffee poured over a tall glass of ice",
    1100,
    1065,
    "50% 50%",
  ),
  pastry: asset(
    "/images/lifestyle/lifestyle-05.jpg",
    "A laminated pastry served beside a filter coffee on a wooden table",
    1100,
    1065,
    "50% 50%",
  ),
  room: asset(
    "/images/lifestyle/lifestyle-06.jpg",
    "A guest laughing over a coffee at a shared table",
    1100,
    1065,
    "50% 50%",
  ),
  bar: asset(
    "/images/lifestyle/lifestyle-07.jpg",
    "A barista checking the grind setting mid-service",
    1100,
    1065,
    "50% 45%",
  ),
  trio: asset(
    "/images/lifestyle/lifestyle-08.jpg",
    "Two filter coffees and an espresso set out on a marble counter",
    1100,
    1065,
    "50% 50%",
  ),
} as const;

/**
 * Derive an art-directed variant of an existing asset.
 *
 * Used where one photograph serves two purposes (for example a product frame
 * and its hover frame) and only the crop or the description differs. Keeps a
 * single source per file while letting each slot declare its own framing.
 */
export function withImage(
  base: ImageAsset,
  overrides: Partial<ImageAsset> = {},
): ImageAsset {
  return { ...base, ...overrides };
}