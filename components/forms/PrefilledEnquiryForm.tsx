"use client";

import { useSearchParams } from "next/navigation";
import EnquiryForm from "@/components/forms/EnquiryForm";
import type { ProductIndexEntry } from "@/lib/labels";
import type { EnquiryIntent } from "@/lib/schema";

/* Reads the prefill off the URL so every "Request a quote" button on
   a product page arrives with the product already selected.

   Supports ?product=slug and ?product=slug-a,slug-b (the catalogue's
   bulk-select bar). Unknown slugs are dropped silently rather than
   showing the buyer an error about something they did not type. */

export default function PrefilledEnquiryForm({
  products,
  intent,
}: {
  products: ProductIndexEntry[];
  intent: EnquiryIntent;
}) {
  const params = useSearchParams();

  const requested = (params.get("product") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const valid = requested.filter((slug) => products.some((p) => p.slug === slug));
  const form = params.get("form") ?? undefined;

  return (
    <EnquiryForm
      products={products}
      intent={intent}
      initialProducts={valid}
      initialForm={form}
      compact
    />
  );
}
