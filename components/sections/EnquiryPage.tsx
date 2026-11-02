import { Suspense } from "react";
import PrefilledEnquiryForm from "@/components/forms/PrefilledEnquiryForm";
import { Breadcrumb, Icon, Rail } from "@/components/ui";
import { getProductIndex } from "@/lib/products";
import { IS_MOCK_MODE } from "@/lib/api/client";
import type { EnquiryIntent } from "@/lib/schema";
import { site, whatsappLink } from "@/lib/site";

const COPY: Record<
  EnquiryIntent,
  { title: string; lede: string; path: string; label: string; aside: string[] }
> = {
  quote: {
    title: "Request a quote",
    label: "Request a quote",
    path: "/request-quote",
    lede:
      "We price on application. Give us the product, the form and the quantity, and we come back with a quotation, a lead time and the documentation your regulatory team needs.",
    aside: [
      "Quotation, lead time and packaging options in one reply",
      "Add as many products as you need to a single enquiry",
      "Certificate of Analysis format shared on request",
    ],
  },
  sample: {
    title: "Request a sample",
    label: "Request a sample",
    path: "/request-sample",
    lede:
      "Samples are issued against a stated application and quantity, so we can send the right form and grade rather than guessing. Tell us how you intend to evaluate the material.",
    aside: [
      "Sent in the form and grade that matches your application",
      "Accompanied by a representative Certificate of Analysis",
      "Tell us your evaluation timeline and we will work to it",
    ],
  },
  call: {
    title: "Book a call",
    label: "Book a call",
    path: "/contact",
    lede: "Leave your details and a note on what you would like to discuss.",
    aside: [],
  },
  document: {
    title: "Request documentation",
    label: "Request documentation",
    path: "/quality-documents",
    lede: "Tell us which documents you need and for which products.",
    aside: [],
  },
};

export default async function EnquiryPage({ intent }: { intent: EnquiryIntent }) {
  const products = await getProductIndex();
  const copy = COPY[intent];

  const trail = [
    { name: "Home", path: "/" },
    { name: copy.label, path: copy.path },
  ];

  return (
    <>
      <div className="border-b border-border bg-bone">
        <Rail className="pb-11 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 max-w-2xl">
            <h1 className="h2">{copy.title}</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{copy.lede}</p>
          </div>
        </Rail>
      </div>

      <Rail className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            {IS_MOCK_MODE && (
              <p className="mb-7 rounded-xl border border-gold-600/35 bg-gold-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-gold-700">
                <strong className="font-semibold">Build note:</strong> the form validates
                and behaves exactly as it will in production, but submissions are not yet
                delivered — the backend is Phase 3. Remove this notice when{" "}
                <code className="spec">NEXT_PUBLIC_API_MODE=http</code> is set.
              </p>
            )}
            <Suspense
              fallback={
                <div className="h-[32rem] animate-pulse rounded-24 bg-bone" aria-hidden />
              }
            >
              <PrefilledEnquiryForm products={products} intent={intent} />
            </Suspense>
          </div>

          <aside className="lg:sticky lg:top-[108px] lg:self-start">
            <div className="rounded-30 border border-border bg-white p-7">
              <h2 className="font-display text-[1.375rem] text-forest-900">
                What happens next
              </h2>
              <ul className="mt-5 space-y-3.5">
                {copy.aside.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold-700" />
                    <span className="text-[0.9375rem] leading-relaxed text-ink">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-border pt-6">
                <p className="eyebrow text-muted">Prefer to talk</p>
                <div className="mt-3.5 space-y-2.5 text-[0.9375rem]">
                  <a
                    href={`mailto:${site.contact.salesEmail}`}
                    className="flex items-center gap-2.5 text-forest-700 transition-colors hover:text-gold-700"
                  >
                    <Icon name="mail" size={17} className="shrink-0" />
                    {site.contact.salesEmail}
                  </a>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-forest-700 transition-colors hover:text-gold-700"
                  >
                    <Icon name="whatsapp" size={17} filled className="shrink-0" />
                    {site.contact.whatsappDisplay}
                  </a>
                </div>
              </div>

              <p className="mt-6 text-[0.8125rem] leading-relaxed text-muted">
                We never publish prices. Every quotation is built against your quantity,
                destination and specification.
              </p>
            </div>
          </aside>
        </div>
      </Rail>
    </>
  );
}
