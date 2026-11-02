import "server-only";

import concretesAbsolutes from "@/content/products/concretes-absolutes";
import essentialOils from "@/content/products/essential-oils";
import {
  APPLICATION_LABELS,
  CATEGORY_LABELS,
  EXTRACTION_LABELS,
  FORM_LABELS,
  type ProductIndexEntry,
} from "@/lib/labels";
import {
  assertNoHealthClaims,
  productSchema,
  type Application,
  type Category,
  type Form,
  type Product,
} from "@/lib/schema";

/* ---------------------------------------------------------------
   The ONLY interface any page uses to reach product data.

   Every accessor is async even though the source is a local module
   today. When the source becomes MongoDB (Phase 3) this file changes
   and no page does. A synchronous `products.map(...)` written now
   would be a refactor across 31 routes later — hence the Promises.
   --------------------------------------------------------------- */

export {
  APPLICATION_LABELS,
  CATEGORY_LABELS,
  EXTRACTION_LABELS,
  FORM_LABELS,
} from "@/lib/labels";
export type { ProductIndexEntry } from "@/lib/labels";

const RAW: Product[] = [...concretesAbsolutes, ...essentialOils];

/* Validate once, at module load, so `next build` fails on bad data
   rather than rendering a half-empty product page. */
const ALL: Product[] = (() => {
  const seen = new Set<string>();
  return RAW.map((raw, i) => {
    const parsed = productSchema.safeParse(raw);
    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((is) => `  · ${is.path.join(".") || "(root)"}: ${is.message}`)
        .join("\n");
      throw new Error(
        `Invalid product at index ${i} ("${raw?.slug ?? "unknown"}"):\n${issues}`,
      );
    }
    const product = parsed.data;
    if (seen.has(product.slug)) {
      throw new Error(`Duplicate product slug "${product.slug}".`);
    }
    seen.add(product.slug);
    assertNoHealthClaims(product);
    return product;
  }).sort((a, b) => a.commonName.localeCompare(b.commonName));
})();

/* Cross-reference integrity: a relatedSlug pointing nowhere would
   render a dead link, so catch it at build time. */
(() => {
  const slugs = new Set(ALL.map((p) => p.slug));
  for (const p of ALL) {
    for (const r of p.relatedSlugs) {
      if (!slugs.has(r)) {
        throw new Error(`Product "${p.slug}" lists unknown relatedSlug "${r}".`);
      }
      if (r === p.slug) {
        throw new Error(`Product "${p.slug}" lists itself as related.`);
      }
    }
  }
})();

/* -- accessors -------------------------------------------------- */

export async function getProducts(): Promise<Product[]> {
  return ALL;
}

export async function getProduct(slug: string): Promise<Product | null> {
  return ALL.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  return ALL.filter((p) => p.category === category);
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  const product = await getProduct(slug);
  if (!product) return [];
  const related = product.relatedSlugs
    .map((s) => ALL.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));

  /* Never render an empty "related" rail — fall back to same-category
     neighbours so the slot always has something useful in it. */
  if (related.length >= 3) return related.slice(0, 4);
  const filler = ALL.filter(
    (p) =>
      p.slug !== slug &&
      p.category === product.category &&
      !related.some((r) => r.slug === p.slug),
  );
  return [...related, ...filler].slice(0, 4);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  /* Q11: the six the client named for the homepage, in their order. */
  const order = [
    "jasmine-sambac",
    "jasmine-grandiflorum",
    "tuberose",
    "vetiver",
    "cypriol-nagarmotha",
    "nutmeg",
  ];
  return order
    .map((s) => ALL.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}

export async function getAllSlugs(): Promise<string[]> {
  return ALL.map((p) => p.slug);
}

/* -- catalogue facets ------------------------------------------- */

export type CatalogueFacets = {
  categories: { value: Category; label: string; count: number }[];
  forms: { value: Form; label: string; count: number }[];
  applications: { value: Application; label: string; count: number }[];
  origins: { value: string; count: number }[];
};

export async function getCatalogueFacets(): Promise<CatalogueFacets> {
  const count = <T extends string>(pick: (p: Product) => T[]) => {
    const m = new Map<T, number>();
    for (const p of ALL) for (const v of pick(p)) m.set(v, (m.get(v) ?? 0) + 1);
    return m;
  };

  const cats = count<Category>((p) => [p.category]);
  const forms = count<Form>((p) => p.availableForms);
  const apps = count<Application>((p) => p.applications);
  const origins = count<string>((p) => [p.origin]);

  return {
    categories: [...cats].map(([value, c]) => ({
      value,
      label: CATEGORY_LABELS[value],
      count: c,
    })),
    forms: [...forms].map(([value, c]) => ({
      value,
      label: FORM_LABELS[value],
      count: c,
    })),
    applications: [...apps].map(([value, c]) => ({
      value,
      label: APPLICATION_LABELS[value],
      count: c,
    })),
    origins: [...origins]
      .map(([value, c]) => ({ value, count: c }))
      .sort((a, b) => b.count - a.count),
  };
}

/* -- serialisable index for the client-side catalogue -----------
   The filter UI runs in the browser over 31 items, so it needs a
   small payload — not the full descriptions. This is what gets
   handed across the server/client boundary. */

export async function getProductIndex(): Promise<ProductIndexEntry[]> {
  return ALL.map((p) => ({
    slug: p.slug,
    commonName: p.commonName,
    botanicalName: p.botanicalName,
    casNumber: p.casNumber,
    category: p.category,
    availableForms: p.availableForms,
    extractionMethod: p.extractionMethod,
    applications: p.applications,
    origin: p.origin,
    summary: p.summary,
    /* Trimmed: the catalogue card shows a hint, not the full profile. */
    odourProfile: p.odourProfile.slice(0, 140),
  }));
}
