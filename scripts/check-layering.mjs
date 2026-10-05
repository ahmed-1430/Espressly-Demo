/**
 * Fails the build when a layering rung is used but never defined.
 *
 * The ladder in globals.css is split in two: the values live in `@theme` as
 * `--z-*` custom properties, and the utilities that read them are declared
 * with `@utility` because Tailwind's z-index is a fixed list of numbers
 * rather than a theme namespace.
 *
 * That split is a trap. Rewriting `@theme` to retarget the palette removed
 * the values but left the utilities behind, so every rung compiled to
 * `z-index: var(--z-header)` — which is invalid at computed-value time, so
 * the declaration is dropped and the element falls back to `z-index: auto`.
 * The fixed header lost its stacking order on every page and the nav appeared
 * to vanish.
 *
 * Nothing caught it: the utilities were still present, every class name still
 * resolved, and typecheck, lint, the build and the type-token guard were all
 * green. It only showed up in a computed style in a browser.
 *
 * This asserts the invariant statically instead.
 */
import { readFileSync } from "node:fs";

const globals = readFileSync("src/app/globals.css", "utf8");

/* Values declared in @theme, e.g. `--z-header: 30`. */
const declared = new Set(
  [...globals.matchAll(/^\s*--z-([a-z]+)\s*:\s*-?\d+\s*;/gm)].map((m) => m[1]),
);

/* Rungs exposed as utilities, e.g. `@utility z-header { z-index: var(--z-header); }` */
const used = new Map(
  [...globals.matchAll(/@utility\s+z-([a-z]+)\s*\{[^}]*z-index:\s*var\(--z-([a-z]+)\)/g)].map(
    (m) => [m[1], m[2]],
  ),
);

const problems = [];

/* A rung that reads a variable @theme does not define. */
for (const [name, variable] of used) {
  if (!declared.has(variable)) {
    problems.push(
      `  z-${name} reads var(--z-${variable}), which @theme never defines —\n` +
        `  it compiles to an invalid declaration and the element silently falls\n` +
        `  back to z-index: auto. Add --z-${variable} to the @theme block.`,
    );
  }
}

/* A rung defined but never exposed, which is dead weight or a half-finished rename. */
for (const name of declared) {
  if (!used.has(name)) {
    problems.push(`  --z-${name} is defined but no z-${name} utility reads it.`);
  }
}

if (problems.length) {
  console.error(`\n  Layering ladder is inconsistent (globals.css):\n`);
  problems.forEach((p) => console.error(`${p}\n`));
  process.exit(1);
}

console.log(
  `layering ladder in sync — ${used.size} rungs, all backed by a @theme value`,
);