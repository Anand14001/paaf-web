"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge, Button, Icon, cx } from "@/components/ui";
import { CheckboxField, CountryField, Honeypot, TextField } from "@/components/forms/fields";
import { apiClient } from "@/lib/api/client";

/* ---------------------------------------------------------------
   Gated document access. Q14, exactly:

     Brochure / catalogue  -> free, no form        (handled in Footer)
     Spec sheet, CoA sample, SDS, IFRA -> short form
     Batch-specific CoA    -> on request, with an order

   Short form is five fields. Anything longer kills the download, and
   the point of the gate is the lead, not the interrogation.
   --------------------------------------------------------------- */

export type GatedDocument = {
  id: string;
  label: string;
  description: string;
  access: "gated" | "on-request";
};

export const PRODUCT_DOCUMENTS: GatedDocument[] = [
  {
    id: "spec-sheet",
    label: "Technical data sheet",
    description: "Full specification: constituents, physical parameters, handling.",
    access: "gated",
  },
  {
    id: "coa-sample",
    label: "Certificate of Analysis (sample)",
    description: "A representative CoA showing the format and parameters we report.",
    access: "gated",
  },
  {
    id: "sds",
    label: "Safety Data Sheet (SDS)",
    description: "GHS-format safety documentation for handling and transport.",
    access: "gated",
  },
  {
    id: "ifra",
    label: "IFRA certificate",
    description: "Conformity statement against the current IFRA standard.",
    access: "gated",
  },
  {
    id: "batch-coa",
    label: "Batch-specific Certificate of Analysis",
    description: "Issued against your allocated lot, with the order or on request.",
    access: "on-request",
  },
];

export default function DocumentGate({
  productSlug,
  productName,
  documents = PRODUCT_DOCUMENTS,
}: {
  productSlug?: string;
  productName?: string;
  documents?: GatedDocument[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, string>>({});

  return (
    <div className="space-y-3">
      {documents.map((doc) => {
        const isOpen = openId === doc.id;
        const reference = done[doc.id];

        return (
          <div
            key={doc.id}
            className={cx(
              "overflow-hidden rounded-20 border transition-colors",
              isOpen ? "border-forest-500 bg-white" : "border-border bg-white",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 p-5">
              <div className="min-w-[14rem] flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="font-medium text-forest-900">{doc.label}</p>
                  {doc.access === "gated" ? (
                    <Badge tone="gold">
                      <Icon name="lock" size={11} className="mr-1" />
                      Short form
                    </Badge>
                  ) : (
                    <Badge tone="neutral">On request</Badge>
                  )}
                </div>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                  {doc.description}
                </p>
              </div>

              {reference ? (
                <p className="flex items-center gap-2 text-[0.875rem] font-medium text-forest-700">
                  <Icon name="check" size={17} />
                  Sent — ref {reference}
                </p>
              ) : doc.access === "on-request" ? (
                <Button
                  href={`/request-quote${productSlug ? `?product=${productSlug}` : ""}`}
                  variant="ghost"
                  size="sm"
                >
                  Request with order
                </Button>
              ) : (
                <Button
                  variant={isOpen ? "ghost" : "primary"}
                  size="sm"
                  onClick={() => setOpenId(isOpen ? null : doc.id)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? "Cancel" : "Get this document"}
                  {!isOpen && <Icon name="download" size={16} />}
                </Button>
              )}
            </div>

            {isOpen && !reference && (
              <div className="border-t border-border bg-bone p-5">
                <GateForm
                  documentId={doc.id}
                  documentLabel={doc.label}
                  productSlug={productSlug}
                  productName={productName}
                  onDone={(ref) => {
                    setDone((d) => ({ ...d, [doc.id]: ref }));
                    setOpenId(null);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GateForm({
  documentId,
  documentLabel,
  productSlug,
  productName,
  onDone,
}: {
  documentId: string;
  documentLabel: string;
  productSlug?: string;
  productName?: string;
  onDone: (reference: string) => void;
}) {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    country: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof typeof values>(k: K, v: (typeof values)[K]) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k as string]) {
      setErrors((p) => {
        const n = { ...p };
        delete n[k as string];
        return n;
      });
    }
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const res = await apiClient.requestDocument({
      ...values,
      documentId,
      productSlug,
      consent: values.consent as true,
    });

    setSubmitting(false);
    if (!res.ok) {
      setErrors(res.fieldErrors ?? {});
      setFormError(res.error);
      return;
    }
    onDone(res.reference);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot value={values.website} onChange={(v) => set("website", v)} />

      <p className="mb-4 text-[0.875rem] leading-relaxed text-muted">
        Five fields and the {documentLabel.toLowerCase()}
        {productName ? ` for ${productName}` : ""} is on its way to your inbox.
      </p>

      {formError && (
        <p role="alert" className="mb-4 text-[0.875rem] font-medium text-terracotta">
          {formError}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={values.name}
          onChange={(v) => set("name", v)}
          error={errors.name}
          disabled={submitting}
        />
        <TextField
          label="Company"
          name="company"
          required
          autoComplete="organization"
          value={values.company}
          onChange={(v) => set("company", v)}
          error={errors.company}
          disabled={submitting}
        />
        <TextField
          label="Work email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          disabled={submitting}
        />
        <CountryField
          label="Country"
          required
          value={values.country}
          onChange={(v) => set("country", v)}
          error={errors.country}
          disabled={submitting}
        />
      </div>

      <div className="mt-4">
        <CheckboxField
          name="consent"
          checked={values.consent}
          onChange={(v) => set("consent", v)}
          error={errors.consent}
          disabled={submitting}
          label={
            <>
              I agree that PAAF may store these details and contact me about this request.
              See our{" "}
              <Link href="/privacy" className="font-medium text-gold-700 underline underline-offset-2">
                privacy policy
              </Link>
              .
            </>
          }
        />
      </div>

      <Button type="submit" variant="accent" size="sm" disabled={submitting} className="mt-5">
        {submitting ? "Sending…" : "Send me the document"}
        {!submitting && <Icon name="arrow-up-right" size={16} />}
      </Button>
    </form>
  );
}
