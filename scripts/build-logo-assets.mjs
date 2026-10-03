/**
 * Espressly - brand asset builder
 * ---------------------------------------------------------------------------
 * The supplied `resource/expressly-logo.jpeg` is a flattened JPEG: dark ink on a
 * near-uniform warm paper background. Navigation sits on both light and dark
 * surfaces, so we derive four production-ready transparent marks from it:
 *
 *   public/brand/logo-full.png         full lockup, original colours (light UI)
 *   public/brand/logo-full-cream.png   full lockup, single-colour cream (dark UI)
 *   public/brand/logo-mark.png         cup mark only, original colours
 *   public/brand/logo-mark-cream.png   cup mark only, single-colour cream
 *
 * Run with:  node scripts/build-logo-assets.mjs
 *
 * The script is idempotent and is committed on purpose so the logo can be
 * regenerated at any time (e.g. after a new master file is dropped into
 * `resource/`). Nothing else in the app depends on the flattened source.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const SOURCE = resolve(root, "resource/expressly-logo.jpeg");
const OUT_DIR = resolve(root, "public/brand");

/** Warm paper tone the logo was flattened onto. */
const PAPER = [243, 241, 234];
/** Alpha ramp: fully transparent inside this distance, fully opaque past `hard`. */
const SOFT = 14;
const HARD = 40;
/** Below this the pixel is JPEG ringing, not artwork - zero it out. */
const FLOOR = 48;
/** Ink colour used for the reversed (dark surface) variants. */
const CREAM = [244, 238, 228];

const distance = (a, b) =>
  Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/** Tight bounding box of non-zero alpha inside `region`. */
function findBounds(alpha, width, height, region) {
  let left = region.left + region.width;
  let right = region.left - 1;
  let top = region.top + region.height;
  let bottom = region.top - 1;
  for (let y = region.top; y < region.top + region.height; y += 1) {
    for (let x = region.left; x < region.left + region.width; x += 1) {
      if (!alpha[y * width + x]) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  if (right < left || bottom < top) return region;
  const pad = 2;
  return {
    left: Math.max(0, left - pad),
    top: Math.max(0, top - pad),
    width: Math.min(width, right + pad) - Math.max(0, left - pad),
    height: Math.min(height, bottom + pad) - Math.max(0, top - pad),
  };
}

async function buildLogoAssets() {
  await mkdir(OUT_DIR, { recursive: true });

  const { data, info } = await sharp(SOURCE)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixelCount = width * height;

  // 1. Alpha channel: distance from the flattened paper background.
  const alpha = new Uint8Array(pixelCount);
  for (let p = 0; p < pixelCount; p += 1) {
    const i = p * channels;
    const d = distance([data[i], data[i + 1], data[i + 2]], PAPER);
    alpha[p] = Math.round(smoothstep(SOFT, HARD, d) * 255);
    if (alpha[p] < FLOOR) alpha[p] = 0;
  }

  // 2. Un-premultiply so no pale halo survives against dark surfaces.
  const colour = Buffer.alloc(pixelCount * 4);
  for (let p = 0; p < pixelCount; p += 1) {
    const i = p * channels;
    const a = alpha[p] / 255;
    const o = p * 4;
    if (a <= 0.001) continue;
    for (let c = 0; c < 3; c += 1) {
      const observed = data[i + c];
      const value = (observed - (1 - a) * PAPER[c]) / a;
      colour[o + c] = Math.min(255, Math.max(0, Math.round(value)));
    }
    colour[o + 3] = alpha[p];
  }

  const flat = sharp(colour, { raw: { width, height, channels: 4 } });

  // 3. Trim to the artwork's real bounding box so the emitted PNGs carry no
  //    dead space - header and footer can then size them from real ratios.
  const columnAlpha = new Uint32Array(width);
  const rowAlpha = new Uint32Array(height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const a = alpha[y * width + x];
      if (a) {
        columnAlpha[x] += a;
        rowAlpha[y] += a;
      }
    }
  }
  const firstActive = (arr) => {
    const i = arr.findIndex((v) => v > 0);
    return i === -1 ? 0 : i;
  };
  const lastActive = (arr) => {
    for (let i = arr.length - 1; i >= 0; i -= 1) if (arr[i] > 0) return i;
    return arr.length - 1;
  };
  const left = firstActive(columnAlpha);
  const right = lastActive(columnAlpha);
  const top = firstActive(rowAlpha);
  const bottom = lastActive(rowAlpha);
  const art = {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  };

  // 4. Split the lockup into "mark" and "wordmark" at the empty vertical gap
  //    closest to the expected device position (~26% across the lockup).
  const targetX = left + art.width * 0.26;
  let gapStart = -1;
  let gapSize = 0;
  let gapEnd = -1;
  let gapScore = Number.POSITIVE_INFINITY;
  for (let x = left; x <= right; x += 1) {
    if (columnAlpha[x] === 0) {
      if (gapStart === -1) gapStart = x;
    } else if (gapStart !== -1) {
      const size = x - gapStart;
      const centre = gapStart + size / 2;
      const score = Math.abs(centre - targetX) - size;
      if (score < gapScore) {
        gapScore = score;
        gapEnd = gapStart;
        gapSize = size;
      }
      gapStart = -1;
    }
  }

  const markWidth = Math.min(
    art.width,
    Math.max(1, gapEnd + Math.round(gapSize * 0.5) - left),
  );

  const write = async (name, pipeline) => {
    const file = resolve(OUT_DIR, name);
    await pipeline.toFile(file);
    const m = await sharp(file).metadata();
    console.log(
      `${name.padEnd(26)} ${String(m.width).padStart(4)}x${String(m.height).padEnd(4)}`,
    );
    return { width: m.width, height: m.height };
  };

  const raw = { width, height, channels: 4 };
  /** Fresh pipeline per output - a sharp instance is single-use. */
  const png = (buffer, region) =>
    sharp(buffer, { raw })
      .extract(region)
      .png({ compressionLevel: 9, palette: true });

  const creamRgba = Buffer.alloc(pixelCount * 4);
  for (let p = 0; p < pixelCount; p += 1) {
    const o = p * 4;
    creamRgba[o] = CREAM[0];
    creamRgba[o + 1] = CREAM[1];
    creamRgba[o + 2] = CREAM[2];
    creamRgba[o + 3] = alpha[p];
  }

  const colourFull = await write("logo-full.png", png(colour, art));
  const creamFull = await write("logo-full-cream.png", png(creamRgba, art));

  // Mark only: the cup-and-steam device that sits left of the detected gap.
  // The tight crop is computed from alpha directly - sharp cannot combine
  // `extract` and `trim` in a single raw pipeline.
  const markArt = { ...art, width: markWidth };
  const markLeft = findBounds(alpha, width, height, markArt);
  const markColour = await write("logo-mark.png", png(colour, markLeft));
  await write("logo-mark-cream.png", png(creamRgba, markLeft));

  const manifest = {
    generatedFrom: "resource/expressly-logo.jpeg",
    artworkBounds: art,
    split: { gapEnd, gapSize, markWidth },
    lockup: { colour: colourFull, cream: creamFull },
    mark: markColour,
  };
  await writeFile(
    resolve(OUT_DIR, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log("\nBrand assets written to public/brand");
}

buildLogoAssets().catch((error) => {
  console.error(error);
  process.exit(1);
});