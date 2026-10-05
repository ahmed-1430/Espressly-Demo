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

Slot names below are the keys in `src/config/images.ts`, not the file names.

| Key                     | File                      | Used by                                          |
| ----------------------- | ------------------------- | ------------------------------------------------ |
| `brand.*`               | `public/brand/logo-*.png` | Header, footer, favicon — generated, do not hand-edit |
| `decorativeImages.paper`| `decorative/paper-beans`  | Optional warm paper wash                         |
| `bannerImages.home`     | `hero/hero-espresso-pour` | Home hero (full-bleed, subject on the left)      |
| `bannerImages.menu`     | `menu/menu-heading`       | `/menu` banner                                   |
| `bannerImages.services` | `services/service-heading`| `/what-we-offer` banner                          |
| `bannerImages.shop`     | `products/shop-heading`   | `/shop` banner                                   |
| `bannerImages.blog`     | `lifestyle/lifestyle-06`  | `/blog` banner                                   |
| `bannerImages.about`    | `about/about-heading`     | `/about` banner                                  |
| `bannerImages.contact`  | `contact/contact-heading` | `/contact` banner                                |
| `heroImages.plate`      | `hero/hero-cafe-bar`      | Home hero "on the bar today" plate               |
| `editorialImages.statement` | `editorial/editorial-pour-over` | Brand statement band                       |
| `editorialImages.craft` | `hero/hero-latte-art`     | Craft band                                       |
| `menuImages.*`          | `lifestyle/lifestyle-02…05`, `about/about-origin` | Menu category artwork               |
| `serviceImages.*`       | `services/service-wide-a/b/c`, `lifestyle/lifestyle-08` | Service programme chapters   |
| `aboutImages.*`         | `about/about-origin`, `about-roasting`, `about-barista` | About page stories |
| `shopImages.*`          | `products/product-02/04/06/09` | Gear packshots — **`plate: true`**          |
| `journalImages.*`       | `blog/article-01/02/03`, `lifestyle/lifestyle-07` | Article artwork            |
| `lifestyleImages.*`     | `lifestyle/lifestyle-01…08` | Gallery and product placeholders              |

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
- **Gear packshots are marked `plate: true`.** They are multiplied into the
  frame's own paper colour, which removes a flat white or pale studio
  background instead of letting it read as an unfilled rectangle in a cream
  card. The frame still crops, so keep the product centred with a little margin;
  a product sitting hard against one edge will lose part of itself. A packshot
  supplied as a transparent PNG needs no change.
- **Banners must be the darkest frames in the set.** They carry cream display
  type. A high-key image assigned to a banner slot fails immediately — check
  mean luminance before you fill one (`node scripts/contact-sheet.mjs` renders
  the whole library to a single sheet so you can judge it at a glance).
- **Alt text is written per slot, not per file.** Update it when the subject
  changes; it is read by screen readers and by search engines.