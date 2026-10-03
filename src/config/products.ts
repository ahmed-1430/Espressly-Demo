import { shopImages, lifestyleImages, menuImages } from "./images";
import type { ImageAsset } from "./images";

export type ProductCategoryId =
  | "coffee"
  | "gear"
  | "collections";

export type ProductCategory = {
  readonly id: ProductCategoryId;
  readonly label: string;
  readonly description: string;
};

export type Product = {
  readonly slug: string;
  readonly name: string;
  readonly shortName?: string;
  readonly description: string;
  /** Longer copy shown on the product detail page. */
  readonly story: string;
  /** Price in minor units (cents). */
  readonly price: number;
  readonly category: ProductCategoryId;
  /** Short label rendered as a chip, e.g. "Roasted to order". */
  readonly badge?: string;
  /** Primary packshot. Square crop keeps every card box identical. */
  readonly image: ImageAsset;
  /** Second frame revealed on hover where art direction allows it. */
  readonly hoverImage?: ImageAsset;
  readonly origin?: string;
  readonly roast?: string;
  readonly process?: string;
  readonly altitude?: string;
  readonly weight?: string;
  readonly details: readonly string[];
  readonly featured?: boolean;
  readonly bestseller?: boolean;
};

const cents = (value: number) => Math.round(value * 100);

export const productCategories: readonly ProductCategory[] = [
  {
    id: "coffee",
    label: "Coffee",
    description:
      "Roasted in twelve-kilo batches and rested for four days before it ships, because coffee that tastes of roast is not finished yet.",
  },
  {
    id: "gear",
    label: "Gear",
    description:
      "The short, opinionated list of equipment we actually use behind the bar — tested daily by the people who service it.",
  },
  {
    id: "collections",
    label: "Collections",
    description:
      "Gift sets and tasting flights assembled by hand, with a written card from whoever roasted your bag.",
  },
] as const;

export const products: readonly Product[] = [
  {
    slug: "signature-house-blend",
    name: "Signature House Blend",
    shortName: "House Blend",
    description:
      "The everyday cup. Chocolate-led, low acid and forgiving of a rushed morning.",
    story:
      "Built to be the coffee you drink without thinking about it. A washed Brazilian base carries the weight and a natural Ethiopian lifts the top with stone fruit, then we roast it to hold its shape in a machine rather than a laboratory. Ground to order, always.",
    price: cents(15),
    category: "coffee",
    badge: "Roasted weekly",
    image: lifestyleImages.gallery[0],
    hoverImage: menuImages.espresso,
    origin: "Brazil · Ethiopia",
    roast: "Medium",
    process: "Natural · Washed",
    altitude: "1,150–1,900 m",
    weight: "250 g",
    details: [
      "Cocoa nib and toasted almond",
      "Soft stone-fruit acidity on the finish",
      "Built for espresso and batch filter alike",
      "Rest for four days before dispatch",
    ],
    featured: true,
    bestseller: true,
  },
  {
    slug: "harbour-espresso",
    name: "Harbour Espresso",
    shortName: "Harbour",
    description:
      "Our bar blend for the house espresso: dense, syrupy and made for milk.",
    story:
      "The blend our barista team drinks on shift. Deep syrupy body from a natural Cerrado component, structured by a washed Colombian so it still reads clearly through a hundred millilitres of steamed milk. Pull it at 36 grams in 28 seconds.",
    price: cents(17),
    category: "coffee",
    badge: "Bar blend",
    image: lifestyleImages.gallery[1],
    hoverImage: menuImages.latte,
    origin: "Brazil · Colombia",
    roast: "Medium-dark",
    process: "Natural · Washed",
    altitude: "1,050–1,700 m",
    weight: "250 g",
    details: [
      "Dark chocolate and molasses",
      "Holds its shape in milk",
      "9 bar, 36 g in 28 seconds",
      "Cut for our La Marzocco Linea",
    ],
    featured: true,
  },
  {
    slug: "guji-single-origin",
    name: "Guji Single Origin",
    shortName: "Guji",
    description:
      "One washing station, one lot, one season. Bergamot and wild blueberry.",
    story:
      "A single washing station in Guji, bought as one lot so we can tell you exactly which day it was picked and dried. Expect bergamot lift, wild blueberry and an unusually long, tea-like finish. Brilliant as a pour over; do not add milk.",
    price: cents(21),
    category: "coffee",
    badge: "Limited lot",
    image: lifestyleImages.gallery[2],
    origin: "Ethiopia · Guji",
    roast: "Light",
    process: "Washed",
    altitude: "1,950 m",
    weight: "200 g",
    details: [
      "Bergamot, blueberry, jasmine",
      "Washed at 1,950 m",
      "Best as a 1:16 pour over",
      "Roasted the week it is ordered",
    ],
    featured: true,
  },
  {
    slug: "cold-brew-concentrate",
    name: "Cold Brew Concentrate",
    shortName: "Cold Brew",
    description:
      "Eighteen hours at 4 °C, concentrated one-to-one with water or milk.",
    story:
      "We make the same brew we pour over ice at the bar, then bottle it undiluted so you decide the strength at home. One part concentrate to one part water over ice for a long black, or to one part whole milk for something closer to a nitro without the gas.",
    price: cents(14),
    category: "coffee",
    badge: "No sugar",
    image: lifestyleImages.gallery[3],
    hoverImage: menuImages.coldBrew,
    origin: "Brazil",
    roast: "Light-medium",
    process: "Washed",
    altitude: "1,200 m",
    weight: "500 ml",
    details: [
      "Unsweetened, no preservatives",
      "Keeps for 14 days unopened",
      "Dilute 1:1 over ice",
      "Also good in a cake batter",
    ],
  },
  {
    slug: "roastery-tasting-flight",
    name: "Roastery Tasting Flight",
    shortName: "Tasting Flight",
    description:
      "Four 100 g lots with a scorecard and the story of where each one came from.",
    story:
      "Four current lots, roasted across a fortnight so you can compare roast dates rather than roast styles. Each bag carries a scorecard written by whoever roasted it, including the cupping notes they argued about. The fastest way to understand what we actually like.",
    price: cents(38),
    category: "collections",
    badge: "Gift ready",
    image: lifestyleImages.gallery[4],
    origin: "Four origins",
    roast: "Light to medium",
    process: "Mixed",
    altitude: "1,100–2,000 m",
    weight: "4 × 100 g",
    details: [
      "Four contrasting lots",
      "Hand-written scorecards",
      "Best before: this season only",
      "Wrapped in recycled board",
    ],
    bestseller: true,
  },
  {
    slug: "morning-gift-box",
    name: "Morning Gift Box",
    shortName: "Gift Box",
    description:
      "A 250 g bag, a ceramic cup and a note from the roaster who pulled the batch.",
    story:
      "Our most-gifted box. A fresh 250 g of whatever is singing that week, the house ceramic cup, and a hand-written card naming the roaster and the roast date. Arrives in a letterbox-friendly carton with no plastic anywhere in it.",
    price: cents(46),
    category: "collections",
    badge: "Hand written",
    image: lifestyleImages.gallery[5],
    origin: "Rotating",
    roast: "Medium",
    process: "Mixed",
    weight: "250 g + cup",
    details: [
      "Letterbox-friendly packaging",
      "Plastic-free, printed with soy ink",
      "Hand-written roaster card",
      "Add a message at checkout",
    ],
    featured: true,
  },
  {
    slug: "stoneware-cup",
    name: "Stoneware Cup",
    shortName: "Cup",
    description:
      "A 220 ml stoneware cup thrown for us, glazed inside so latte art pours clean.",
    story:
      "Made in a small studio forty minutes from the roastery. The wide, shallow interior is what makes a flat white pour properly — we stopped buying standard 8 oz cups the week we developed this one. Dishwasher and microwave safe.",
    price: cents(26),
    category: "gear",
    image: shopImages.espressoCup,
    origin: "Made in Ireland",
    weight: "220 ml",
    details: [
      "Wide shallow bowl for latte art",
      "Dishwasher and microwave safe",
      "Felt-lined base",
      "Each glaze varies slightly",
    ],
  },
  {
    slug: "immersion-press",
    name: "Immersion Press",
    shortName: "Press",
    description:
      "Brew on the counter in four minutes without a grinder upgrade or a scale.",
    story:
      "Brew on the counter in four minutes without buying a grinder you will not use. Coarse grind, sixty grams of beans, a thousand grams of water, four minutes, then press slowly. The most forgiving way to make a genuinely good cup at home.",
    price: cents(48),
    category: "gear",
    badge: "Bar staff pick",
    image: shopImages.frenchPress,
    origin: "Borosilicate glass",
    weight: "350 g",
    details: [
      "Borosilicate glass and matte steel",
      "Brews 500 ml",
      "Two-year guarantee",
      "Replacement parts available",
    ],
  },
  {
    slug: "gooseneck-kettle",
    name: "Variable Kettle",
    shortName: "Kettle",
    description:
      "Holds temperature to within one degree, which is the whole point of pouring slowly.",
    story:
      "Variable from 40 °C to 100 °C and accurate to within a degree, because control over temperature is the only real difference between a good pour over and a great one. A slow, deliberate flow that gives you time to read the bed.",
    price: cents(135),
    category: "gear",
    badge: "Bar staff pick",
    image: shopImages.kettle,
    origin: "Stainless steel",
    weight: "1.0 l",
    details: [
      "40–100 °C, ±1 °C",
      "Gooseneck spout, slow flow control",
      "Hold mode for 60 minutes",
      "Two-year guarantee",
    ],
  },
  {
    slug: "stovetop-brewer",
    name: "Stovetop Brewer",
    shortName: "Stovetop",
    description:
      "Six cups of strong, unfussy coffee for a kitchen that is not a lab.",
    story:
      "Pressure, not dissolution. Fill the base with boiling water to the valve, add ground coffee, and stand four minutes over a low flame. It rewards attention and punishes impatience, which is exactly the trade we think is worth making.",
    price: cents(52),
    category: "gear",
    image: shopImages.mokaPot,
    origin: "Aluminium and steel",
    weight: "6 cup",
    details: [
      "Six-cup aluminium body",
      "Heat-resistant handle",
      "Replacement gaskets included",
      "Hand wash only",
    ],
  },
] as const;

/** Products surfaced on the home page, in editorial order. */
export const featuredProducts = products.filter((product) => product.featured);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}