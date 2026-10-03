export type NavItem = {
  readonly label: string;
  readonly href: string;
  /** Short descriptor used in the mobile drawer and footer sitemap. */
  readonly description?: string;
};

/**
 * Primary navigation. Labels match the information architecture requested by
 * the brand brief; the header collapses to a shorter set on tablet using
 * `shortLabel`.
 */
export const primaryNav: readonly NavItem[] = [
  { label: "Home", href: "/", description: "The Espressly story, in one sitting" },
  { label: "Our Menu", href: "/menu", description: "Espresso bar, filter, cold brew and pastry" },
  { label: "What We Offer", href: "/what-we-offer", description: "Wholesale, events, workshops and gifts" },
  { label: "Shop", href: "/shop", description: "Coffee, gear and collections to take home" },
  { label: "Blog", href: "/blog", description: "Field notes on coffee, brewing and craft" },
  { label: "About Us", href: "/about", description: "Sourcing, roasting and the people behind both" },
  { label: "Contact Us", href: "/contact", description: "Visit the roastery or talk to our team" },
] as const;

export const footerNav = {
  explore: primaryNav.filter((item) => item.href !== "/"),
  visit: [
    { label: "Opening hours", href: "/contact#hours" },
    { label: "Find the roastery", href: "/contact#visit" },
    { label: "Send a message", href: "/contact#form" },
    { label: "Private events", href: "/what-we-offer#events" },
  ] as readonly NavItem[],
} as const;

export type SocialLink = {
  label: string;
  href: string;
  /** Short glyph key resolved by `components/brand/social-icon.tsx`. */
  icon: "instagram" | "facebook" | "pinterest" | "spotify";
};

export const socialLinks: readonly SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/espressly.coffee", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com/espressly.coffee", icon: "facebook" },
  { label: "Pinterest", href: "https://pinterest.com/espresslycoffee", icon: "pinterest" },
  { label: "Spotify", href: "https://open.spotify.com/user/espressly", icon: "spotify" },
];

/** Rotating marquee copy — trimmed to a single line per entry. */
export const marqueeWords = [
  "Single origin",
  "Roasted in small batches",
  "Free filter refills",
  "Direct trade",
  "Ground to order",
  "La Marzocco Linea",
  "Sourced in season",
  "Open from 07:30",
] as const;