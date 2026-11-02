import { Breadcrumb, Rail } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/* TEMPLATE — not legal advice. Covers use of the website only, not
   terms of sale, which belong in the quotation and order
   confirmation. Client's counsel to review before launch. */

const trail = [
  { name: "Home", path: "/" },
  { name: "Terms of use", path: "/terms" },
];

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms governing use of the Paandia Agro Foods website, including product information, documentation and enquiries.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Rail className="max-w-3xl py-10 lg:py-16">
      <Breadcrumb trail={trail} />
      <h1 className="mt-8 h3">Terms of use</h1>
      <p className="mt-4 text-[0.875rem] text-muted">
        Last updated {new Date().getFullYear()}. Under legal review ahead of launch.
      </p>

      <div className="prose-paaf mt-10">
        <h2 className="h6 !mt-10">About these terms</h2>
        <p>
          These terms govern your use of {site.domain}, operated by {site.legalName}. They
          do not govern the sale of goods — those terms are set out in our quotation and
          order confirmation, which take precedence in any conflict.
        </p>

        <h2 className="h6 !mt-10">Product information</h2>
        <p>
          Product descriptions, odour profiles, botanical names and CAS numbers on this
          site are provided in good faith for identification and evaluation. Natural
          materials vary between harvests and between batches; the authoritative figures
          for any consignment are those on the Certificate of Analysis issued with it.
        </p>
        <p>
          Minimum order quantities, packaging options, shelf life and lead times shown on
          product pages are indicative and are confirmed at the quotation stage.
        </p>

        <h2 className="h6 !mt-10">No health or therapeutic claims</h2>
        <p>
          Nothing on this site is a medical, therapeutic or health claim, and nothing here
          should be read as one. Our materials are supplied as ingredients for
          formulation by professional buyers. Responsibility for the safety, regulatory
          compliance and fitness for purpose of any finished product rests with the party
          placing it on the market.
        </p>

        <h2 className="h6 !mt-10">Documentation</h2>
        <p>
          Technical data sheets, safety data sheets, conformity statements and sample
          certificates are provided for your evaluation and regulatory file. They are
          issued as at their stated date; check with us before relying on a document that
          is more than twelve months old.
        </p>

        <h2 className="h6 !mt-10">Enquiries</h2>
        <p>
          Submitting an enquiry does not create a contract, reserve stock or constitute an
          offer by either party. A binding arrangement arises only on our written
          acceptance of an order.
        </p>

        <h2 className="h6 !mt-10">Intellectual property</h2>
        <p>
          The content, design and photography on this site belong to {site.legalName} and
          may not be reproduced for commercial purposes without written permission.
        </p>

        <h2 className="h6 !mt-10">Governing law</h2>
        <p>
          These terms are governed by the laws of India, and the courts of Tamil Nadu have
          jurisdiction over any dispute arising from use of this site.
        </p>

        <h2 className="h6 !mt-10">Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${site.contact.generalEmail}`}>{site.contact.generalEmail}</a>.
        </p>
      </div>
    </Rail>
  );
}
