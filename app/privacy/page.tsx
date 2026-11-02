import { Breadcrumb, Rail } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

/* TEMPLATE — not legal advice.

   This covers what the site actually does today and is honest about
   it, which is better than no notice at all. It must be reviewed by
   the client's counsel before launch, and updated when the backend
   lands (Phase 3) because the data flows change: submissions will be
   stored in MongoDB and surfaced in the admin dashboard, neither of
   which happens yet. */

const trail = [
  { name: "Home", path: "/" },
  { name: "Privacy policy", path: "/privacy" },
];

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Paandia Agro Foods collects, uses and stores the personal data you provide through enquiry and document request forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Rail className="max-w-3xl py-10 lg:py-16">
      <Breadcrumb trail={trail} />
      <h1 className="mt-8 h3">Privacy policy</h1>
      <p className="mt-4 text-[0.875rem] text-muted">
        Last updated {new Date().getFullYear()}. This notice is under legal review and will
        be finalised before launch.
      </p>

      <div className="prose-paaf mt-10">
        <h2 className="h6 !mt-10">Who we are</h2>
        <p>
          {site.legalName} (&ldquo;PAAF&rdquo;, &ldquo;we&rdquo;) is a manufacturer of
          natural aromatic ingredients based at {site.location.addressLine}. We are the
          controller of the personal data described below. You can reach us at{" "}
          <a href={`mailto:${site.contact.generalEmail}`}>{site.contact.generalEmail}</a>.
        </p>

        <h2 className="h6 !mt-10">What we collect</h2>
        <p>We collect only what you give us through a form on this site:</p>
        <ul className="list-disc space-y-1.5 pl-6">
          <li>
            <strong>Enquiry form:</strong> name, company, work email, phone or WhatsApp
            number, country, the products and quantity you are enquiring about, and any
            message you add.
          </li>
          <li>
            <strong>Document request form:</strong> name, company, work email and country.
          </li>
        </ul>
        <p>
          We do not collect special category data, and we do not ask for payment details
          anywhere on this site.
        </p>

        <h2 className="h6 !mt-10">Why we use it, and on what basis</h2>
        <p>
          We use your details to respond to your enquiry, prepare a quotation, send the
          documentation you requested, and keep a record of the exchange. Our lawful basis
          is your consent, given when you submit the form, and our legitimate interest in
          responding to a business enquiry you initiated.
        </p>
        <p>
          We do not sell your data, and we do not add you to a marketing list on the
          strength of an enquiry.
        </p>

        <h2 className="h6 !mt-10">Analytics and cookies</h2>
        <p>
          This site uses privacy-respecting analytics to understand which pages are used.
          No advertising or cross-site tracking cookies are set. Where consent is required
          in your jurisdiction, analytics are loaded only after you give it.
        </p>

        <h2 className="h6 !mt-10">Who sees it</h2>
        <p>
          Your enquiry is seen by our sales team. We use third-party providers for email
          delivery and site hosting, which process data on our instructions only. We do not
          share your details with other customers or with third parties for their own
          purposes.
        </p>

        <h2 className="h6 !mt-10">How long we keep it</h2>
        <p>
          Enquiry records are retained for as long as needed to manage the commercial
          relationship, and then for the period required by applicable tax and company law.
          If no relationship follows, we delete the record within 24 months.
        </p>

        <h2 className="h6 !mt-10">Your rights</h2>
        <p>
          Depending on where you are, you may have the right to access, correct, delete or
          port your data, to object to or restrict processing, and to withdraw consent at
          any time. To exercise any of these, email{" "}
          <a href={`mailto:${site.contact.generalEmail}`}>{site.contact.generalEmail}</a>.
          You also have the right to complain to your local data protection authority.
        </p>

        <h2 className="h6 !mt-10">International transfers</h2>
        <p>
          We are based in India and serve buyers worldwide, so your data may be processed
          outside your own country. Where that involves a transfer from the EEA or the UK,
          we rely on appropriate safeguards.
        </p>

        <h2 className="h6 !mt-10">Changes</h2>
        <p>
          We will update this notice when our processing changes — including when enquiry
          submissions begin to be stored in our own systems — and will change the date at
          the top of this page.
        </p>
      </div>
    </Rail>
  );
}
