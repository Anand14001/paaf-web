"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Badge, Button, Icon, cx } from "@/components/ui";
import {
  APPLICATION_LABELS,
  CATEGORY_LABELS,
  EXTRACTION_LABELS,
  FORM_LABELS,
  type ProductIndexEntry,
} from "@/lib/labels";

/* ---------------------------------------------------------------
   Catalogue. Brief #4: "Filter by product type, form, origin and
   application, plus a search bar. This is clearer than a long icon
   strip."

   Two things worth noting:

   1. Search covers CAS and botanical name, not just the common name.
      Sourcing managers search by CAS — if that misses, the catalogue
      has failed at its one job.

   2. Filter state lives in the URL, so any filtered view is
      shareable and the back button behaves. 31 items filter
      instantly in the browser; no server round-trip.
   --------------------------------------------------------------- */

type Props = { products: ProductIndexEntry[] };

const FACETS = [
  { key: "category", label: "Category" },
  { key: "form", label: "Form" },
  { key: "method", label: "Extraction" },
  { key: "application", label: "Application" },
] as const;

export default function CatalogueBrowser({ products }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const [query, setQuery] = useState(params.get("q") ?? "");
  const [selected, setSelected] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const active = useMemo(
    () => ({
      category: params.get("category") ?? "",
      form: params.get("form") ?? "",
      method: params.get("method") ?? "",
      application: params.get("application") ?? "",
    }),
    [params],
  );

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.replace(next.toString() ? `/products?${next}` : "/products", {
        scroll: false,
      });
    },
    [params, router],
  );

  const clearAll = useCallback(() => {
    setQuery("");
    router.replace("/products", { scroll: false });
  }, [router]);

  /* -- Facet option lists, derived from the data itself -------- */
  const options = useMemo(() => {
    const uniq = <T extends string>(vals: T[]) => [...new Set(vals)];
    return {
      category: uniq(products.map((p) => p.category)).map((v) => ({
        value: v,
        label: CATEGORY_LABELS[v],
      })),
      form: uniq(products.flatMap((p) => p.availableForms)).map((v) => ({
        value: v,
        label: FORM_LABELS[v],
      })),
      method: uniq(products.map((p) => p.extractionMethod)).map((v) => ({
        value: v,
        label: EXTRACTION_LABELS[v] ?? v,
      })),
      application: uniq(products.flatMap((p) => p.applications)).map((v) => ({
        value: v,
        label: APPLICATION_LABELS[v],
      })),
    };
  }, [products]);

  /* -- Filtering ------------------------------------------------ */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    /* CAS numbers are often typed without hyphens. */
    const qDigits = q.replace(/[^0-9]/g, "");

    return products.filter((p) => {
      if (active.category && p.category !== active.category) return false;
      if (active.form && !p.availableForms.includes(active.form as never)) return false;
      if (active.method && p.extractionMethod !== active.method) return false;
      if (active.application && !p.applications.includes(active.application as never))
        return false;

      if (!q) return true;
      const cas = p.casNumber.join(" ");
      return (
        p.commonName.toLowerCase().includes(q) ||
        p.botanicalName.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.odourProfile.toLowerCase().includes(q) ||
        cas.includes(q) ||
        (qDigits.length >= 4 && cas.replace(/[^0-9]/g, "").includes(qDigits))
      );
    });
  }, [products, query, active]);

  const activeCount =
    Object.values(active).filter(Boolean).length + (query.trim() ? 1 : 0);

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  const bulkHref = `/request-quote?product=${selected.join(",")}`;

  return (
    <div>
      {/* -- Search + filter bar -- */}
      <div className="sticky top-[72px] z-30 -mx-5 border-b border-border bg-ivory/95 px-5 py-4 backdrop-blur-md lg:top-[84px] lg:mx-0 lg:rounded-24 lg:border lg:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Icon
              name="search"
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, botanical name or CAS number…"
              aria-label="Search products"
              className="field-input !py-3 pl-12"
            />
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-white px-5 py-3 text-[0.9375rem] font-semibold text-forest-900 transition-colors hover:border-forest-500 lg:hidden"
          >
            Filters
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-forest-700 px-1.5 text-[0.6875rem] text-white">
                {activeCount}
              </span>
            )}
            <Icon
              name="chevron-down"
              size={16}
              className={cx("transition-transform", filtersOpen && "rotate-180")}
            />
          </button>
        </div>

        <div className={cx("mt-4 lg:mt-4 lg:block", filtersOpen ? "block" : "hidden")}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {FACETS.map((facet) => (
              <div key={facet.key} className="flex flex-wrap items-center gap-2">
                <span className="eyebrow text-muted">{facet.label}</span>
                {options[facet.key].map((o) => {
                  const on = active[facet.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setParam(facet.key, on ? "" : o.value)}
                      className={cx(
                        "rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors",
                        on
                          ? "border-forest-700 bg-forest-700 text-white"
                          : "border-border bg-white text-forest-900 hover:border-forest-500",
                      )}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            ))}

            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-terracotta underline underline-offset-2"
              >
                <Icon name="close" size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* -- Result count -- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.9375rem] text-muted" role="status" aria-live="polite">
          <strong className="font-semibold text-forest-900">{results.length}</strong>
          {results.length === 1 ? " product" : " products"}
          {activeCount > 0 && " matching your filters"}
        </p>
        <p className="text-[0.8125rem] text-muted">All prices on quotation</p>
      </div>

      {/* -- Grid -- */}
      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1536px]:grid-cols-4">
          {results.map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              selectable
              selected={selected.includes(p.slug)}
              onToggle={toggle}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-24 border border-dashed border-border-strong bg-bone px-6 py-16 text-center">
          <p className="font-display text-[1.5rem] text-forest-900">No products match</p>
          <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-muted">
            Try a different search term, or clear the filters. If you are looking for a
            botanical we do not list, tell us — we may be able to source it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button onClick={clearAll} variant="ghost" size="sm">
              Clear filters
            </Button>
            <Button href="/contact" variant="primary" size="sm">
              Ask about a botanical
            </Button>
          </div>
        </div>
      )}

      {/* -- Bulk RFQ bar. Neither reference site does this, and
             multi-line RFQs are how sourcing managers actually buy. -- */}
      {selected.length > 0 && (
        <div className="sticky bottom-4 z-40 mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-24 border border-forest-600 bg-forest-900 px-5 py-4 shadow-xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">{selected.length} selected</Badge>
              <p className="text-[0.9375rem] text-sage-200">
                Request a quote for all of them in one enquiry.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelected([])}
                className="px-3 py-2 text-[0.875rem] font-medium text-sage-300 underline underline-offset-2 hover:text-white"
              >
                Clear
              </button>
              <Button href={bulkHref} variant="accent" size="sm">
                Request quote
                <Icon name="arrow-up-right" size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
