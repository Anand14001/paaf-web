/* ---------------------------------------------------------------
   Derives every logo asset the site uses from the one master file,
   public/img/logo.png, so there is a single thing to replace when
   the client sends a revised logo. Run: npm run logo:assets

   Why derive rather than hand-crop:
     · The master has uneven transparent padding (64px above the
       artwork, 161px below). Dropped into a flex row untrimmed it
       sits visibly high. The lockup here is trimmed to its ink.
     · The favicon needs a square, and the master is 3:1. The flower
       mark is cut out at the gap between the mark and the wordmark,
       found by scanning the alpha profile rather than guessed, so a
       re-exported master with different spacing still cuts cleanly.

   sharp ships with Next's image optimiser; it is declared in
   devDependencies so this script does not depend on that accident.
   --------------------------------------------------------------- */

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join, sep } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = join(root, "public/img/logo.png");

/** forest-900 — matches the themeColor in app/layout.tsx. */
const FOREST_900 = "#122a1e";
const ALPHA_FLOOR = 60;

/** Per-column count of opaque pixels — the shape of the artwork. */
async function columnProfile(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const cols = new Array(width).fill(0);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > ALPHA_FLOOR) cols[x]++;
    }
  }
  return { cols, width, height };
}

/** The thinnest column in the first half: the mark/wordmark gap. */
function findSplit(cols, width) {
  const first = cols.findIndex((n) => n > 0);
  const searchFrom = first + Math.round(width * 0.2);
  const searchTo = Math.round(width * 0.5);
  let split = searchFrom;
  let lightest = Infinity;
  for (let x = searchFrom; x < searchTo; x++) {
    if (cols[x] < lightest) {
      lightest = cols[x];
      split = x;
    }
  }
  return split;
}

/** A rounded-square plate, for the favicon and the touch icon. */
function plate(size) {
  const r = Math.round(size * 0.22);
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${FOREST_900}"/>
     </svg>`,
  );
}

const written = [];
async function write(pipeline, outPath) {
  const info = await pipeline.png({ compressionLevel: 9 }).toFile(outPath);
  const rel = outPath.slice(root.length + 1).split(sep).join("/");
  written.push(`${rel}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}

const { cols, width } = await columnProfile(MASTER);
const split = findSplit(cols, width);

/* 1. Lockup — the master, trimmed to its ink on all four sides. */
await write(sharp(MASTER).trim({ threshold: 10 }), join(root, "public/img/logo-lockup.png"));

/* 2. Mark — flower only, trimmed then centred on a square canvas so
      every consumer can size it with one number and trust it. */
const { height: masterHeight } = await sharp(MASTER).metadata();
/* Two pipelines, not one chain: sharp applies trim before extract
   within a single pipeline, which would trim the whole lockup and
   then cut the wrong region out of it. */
const markCut = await sharp(MASTER)
  .extract({ left: 0, top: 0, width: split, height: masterHeight })
  .toBuffer();
const markTrimmed = await sharp(markCut).trim({ threshold: 10 }).toBuffer();

const MARK = 512;
const square = sharp(markTrimmed)
  .resize({ width: MARK, height: MARK, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
await write(square, join(root, "public/img/logo-mark.png"));

/* 3. Favicon + touch icon — the mark on a forest plate. The flower is
      gold-on-transparent; against a browser's own dark chrome the
      leaves disappear, so it gets a background of its own. */
for (const [size, out] of [
  [512, join(root, "app/icon.png")],
  [180, join(root, "app/apple-icon.png")],
]) {
  const inset = Math.round(size * 0.16);
  const art = await sharp(markTrimmed)
    .resize({
      width: size - inset * 2,
      height: size - inset * 2,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();
  await write(
    sharp(plate(size)).composite([{ input: art, top: inset, left: inset }]),
    out,
  );
}

console.log(`mark/wordmark split found at x=${split} of ${width}`);
console.log(written.join("\n"));
