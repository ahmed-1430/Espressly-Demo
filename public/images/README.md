# `public/images` — art-direction assets

Everything in this folder is **placeholder art direction**. None of it is
required by the codebase: the only contract is the file name, referenced from
`src/config/images.ts`.

## How to replace the photography

1. Drop your file into the matching slot folder, using the same file name (or
   add a new name).
2. Open `src/config/images.ts` and update that slot's `src` and `alt`.
3. Optionally set `focus` to reframe the crop (CSS `object-position`).

Nothing else changes. Components never contain a `/images/...` string, and every
photograph renders inside a fixed `aspect-ratio` frame with `next/image` `fill`,
so a different crop or orientation changes composition — never spacing, and
never cumulative layout shift.

## Slots

| Folder        | Slot name                  | Used by                                          |
| ------------- | -------------------------- | ------------------------------------------------ |
| `hero/`       | `hero-espresso-pour`       | Home hero (full-bleed, subject on the left)      |
| `hero/`       | `hero-cafe-bar`            | Home hero "on the bar today" plate               |
| `hero/`       | `hero-latte-art`           | Spare hero frame                                 |
| `menu/`       | `menu-banner`              | `/menu` page banner                              |
| `menu/`       | `menu-heading`             | Menu category artwork                            |
| `menu/`       | `menu-espresso`            | Espresso category artwork                        |
| `menu/`       | `menu-latte`               | Milk & cold category artwork                     |
| `menu/`       | `menu-cold-brew`           | Milk & cold category artwork                     |
| `menu/`       | `menu-pastry`              | Kitchen category artwork                         |
| `services/`   | `service-banner`           | `/what-we-offer` banner                          |
| `services/`   | `service-wide-a/b/c`       | Service programme chapters                       |
| `about/`      | `about-banner`             | `/about` banner                                  |
| `about/`      | `about-origin`             | Sourcing story                                   |
| `about/`      | `about-roasting`           | Roasting story                                   |
| `about/`      | `about-barista`            | Ritual story                                     |
| `products/`   | `shop-heading`             | `/shop` banner                                   |
| `products/`   | `product-02/04/06/09`      | Gear packshots (square)                          |
| `blog/`       | `blog-heading`             | `/blog` banner                                   |
| `blog/`       | `article-01/02/03`         | Article artwork                                  |
| `lifestyle/`  | `lifestyle-01…08`          | Gallery, story chapters, product placeholders    |
| `editorial/`  | `editorial-beans`          | Brand statement band + product placeholders      |
| `editorial/`  | `editorial-pour-over`      | Craft band + product placeholders                |
| `editorial/`  | `editorial-pastry`         | Product placeholders                             |
| `editorial/`  | `editorial-texture`        | Optional texture overlay (unused by default)     |
| `contact/`    | `contact-heading`          | `/contact` banner and map placeholder            |

## Guidance

- **Consistency matters more than perfection.** Every photograph in the set
  should read as the same shoot: similar light direction, similar warmth, no
  obvious stock mismatches.
- **Hero and banner frames get cropped hard.** They are displayed at up to
  86 svh from a 2.5:1 source, so keep the subject near the horizontal centre
  and away from the extreme edges.
- **Product cards are ratio-locked** (4:5 in grids, 16:10 for the wide home
  card, 1:1 for gear). Packshots on a plain background crop cleanly; scene
  photography loses context — pick per slot rather than per file.
- **Alt text is written per slot, not per file.** Update it when the subject
  changes; it is read by screen readers and by search engines.