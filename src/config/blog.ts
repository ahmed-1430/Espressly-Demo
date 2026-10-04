import { journalImages } from "./images";
import type { ImageAsset } from "./images";

export type BlogAuthor = {
  readonly name: string;
  readonly role: string;
  readonly initials: string;
};

export type BlogPost = {
  readonly slug: string;
  readonly title: string;
  /** Kicker shown above the headline. */
  readonly category: string;
  readonly excerpt: string;
  /** Opening paragraph used by the article page and structured data. */
  readonly standfirst: string;
  readonly author: BlogAuthor;
  /** ISO date. */
  readonly date: string;
  /** Displayed date. */
  readonly dateLabel: string;
  readonly readingTime: string;
  readonly image: ImageAsset;
  readonly featured?: boolean;
  readonly tags: readonly string[];
  /** Article body: an array of blocks keeps rendering simple and safe. */
  readonly body: readonly ArticleBlock[];
};

export type ArticleBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading"; readonly text: string }
  | { readonly type: "quote"; readonly text: string; readonly attribution?: string }
  | { readonly type: "list"; readonly items: readonly string[] };

export const authors = {
  maeve: { name: "Maeve Donnelly", role: "Head of training", initials: "MD" },
  tomas: { name: "Tomás Ferreira", role: "Head roaster", initials: "TF" },
  ines: { name: "Inés Cabrera", role: "Barista lead", initials: "IC" },
} as const satisfies Record<string, BlogAuthor>;

export const blogCategories = [
  { id: "brewing", label: "Brewing", description: "Dial-in, ratios and the reasons behind them." },
  { id: "craft", label: "Craft", description: "Roasting, cupping and what happens before the bag." },
  { id: "origin", label: "Origin", description: "Growing, drying and the people who do both." },
  { id: "guides", label: "Guides", description: "Practical, opinionated starting points." },
] as const;

export const posts: readonly BlogPost[] = [
  {
    slug: "taste-coffee-like-a-professional",
    title: "How to Taste Coffee Like a Professional",
    category: "Brewing",
    excerpt:
      "The cupping table is not a ceremony for professionals. It is four questions, a spoon and twenty minutes of attention.",
    standfirst:
      "Professional tasting is mostly technique, not talent. Once you separate the questions, stop reaching for adjectives and start writing down what the cup actually tells you.",
    author: authors.maeve,
    date: "2026-02-04",
    dateLabel: "4 February 2026",
    readingTime: "8 min read",
    image: journalImages.brewing,
    featured: true,
    tags: ["Cupping", "Tasting", "Sensory"],
    body: [
      {
        type: "paragraph",
        text: "Most people think tasting is about knowing words. It is not. A useful tasting is four questions asked in order, and the words arrive afterwards, once the cup has given you something to point at.",
      },
      { type: "heading", text: "Start with dry fragrance, before any water" },
      {
        type: "paragraph",
        text: "Lift the dry grounds to your nose before you grind, then again thirty seconds after. This is the only time you will ever smell a coffee without water in it, and it tells you the truth about the roast: floral and citrus for light, caramel and nut for medium, smoke and char for dark.",
      },
      { type: "heading", text: "Slurp, cool it, and keep your mouth open" },
      {
        type: "paragraph",
        text: "Break the crust with the back of a spoon and inhale as you sip, letting the coffee spread across the back of your tongue. Keeping your mouth slightly open cools the sample and lets you feel sweetness, which is easier to read than aroma when the cup is hot.",
      },
      {
        type: "quote",
        text: "If you cannot describe what is missing, you are not tasting — you are deciding whether you like it.",
        attribution: "Maeve Donnelly, head of training",
      },
      { type: "heading", text: "The four questions, every time" },
      {
        type: "list",
        items: [
          "How does it smell dry, and how does that change once it is wet?",
          "How does the first sip taste against a clean palate — water, not milk?",
          "What happens as it cools? Sweetness should rise as acidity falls.",
          "How does it feel in your mouth: thin and tea-like, or heavy and syrupy?",
        ],
      },
      {
        type: "paragraph",
        text: "Write the first four words that arrive, before you decide whether you like it. Novices almost always describe flavour first and quality last, and that order quietly turns a tasting into a review.",
      },
      { type: "heading", text: "Score honestly, or do not score at all" },
      {
        type: "paragraph",
        text: "A score is a summary of defects against a set rubric, not a verdict on quality. If a coffee has a taint or a ferment you did not ask for, that is a two or three, however pleasant the rest of the cup is. Most useful of all: taste the same coffee twice, a week apart, and see whether your notes agree with themselves.",
      },
    ],
  },
  {
    slug: "bean-to-cup-journey",
    title: "The Journey From Bean to Cup",
    category: "Origin",
    excerpt:
      "Nine months on the tree, three weeks at the station, twelve minutes at the bar — and every one of those minutes changes the cup.",
    standfirst:
      "The distance between a cherry on a hillside and the last sip of a flat white is longer than most people think. Here is what happens along it, and who gets paid at each step.",
    author: authors.tomas,
    date: "2026-01-21",
    dateLabel: "21 January 2026",
    readingTime: "11 min read",
    image: journalImages.origin,
    tags: ["Sourcing", "Logistics"],
    body: [
      {
        type: "paragraph",
        text: "A coffee cherry takes roughly nine months to ripen. From there it is picked, pulped, dried, rested, exported, shipped, rested again, roasted, rested a third time, and ground. Most of the flavour decisions were made long before the bean reached a roaster.",
      },
      { type: "heading", text: "Picking and processing" },
      {
        type: "paragraph",
        text: "Only ripe red cherries are worth taking, and picking them is slow, selective work. Everything after that — pulping, washing or drying on raised beds, turning the parchment by hand — happens within a day or two of the pick, and the choices made there are close to irreversible.",
      },
      {
        type: "list",
        items: [
          "Washed: clean, bright, higher acidity, easier to roast consistently.",
          "Natural: fruit-forward, heavier body, more demanding to keep sweet.",
          "Honey: somewhere between the two, with texture in the finish.",
        ],
      },
      { type: "heading", text: "Rest, ship, roast, rest again" },
      {
        type: "paragraph",
        text: "Green coffee needs to settle after export — usually three to four weeks in the warehouse, then ten days of acclimatisation before roasting. Then it needs four days after roasting, because coffee gives off carbon dioxide for as long as a week and will choke an espresso machine until it stops.",
      },
      {
        type: "quote",
        text: "Coffee that tastes of roast has not finished resting. Coffee that tastes of cardboard has not finished shipping.",
        attribution: "Tomás Ferreira, head roaster",
      },
      {
        type: "paragraph",
        text: "Every one of those pauses exists for one reason: to let unpleasant gas escape before it reaches your cup. Skipping them is the most common reason a coffee tastes worse than its bag promised.",
      },
    ],
  },
  {
    slug: "understanding-roast-levels",
    title: "Understanding Coffee Roast Levels",
    category: "Craft",
    excerpt:
      "Light, medium, dark — three words that tell you almost nothing on their own. Here is what is actually happening to the bean.",
    standfirst:
      "Roast level is not a taste; it is a description of a process. Once you can read the process, the label stops mattering and the bag tells you what you need to know.",
    author: authors.tomas,
    date: "2026-01-08",
    dateLabel: "8 January 2026",
    readingTime: "9 min read",
    image: journalImages.notes,
    tags: ["Roasting", "Cupping"],
    body: [
      {
        type: "paragraph",
        text: "Roasting drives moisture out, then caramelises the sugars, then breaks the plant proteins apart. Each of those three events changes what you can taste, and none of them happen cleanly in isolation — which is why roast level is a blunt instrument.",
      },
      { type: "heading", text: "Light: the fruit is still there" },
      {
        type: "paragraph",
        text: "Stopped early to keep the origin's own character intact. Expect higher acidity, floral and citrus notes, a lighter body, and more apparent sweetness if you brew it right. Light roasts punish bad water and old coffee.",
      },
      { type: "heading", text: "Medium: the balance most people actually prefer" },
      {
        type: "paragraph",
        text: "Caramelisation dominates and the origin survives as a supporting note. This is where chocolate, nut and dried fruit live, and it is the reason our house blend is roasted here.",
      },
      { type: "heading", text: "Dark: roast character replaces origin character" },
      {
        type: "paragraph",
        text: "Roasted long enough that the original geography is largely unrecognisable. Smoke, body and low acidity come from the roast itself. Not a lesser coffee — a different job, usually milk drinks.",
      },
      {
        type: "quote",
        text: "Buy the roast that suits your water and your milk, not the roast that sounds most impressive.",
      },
      {
        type: "paragraph",
        text: "The useful test: take the same coffee roasted two ways, blind, and brew them identically. You will find you have a preference far more often than you have an opinion — and the preference is the thing worth building a subscription around.",
      },
    ],
  },
  {
    slug: "why-freshly-ground-coffee-matters",
    title: "Why Freshly Ground Coffee Matters",
    category: "Guides",
    excerpt:
      "Ground coffee goes stale in days, not months. The aroma leaves before the caffeine does — which is exactly why it can disappoint you.",
    standfirst:
      "Coffee does not spoil quickly in any way you can see. It simply stops being aromatic, and aroma is most of what you are buying.",
    author: authors.ines,
    date: "2025-12-16",
    dateLabel: "16 December 2025",
    readingTime: "6 min read",
    image: journalImages.brewing,
    tags: ["Grinding", "Brewing"],
    body: [
      {
        type: "paragraph",
        text: "A coffee bean is a stable, almost seed-like object. Grind it and you have made it a surface area problem: hundreds of times more exposed surface, most of it now breathing oxygen.",
      },
      { type: "heading", text: "What staling actually is" },
      {
        type: "paragraph",
        text: "Oxygen strips the volatile aromatics first — florals and fruit go, then sweetness. The caffeine barely moves. That is the trap: stale coffee is not weak, it is flat, and a flat cup with the same caffeine feels like it is doing nothing at all.",
      },
      {
        type: "list",
        items: [
          "Whole bean: around four weeks of aromatic life.",
          "Filtered ground for filter: use within ten days.",
          "Pre-ground for espresso: use within four days.",
        ],
      },
      { type: "heading", text: "The ten-second upgrade" },
      {
        type: "paragraph",
        text: "If you own a filter grinder, buy whole bean and grind at the kettle. If you do not own one, buy pre-ground only for the brew you make most often, and buy it small. A €20 hand grinder will change your coffee more than a €200 machine you never touch.",
      },
      {
        type: "quote",
        text: "Grind to the water, not to the menu. The menu should follow the grind.",
        attribution: "Inés Cabrera, barista lead",
      },
    ],
  },
  {
    slug: "the-art-of-espresso",
    title: "The Art of Espresso",
    category: "Brewing",
    excerpt:
      "Ninety seconds, thirty-six grams, nine bars and one dial you own. Espresso is a measurement problem with a beautiful disguise.",
    standfirst:
      "Once you accept that espresso is a controlled measurement rather than a mood, it stops being mysterious and starts being repeatable. Here is the whole process.",
    author: authors.ines,
    date: "2025-12-02",
    dateLabel: "2 December 2025",
    readingTime: "10 min read",
    image: journalImages.latte,
    tags: ["Espresso", "Dial-in"],
    body: [
      {
        type: "paragraph",
        text: "Espresso is a target with a tolerance: 36 grams of coffee, 36 grams of liquid, in about 28 seconds, at nine bars. Hit that four days running and you have a repeatable shot. Miss it by a gram and nothing dramatic happens — which is why people give up.",
      },
      { type: "heading", text: "Dose, then grind, then time" },
      {
        type: "paragraph",
        text: "Fix the dose at 18 grams in and the yield at 36 grams out. Everything you change afterwards should be grind size. Finer for slower and sweeter, coarser for faster and sharper — one adjustment at a time, then wait for the next shot before judging.",
      },
      {
        type: "list",
        items: [
          "Under 25 seconds: grind finer, or tamp more evenly.",
          "Over 32 seconds: grind coarser, or check the basket is not clogged.",
          "Gushing, pale and thin: almost always too coarse.",
          "Fast, dark and bitter: almost always too fine.",
        ],
      },
      { type: "heading", text: "Read the cup, not the clock" },
      {
        type: "paragraph",
        text: "Time is a symptom. Look at the espresso in the cup: tiger striping means channelling, a hollow, ringed surface means gas, and a flat, dull crema means it went stale before it got here. Weigh the puck after a shot — if it lands within a gram, distribution is good.",
      },
      {
        type: "quote",
        text: "Temperature is the last dial, not the first. Fix the grind before you touch the boiler.",
      },
    ],
  },
  {
    slug: "choosing-your-perfect-brew",
    title: "Choosing Your Perfect Brew",
    category: "Guides",
    excerpt:
      "Six methods, four coffees, one honest scoring grid — so you can stop reading opinions and start measuring your own.",
    standfirst:
      "There is no perfect brew method, only the one that fits your morning, your equipment and how much patience you actually have. Here is how to find it.",
    author: authors.maeve,
    date: "2025-11-19",
    dateLabel: "19 November 2025",
    readingTime: "7 min read",
    image: journalImages.brewing,
    tags: ["Guides", "Brewing"],
    body: [
      {
        type: "paragraph",
        text: "Method debates are usually arguments about circumstance. Someone with a grinder and ten spare minutes will always beat someone with neither, so the only fair question is which method fits the situation you are actually in.",
      },
      { type: "heading", text: "Score your morning, not your preferences" },
      {
        type: "list",
        items: [
          "Time you actually have: two minutes or twenty?",
          "Equipment you actually own: nothing, or a machine already?",
          "How many cups: one, or enough for two people?",
          "How fussy you are mid-morning: forgiving, or not.",
        ],
      },
      { type: "heading", text: "The short, practical answer" },
      {
        type: "paragraph",
        text: "With nothing but a kettle and a filter, you can make an excellent cup. Add a hand grinder and you can make a better one. Add an espresso machine and you can make something faster, not automatically better. Buy the next piece of kit only after you know what is wrong with the cup you are already making.",
      },
      {
        type: "quote",
        text: "The best brewer is the one still on the counter tomorrow.",
      },
      {
        type: "paragraph",
        text: "Whichever you choose, change one variable at a time, taste the same coffee across three days, and write a single sentence about what you liked. After a month of that you will know your coffee better than any review can tell you.",
      },
    ],
  },
] as const;

export const featuredPost = posts.find((post) => post.featured) ?? posts[0];

export const recentPosts = posts.filter((post) => !post.featured);

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}