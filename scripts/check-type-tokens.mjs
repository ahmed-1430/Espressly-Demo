/**
 * Fails the build when the type scale drifts.
 *
 * `tailwind-merge` has no way to know that `text-display-2xs` is a font size
 * rather than a colour, so `src/lib/cn.ts` lists the names explicitly. Add a
 * `--text-*` token to globals.css without adding it there and every element
 * using that token quietly loses its size — which is exactly what happened
 * across the whole site once already.
 *
 * Run automatically by `prebuild`, and available on its own via
 * `npm run check:type-tokens`.
 */
import { readFileSync } from "node:fs";

const globals = readFileSync("src/app/globals.css", "utf8");
const source = readFileSync("src/lib/cn.ts", "utf8");

/* Companion sub-keys such as `--text-display-lg--line-height` are not utility
   names, so anything containing a second `--` is skipped. */
const themeTokens = [...globals.matchAll(/^\s*--text-([a-z0-9-]+):/gm)]
  .map((m) => m[1])
  .filter((name) => !name.includes("--"));

const listBlock = source.match(/const TYPE_SCALE = \[([\s\S]*?)\]/);
const mergedTokens = listBlock
  ? [...listBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1])
  : [];

const onlyInTheme = themeTokens.filter((t) => !mergedTokens.includes(t));
const onlyInMerge = mergedTokens.filter((t) => !themeTokens.includes(t));

if (onlyInTheme.length === 0 && onlyInMerge.length === 0) {
  console.log(
    `type scale in sync — ${themeTokens.length} tokens shared by globals.css and cn.ts`,
  );
  process.exit(0);
}

if (onlyInTheme.length) {
  console.error(
    `\n  ${onlyInTheme.length} type token(s) declared in globals.css but missing from\n` +
      `  TYPE_SCALE in src/lib/cn.ts, so tailwind-merge will discard them:\n` +
      onlyInTheme.map((t) => `    --text-${t}`).join("\n"),
  );
}
if (onlyInMerge.length) {
  console.error(
    `\n  ${onlyInMerge.length} name(s) in TYPE_SCALE that globals.css does not declare:\n` +
      onlyInMerge.map((t) => `    --text-${t}`).join("\n"),
  );
}
console.error("\n  Add or remove them so the two lists match.\n");
process.exit(1);