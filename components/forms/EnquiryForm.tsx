"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button, Icon, cx } from "@/components/ui";
import {
  CheckboxField,
  CountryField,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { apiClient } from "@/lib/api/client";
import { QUANTITY_UNITS, type EnquiryIntent } from "@/lib/schema";
import type { ProductIndexEntry } from "@/lib/labels";
import { FORM_LABELS } from "@/lib/labels";
import { site } from "@/lib/site";

/* ---------------------------------------------------------------
   The enquiry form. Brief #1 — the single biggest failure the client
   identified in both reference sites.

   Fields are exactly Q6. Product and form arrive prefilled from the
   product page; quantity is mandatory because, as the brief puts it,
   "you can't quote without it".
   --------------------------------------------------------------- */

type Props = {
  products: ProductIndexEntry[];
  intent?: EnquiryIntent;
  /** Prefill from ?product= on the product page CTA. */
  initialProducts?: string[];
  initialForm?: string;
  compact?: boolean;
};

const INTENT_COPY: Record<EnquiryIntent, { heading: string; cta: string; blurb: string }> = {
  quote: {
    heading: "Request a quote",
    cta: "Send enquiry",
    blurb:
      "Tell us what you need and in what quantity. We price on application, so the more detail you give, the faster the quote comes back.",
  },
  sample: {
    heading: "Request a sample",
    cta: "Request sample",
    blurb:
      "Samples are issued against a stated application and quantity so we can send the right grade. Tell us how you intend to use the material.",
  },
  call: {
    heading: "Book a call",
    cta: "Request a call",
    blurb: "Leave your details and a note on what you would like to discuss.",
  },
  document: {
    heading: "Request documentation",
    cta: "Request documents",
    blurb: "Tell us which documents you need and for which products.",
  },
};

export default function EnquiryForm({
  products,
  intent = "quote",
  initialProducts = [],
  initialForm,
  compact = false,
}: Props) {
  const router = useRouter();
  const copy = INTENT_COPY[intent];

  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    quantity: "",
    unit: "kg" as (typeof QUANTITY_UNITS)[number],
    message: "",
    consent: false,
    website: "",
  });
  const [selected, setSelected] = useState<string[]>(initialProducts);
  const [form, setForm] = useState<string>(initialForm ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof typeof values>(key: K, v: (typeof values)[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  /* Forms available across the chosen products — the selector only
     ever offers something we can actually supply. */
  const availableForms = useMemo(() => {
    const picked = products.filter((p) => selected.includes(p.slug));
    const set = new Set<string>();
    for (const p of picked) for (const f of p.availableForms) set.add(f);
    return [...set];
  }, [products, selected]);

  const productOptions = useMemo(
    () =>
      products.map((p) => ({
        value: p.slug,
        label: `${p.commonName} — ${p.botanicalName}`,
      })),
    [products],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setErrors({});
    setSubmitting(true);

    const result = await apiClient.submitEnquiry({
      ...values,
      products: selected,
      form: form || undefined,
      intent,
      message: values.message || undefined,
      consent: values.consent as true,
    });

    setSubmitting(false);

    if (!result.ok) {
      setErrors(result.fieldErrors ?? {});
      setFormError(result.error);
      /* Move focus to the first thing that is wrong. */
      const firstKey = Object.keys(result.fieldErrors ?? {})[0];
      if (firstKey) {
        document
          .querySelector<HTMLElement>(`[name^="${firstKey}"]`)
          ?.focus({ preventScroll: false });
      }
      return;
    }

    const names = products
      .filter((p) => selected.includes(p.slug))
      .map((p) => p.commonName)
      .join(", ");
    router.push(
      `/thank-you?ref=${encodeURIComponent(result.reference)}&intent=${intent}` +
        (names ? `&products=${encodeURIComponent(names)}` : ""),
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot value={values.website} onChange={(v) => set("website", v)} />

      {!compact && (
        <div className="mb-8">
          <h2 className="h4">{copy.heading}</h2>
          <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-muted">
            {copy.blurb}
          </p>
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-terracotta/35 bg-terracotta/[0.07] px-4 py-3.5"
        >
          <Icon name="alert" size={19} className="mt-0.5 shrink-0 text-terracotta" />
          <p className="text-[0.9375rem] font-medium text-terracotta">{formError}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          placeholder="Full name"
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
          placeholder="Company or brand name"
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
          placeholder="you@company.com"
          value={values.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          disabled={submitting}
        />
        <TextField
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+91 90000 00000"
          hint="Include your country code — it is the fastest way for us to reply."
          value={values.phone}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          disabled={submitting}
        />
        <div className="sm:col-span-2">
          <CountryField
            label="Country"
            required
            hint="Affects shipping, compliance and pricing."
            value={values.country}
            onChange={(v) => set("country", v)}
            error={errors.country}
            disabled={submitting}
          />
        </div>
      </div>

      {/* -- Product selection -- */}
      <fieldset className="mt-8 rounded-24 border border-border bg-bone p-5 sm:p-6">
        <legend className="px-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-muted">
          What you need
        </legend>

        <div className="mt-2">
          <span className="field-label">
            Product(s)
            <span aria-hidden className="ml-1 text-terracotta">
              *
            </span>
          </span>

          {selected.length > 0 && (
            <ul className="mb-3 flex flex-wrap gap-2">
              {selected.map((slug) => {
                const p = products.find((x) => x.slug === slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <span className="inline-flex items-center gap-2 rounded-full border border-forest-500/30 bg-white py-1.5 pl-3.5 pr-2 text-[0.875rem] font-medium text-forest-900">
                      {p.commonName}
                      <button
                        type="button"
                        onClick={() => setSelected((s) => s.filter((x) => x !== slug))}
                        aria-label={`Remove ${p.commonName}`}
                        disabled={submitting}
                        className="flex h-5 w-5 items-center justify-center rounded-full text-muted transition-colors hover:bg-bone hover:text-terracotta"
                      >
                        <Icon name="close" size={13} />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <SelectField
            label=""
            name="productPicker"
            placeholder={selected.length ? "Add another product…" : "Select a product…"}
            options={productOptions.filter((o) => !selected.includes(o.value))}
            value=""
            onChange={(v) => v && setSelected((s) => [...s, v])}
            error={errors.products}
            disabled={submitting}
          />
          {!errors.products && (
            <p className="field-hint">
              You can add as many products as you need to one enquiry.
            </p>
          )}
        </div>

        {availableForms.length > 1 && (
          <div className="mt-5">
            <span className="field-label">Form required</span>
            <div className="flex flex-wrap gap-2">
              {availableForms.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setForm(form === f ? "" : f)}
                  disabled={submitting}
                  aria-pressed={form === f}
                  className={cx(
                    "rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors",
                    form === f
                      ? "border-forest-700 bg-forest-700 text-white"
                      : "border-border-strong bg-white text-forest-900 hover:border-forest-500",
                  )}
                >
                  {FORM_LABELS[f as keyof typeof FORM_LABELS] ?? f}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_8rem]">
          <TextField
            label="Quantity"
            name="quantity"
            type="text"
            required
            placeholder="e.g. 25"
            hint="We cannot price an enquiry without a quantity."
            value={values.quantity}
            onChange={(v) => set("quantity", v)}
            error={errors.quantity}
            disabled={submitting}
          />
          <SelectField
            label="Unit"
            name="unit"
            required
            options={QUANTITY_UNITS.map((u) => ({ value: u, label: u }))}
            value={values.unit}
            onChange={(v) => set("unit", v as (typeof QUANTITY_UNITS)[number])}
            error={errors.unit}
            disabled={submitting}
          />
        </div>
      </fieldset>

      <div className="mt-6">
        <TextAreaField
          label="Tell us about your requirement"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Intended application, certifications you need, target delivery date, or anything else that helps us quote accurately."
          value={values.message}
          onChange={(v) => set("message", v)}
          error={errors.message}
          disabled={submitting}
        />
      </div>

      <div className="mt-6">
        <CheckboxField
          name="consent"
          checked={values.consent}
          onChange={(v) => set("consent", v)}
          error={errors.consent}
          disabled={submitting}
          label={
            <>
              I agree that PAAF may store these details and contact me about this enquiry.
              See our{" "}
              <Link href="/privacy" className="font-medium text-gold-700 underline underline-offset-2">
                privacy policy
              </Link>
              .
            </>
          }
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="accent" disabled={submitting} className="sm:w-auto">
          {submitting ? "Sending…" : copy.cta}
          {!submitting && <Icon name="arrow-up-right" size={18} />}
        </Button>
        <p className="text-[0.8125rem] leading-relaxed text-muted">
          Or email{" "}
          <a
            href={`mailto:${site.contact.salesEmail}`}
            className="font-medium text-forest-700 underline underline-offset-2"
          >
            {site.contact.salesEmail}
          </a>
        </p>
      </div>
    </form>
  );
}
