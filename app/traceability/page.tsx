import Link from "next/link";
import {
  Breadcrumb,
  Button,
  Icon,
  Photo,
  Rail,
  Section,
  SectionHeading,
} from "@/components/ui";
import { SECTION_IMAGES, photo } from "@/lib/images";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const trail = [
  { name: "Home", path: "/" },
  { name: "Traceability", path: "/traceability" },
];

export const metadata = pageMetadata({
  title: "Traceability — Every Batch Back to a Field and a Date",
  description:
    "How PAAF traces every kilo: grower and field recorded at intake, single-batch barcoding, and a GC-MS fingerprint linked to the lot and its CoA.",
  path: "/traceability",
});

const CHAIN = [
  {
    step: "01",
    title: "The field",
    body: "Our own farms and a small group of growers we work with directly, all within the Nilakottai flower belt. The grower and the field are recorded against every incoming crate — not a region, a field.",
  },
  {
    step: "02",
    title: "The harvest window",
    body: "Blossoms are hand-picked in the hours before sunrise, when the volatile fraction is at its richest. The pick date and window are part of the batch record, because for a floral the date is part of the specification.",
  },
  {
    step: "03",
    title: "Intake and barcode",
    body: "Each crate is weighed, moisture-screened and graded, then assigned a single-batch barcode at the intake bay. This is the point at which traceability becomes mechanical rather than a matter of record-keeping discipline.",
  },
  {
    step: "04",
    title: "Direct charge",
    body: "Material moves by automated hoist from the intake bay straight into the vessel. No intermediate warehousing and no cross-handling, so a batch cannot be blended with another by accident.",
  },
  {
    step: "05",
    title: "Extraction lot",
    body: "The barcode follows the charge through extraction or distillation and onto the finished lot. One field batch maps to one extraction lot.",
  },
  {
    step: "06",
    title: "GC-MS fingerprint",
    body: "The finished lot is fingerprinted on our in-house Shimadzu GC-MS. The analysis is linked back to the intake record, so a constituent profile can always be traced to the crop that produced it.",
  },
  {
    step: "07",
    title: "Certificate of Analysis",
    body: "The CoA ships with the batch. Batch-specific certificates are issued with the order or on request, and reference the same lot number that was assigned at the intake bay.",
  },
];

export default function TraceabilityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div className="max-w-2xl">
              <h1 className="h2">Every kilo traces back to a field and a date</h1>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
                Most suppliers can tell you a region. We can tell you the grower, the field
                and the morning the flowers were picked — because the barcode that says so
                is assigned before the material is ever charged into a vessel.
              </p>
            </div>
          </div>
        </Rail>
      </div>

      {/* -- Why it matters -- */}
      <Section>
        <Rail>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <Photo
              src={photo(SECTION_IMAGES.growers.id, 1100)}
              alt={SECTION_IMAGES.growers.alt}
              sizes="(max-width: 1024px) 100vw, 45vw"
              tone="gold"
              rounded="rounded-40"
              className="aspect-[4/3] w-full"
            />
            <div>
              <SectionHeading
                title="A young company has to be able to prove it"
              />
              <div className="prose-paaf mt-7">
                <p>
                  PAAF was founded in {site.foundedYear}. We cannot point at forty years of
                  trading history, and we are not going to pretend otherwise. What we can do
                  is show our work.
                </p>
                <p>
                  For a buyer, traceability is not a sustainability talking point — it is
                  risk management. It is what lets your regulatory team answer a question
                  about a specific drum, what lets your perfumer understand why one lot
                  smells different from the last, and what makes a supply chain auditable
                  rather than asserted.
                </p>
                <p>
                  <strong>
                    Every claim on this page is one we can evidence against a batch record.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </Rail>
      </Section>

      {/* -- The chain -- */}
      <Section tone="forest">
        <Rail>
          <SectionHeading
            onDark
            title="Field to Certificate of Analysis"
            lede="Seven links, each one recorded. The barcode assigned at step three is what ties the other six together."
          />

          <ol className="mt-12 space-y-0">
            {CHAIN.map((c, i) => (
              <li key={c.step} className="relative grid gap-5 pb-10 sm:grid-cols-[6rem_1fr]">
                <div className="flex items-start gap-4 sm:block">
                  <span className="font-display text-[2rem] leading-none text-gold-500">
                    {c.step}
                  </span>
                </div>
                <div
                  className={
                    i < CHAIN.length - 1
                      ? "border-l border-forest-600 pb-2 pl-6 sm:pl-8"
                      : "pl-6 sm:pl-8"
                  }
                >
                  <h3 className="font-display text-[1.3125rem] leading-snug text-white">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-sage-300">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Rail>
      </Section>

      {/* -- Farmer relationships -- */}
      <Section>
        <Rail>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                title="We buy from the people next door"
              />
              <div className="prose-paaf mt-7">
                <p>
                  Floral farming has been a way of life around Nilakottai for generations.
                  We work directly with the growers in the fields around our facility, which
                  keeps the chain short — usually a single step between the plant and us.
                </p>
                <p>
                  A short chain is what makes the rest of this possible. It is also what
                  makes the sourcing fair and checkable: when you buy from your neighbours,
                  the relationship is not an abstraction in a supplier database.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/about" variant="ghost">
                  More about PAAF
                  <Icon name="arrow-up-right" size={18} />
                </Button>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { t: "Own farms", d: "Material grown on land we farm ourselves." },
                { t: "Direct growers", d: "A small group, all within the local flower belt." },
                { t: "Minutes, not days", d: "Field to intake bay in the same morning." },
                { t: "Recorded by field", d: "Not by region — by the field it came from." },
              ].map((x) => (
                <div key={x.t} className="rounded-24 border border-border bg-bone p-6">
                  <p className="font-semibold text-forest-900">{x.t}</p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </Rail>
      </Section>

      {/* -- Ask us -- */}
      <Section tone="bone">
        <Rail>
          <div className="rounded-30 border border-border bg-white p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="h5">Ask us to prove it</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                  If you are evaluating PAAF as a supplier, ask for the batch record behind a
                  sample. We would rather be checked than believed — and it is the fastest
                  way to show the difference between what we do and what a trading house can
                  offer you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/request-sample" className="btn-accent">
                  Request a sample
                  <Icon name="arrow-up-right" size={18} />
                </Link>
                <Link href="/quality-documents" className="btn-ghost">
                  See the documents
                </Link>
              </div>
            </div>
          </div>
        </Rail>
      </Section>

    </>
  );
}
