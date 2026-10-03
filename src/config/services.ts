import { aboutImages, lifestyleImages, serviceImages } from "./images";
import type { ImageAsset } from "./images";

export type Service = {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  /** Short label used in lists and chips. */
  readonly kicker: string;
  readonly summary: string;
  readonly body: string;
  readonly includes: readonly string[];
  readonly image: ImageAsset;
  /** Optional short stat surfaced on the card. */
  readonly stat?: { readonly value: string; readonly label: string };
};

export const services: readonly Service[] = [
  {
    id: "artisan-coffee",
    index: "01",
    title: "Artisan Coffee",
    kicker: "The bar and the roastery",
    summary:
      "A twelve-kilo roaster, four single origins a year and a menu that changes when the coffee does.",
    body:
      "We roast in twelve-kilo batches, rest every lot for four days before it reaches a grinder, and taste each batch twice before it ships. The result is a menu that is deliberately short: four coffees, one espresso blend, and a filter that changes with the season.",
    includes: [
      "Single-origin filter, rotated by the week",
      "Espresso dialled to 36 g in 28 seconds",
      "Free filter refills in your own cup",
      "Dairy alternatives at no extra charge",
    ],
    image: serviceImages.atelier,
    stat: { value: "12 kg", label: "per batch" },
  },
  {
    id: "kitchen",
    index: "02",
    title: "Fresh Pastry",
    kicker: "Laminated in-house",
    summary:
      "Butter, flour and three days of patience — baked on the premises twice a day.",
    body:
      "Everything in the case is laminated or kneaded here, not delivered chilled. Almond croissant and cardamom bun are folded before four in the morning; the afternoon case is whatever the market gave us that day. When it is gone, it is gone.",
    includes: [
      "Laminated pastry baked at 07:00",
      "Afternoon counter refreshed at 13:00",
      "Seasonal tarts that change weekly",
      "Gluten-free option available daily",
    ],
    image: serviceImages.bakery,
    stat: { value: "02×", label: "bake service" },
  },
  {
    id: "beans-and-wholesale",
    index: "03",
    title: "Coffee Beans",
    kicker: "Retail and wholesale",
    summary:
      "Whole bean or ground to your brewer, roasted to order for every wholesale account.",
    body:
      "Our retail range is roasted the day it is ordered. Wholesale partners get their own roast profile, ground to their machine, delivered on a schedule that suits their morning. We cap the number of accounts we take on so we can cup every one of them.",
    includes: [
      "Ground to your brewer and dose",
      "Dedicated wholesale roast profile",
      "Machine installation and calibration",
      "Staff training on site",
    ],
    image: aboutImages.origin,
  },
  {
    id: "private-events",
    index: "04",
    title: "Private Events",
    kicker: "Tastings and launches",
    summary:
      "A guided flight for six, or a full buy-out of the room, run by our head of training.",
    body:
      "A private booking takes over the whole room: no music you did not choose, no shared tables, no rush. We build a tasting arc around what is on the roast schedule that week and leave you with the coffee afterwards.",
    includes: [
      "Six to forty guests",
      "Guided flight with a scorecard",
      "Equipment, staff and a printed menu",
      "Whole-roast of the final flight to take home",
    ],
    image: serviceImages.events,
    stat: { value: "40", label: "guests max" },
  },
  {
    id: "coffee-catering",
    index: "05",
    title: "Coffee Catering",
    kicker: "We bring the bar",
    summary:
      "Full mobile bar, two baristas and every cup finished properly — wherever you are.",
    body:
      "Our catering bar travels as a self-contained unit: grinder, brewer, espresso machine and milk on its own power. We arrive ninety minutes before service, set up out of sight, and clear down after. Choose a cart, a bar, or a table at the back of the room.",
    includes: [
      "Full espresso and filter bar on site",
      "Two or three baristas included",
      "Crockery, milk and glassware",
      "Dietary requirements handled in advance",
    ],
    image: lifestyleImages.gallery[6],
    stat: { value: "90 min", label: "setup window" },
  },
  {
    id: "workshops",
    index: "06",
    title: "Coffee Workshops",
    kicker: "Learn the craft",
    summary:
      "Two-hour sessions on brewing, roasting and tasting, capped at eight people.",
    body:
      "We run a public workshop every month and private sessions for groups. The bar course covers dial-in, grind distribution and milk texture; the roasting session walks the room from green to cupping table. Both end with you drinking what you made.",
    includes: [
      "Two hours, capped at eight",
      "Hands-on at the bar or roaster",
      "Take-home bag of what you roasted",
      "Monthly public dates plus private slots",
    ],
    image: aboutImages.roasting,
  },
] as const;

/** Alternating layout used by the numbered service story on the page. */
export const serviceChapters = [
  {
    id: "sourcing",
    number: "I",
    title: "Sourcing in season",
    copy:
      "We buy four lots a year from washing stations we have visited, priced well above the commodity market so the farmer can plan. Contracts are signed before harvest, not after it.",
    image: serviceImages.atelier,
  },
  {
    id: "roasting",
    number: "II",
    title: "Roasting to the bean",
    copy:
      "Every lot gets its own curve. A natural Ethiopian gets a fast, bright roast; a washed Brazilian gets a longer development to build body. We cup each batch twice before it leaves.",
    image: serviceImages.bakery,
  },
  {
    id: "ritual",
    number: "III",
    title: "The ritual at the bar",
    copy:
      "Milk is textured to 60 °C because that is where lactose stops turning sweet and starts turning flat. Cups are warmed. Filter water is free and refilled without asking.",
    image: serviceImages.events,
  },
] as const;

export const serviceBands = [
  {
    id: "hospitality",
    kicker: "For cafés and kitchens",
    title: "A coffee programme, not a bag of beans",
    copy:
      "We work with a small number of hotels, restaurants and offices: one roast profile each, a weekly delivery that fits your morning, and a barista who visits when your team changes. Everything we build stays built.",
    points: [
      "Menu and pricing advisory",
      "Equipment lease and financing",
      "Quarterly on-site calibration",
      "Shared barista training programme",
    ],
  },
  {
    id: "gifting",
    kicker: "For teams and clients",
    title: "Gifting that survives the post",
    copy:
      "Hand-written cards from the roaster who pulled the batch, letterbox-friendly cartons, no plastic anywhere in the pack. Choose the coffee, or let us match it to how your recipients actually drink.",
    points: [
      "Message cards written by hand",
      "Bespoke roast dates on request",
      "Bulk ordering from six boxes",
      "Delivery notes written for your recipient",
    ],
  },
] as const;