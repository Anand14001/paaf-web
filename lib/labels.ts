import type { Application, Category, Form } from "@/lib/schema";

/* ---------------------------------------------------------------
   Display labels and the serialisable product index type.

   These live apart from lib/products.ts because that module is
   `server-only` — it reaches the content layer, and later MongoDB.
   Client components (the catalogue filters, the buy panel, the
   enquiry form) need the labels but must never pull the data source
   into the browser bundle.
   --------------------------------------------------------------- */

export const CATEGORY_LABELS: Record<Category, string> = {
  concrete: "Concretes",
  absolute: "Absolutes",
  "essential-oil": "Essential Oils",
};

/** Where each category lives. One map rather than a ternary per
    call site: with two categories a ternary was fine, with three it
    is a bug waiting for the fourth. */
export const CATEGORY_PATHS: Record<Category, string> = {
  concrete: "/products/concretes",
  absolute: "/products/absolutes",
  "essential-oil": "/products/essential-oils",
};

export const FORM_LABELS: Record<Form, string> = {
  concrete: "Concrete",
  absolute: "Absolute",
  oil: "Oil",
};

export const APPLICATION_LABELS: Record<Application, string> = {
  fragrance: "Fragrance",
  flavour: "Flavour",
  cosmetics: "Cosmetics",
  aromatherapy: "Aromatherapy",
};

export const EXTRACTION_LABELS: Record<string, string> = {
  "solvent-extraction": "Solvent extraction",
  "steam-distillation": "Steam distillation",
};

/** What crosses the server/client boundary for the catalogue UI:
    enough to filter and render a card, not the full descriptions. */
export type ProductIndexEntry = {
  slug: string;
  commonName: string;
  botanicalName: string;
  casNumber: string[];
  category: Category;
  availableForms: Form[];
  extractionMethod: string;
  applications: Application[];
  origin: string;
  summary: string;
  odourProfile: string;
};
