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

Typography pairs **Fraunces** (variable display serif, optical sizing) with
**Inter Tight** (UI/body grotesque), both self-hosted via `next/font`.

| Token family   | Values                                                       |
| -------------- | ------------------------------------------------------------ |
| Rooted neutrals| `ink-950 … ink-700` — deep roasted browns to near-black       |
| Espresso       | `espresso-950 … espresso-700` — dark band surfaces             |
| Copper         | `copper-700 … copper-300` — the single accent, used sparingly  |
| Crema → paper  | `crema-300`, `sand-200/100`, `cream-100`, `paper-50/25`        |
| Semantic       | `surface-*`, `text-*`, `line-light`, `line-dark`, `focus`, `focus-dark` |

### Type scale

Tailwind's default font-size namespace is **cleared** (`--text-*: initial`) and
re-declared as one scale named by role, so hierarchy is legible in the markup and
drifting back to the defaults is not expressible:

```
micro · eyebrow · caption · meta            10 → 13 px   interface
body-sm · body · body-md · body-lg          14 → 17 px   running text
title-xs … title-3xl                       18 → 30 px   headings
lede                                      17 → 21 px   standfirsts
display-2xs … display-lg                   fluid to 160 px
```

The interface and heading steps carry **size only** — line height, tracking and
case are treatments and belong to a utility (`leading-*`, `eyebrow`), which keeps
them visible in the class list instead of hidden inside a token.

> `tailwind-merge` cannot infer that `text-display-2xs` is a size, so it treats
> it as a colour and discards it when a `text-<colour>` follows. `src/lib/cn.ts`
> therefore lists the twenty names explicitly, and
> `scripts/check-type-tokens.mjs` (wired as `prebuild`) fails the build if that
> list and the `@theme` block drift apart. Without this the whole typographic
> hierarchy collapsed to one size.

### Layering

One ladder, declared once, picked by intent rather than by number:

```
under · behind · base · raised · nav · header · overlay · top
```

Tailwind's z-index is a fixed list of numbers rather than a theme namespace, so
these are exposed through `@utility` in globals.css — they still take variants
(`lg:z-nav`, `focus:z-top`).

### Focus

One ring, two tones. `copper-600` (4.4:1) on light surfaces, stepping up to
`copper-300` (10:1) inside `[data-tone="dark"]`. Tone is declared once by
`Section`, the hero, the page header, the mobile menu, the header and the
footer, so no component needs to know its own surface. The outline follows each
element's own `border-radius`, and `transition-colors` — which also transitions
`outline-color` — is suppressed while focused so the ring never fades in.

Utilities: `eyebrow`, `display-type`, `grain`, `rail`, `hide-scrollbar`,
`link-wipe`, `stamp-text`.

Class names are merged with `tailwind-merge` (`src/lib/cn.ts`) so a caller's
`className` always wins over a component's default. Without it, two competing
utilities from the same group both reach the stylesheet and the winner is
decided by CSS order rather than intent — which silently broke every
absolutely-positioned parallax frame until it was added. See the type-scale note
above for the one place it needs configuring.

Every text/background pairing in the palette clears WCAG AA (verified with
Lighthouse: accessibility, best practices and SEO all score 100 on every route).

### Vertical rhythm

`Section` owns it: `flush`, `tight` (20 → 32 px), `default` (28 → 44 px),
`loose` (32 → 56 px) and `hero`. Sections measure 0, 80 or 112 px at a given
viewport — there are no one-off section paddings.

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

Principles: only `opacity`, `transform` and `clip-path` are animated; no bounce,
no springs except a small scroll-progress damper. Every primitive reads
`useReducedMotion()` and renders its final state instead of animating — 36 call
sites across 17 files.

**Transitions** all use one easing, `ease-out-expo`, so motion decelerates
identically everywhere. Durations form a deliberate ladder: 300 ms colour and
opacity on text and small controls, 400 ms borders and the header underline,
500 ms card transforms, 700 ms large surfaces, 1000 ms photography.

**Route transitions** live in `src/app/template.tsx`, which remounts on every
navigation: 300 ms fade plus 10 px of rise. Fade in only — the outgoing page
leaves immediately, so navigation never queues.

**Parallax travel collapses below `lg`** through a media query on a CSS custom
property rather than a JS breakpoint, so there is no hydration branch. Because
the over-scan layer and its offset derive from the same variable, a phone gets
an exact crop rather than a cropped-and-scaled one. Pinned rails and the
horizontal marquee are likewise disabled below `lg` and on coarse pointers, so
vertical scroll is never hijacked on touch.

`ParallaxImage` accepts `entrance="settle"` for a slow overscale settle — a
transform rather than a curtain, so it never holds back Largest Contentful Paint
on a `priority` image.

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

Art direction is encoded in the registry rather than left to chance:

- `bannerImages` holds the darkest frames in the library, because cream display
  type sits on them. A high-key image assigned to a banner fails immediately.
- No photograph appears twice on the same page.
- `focus` is set wherever a crop would otherwise slice through the subject.
- `plate: true` marks a cut-out product shot. Retail packshots arrive on flat
  white, and cropped into a cream card that white reads as an unfilled
  placeholder — so these are multiplied into the frame's own warm paper, which
  dissolves the studio background. The frame still crops rather than containing
  the image, because a square packshot contained inside a 4:5 frame floats small
  in a mostly empty rectangle that looks like a missing image; cropping only
  trims outer margin, which is white anyway. `Media` forces the plate light
  rather than trusting `placeholderTone`, since multiplying onto a dark surface
  would render the packshot black. A future packshot supplied as a transparent
  PNG needs no change.

`public/images/README.md` lists every slot, what consumes it, and the framing
each one needs. `node scripts/contact-sheet.mjs` renders a labelled contact
sheet of the whole library to `public/brand/_contact-sheet.jpg` (git-ignored) so
the set can be judged for consistency in one look.

### Replacing the logo

`scripts/build-logo-assets.mjs` reads `resource/expressly-logo.jpeg` and emits
four transparent variants (full lockup + cup mark, colour + cream) into
`public/brand/`, plus a `manifest.json` with the measured dimensions the config
relies on.

```bash
npm run brand:assets
```

The script colour-keys the flat background, un-premultiplies to avoid a pale
halo on dark surfaces, trims to the real artwork bounds, and splits the cup
mark out of the lockup at the widest internal gap. If the file names change,
update the four paths in `src/config/images.ts`.

---

## Navigation

- Banner routes (home plus the six section pages) open on a full-bleed dark
  image, so the fixed header starts transparent with cream ink and condenses
  into a frosted cream bar past the fold point. Detail routes (products,
  articles) open on light paper and start already solid — cream ink on a cream
  background would be unreadable. `NavItem.banner` and `hasBannerRoute()` in
  `config/navigation.ts` decide this.
- Desktop: logo, seven-item nav with a wiping active underline, bag indicator,
  and a magnetic "Book an event" CTA at `xl`.
- Mobile: a full-screen sheet that is a real modal — focus moves in, Tab is
  trapped, Escape closes, background scroll locks with scrollbar compensation —
  and recomposes rather than shrinking: indexed links, per-route descriptors
  and a contact footer.

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
  `Article`, `BreadcrumbList`, `FAQPage`. `cafeJsonLd` and friends read from
  `config/site.ts`, so structured data never drifts from the visible content.
- Each `<script type="application/ld+json">` holds **one** JSON document. Several
  entities go out as a single top-level array via `serialiseJsonLd` — never as
  concatenated documents, which are not valid JSON and cause the whole block to
  be discarded.
- `/schema.jsonld` serves the organisation graph for crawlers.
- `robots.ts` and `sitemap.ts` generated from the content config.

> **Before launch:** address, phone and social handles in `config/site.ts` are
> illustrative placeholders (the phone number uses the reserved 555 range).
> Replace them with verified details — structured data reflects them directly.

---

## Accessibility

- Semantic landmarks, one `h1` per page, ordered heading levels, `<dl>` only
  where definition lists are meant.
- Skip link, visible focus rings, `:focus-visible` styling throughout.
- Every interaction reachable by keyboard; nothing depends on hover alone.
- Touch targets at least 40 px; the small ones that remain are inline text
  links inside sentences, which WCAG 2.2 explicitly exempts.
- `aria-current`, `aria-expanded`, `aria-modal`, `aria-live` used where they
  belong; labels tied to controls; errors announced with `role="alert"` and
  focus moved to the first invalid field.
- Counters expose their settled value once, never a ticking number.
- Ornament (footer watermark, 404 stamp) is an image or a pseudo-element, so it
  is neither announced nor contrast-checked.
- Decorative motion respects `prefers-reduced-motion` throughout, and a
  `<noscript>` rule forces every animation's end state so copy is readable
  without JavaScript.

---

## Responsive behaviour

Mobile 320 / 375 / 390 / 430 · tablet 768 / 820 / 1024 ·
desktop 1280 / 1440 / 1600 / 1920.

Sections are recomposed rather than scaled down: the hero type block stacks
above the bar plate, the pinned signature rail becomes a snap-scrolling swipe
rail, the sticky story rail hides its chapter list, the shop grid steps
1 → 2 → 4 columns, and the article lead splits only at `xl` where it owns the
full measure. `overflow-x: clip` on `body` (which does not create a scroll
container, so sticky still works) plus ratio-locked media guarantee no
horizontal scrolling.

Verified with a same-origin iframe harness: 77 route × width combinations from
320 px to 1920 px, zero unclipped overflow and zero broken images. The only
nodes reported as clipped are `sr-only` ones, identically at every width. Body
copy stays within 96 characters a line at 1920 px, capped by `SectionHeading`'s
34 / 52 / 64 ch measure scale.

---

## Verification

| Check                                          | Result                            |
| ---------------------------------------------- | --------------------------------- |
| `npm run build`                                 | 29 routes, all prerendered        |
| `npm run check:type-tokens`                     | 20 tokens in sync                 |
| `npm run typecheck` / `npm run lint`            | clean                             |
| Browser console, 9 routes                       | no errors                         |
| Lighthouse a11y / best-practices / SEO           | 100 / 100 / 100, zero failures    |
| Horizontal overflow, 77 route × width samples   | none                              |
| Broken images, 77 samples                       | none                              |
| JSON-LD parses, 9 routes                        | all valid, correct type per route |
| Keyboard focus, real `Tab` traversal            | ring correct on every surface     |

---

## Reference usage

The Corretto theme (https://corretto.qodeinteractive.com/) was used **only** as
visual direction. Espressly shares no HTML, CSS, copy, imagery in production
intent, or decorative assets with it. Placeholder photography collected for
art direction lives in `public/images/` and is swapped through
`config/images.ts`; none of it is required by the codebase.