import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyPanel from "@/components/product/BuyPanel";
import ProductCard from "@/components/product/ProductCard";
import DocumentGate from "@/components/forms/DocumentGate";
import CTABand from "@/components/sections/CTABand";
import {
  Badge,
  Breadcrumb,
  Button,
  Icon,
  Photo,
  Rail,
  Section,
} from "@/components/ui";
import { photo, productImage } from "@/lib/images";
import { processStages } from "@/content/process";
import {
  APPLICATION_LABELS,
  CATEGORY_LABELS,
  EXTRACTION_LABELS,
  getAllSlugs,
  getProduct,
  getProductIndex,
  getRelatedProducts,
} from "@/lib/products";
import { JsonLd, breadcrumbJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.seo.title,
    description: product.seo.metaDescription,
    path: `/products/${product.slug}`,
  });
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "technical", label: "Technical" },
  { id: "extraction", label: "Extraction" },
  { id: "commercial", label: "Commercial" },
  { id: "applications", label: "Applications" },
  { id: "traceability", label: "Traceability" },
  { id: "documents", label: "Documents" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [related, index] = await Promise.all([
    getRelatedProducts(slug),
    getProductIndex(),
  ]);
  const relatedIndex = related
    .map((r) => index.find((i) => i.slug === r.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const categoryPath =
    product.category === "concrete-absolute"
      ? "/products/concretes-absolutes"
      : "/products/essential-oils";

  const trail = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: CATEGORY_LABELS[product.category], path: categoryPath },
    { name: product.commonName, path: `/products/${product.slug}` },
  ];

  /* The process stage that corresponds to this product's route. */
  const extractionStage = processStages[3];
  const heroImg = productImage(product.slug, product.category);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(trail)} />

      {/* ============ HEAD ============ */}
      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6 lg:pb-16">
          <Breadcrumb trail={trail} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
            <div>
              <Photo
                src={photo(heroImg.id, 1200)}
                alt={heroImg.alt}
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                tone={product.category === "concrete-absolute" ? "forest" : "sage"}
                rounded="rounded-40"
                className="aspect-[4/3] w-full"
              />

              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="gold">{CATEGORY_LABELS[product.category]}</Badge>
                  <Badge tone="neutral">
                    {EXTRACTION_LABELS[product.extractionMethod]}
                  </Badge>
                </div>

                <h1 className="mt-5 h2">{product.commonName}</h1>
                <p className="mt-2 font-display text-[1.25rem] italic text-muted">
                  {product.botanicalName}
                </p>

                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[0.9375rem]">
                  <div>
                    <dt className="eyebrow text-muted">CAS</dt>
                    <dd className="spec mt-1 font-medium text-forest-900">
                      {product.casNumber.join(" / ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted">Origin</dt>
                    <dd className="mt-1 font-medium text-forest-900">{product.origin}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-muted">Plant part</dt>
                    <dd className="mt-1 font-medium text-forest-900">{product.plantPart}</dd>
                  </div>
                </dl>

                <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink">
                  {product.summary}
                </p>
              </div>
            </div>

            <BuyPanel product={product} />
          </div>
        </Rail>
      </div>

      {/* ============ SECTION NAV ============ */}
      <nav
        aria-label="Product sections"
        className="sticky top-[72px] z-20 border-b border-border bg-ivory/95 backdrop-blur-md lg:top-[84px]"
      >
        <Rail>
          <ul className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto py-2.5">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block whitespace-nowrap rounded-full px-4 py-2 text-[0.875rem] font-medium text-forest-900 transition-colors hover:bg-bone"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Rail>
      </nav>

      {/* ============ BODY ============ */}
      <Rail className="grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)] lg:py-20">
        <div className="max-w-3xl space-y-16">
          {/* -- Overview -- */}
          <section id="overview" className="scroll-mt-40">
            <h2 className="h5">Overview</h2>
            <div className="prose-paaf mt-5">
              <p>{product.description}</p>
            </div>
          </section>

          {/* -- Technical -- */}
          <section id="technical" className="scroll-mt-40">
            <h2 className="h5">Technical specification</h2>
            <table className="spec-table mt-5">
              <tbody>
                <tr>
                  <th scope="row">Botanical name</th>
                  <td className="italic">{product.botanicalName}</td>
                </tr>
                <tr>
                  <th scope="row">CAS number</th>
                  <td>{product.casNumber.join(" / ")}</td>
                </tr>
                {product.einecs && (
                  <tr>
                    <th scope="row">EINECS</th>
                    <td>{product.einecs}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Plant part</th>
                  <td>{product.plantPart}</td>
                </tr>
                <tr>
                  <th scope="row">Appearance</th>
                  <td>{product.appearance}</td>
                </tr>
                <tr>
                  <th scope="row">Odour profile</th>
                  <td>{product.odourProfile}</td>
                </tr>
                {product.solubility && (
                  <tr>
                    <th scope="row">Solubility</th>
                    <td>{product.solubility}</td>
                  </tr>
                )}
                {product.keyConstituents && (
                  <tr>
                    <th scope="row">Key constituents</th>
                    <td>{product.keyConstituents.join(", ")}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Origin</th>
                  <td>{product.origin}</td>
                </tr>
                <tr>
                  <th scope="row">Harvest season</th>
                  <td>{product.harvestSeason}</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
              Batch-specific values — refractive index, optical rotation and the full
              constituent profile — are reported on the Certificate of Analysis issued with
              each lot.
            </p>
          </section>

          {/* -- Extraction -- */}
          <section id="extraction" className="scroll-mt-40">
            <h2 className="h5">How this material is made</h2>
            <div className="mt-5 rounded-24 border border-border bg-bone p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[1.5rem] leading-none text-gold-700">
                  {extractionStage.number}
                </span>
                <span className="eyebrow text-muted">
                  {EXTRACTION_LABELS[product.extractionMethod]}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-ink">
                {product.extractionMethod === "solvent-extraction"
                  ? "Food-grade stainless-steel extractors wash the fresh flowers with pure solvent at controlled low temperature to yield aromatic concrete. The absolute is then recovered by alcohol washing and cold filtration to remove the waxes."
                  : "Fresh aromatic crop undergoes direct low-pressure steam distillation. Gentle vapour lifts the volatile fraction without thermal scorch, followed by cooling and Florentine flask gravity separation."}
              </p>
              <Link
                href="/process"
                className="arrow-shift mt-5 inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-gold-700"
              >
                See all six stages
                <Icon name="arrow-right" size={17} />
              </Link>
            </div>
          </section>

          {/* -- Commercial -- */}
          <section id="commercial" className="scroll-mt-40">
            <h2 className="h5">Commercial terms</h2>
            <table className="spec-table mt-5">
              <tbody>
                <tr>
                  <th scope="row">Minimum order quantity</th>
                  <td>{product.moq}</td>
                </tr>
                <tr>
                  <th scope="row">Packaging</th>
                  <td>{product.packaging.join(" · ")}</td>
                </tr>
                <tr>
                  <th scope="row">Shelf life</th>
                  <td>{product.shelfLife}</td>
                </tr>
                <tr>
                  <th scope="row">Storage</th>
                  <td>{product.storage}</td>
                </tr>
                <tr>
                  <th scope="row">Lead time</th>
                  <td>{product.leadTime}</td>
                </tr>
                <tr>
                  <th scope="row">Pricing</th>
                  <td>On application — request a quote with your quantity</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* -- Applications -- */}
          <section id="applications" className="scroll-mt-40">
            <h2 className="h5">Applications</h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {product.applications.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-sage-300 bg-sage-100 px-4 py-2 text-[0.9375rem] font-medium text-forest-700"
                >
                  {APPLICATION_LABELS[a]}
                </span>
              ))}
            </div>
            <p className="mt-5 leading-relaxed text-muted">
              Working on something outside these segments? Tell us the application in your
              enquiry — it helps us recommend the right form and grade.
            </p>
          </section>

          {/* -- Traceability -- */}
          <section id="traceability" className="scroll-mt-40">
            <h2 className="h5">Traceability</h2>
            <ol className="mt-5 space-y-5">
              {[
                {
                  t: "Field",
                  d: `${product.origin}. Grower and field are recorded against the incoming crate.`,
                },
                {
                  t: "Harvest window",
                  d: product.harvestSeason,
                },
                {
                  t: "Intake",
                  d: "Weighed, moisture-screened and assigned a single-batch barcode before charging.",
                },
                {
                  t: "Certification",
                  d: "GC-MS fingerprint linked to the intake record, and a Certificate of Analysis issued per batch.",
                },
              ].map((step, i) => (
                <li key={step.t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-600/40 bg-gold-50 text-[0.8125rem] font-semibold text-gold-700">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-forest-900">{step.t}</p>
                    <p className="mt-1 leading-relaxed text-muted">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/traceability"
              className="arrow-shift mt-6 inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-gold-700"
            >
              How traceability works at PAAF
              <Icon name="arrow-right" size={17} />
            </Link>
          </section>

          {/* -- Documents -- */}
          <section id="documents" className="scroll-mt-40">
            <h2 className="h5">Technical documentation</h2>
            <p className="mt-4 max-w-prose leading-relaxed text-muted">
              The catalogue is a free download. Technical documents are released after a
              short form — five fields — so we know who is holding our specifications.
              Batch-specific Certificates of Analysis are issued with the order.
            </p>
            <div className="mt-6">
              <DocumentGate productSlug={product.slug} productName={product.commonName} />
            </div>
          </section>
        </div>
      </Rail>

      {/* ============ RELATED ============ */}
      {relatedIndex.length > 0 && (
        <Section tone="bone" className="!pb-[100px]">
          <Rail>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <h2 className="h4">Related materials</h2>
              <Button href={categoryPath} variant="ghost" size="sm">
                All {CATEGORY_LABELS[product.category].toLowerCase()}
              </Button>
            </div>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedIndex.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Rail>
        </Section>
      )}

      <CTABand
        title={`Enquire about ${product.commonName}`}
        body="Send us the form and quantity you need. We reply with a quotation, lead time and the documentation your regulatory team requires."
        primaryHref={`/request-quote?product=${product.slug}`}
        secondaryHref={`/request-sample?product=${product.slug}`}
      />

      {/* Clearance for the sticky mobile action bar */}
      <div aria-hidden className="h-[72px] lg:hidden" />
    </>
  );
}
