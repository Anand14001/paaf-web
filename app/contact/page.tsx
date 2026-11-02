import { Suspense } from "react";
import PrefilledEnquiryForm from "@/components/forms/PrefilledEnquiryForm";
import {
  Breadcrumb,
  Icon,
  Photo,
  Rail,
  Section,
} from "@/components/ui";
import { SECTION_IMAGES, photo } from "@/lib/images";
import { getProductIndex } from "@/lib/products";
import { IS_MOCK_MODE } from "@/lib/api/client";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata = pageMetadata({
  title: "Contact PAAF — Paandia Agro Foods, Nilakottai",
  description:
    "Get in touch with PAAF for quotations, samples and technical documentation. Email, WhatsApp, or send an enquiry directly from the site.",
  path: "/contact",
});

export default async function ContactPage() {
  const products = await getProductIndex();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 max-w-2xl">
            <h1 className="h2">Talk to us</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              Quotations, samples, documentation, or a botanical you cannot find in our
              catalogue — whichever it is, the fastest route is the form. If you would
              rather write or message, the details are alongside.
            </p>
          </div>
        </Rail>
      </div>

      <Rail className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            {IS_MOCK_MODE && (
              <p className="mb-7 rounded-xl border border-gold-600/35 bg-gold-50 px-4 py-3 text-[0.8125rem] leading-relaxed text-gold-700">
                <strong className="font-semibold">Build note:</strong> the form validates
                and behaves as it will in production, but submissions are not yet delivered
                — the backend is Phase 3.
              </p>
            )}
            <Suspense fallback={null}>
              <PrefilledEnquiryForm products={products} intent="quote" />
            </Suspense>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-[108px] lg:self-start">
            <div className="rounded-30 border border-border bg-white p-7">
              <h2 className="font-display text-[1.375rem] text-forest-900">
                Direct contact
              </h2>
              <div className="mt-5 space-y-4">
                <a
                  href={`mailto:${site.contact.salesEmail}`}
                  className="flex items-start gap-3 text-forest-700 transition-colors hover:text-gold-700"
                >
                  <Icon name="mail" size={19} className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">
                      Sales
                    </span>
                    {site.contact.salesEmail}
                  </span>
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-forest-700 transition-colors hover:text-gold-700"
                >
                  <Icon name="whatsapp" size={19} filled className="mt-0.5 shrink-0" />
                  <span>
                    <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">
                      WhatsApp
                    </span>
                    {site.contact.whatsappDisplay}
                  </span>
                </a>
                <p className="flex items-start gap-3 text-ink">
                  <Icon name="leaf" size={19} className="mt-0.5 shrink-0 text-muted" />
                  <span>
                    <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-muted">
                      Facility
                    </span>
                    {site.location.addressLine}
                  </span>
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-30 border border-border">
              <Photo
                src={photo(SECTION_IMAGES.location.id, 800)}
                alt={SECTION_IMAGES.location.alt}
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="aspect-[4/3] w-full"
              />
            </div>

            <div className="rounded-30 border border-border bg-bone p-7">
              <h2 className="font-display text-[1.25rem] text-forest-900">
                Export logistics
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                Air freight via {site.logistics.airports.join(" and ")}. Sea freight via{" "}
                {site.logistics.ports.join(" and ")}. We ship worldwide — tell us your
                destination and we will advise on documentation and transit.
              </p>
            </div>
          </aside>
        </div>
      </Rail>

      <Section tone="bone" className="!py-0">
        <div aria-hidden className="h-px" />
      </Section>
    </>
  );
}
