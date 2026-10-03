import { aboutImages, editorialImages, heroImages, lifestyleImages } from "./images";
import type { ImageAsset } from "./images";

/* -------------------------------------------------------------------------
 * Hero
 * ---------------------------------------------------------------------- */
export const hero = {
  eyebrow: "Specialty coffee · Roastery & café",
  /** Rendered as one masked line each; keep lines short for mobile. */
  headline: ["Roasted slowly.", "Served precisely."] as const,
  body:
    "Espressly is a small-batch roastery and coffee house on the old quay. We buy four lots a year, roast them ourselves, and brew every cup to the bean rather than to the machine.",
  primaryCta: { label: "See the coffee", href: "/shop" },
  secondaryCta: { label: "Explore the menu", href: "/menu" },
  /** Bottom rail metadata — reinforces craft without shouting. */
  rail: [
    { label: "Roast day", value: "Tuesdays & Fridays" },
    { label: "Batch size", value: "12 kg" },
    { label: "Bar opens", value: "07:30" },
  ] as const,
  /** Rotating image plate inside the hero card. */
  plate: {
    kicker: "On the bar today",
    name: "Harbour Espresso",
    meta: "Brazil · Colombia · Medium-dark",
    image: heroImages.panel,
  } satisfies { kicker: string; name: string; meta: string; image: ImageAsset },
  scrollHint: "Scroll to pour",
} as const;

/* -------------------------------------------------------------------------
 * Brand statement
 * ---------------------------------------------------------------------- */
export const statement = {
  eyebrow: "The Espressly promise",
  /** Single editorial sentence set in large display type. */
  headline:
    "Most coffee is made to a recipe. Ours is made to a place, a season and a person.",
  body: [
    "We started in 2016 with a five-kilo roaster and one rule: know the name of everyone who touched the coffee. That has not changed. We still buy four lots a year, still roast them on the quay, and still taste every batch twice before it is allowed anywhere near a cup.",
    "It is a slower way to run a coffee business. It is also the only way we know to make a cup that tastes like somewhere rather than just like coffee.",
  ] as const,
  pullQuote:
    "If we cannot say who grew it and when it was roasted, it does not go on the bar.",
  band: editorialImages.beans,
} as const;

/* -------------------------------------------------------------------------
 * Signature drinks (horizontal story rail)
 * ---------------------------------------------------------------------- */
export const signature = {
  eyebrow: "The bar",
  headline: "Six drinks we would lose sleep over",
  body:
    "The menu is deliberately short. These are the six we would make for you if you asked us to choose — and the only recipes that have never changed since the first day.",
  cta: { label: "See the full menu", href: "/menu" },
} as const;

/* -------------------------------------------------------------------------
 * Pillars — why Espressly is different
 * ---------------------------------------------------------------------- */
export type Pillar = {
  readonly index: string;
  readonly title: string;
  readonly body: string;
  readonly detail: string;
};

export const pillars: readonly Pillar[] = [
  {
    index: "01",
    title: "Four lots a year, not forty",
    body:
      "We buy what is genuinely good rather than what is available, which means our filter board changes with the harvest and our prices stay honest.",
    detail: "Contracts signed pre-harvest",
  },
  {
    index: "02",
    title: "Rest is part of the process",
    body:
      "Four days after roasting, every bag and every batch. Coffee gives off gas for a week, and rushing it is why so much coffee disappoints.",
    detail: "Never roasted to order",
  },
  {
    index: "03",
    title: "Ground to the brewer",
    body:
      "Whole bean at home, ground to dose in the shop. Nothing on our bar has been sitting ground since the day it was roasted.",
    detail: "Free refills in your own cup",
  },
  {
    index: "04",
    title: "One roaster, one bar, one team",
    body:
      "The people who roast the coffee are the people who serve it. If a roast lands wrong, the person who pulled it knows before you do.",
    detail: "Two cupped batches per roast",
  },
] as const;

/* -------------------------------------------------------------------------
 * Sticky story chapters
 * ---------------------------------------------------------------------- */
export const storyChapters = [
  {
    id: "origin",
    chapter: "01",
    kicker: "Origin",
    title: "Bought from washing stations we have stood in",
    copy:
      "Two partners in Guji, one in Huila, one in Cerrado Mineiro. We visit, we cup on site, and we sign before harvest so the farmer can plan a year rather than a week.",
    image: aboutImages.origin,
    alt: "Barista serving guests at the Espressly counter",
  },
  {
    id: "roast",
    chapter: "02",
    kicker: "Roast",
    title: "Twelve kilos, one curve, two cuppings",
    copy:
      "Every lot gets its own profile. A washed Brazilian gets a long development for body; a natural Ethiopian gets a fast, bright roast so the fruit survives.",
    image: aboutImages.roasting,
    alt: "Roasted coffee cooling in the drum after a batch",
  },
  {
    id: "ritual",
    chapter: "03",
    kicker: "Ritual",
    title: "Milk at 60 °C, because that is where it tastes best",
    copy:
      "Lactose turns from sweet to flat just above 60 °C, so that is where we stop the steam wand. Cups are warmed, water is free, and nobody is ever rushed out of a seat.",
    image: aboutImages.people,
    alt: "Two guests sharing a flat white at a window seat",
  },
] as const;

/* -------------------------------------------------------------------------
 * Craft process band
 * ---------------------------------------------------------------------- */
export const craft = {
  eyebrow: "Craft",
  headline: "Twelve hours from green to cup",
  body:
    "A roast day at Espressly is unglamorous and repeatable. Here is what happens between the crate arriving and the bag going out.",
  image: editorialImages.pourOver,
  steps: [
    { index: "01", title: "Charge", copy: "Beans into a pre-heated drum at 196 °C. The roast starts before the timer does." },
    { index: "02", title: "Turning point", copy: "4:10 — moisture gone, browning begins, the colour shifts from straw to tan." },
    { index: "03", title: "Development", copy: "12 % of total time in development. This is where a roast lives or dies." },
    { index: "04", title: "Drop", copy: "9:05 — dropped into the cooling tray within twenty seconds, then cupped twice." },
  ] as const,
} as const;

/* -------------------------------------------------------------------------
 * Statistics
 * ---------------------------------------------------------------------- */
export const stats = [
  { value: 4, suffix: "", label: "single origins a year", detail: "Bought and roasted in season" },
  { value: 12, suffix: " kg", label: "per batch", detail: "Small enough to cup every time" },
  { value: 4, suffix: " days", label: "rest after roasting", detail: "Before it reaches a grinder" },
  { value: 0, suffix: "", label: "fillers or syrups", detail: "Only milk and water go in" },
] as const;

/* -------------------------------------------------------------------------
 * Gallery
 * ---------------------------------------------------------------------- */
export const gallery = {
  eyebrow: "In the room",
  headline: "What it looks like in here",
  images: lifestyleImages.gallery,
} as const;

/* -------------------------------------------------------------------------
 * Newsletter
 * ---------------------------------------------------------------------- */
export const newsletter = {
  eyebrow: "The dispatch",
  headline: "Four beans, one letter a month",
  body:
    "What we are roasting, what we are cupping, and one idea worth arguing about. No offers, no daily send.",
  perks: [
    "First access to limited lots",
    "Public workshop dates before they are listed",
    "Brew notes attached to every bag",
  ] as const,
} as const;

/* -------------------------------------------------------------------------
 * Home testimonials / press
 * ---------------------------------------------------------------------- */
export const testimonials = [
  {
    quote:
      "The only flat white in the city I have never had to ask about. It arrives exactly as it would if I had made it, and I cannot make it like that.",
    name: "Niamh Brennan",
    role: "Regular since 2018",
  },
  {
    quote:
      "We moved our whole café programme to them in one afternoon. Six months on, the coffee is the part our reviews mention by name.",
    name: "Daniel O'Rourke",
    role: "Owner, Rowan & Rye",
  },
  {
    quote:
      "They talk about rest, extraction and water the way other people talk about wine. It made me care about coffee again.",
    name: "Sofia Marchetti",
    role: "Subscriber since 2021",
  },
] as const;