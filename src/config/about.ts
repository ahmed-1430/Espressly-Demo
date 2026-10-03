import { aboutImages } from "./images";

export const about = {
  hero: {
    eyebrow: "About Espressly",
    headline: "A roastery that happens to have a café attached",
    body:
      "We started with a five-kilo roaster in a unit behind the quay and one rule: know the name of everyone who touched the coffee. Ten years on, that is still the whole business plan.",
    image: aboutImages.banner,
  },
  story: {
    kicker: "2016 — 2026",
    title: "It began because a bag was wrong",
    body: [
      "In 2015 our founder, Maeve Donnelly, ran a small hotel kitchen that bought coffee by the sack from whoever was cheapest that month. The coffee was fine and completely anonymous, and the team quietly stopped caring about it.",
      "So they bought a roaster instead — a five-kilo drum that took up most of a unit behind the quay and required more patience than anyone expected. The first batch was, honestly, not very good. The second was better. By the fourth month, people were driving past on the way to somewhere else.",
      "The café came later, and only because the roasting schedule kept pushing people to the door at the same time as the coffee was ready. That timing has not changed: the bar opens when the first batch comes off the drum, and closes when the last guest leaves.",
      "Today we are fourteen people, one roaster, two grinders and one very opinionated pastry bench. We still buy four lots a year. We still cup everything twice. We still know who grew it.",
    ],
    pullQuote:
      "You cannot rush a roast, a resting period or a conversation. We have built a business around all three.",
    attribution: "Maeve Donnelly, founder",
  },
  values: [
    {
      index: "01",
      title: "Traceability before novelty",
      body:
        "We would rather tell you exactly which washing station your coffee came from than invent a new flavour note for it.",
    },
    {
      index: "02",
      title: "Short menu, long attention",
      body:
        "Four coffees on filter, one espresso blend, and nothing on the board we cannot explain in one sentence.",
    },
    {
      index: "03",
      title: "The room is part of the product",
      body:
        "Music you did not choose, no shared tables at the counter, and a refill policy that never makes anyone ask twice.",
    },
    {
      index: "04",
      title: "Price without theatre",
      body:
        "Dairy alternatives at no surcharge. Filter refills included. Water free. The price on the board is the price on the receipt.",
    },
  ],
  sourcing: {
    eyebrow: "Sourcing",
    headline: "Four partners, four contracts, all signed before harvest",
    body:
      "We buy through four washing stations, two in Guji, one in Huila and one in Cerrado Mineiro. Every contract is agreed before the picking starts and priced well above the commodity rate, so a farmer can plan a year rather than gamble on a week.",
    points: [
      "Contracts signed pre-harvest, priced above market",
      "Two cupped samples per lot before any contract",
      "Every bag carries its washing station and altitude",
      "Freight consolidated by sea wherever the route allows",
    ],
    image: aboutImages.origin,
  },
  roasting: {
    eyebrow: "Roasting",
    headline: "Twelve kilos, one curve per lot",
    body:
      "Our drum holds twelve kilos, which is small enough to cup every batch and large enough to keep the shop supplied. Each lot gets its own profile: a washed Brazilian gets a longer development for body, a natural Ethiopian gets a fast bright roast so the fruit survives.",
    points: [
      "Roast days Tuesdays and Fridays",
      "Total time 9:05 with 12 % development",
      "Two cuppings before a lot is released",
      "Four days rest before it reaches a grinder",
    ],
    image: aboutImages.roasting,
  },
  sustainability: {
    eyebrow: "Sustainability",
    headline: "No claims we cannot evidence",
    body:
      "We are not going to tell you a coffee is saving the planet. What we can evidence is where our waste actually goes, and we will keep publishing it.",
    points: [
      "Roaster chaff and spent grounds composted locally",
      "Cups, lids and takeaway ware plastic-free",
      "Refill programme on retail bags — bring the bag back",
      "Freight consolidated and sea freight where the route allows",
    ],
    stat: { value: "82%", label: "of packaging is paper or glass" },
  },
  people: [
    {
      name: "Maeve Donnelly",
      role: "Founder & head of training",
      bio: "Opened the first roaster in 2016. Teaches the bar course and still pulls the first shot of the day.",
    },
    {
      name: "Tomás Ferreira",
      role: "Head roaster",
      bio: "Ten years on green coffee and profiles before Espressly. Writes the roast log nobody else reads.",
    },
    {
      name: "Inés Cabrera",
      role: "Barista lead",
      bio: "Runs the floor, the training roster and the milk temperature argument that has never been lost.",
    },
  ],
  timeline: [
    { year: "2016", event: "A five-kilo roaster in a unit behind the quay. One bad batch, then a good one." },
    { year: "2018", event: "First Guji contract signed pre-harvest. The filter board stops being seasonal by accident." },
    { year: "2021", event: "The pastry bench moves in-house. Four in the morning laminations begin." },
    { year: "2023", event: "A second grinder, a third barista and the workshop programme opens to the public." },
    { year: "2026", event: "Fourteen people, four partners, four lots a year. Still asking questions of the coffee." },
  ],
} as const;

export const faqs = [
  {
    question: "Do you take bookings?",
    answer:
      "The bar is walk-in, and the twenty seats at the communal table are first come. For anything above twelve people we run a private event so the room is yours.",
  },
  {
    question: "Can I get a dairy alternative?",
    answer:
      "Oat, almond and lactose-free milk are all free, in any drink, in a full portion. There is no surcharge and no smaller volume.",
  },
  {
    question: "Do you ship the coffee?",
    answer:
      "Within Ireland, two to three working days. Across Europe, five to seven. We grind to your brewer at no extra charge and grind to order.",
  },
  {
    question: "Can you supply our café or office?",
    answer:
      "Yes, though we cap the number of wholesale accounts so we can cup each one. Get in touch and we will send a roast profile proposal with your first delivery.",
  },
  {
    question: "Do you run the workshops anywhere else?",
    answer:
      "The monthly public workshop runs at the roastery. Private sessions can be arranged at your offices, with or without coffee — though we would bring coffee.",
  },
  {
    question: "Is there any way to avoid the queue at 08:15?",
    answer:
      "Order ahead from the menu page and skip the counter entirely. It is the fastest route to a coffee that is still hot when you get to the door.",
  },
] as const;