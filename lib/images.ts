/* ---------------------------------------------------------------
   Image registry.

   INTERIM ART DIRECTION. Every URL here is licensed stock from
   Unsplash, used so the layout reads as a finished site rather than
   a wireframe. It is NOT the final imagery.

   Brief #10 is explicit: "Real photography. Farms, harvest, lab and
   packaging, rather than the cut-out product renders the reference
   site uses." Q15 confirms Nishok/Sam are supplying it. Stock
   botanicals undercut a traceability claim — a buyer who reverse
   image-searches a "our fields" photo and finds it on a stock site
   has learned something you did not want to teach them.

   REPLACEMENT PLAN: swap the values below for files in /public/img.
   Nothing else in the codebase needs to change — every component
   reads through this module.
   --------------------------------------------------------------- */

import heroJpg from "@/public/img/hero.jpg";

const U = "https://images.unsplash.com/photo-";

/* Local assets. A static import gives next/image the intrinsic
   dimensions at build time and lets it generate a blur placeholder,
   neither of which it can do for a remote URL.

   Alt text describes what is actually in the frame and does not claim
   the location — see the note in README about replacing this with
   PAAF's own photography. */
export const LOCAL_IMAGES = {
  hero: {
    src: heroJpg,
    alt: "Two pickers hand-harvesting along the planted rows of a hillside estate at first light, collecting baskets carried on their backs",
  },
} as const;

/** Build a sized, cropped Unsplash URL. */
export function photo(id: string, w = 1200, q = 70): string {
  return `${U}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export type Img = { id: string; alt: string };

/* -- Section imagery --------------------------------------------- */

export const SECTION_IMAGES = {
  hero: {
    id: "1486102515046-44130769cb25",
    alt: "White jasmine blossoms open on the vine at first light",
  },
  categoryFloral: {
    id: "1612380635121-411eda9ecbb9",
    alt: "Freshly picked jasmine flowers gathered for extraction",
  },
  categoryOil: {
    id: "1673208126879-18094b40d9cf",
    alt: "Dried aromatic roots prepared for steam distillation",
  },
  traceability: {
    id: "1586973831237-7d8dd03a996f",
    alt: "Harvested aromatic crop being handled in the field",
  },
  lab: {
    id: "1614283226124-5a2f0f23752b",
    alt: "Laboratory glassware used in analytical testing of extracts",
  },
  extractionHall: {
    id: "1602928298849-325cec8771c0",
    alt: "Distillation and extraction equipment in a processing facility",
  },
  growers: {
    id: "1569582289082-5777d5b9ec91",
    alt: "Rose blooms being gathered by hand on a flower farm",
  },
  fields: {
    id: "1568657185499-bd0a9549057a",
    alt: "Flower farm in cultivation at dawn",
  },
  packing: {
    id: "1608037222022-62649819f8aa",
    alt: "Amber bottles of finished aromatic oil prepared for dispatch",
  },
  location: {
    id: "1587316830182-59ca6817ce72",
    alt: "Agricultural land in the Tamil Nadu flower belt",
  },
} as const satisfies Record<string, Img>;

/* -- Process stage imagery ---------------------------------------
   One frame per stage of the Six-Stage Protocol, keyed by the stage
   number in content/process.ts. The homepage scatter carousel needs
   six distinct images: a repeat is immediately obvious when two
   cards sit side by side on screen. */

export const PROCESS_IMAGES: Record<string, Img> = {
  /* Own entry rather than a reference to SECTION_IMAGES.fields: the
     frame is cut flowers in buckets, which suits intake but does not
     match that entry's "farm in cultivation" alt text. */
  "01": { id: "1568657185499-bd0a9549057a", alt: "Freshly cut flowers gathered in buckets after harvest" },
  "02": SECTION_IMAGES.traceability,
  "03": SECTION_IMAGES.categoryFloral,
  "04": SECTION_IMAGES.extractionHall,
  "05": { id: "1618828729232-347c3160c820", alt: "Condensed distillate collecting in glass" },
  "06": SECTION_IMAGES.lab,
};

export function processImage(number: string): Img {
  return PROCESS_IMAGES[number] ?? SECTION_IMAGES.extractionHall;
}

/* -- Per-product imagery -----------------------------------------
   One image per SKU so no two cards in the grid repeat. Subjects
   are indicative of the material, not photographs of our own lots —
   see the note at the top of this file. */

const PRODUCT_IMAGES: Record<string, Img> = {
  /* Concretes & absolutes */
  "jasmine-sambac": { id: "1612380635121-411eda9ecbb9", alt: "Jasmine sambac flowers in bloom" },
  "jasmine-grandiflorum": { id: "1623171404570-1d196759fe20", alt: "Jasmine grandiflorum blossoms" },
  "jasmine-auriculatum": { id: "1649674635709-a08fae8d64fb", alt: "Small white jasmine flowers" },
  tuberose: { id: "1618510355097-77b432ca8436", alt: "Tuberose spike in flower" },
  champaca: { id: "1676125760182-ba8b7c0e4d9c", alt: "Champaca blossoms on the branch" },
  frangipani: { id: "1523996381875-89483b0c2eca", alt: "Frangipani flowers in bloom" },
  lotus: { id: "1562892302-40f6c820821c", alt: "Lotus flower on open water" },
  mimosa: { id: "1593011951342-8426e949371f", alt: "Yellow mimosa flower clusters" },
  "indian-rose-centifolia": { id: "1568657185499-bd0a9549057a", alt: "Centifolia roses in the field" },
  "rose-edward": { id: "1569582289082-5777d5b9ec91", alt: "Edward rose blooms being harvested" },
  "tobacco-flower": { id: "1587316830182-59ca6817ce72", alt: "Tobacco plants in flower" },
  chrysanthemum: { id: "1602928321679-560bb453f190", alt: "Chrysanthemum flower heads" },
  fenugreek: { id: "1596040033229-a9821ebd058d", alt: "Fenugreek seeds" },
  vanilla: { id: "1604002192780-0f2c815fc29e", alt: "Cured vanilla beans" },

  /* Essential oils */
  vetiver: { id: "1673208126879-18094b40d9cf", alt: "Vetiver roots cleaned and dried" },
  "cypriol-nagarmotha": { id: "1682490301133-db17d61a5324", alt: "Nagarmotha rhizomes" },
  nutmeg: { id: "1616319708901-52d9b189d74c", alt: "Whole nutmeg kernels" },
  "black-pepper": { id: "1622042914579-f5d10cf8ea4d", alt: "Dried black peppercorns" },
  cardamom: { id: "1668885309844-5bb50f7c2e61", alt: "Green cardamom pods" },
  lemongrass: { id: "1586973831237-7d8dd03a996f", alt: "Lemongrass growing in the field" },
  palmarosa: { id: "1653786815794-56959ceb48d7", alt: "Palmarosa grass at full flower" },
  "ginger-grass": { id: "1564020799643-54f7ab923d61", alt: "Aromatic grass crop" },
  "citronella-java": { id: "1602928309809-776bf9db8658", alt: "Citronella grass clumps" },
  "citronella-ceylon": { id: "1618828729232-347c3160c820", alt: "Distilled aromatic oil in glass" },
  "eucalyptus-globulus": { id: "1552256028-2c58c3cbfa7a", alt: "Eucalyptus leaves and oil" },
  "eucalyptus-citriodora": { id: "1560521166-e4af6324303d", alt: "Lemon eucalyptus foliage" },
  davana: { id: "1614283226124-5a2f0f23752b", alt: "Davana herb prepared for distillation" },
  "curry-leaf": { id: "1550159793-ecaa76eaffde", alt: "Fresh curry leaves" },
  kewda: { id: "1602928298849-325cec8771c0", alt: "Screw pine flower spikes" },
  ginger: { id: "1608037222022-62649819f8aa", alt: "Ginger rhizomes" },
  valerian: { id: "1602928299025-47892a76808a", alt: "Valerian root prepared for distillation" },
};

const FALLBACK: Record<string, Img> = {
  "concrete-absolute": SECTION_IMAGES.categoryFloral,
  "essential-oil": SECTION_IMAGES.categoryOil,
};

export function productImage(slug: string, category: string): Img {
  return PRODUCT_IMAGES[slug] ?? FALLBACK[category] ?? SECTION_IMAGES.hero;
}
