import Link from "next/link";
import DocumentGate from "@/components/forms/DocumentGate";
import CTABand from "@/components/sections/CTABand";
import {
  Badge,
  Breadcrumb,
  Icon,
  Photo,
  Rail,
  Section,
  SectionHeading,
} from "@/components/ui";
import { SECTION_IMAGES, photo } from "@/lib/images";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { qualityCommitments, site } from "@/lib/site";

const trail = [
  { name: "Home", path: "/" },
  { name: "Quality & Documents", path: "/quality-documents" },
];

export const metadata = pageMetadata({
  title: "Quality & Documents — CoA, SDS, IFRA & Specifications",
  description:
    "PAAF's in-house GC-MS certification, Certificate of Analysis per batch, and how to obtain spec sheets, SDS, IFRA certificates and batch-specific CoAs.",
  path: "/quality-documents",
});

export default function QualityDocumentsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 max-w-3xl">
            <h1 className="h2">Nothing ships on assumption</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              Every production batch is fingerprinted on our own GC-MS before release, and
              the Certificate of Analysis travels with it. This page explains what we
              measure, what documents exist, and how to get them.
            </p>
          </div>
        </Rail>
      </div>

      {/* -- Commitments -- */}
      <Section>
        <Rail>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {qualityCommitments.map((c) => (
              <div key={c.title} className="border-t border-border pt-5">
                <Icon name="shield" size={22} className="text-gold-700" />
                <p className="mt-3 font-semibold text-forest-900">{c.title}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </Rail>
      </Section>

      {/* -- The lab -- */}
      <Section tone="forest">
        <Rail>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                onDark
                title="Shimadzu AOC-20i Plus GC-MS, on site"
                lede="Having the instrument in the building changes the economics of testing. It means every batch gets analysed rather than a sample of batches, and it means a question about a lot can be answered the same day."
              />
              <ul className="mt-8 space-y-3.5">
                {[
                  "Constituent profile verified against the reference fingerprint for that material",
                  "Optical rotation and refractive index measured per batch",
                  "Natural authenticity confirmed before release",
                  "Analysis linked to the intake barcode, so results tie back to the crop",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Icon name="check" size={19} className="mt-0.5 shrink-0 text-gold-500" />
                    <span className="leading-relaxed text-sage-200">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Photo
              src={photo(SECTION_IMAGES.lab.id, 1100)}
              alt={SECTION_IMAGES.lab.alt}
              sizes="(max-width: 1024px) 100vw, 45vw"
              tone="gold"
              rounded="rounded-40"
              className="aspect-[4/3] w-full"
            />
          </div>
        </Rail>
      </Section>

      {/* -- Certifications: honest state -- */}
      {/* id is the anchor the footer's "Certifications" link targets. */}
      <Section id="certifications">
        <Rail>
          <div className="max-w-3xl">
            <SectionHeading
              title="What we hold, and what we don't — yet"
            />
            <div className="prose-paaf mt-7">
              <p>
                PAAF was founded in {site.foundedYear}. Third-party certification schemes
                take time and audit history, and we are working through them rather than
                claiming them.
              </p>
              <p>
                You will not find certification logos on this site that we cannot evidence.
                Several of the schemes our buyers care about — and any a buyer can look up
                in a public registry — are in progress rather than in hand, and we would
                rather tell you that than have you discover it.
              </p>
              <p>
                <strong>
                  If a specific certification is a condition of supply for you, tell us in
                  your enquiry. We will give you a straight answer on where it stands.
                </strong>
              </p>
            </div>
            <Link
              href="/contact"
              className="arrow-shift mt-7 inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-gold-700"
            >
              Ask about a certification
              <Icon name="arrow-right" size={17} />
            </Link>
          </div>
        </Rail>
      </Section>

      {/* -- Documents -- */}
      <Section tone="bone" id="documents">
        <Rail>
          <SectionHeading
            title="How to get what you need"
            lede="The catalogue is free. Technical documents are released after a five-field form, so we know who holds our specifications. Batch-specific certificates come with the order."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <DocumentGate />
            </div>

            <aside className="space-y-5">
              <div className="rounded-24 border border-border bg-white p-6">
                <Badge tone="sage">Free — no form</Badge>
                <h3 className="mt-4 font-display text-[1.25rem] text-forest-900">
                  Catalogue
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  All 31 products with specifications, in a printable format. No form, no
                  gate.
                </p>
                <Link href="/catalogue" className="btn-primary mt-5 w-full justify-center">
                  <Icon name="download" size={17} />
                  View the catalogue
                </Link>
              </div>

              <div className="rounded-24 border border-border bg-white p-6">
                <h3 className="font-display text-[1.25rem] text-forest-900">
                  Why the short form?
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  Specifications, safety data and conformity statements are documents we are
                  accountable for. Knowing who holds them is part of that accountability —
                  and it lets us tell you when one is revised. Five fields, nothing more.
                </p>
              </div>
            </aside>
          </div>
        </Rail>
      </Section>

      <CTABand
        title="Need a document we haven't listed?"
        body="Regulatory requirements differ by market and by customer. Tell us what your compliance team needs and we will tell you whether we can supply it."
        primaryLabel="Ask about documentation"
        primaryHref="/contact"
        secondaryLabel="Request a quote"
        secondaryHref="/request-quote"
      />
    </>
  );
}
