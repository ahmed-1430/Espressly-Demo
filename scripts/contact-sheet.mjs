/**
 * Development helper — builds a labelled contact sheet of every art-direction
 * asset so the whole set can be judged for consistency in one look.
 *
 *   node scripts/contact-sheet.mjs
 *   -> public/brand/_contact-sheet.jpg  (git-ignored, delete freely)
 */
import { mkdir, readdir } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const rootDir = resolve(root, "public/images");
const out = resolve(root, "public/brand/_contact-sheet.jpg");

const CELL_W = 320;
const CELL_H = 220;
const COLS = 5;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = resolve(dir, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    }),
  );
  return files.flat().filter((file) => /\.(jpe?g|png)$/i.test(file));
}

async function main() {
  const files = (await walk(rootDir)).sort();
  const rows = Math.ceil(files.length / COLS);
  const composites = [];

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const label = relative(rootDir, file).replace(/\\/g, "/");

    const cell = await sharp({
      create: {
        width: CELL_W,
        height: CELL_H,
        channels: 3,
        background: { r: 24, g: 20, b: 17 },
      },
    })
      // One composite call: sharp replaces the composite array on each call.
      .composite([
        {
          input: await sharp(file)
            .resize(CELL_W, CELL_H - 26, { fit: "cover", position: "centre" })
            .toBuffer(),
          top: 0,
          left: 0,
        },
        {
          input: Buffer.from(
            `<svg width="${CELL_W}" height="26"><rect width="${CELL_W}" height="26" fill="#1d140e"/><text x="6" y="17" font-family="monospace" font-size="12" fill="#e8dcc9">${label}</text></svg>`,
          ),
          top: CELL_H - 26,
          left: 0,
        },
      ])
      .jpeg({ quality: 80 })
      .toBuffer();

    composites.push({
      input: cell,
      left: (index % COLS) * CELL_W,
      top: Math.floor(index / COLS) * CELL_H,
    });
  }

  await mkdir(dirname(out), { recursive: true });
  await sharp({
    create: {
      width: COLS * CELL_W,
      height: rows * CELL_H,
      channels: 3,
      background: { r: 12, g: 9, b: 7 },
    },
  })
    .composite(composites)
    .jpeg({ quality: 78 })
    .toFile(out);

  console.log(`contact sheet: ${out} (${files.length} assets)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});