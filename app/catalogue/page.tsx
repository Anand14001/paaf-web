import Link from "next/link";
import { Breadcrumb, Icon, Rail } from "@/components/ui";
import {
  APPLICATION_LABELS,
  CATEGORY_LABELS,
  EXTRACTION_LABELS,
  FORM_LABELS,
  getProductsByCategory,
} from "@/lib/products";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Product } from "@/lib/schema";

/* The free, ungated catalogue (Q6: "Brochure / catalogue — free, no
   form"). Rendered as a print-optimised page rather than a PDF so it
   can never go stale against the product data, and so it is indexable.
   Print styles turn it into the handout.

   When the designed PDF exists, link it from here as well — do not
   replace this page with it. */

const trail = [
  { name: "Home", path: "/" },
  { name: "Catalogue", path: "/catalogue" },
];

export const metadata = pageMetadata({
  title: "Full Product Catalogue — 31 Natural Aromatic Ingredients",
  description:
    "PAAF's complete catalogue: 14 concretes and absolutes, 17 essential oils, with botanical names, CAS numbers, odour profiles and applications. Free, no form.",
  path: "/catalogue",
});

function Row({ p }: { p: Product }) {
  return (
    <tr className="break-inside-avoid border-b border-border align-top">
      <td className="py-4 pr-4">
        <Link
          href={`/products/${p.slug}`}
          className="font-medium text-forest-900 hover:text-gold-700"
        >
          {p.commonName}
        </Link>
        <span className="mt-0.5 block text-[0.8125rem] italic text-muted">
          {p.botanicalName}
        </span>
      </td>
      <td className="spec py-4 pr-4 text-[0.8125rem] text-ink">{p.casNumber.join(" / ")}</td>
      <td className="py-4 pr-4 text-[0.8125rem] text-ink">
        {p.availableForms.map((f) => FORM_LABELS[f]).join(" · ")}
      </td>
      <td className="py-4 pr-4 text-[0.8125rem] text-ink">
        {EXTRACTION_LABELS[p.extractionMethod]}
      </td>
      <td className="py-4 pr-4 text-[0.8125rem] leading-relaxed text-muted">
        {p.odourProfile.split(".")[0]}.
      </td>
      <td className="py-4 text-[0.8125rem] text-ink">
        {p.applications.map((a) => APPLICATION_LABELS[a]).join(", ")}
      </td>
    </tr>
  );
}

function Table({ title, items }: { title: string; items: Product[] }) {
  return (
    <section className="mt-12 break-inside-avoid">
      <h2 className="h5">
        {title}{" "}
        <span className="spec align-middle text-[1rem] font-semibold text-gold-700">
          ({items.length})
        </span>
      </h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-forest-900">
              {["Product", "CAS", "Forms", "Method", "Odour profile", "Applications"].map(
                (h) => (
                  <th
                    key={h}
                    scope="col"
                    className="pb-3 pr-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <Row key={p.slug} p={p} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function CataloguePage() {
  const [florals, oils] = await Promise.all([
    getProductsByCategory("concrete-absolute"),
    getProductsByCategory("essential-oil"),
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <Rail className="py-10 lg:py-14">
        <div className="print:hidden">
          <Breadcrumb trail={trail} />
        </div>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6 border-b-2 border-forest-900 pb-8">
          <div className="max-w-2xl">
            <h1 className="h3">Product catalogue</h1>
            <p className="mt-4 leading-relaxed text-muted">
              {florals.length + oils.length} natural aromatic ingredients from Nilakottai,
              Tamil Nadu. All prices on application. Batch-specific Certificates of Analysis
              issued with every order.
            </p>
            <p className="mt-3 text-[0.875rem] text-muted">
              {site.contact.salesEmail} · {site.contact.whatsappDisplay} · {site.domain}
            </p>
          </div>

          <div className="flex gap-3 print:hidden">
            <Link href="/products" className="btn-ghost !px-5 !py-3 !text-[0.9375rem]">
              Filterable version
            </Link>
            <Link href="/request-quote" className="btn-accent !px-5 !py-3 !text-[0.9375rem]">
              Request a quote
              <Icon name="arrow-up-right" size={17} />
            </Link>
          </div>
        </header>

        <Table title={CATEGORY_LABELS["concrete-absolute"]} items={florals} />
        <Table title={CATEGORY_LABELS["essential-oil"]} items={oils} />

        <footer className="mt-14 border-t border-border pt-7 text-[0.8125rem] leading-relaxed text-muted">
          <p>
            Odour profiles are abbreviated here; full descriptions, technical specifications
            and commercial terms are on each product page. Minimum order quantities,
            packaging and lead times are confirmed at the quotation stage.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} {site.legalName}, Nilakottai, Tamil Nadu, India.
          </p>
        </footer>
      </Rail>
    </>
  );
}
