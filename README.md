# Espressly

Premium specialty coffee brand website — Next.js 16 (App Router), TypeScript,
Tailwind CSS v4 and Motion.

Espressly is a fictional specialty coffee house and micro-roastery built as a
production-quality reference implementation: editorial layout, centralised
content and image configuration, composable motion primitives, an accessible
frontend cart, and full SEO/structured-data coverage.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script            | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Development server with HMR              |
| `npm run build`   | Production build + type-check            |
| `npm run start`   | Serve the production build               |
| `npm run lint`    | ESLint                                   |
| `npm run typecheck` | `tsc --noEmit`                        |

Environment (optional):

```bash
NEXT_PUBLIC_SITE_URL=https://www.espressly.coffee   # canonical + OG origin
```

---

## Architecture

```
src/
  app/                     routes only — one folder per page
    layout.tsx             fonts, metadata, cart provider, header/footer
    page.tsx               home (section composition documented inline)
    menu/ what-we-offer/ shop/ blog/ about/ contact/
    blog/[slug]/           article pages (Article JSON-LD)
    shop/[slug]/           product pages (Product JSON-LD)
    robots.ts sitemap.ts schema.jsonld/route.ts
  components/
    brand/                 logo, social icons
    cards/                 product, menu, blog, service cards
    layout/                site footer
    motion/                reusable motion primitives (see below)
    navigation/            header, mobile menu
    sections/              page-level compositions
      home/                one component per home section
    shop/                  cart provider + drawer
    ui/                    button, container, field, media, headings…
  config/                  ← all content and images live here
  hooks/                   use-media-query
  lib/                     cn, format, motion tokens, seo/json-ld
public/
  brand/                   generated logo variants + manifest
  images/<slot>/           art-direction photography
scripts/
  build-logo-assets.mjs    derives transparent logo variants
  fetch-reference-assets.ps1   one-off placeholder asset fetcher
```

### Server-first rendering

Pages are Server Components. `"use client"` appears only where interactivity or
animation genuinely requires it — motion primitives, the cart, the header and
the mobile menu. Result: the initial HTML contains the full copy and imagery,
and the client bundle stays small.

---

## Design system

Defined once in `src/app/globals.css` under Tailwind v4's `@theme`.

| Token family   | Values                                                       |
| -------------- | ------------------------------------------------------------ |
| Rooted neutrals| `ink-950 … ink-700` — deep roasted browns to near-black       |
| Espresso       | `espresso-950 … espresso-700` — dark band surfaces             |
| Copper         | `copper-700 … copper-300` — the single accent, used sparingly  |
| Crema → paper  | `crema-300`, `sand-200/100`, `cream-100`, `paper-50/25`        |
| Semantic       | `surface-*`, `text-*`, `line-light`, `line-dark`               |

Typography pairs **Fraunces** (variable display serif, optical sizing) with
**Inter Tight** (UI/body grotesque), both self-hosted via `next/font`.

Utilities: `eyebrow`, `display-type`, `rule-fade`, `hairline-t/b`, `link-wipe`,
`grain`, `rail`, `hide-scrollbar`.

Every text/background pairing in the palette clears WCAG AA (verified with
Lighthouse: accessibility, best practices and SEO all score 100).

---

## Motion

Reusable primitives in `src/components/motion/` — animation logic is never
duplicated across pages.

| Primitive           | Use                                                          |
| ------------------- | ------------------------------------------------------------ |
| `Reveal`            | Single element rising into place on scroll                     |
| `Stagger`/`StaggerItem` | Parent that staggers its children                           |
| `SplitText`         | Word-level masked reveal (the editorial headline treatment)    |
| `ImageReveal`       | Clip-path curtain + overscale settle                          |
| `ParallaxImage`     | Scroll-linked translate inside a fixed frame                  |
| `ScrollRail`        | Pinned horizontal scroll on desktop, swipeable rail on touch  |
| `Marquee`           | Seamless single-transform loop                                |
| `CountUp`           | Statistic counter, fires once in view                         |
| `Magnetic`          | Pointer-driven pull for high-emphasis buttons                 |
| `ScrollProgress`    | Spring-driven reading-progress hairline                      |

Principles: only `opacity`, `transform` and `clip-path` are animated;
durations are 0.24–1.6 s; easings are expo-out; no bounce, no springs except a
small scroll-progress damper. Every primitive reads `useReducedMotion()` and
renders its final state instead of animating. Parallax and pinned rails are
disabled below `lg` and on coarse pointers so vertical scroll is never hijacked
on touch.

---

## Content & images

**All copy and images live in `src/config/`.** Components never contain a
hard-coded path or string.

| File                | Owns                                              |
| ------------------- | ------------------------------------------------- |
| `config/site.ts`    | Brand, contact, opening hours, socials            |
| `config/navigation.ts` | Primary nav, footer nav, marquee words         |
| `config/images.ts`  | The single image registry                         |
| `config/menu.ts`    | Menu categories, items, prices, highlights        |
| `config/products.ts`| Products, categories, pricing                     |
| `config/services.ts`| What we offer                                     |
| `config/blog.ts`    | Posts, authors, categories, article blocks        |
| `config/home.ts`    | Hero, statement, pillars, craft, stats, voices   |
| `config/about.ts`   | Story, values, sourcing, roasting, sustainability, FAQ |
| `config/contact.ts` | Contact copy, enquiry types                       |

### Replacing images

1. Drop the new file into the matching `public/images/<folder>/` slot.
2. Update `src` (and `alt` if the subject changed) in `src/config/images.ts`.
3. Optionally set `focus` to reframe the crop.

Layouts are ratio-locked: every photograph renders inside a fixed
`aspect-ratio` frame with `next/image` `fill`, so a different crop or
orientation changes composition but never spacing or CLS.

### Replacing the logo

`scripts/build-logo-assets.mjs` reads `resource/expressly-logo.jpeg` and emits
four transparent variants (full lockup + cup mark, colour + cream) into
`public/brand/`, plus a `manifest.json` with the measured dimensions used by
the config. Re-run it after dropping in a new master file:

```bash
node scripts/build-logo-assets.mjs
```

If the file names change, update the four paths in `src/config/images.ts`.

---

## Cart

`src/components/shop/cart-provider.tsx` is a reducer + context shaped like a
commerce API (`add`, `setQuantity`, `remove`, `clear`), with totals derived from
`config/products` so a price change can never desync the UI, and state mirrored
to `localStorage` under `espressly.cart.v1`. The drawer implements the full
modal contract: focus trap, focus restoration, `Escape` to close, scroll lock
with scrollbar-width compensation. Swap the reducer for real API calls when a
backend exists.

---

## SEO

- Per-route `buildMetadata()` → unique title, description, canonical, Open Graph,
  Twitter card.
- JSON-LD: `Organization`, `CafeOrCoffeeShop`, `WebSite`, `Menu`, `Product`,
  `Article`, `BreadcrumbList`, `FAQPage`. `caffeJsonLd` and friends read from
  `config/site.ts`, so structured data never drifts from the visible content.
- `/schema.jsonld` serves the organisation graph for crawlers.
- `robots.ts` and `sitemap.ts` generated from the content config.

> **Before launch:** address, phone and social handles in `config/site.ts` are
> illustrative placeholders (the phone number uses the reserved 555 range).
> Replace them with verified details — structured data reflects them directly.

---

## Accessibility

- Semantic landmarks, one `h1` per page, ordered heading levels.
- Skip link, visible focus rings, `:focus-visible` styling throughout.
- Every interaction reachable by keyboard; nothing depends on hover alone.
- `aria-current`, `aria-expanded`, `aria-modal`, `aria-live` used where they
  belong; labels tied to controls; errors announced with `role="alert"`.
- Decorative motion respects `prefers-reduced-motion` throughout.

---

## Responsive behaviour

Mobile 320 / 375 / 390 / 430 · tablet 768 / 820 / 1024 ·
desktop 1280 / 1440 / 1600 / 1920.

Sections are recomposed rather than scaled down: the hero type block moves
below the plate card, the pinned signature rail becomes a snap-scrolling swipe
rail, the sticky story rail hides its chapter list, and grids step down
1 → 2 → 4 columns. `overflow-x: clip` on `body` plus ratio-locked media
guarantee no horizontal scrolling.

---

## Reference usage

The Corretto theme (https://corretto.qodeinteractive.com/) was used **only** as
visual direction. Espressly shares no HTML, CSS, copy, imagery in production
intent, or decorative assets with it. Placeholder photography collected for
art direction lives in `public/images/` and is swapped through
`config/images.ts`; none of it is required by the codebase.