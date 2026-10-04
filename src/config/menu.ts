import { menuImages } from "./images";
import type { ImageAsset } from "./images";

export type MenuItem = {
  readonly id: string;
  readonly name: string;
  /** One-line description written for the bar. */
  readonly description: string;
  /** Comma-separated composition notes shown as micro-tags. */
  readonly notes: readonly string[];
  /** Price in minor units (cents) to avoid float drift. */
  readonly price: number;
  /** Marks the house pour, used for the signature treatment. */
  readonly signature?: boolean;
  readonly image?: ImageAsset;
};

export type MenuCategory = {
  readonly id: string;
  readonly label: string;
  /** Short framing line rendered above the category list. */
  readonly intro: string;
  readonly items: readonly MenuItem[];
};

const cents = (value: number) => Math.round(value * 100);

export const menuCategories: readonly MenuCategory[] = [
  {
    id: "espresso",
    label: "Espresso",
    intro:
      "Six grams in, thirty-six grams out, twenty-eight seconds. Every shot is pulled on the same two-group machine and tasted before it leaves the bar.",
    items: [
      {
        id: "espresso",
        name: "Espresso",
        description:
          "A 36 g ristretto-style shot with brown-sugar crema, roasted almond and a clean, bittersweet finish.",
        notes: ["House blend", "36 g", "28 s"],
        price: cents(3.4),
        signature: true,
        image: menuImages.espresso,
      },
      {
        id: "long-black",
        name: "Long Black",
        description:
          "Hot water first, espresso on top, so the crema survives the journey. Fuller than an Americano, lighter than a flat white.",
        notes: ["Double shot", "180 ml"],
        price: cents(3.8),
      },
      {
        id: "cortado",
        name: "Cortado",
        description:
          "Equal parts espresso and steamed milk in a 120 mlGibraltar glass, served with a spoon of thick, glossy milk.",
        notes: ["Gibraltar", "120 ml"],
        price: cents(3.9),
      },
      {
        id: "flat-white",
        name: "Flat White",
        description:
          "Two ristretto shots under a thin, glossy layer of microfoam. The benchmark against which we tune every other milk drink.",
        notes: ["Double ristretto", "150 ml"],
        price: cents(4.2),
        signature: true,
        image: menuImages.milk,
      },
      {
        id: "macchiato",
        name: "Macchiato",
        description:
          "A single shot marked with a spoonful of dense milk foam — espresso first, then the lion's share of the aroma.",
        notes: ["Single shot", "90 ml"],
        price: cents(3.3),
      },
    ],
  },
  {
    id: "milk",
    label: "Milk & Cold",
    intro:
      "Textured whole milk by default; oat, almond and lactose-free are always free. Cold brew is steeped eighteen hours and served undiluted.",
    items: [
      {
        id: "cappuccino",
        name: "Cappuccino",
        description:
          "Traditional build: one shot, steamed milk, a deep cap of foam dusted with cocoa. Small, serious, and best finished quickly.",
        notes: ["Single shot", "180 ml"],
        price: cents(4.0),
      },
      {
        id: "latte",
        name: "Caffè Latte",
        description:
          "Long, calm and milk-forward — two shots stretched into 260 ml with a thin, persistent microfoam lid.",
        notes: ["Double shot", "260 ml"],
        price: cents(4.4),
      },
      {
        id: "mocha",
        name: "Dark Mocha",
        description:
          "70 % single-origin chocolate melted into the milk, then pulled through espresso. Bitter, deep and never sweet enough.",
        notes: ["Single origin", "70 % cocoa"],
        price: cents(4.9),
      },
      {
        id: "cold-brew",
        name: "Cold Brew",
        description:
          "Eighteen hours in still water at 4 °C, filtered twice for clarity. Low acidity, heavy body, unmistakably not a chilled filter.",
        notes: ["18 h steep", "Over ice"],
        price: cents(4.6),
        signature: true,
        image: menuImages.coldBrew,
      },
      {
        id: "espresso-tonic",
        name: "Espresso Tonic",
        description:
          "A long shot poured over tonic and a wide strip of orange peel. Bright, aromatic and the fastest bridge between summer and coffee.",
        notes: ["Tonic", "Orange peel"],
        price: cents(5.1),
      },
    ],
  },
  {
    id: "filter",
    label: "Filter & Batch",
    intro:
      "Brewed on a five-kilo batch brewer, refilled through the morning and free to refill in your own cup, at any hour we are open.",
    items: [
      {
        id: "batch-filter",
        name: "Batch Filter",
        description:
          "Whatever is singing on the batch that day — usually a washed Ethiopian or a natural Brazilian. Ask the bar; we will tell you.",
        notes: ["Rotating", "Free refills"],
        price: cents(3.6),
      },
      {
        id: "pour-over",
        name: "Pour Over",
        description:
          "One origin, brewed to order in a V60 with a 1:16 ratio and a 45-second bloom. Allow three minutes and stand and watch.",
        notes: ["V60", "250 ml", "≈ 3 min"],
        price: cents(5.4),
      },
      {
        id: "aeropress",
        name: "AeroPress",
        description:
          "A shorter, denser, less acidic cup. The go-to for guests who find filter coffee too bright.",
        notes: ["Single origin", "220 ml"],
        price: cents(5.0),
      },
    ],
  },
  {
    id: "tea-and-not-tea",
    label: "Tea & Not Tea",
    intro:
      "Whole-leaf teas, loose and brewed to order, plus a short list of drinks that contain no coffee at all and do not apologise for it.",
    items: [
      {
        id: "sencha",
        name: "Sencha",
        description:
          "Japanese green leaf brewed at 70 °C for ninety seconds — grassy, sweet and lightly marine.",
        notes: ["70 °C", "90 s"],
        price: cents(3.8),
      },
      {
        id: "earl-grey",
        name: "Earl Grey",
        description:
          "Assam leaf scented with cold-pressed bergamot oil, brewed at 95 °C for three minutes.",
        notes: ["95 °C", "3 min"],
        price: cents(3.8),
      },
      {
        id: "matcha",
        name: "Matcha Latte",
        description:
          "Ceremonial-grade matcha whisked to a froth with whole milk. Grass-forward, faintly sweet, zero bitterness.",
        notes: ["Ceremonial grade", "250 ml"],
        price: cents(4.8),
      },
      {
        id: "hot-chocolate",
        name: "Drinking Chocolate",
        description:
          "70 % single-origin chocolate melted into milk with no added sugar. Bitter enough to keep adults company.",
        notes: ["70 %", "No added sugar"],
        price: cents(4.6),
      },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    intro:
      "Baked each morning from butter, flour and time. The pastry case empties by mid-afternoon — that is the honest review of this list.",
    items: [
      {
        id: "almond-croissant",
        name: "Almond Croissant",
        description:
          "Three-day laminated dough filled with frangipane and baked until the edges crackle. The single most requested item we make.",
        notes: ["Baked at 07:00", "Contains nuts"],
        price: cents(4.2),
        signature: true,
        image: menuImages.pastry,
      },
      {
        id: "cardamom-bun",
        name: "Cardamom Bun",
        description:
          "Hand-knotted, brushed with butter and dusted with crushed cardamom and pearl sugar.",
        notes: ["Baked at 07:00"],
        price: cents(4.0),
      },
      {
        id: "olive-oil-cake",
        name: "Olive Oil Cake",
        description:
          "Dense, orange-scented and free of refined sugar. Served with crème fraîche when the oven allows.",
        notes: ["Vegetarian", "Contains gluten"],
        price: cents(4.4),
      },
      {
        id: "seasonal-tart",
        name: "Seasonal Tart",
        description:
          "Whatever the market had that morning, under an almond frangipane. Ask before you order; we change it often.",
        notes: ["Changes weekly"],
        price: cents(5.2),
      },
    ],
  },
] as const;

export const menuHighlights = [
  {
    id: "seasonal",
    label: "Seasonal rotation",
    value: "Four single origins a year",
    detail:
      "We buy what is best rather than what is available, so the batch filter genuinely changes with the harvest.",
  },
  {
    id: "dairy",
    label: "Milk, always free",
    value: "Oat, almond or lactose-free",
    detail:
      "No surcharge, no smaller volume, no commentary. The price on the board is the price on the receipt.",
  },
  {
    id: "water",
    label: "Filtered water",
    value: "Refills included",
    detail:
      "Bring your own cup or borrow one of ours. We would rather the filter coffee stayed free.",
  },
] as const;

/** Quick navigation for the sticky category rail. */
export const menuCategoryNav = menuCategories.map((category) => ({
  id: category.id,
  label: category.label,
}));