"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/* Only the query-string-dependent part of /thank-you. The heading,
   the CTAs and the fallback copy are prerendered in the page itself,
   so this boundary resolving late never leaves the page empty. */

const INTENT_LABEL: Record<string, string> = {
  quote: "quotation request",
  sample: "sample request",
  call: "call request",
  document: "document request",
};

export default function ThankYouDetails() {
  const params = useSearchParams();
  const reference = params.get("ref") ?? "";
  const intent = params.get("intent") ?? "quote";
  const products = params.get("products") ?? "";

  useEffect(() => {
    if (!reference) return;
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({
      event: "enquiry_submitted",
      enquiry_intent: intent,
      enquiry_reference: reference,
    });
  }, [reference, intent]);

  return (
    <>
      <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
        We have your {INTENT_LABEL[intent] ?? "enquiry"}
        {products ? (
          <>
            {" "}
            for <strong className="font-semibold text-forest-900">{products}</strong>
          </>
        ) : null}
        . A member of our team will come back to you with a quotation, lead time and the
        documentation you asked for.
      </p>

      {reference && (
        <p className="mt-7 rounded-xl border border-border bg-bone px-5 py-3">
          <span className="eyebrow text-muted">Your reference</span>
          <span className="spec mt-1 block text-[1.125rem] font-semibold text-forest-900">
            {reference}
          </span>
        </p>
      )}
    </>
  );
}
