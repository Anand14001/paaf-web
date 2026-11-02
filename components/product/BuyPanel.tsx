"use client";

import { useState } from "react";
import { Badge, Button, Icon, cx } from "@/components/ui";
import { FORM_LABELS } from "@/lib/labels";
import type { Form, Product } from "@/lib/schema";
import { INDICATIVE_NOTE } from "@/content/products/_shared";
import { whatsappProductLink } from "@/lib/site";

/* The commercial panel. Brief #3: MOQ, packaging, shelf life, grades
   and an "available forms" selector, plus a sample request button
   that actually works — the four gaps the client listed against
   jasmine.in. The chosen form is carried into the RFQ so the enquiry
   arrives pre-qualified. */

export default function BuyPanel({ product }: { product: Product }) {
  const [form, setForm] = useState<Form>(product.availableForms[0]);
  const multi = product.availableForms.length > 1;

  const quoteHref = `/request-quote?product=${product.slug}&form=${form}`;
  const sampleHref = `/request-sample?product=${product.slug}&form=${form}`;

  return (
    <div className="lg:sticky lg:top-[108px]">
      <div className="rounded-30 border border-border bg-white p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="gold">Price on application</Badge>
          <Badge tone="neutral">GC-MS certified</Badge>
        </div>

        {multi && (
          <div className="mt-6">
            <p className="field-label">Available forms</p>
            <div
              role="radiogroup"
              aria-label="Select form"
              className="flex flex-wrap gap-2"
            >
              {product.availableForms.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={form === f}
                  onClick={() => setForm(f)}
                  className={cx(
                    "rounded-full border px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors",
                    form === f
                      ? "border-forest-700 bg-forest-700 text-white"
                      : "border-border-strong bg-white text-forest-900 hover:border-forest-500",
                  )}
                >
                  {FORM_LABELS[f]}
                </button>
              ))}
            </div>
          </div>
        )}

        <dl className="mt-6 space-y-3.5 border-t border-border pt-5 text-[0.9375rem]">
          {[
            ["Minimum order", product.moq],
            ["Lead time", product.leadTime],
            ["Shelf life", product.shelfLife],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-5">
              <dt className="shrink-0 text-muted">{k}</dt>
              <dd className="spec text-right font-medium text-forest-900">{v}</dd>
            </div>
          ))}
          <div>
            <dt className="mb-1.5 text-muted">Packaging</dt>
            <dd className="flex flex-wrap gap-1.5">
              {product.packaging.map((pk) => (
                <span
                  key={pk}
                  className="rounded-full bg-bone px-2.5 py-1 text-[0.75rem] font-medium text-forest-900"
                >
                  {pk}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-[0.75rem] leading-relaxed text-muted">{INDICATIVE_NOTE}</p>

        <div className="mt-6 space-y-2.5">
          <Button href={quoteHref} variant="accent" className="w-full justify-center">
            Request a quote
            <Icon name="arrow-up-right" size={18} />
          </Button>
          <Button href={sampleHref} variant="primary" className="w-full justify-center">
            Request a sample
          </Button>
          <Button
            href={whatsappProductLink(product.commonName)}
            variant="ghost"
            className="w-full justify-center"
          >
            <Icon name="whatsapp" size={18} filled />
            Ask on WhatsApp
          </Button>
        </div>

        <p className="mt-5 text-center text-[0.8125rem] leading-relaxed text-muted">
          Your enquiry arrives with {product.commonName}
          {multi ? ` (${FORM_LABELS[form].toLowerCase()})` : ""} already filled in.
        </p>
      </div>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-border bg-ivory/97 p-3 backdrop-blur-md lg:hidden">
        <Button href={quoteHref} variant="accent" size="sm" className="flex-1 justify-center">
          Request a quote
        </Button>
        <Button
          href={whatsappProductLink(product.commonName)}
          variant="ghost"
          size="sm"
          className="shrink-0 !px-4"
          aria-label="Ask on WhatsApp"
        >
          <Icon name="whatsapp" size={19} filled />
        </Button>
      </div>
    </div>
  );
}
