import Link from "next/link";
import { Suspense } from "react";
import CatalogueBrowser from "@/components/product/CatalogueBrowser";
import CTABand from "@/components/sections/CTABand";
import { Breadcrumb, Rail } from "@/components/ui";
import { getProductIndex } from "@/lib/products";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

export const metadata = pageMetadata({
  title: "Product Catalogue — 31 Natural Aromatic Ingredients",
  description:
    "Browse PAAF's 31 concretes, absolutes and essential oils. Filter by category, form and application, or search by botanical name or CAS number.",
  path: "/products",
});

export default async function ProductsPage() {
  const products = await getProductIndex();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-11 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 max-w-3xl">
            <h1 className="h2">The catalogue</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              Seven concretes, seven absolutes and seventeen essential oils. Search by common
              name, botanical name or CAS number, and filter down to exactly the material
              you need. Prices are on application.
            </p>
          </div>
        </Rail>
      </div>

      <Rail className="py-9 lg:py-12">
        <Suspense
          fallback={
            <p className="py-20 text-center text-muted">Loading the catalogue…</p>
          }
        >
          <CatalogueBrowser products={products} />
        </Suspense>
      </Rail>

      {/* Server-rendered A–Z index.

          The filterable grid above lives behind a Suspense boundary
          (it reads the query string), so it is not in the prerendered
          HTML. Without this list, a crawler would find a catalogue
          page with no links to the 31 products on it. It is also
          genuinely useful: a buyer who knows the name wants to skip
          the filters entirely. */}
      <section className="border-t border-border bg-bone py-12 lg:py-16">
        <Rail>
          <h2 className="h5">All products, A–Z</h2>
          <p className="mt-3 text-[0.9375rem] text-muted">
            Thirty-one materials. Botanical names and CAS numbers are on each page.
          </p>
          <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3 min-[1536px]:grid-cols-4">
            {products.map((p) => (
              <li key={p.slug} className="border-b border-border pb-2.5">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex items-baseline justify-between gap-3"
                >
                  <span className="font-medium text-forest-900 group-hover:text-gold-700">
                    {p.commonName}
                  </span>
                  <span className="shrink-0 text-[0.75rem] italic text-muted">
                    {p.botanicalName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Rail>
      </section>

      <CTABand
        title="Looking for something we don't list?"
        body="We work directly with growers across Tamil Nadu and can often source botanicals beyond our standard catalogue. Tell us what you need."
        primaryLabel="Ask about a botanical"
        primaryHref="/contact"
        secondaryLabel="Request a quote"
        secondaryHref="/request-quote"
      />
    </>
  );
}
