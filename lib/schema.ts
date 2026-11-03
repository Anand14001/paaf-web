import { z } from "zod";

/* ---------------------------------------------------------------
   Product schema — the single source of truth.

   This same schema validates the content files today and becomes the
   Mongoose model when the backend lands (Phase 3). Define it once so
   the two can never drift.

   Validation runs at module load, which means an incomplete product
   fails `next build` rather than shipping a half-empty page. That is
   requirement #6 of the brief ("one source of truth, only verified
   claims") enforced mechanically instead of by discipline.
   --------------------------------------------------------------- */

export const CATEGORIES = ["concrete", "absolute", "essential-oil"] as const;
export const FORMS = ["concrete", "absolute", "oil"] as const;
export const EXTRACTION_METHODS = ["solvent-extraction", "steam-distillation"] as const;
export const APPLICATIONS = ["fragrance", "flavour", "cosmetics", "aromatherapy"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Form = (typeof FORMS)[number];
export type ExtractionMethod = (typeof EXTRACTION_METHODS)[number];
export type Application = (typeof APPLICATIONS)[number];

/** CAS Registry Number: 2–7 digits, 2 digits, 1 check digit. */
const casPattern = /^\d{2,7}-\d{2}-\d$/;

export const productSchema = z.object({
  /* -- identity -------------------------------------------------- */
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  commonName: z.string().min(2),
  /** Stored but never rendered — Q9 answered "No" to Tamil names on the
      site. Kept so the catalogue export and any later Tamil locale have
      it without a re-keying exercise. */
  tamilName: z.string().optional(),
  botanicalName: z.string().min(3),
  casNumber: z.array(z.string().regex(casPattern, "malformed CAS number")).min(1),
  einecs: z.string().optional(),

  /* -- classification -------------------------------------------- */
  category: z.enum(CATEGORIES),
  availableForms: z.array(z.enum(FORMS)).min(1),
  extractionMethod: z.enum(EXTRACTION_METHODS),
  plantPart: z.string().min(2),

  /* -- technical block ------------------------------------------- */
  appearance: z.string().min(10),
  odourProfile: z.string().min(20),
  origin: z.string().min(3),
  harvestSeason: z.string().min(3),
  solubility: z.string().optional(),
  keyConstituents: z.array(z.string()).optional(),

  /* -- commercial block ------------------------------------------
     `indicative` fields are trade-standard values shown so buyers can
     see the shape of an offer. They render with a "confirm on enquiry"
     qualifier until the client signs off real figures (see
     docs/PRODUCT-DATA-SIGNOFF.md). Never present them as firm. */
  moq: z.string().min(1),
  packaging: z.array(z.string()).min(1),
  shelfLife: z.string().min(1),
  storage: z.string().min(10),
  leadTime: z.string().min(1),

  /* -- commerce & trust ------------------------------------------ */
  applications: z.array(z.enum(APPLICATIONS)).min(1),
  /** Q10: prices are never shown. The type permits one value only. */
  pricing: z.literal("on-quote"),

  /* -- content & SEO --------------------------------------------- */
  summary: z.string().min(40).max(260),
  description: z.string().min(120),
  /** No health or therapeutic claims anywhere (brief #6). Enforced by
      review, and by the banned-term check in `assertNoHealthClaims`. */
  relatedSlugs: z.array(z.string()).max(4).default([]),
  seo: z.object({
    title: z.string().min(10).max(70),
    metaDescription: z.string().min(70).max(165),
  }),
});

export type Product = z.infer<typeof productSchema>;

/* ---------------------------------------------------------------
   Claim safety.

   The brief is explicit: aromatherapy is a customer segment, never a
   medical benefit. This catches the obvious slips at build time; it is
   a backstop for review, not a substitute for it.
   --------------------------------------------------------------- */
/* Matched on word boundaries, not as substrings: "cured beans" and
   "treatment plant" are legitimate copy, "cure" and "treats" are not. */
const BANNED_CLAIM_TERMS = [
  "treat", "treats", "heal", "heals", "healing",
  "therapeutic", "medicinal", "remedy", "remedies", "anti-inflammatory",
  "antibacterial", "antiseptic", "antimicrobial", "relieves", "relieve",
  "soothes", "detoxifies", "detoxifying", "immunity", "wellbeing benefit",
  "health benefit", "clinically", "cures",
];

/* Deliberately NOT banned: "cure", "cured", "curing". In this trade
   they are processing vocabulary — vanilla beans and tobacco leaf are
   cured, and the cure is where much of the aroma develops. Banning the
   word would force wrong copy. "cures" (the verb, as in "cures X") is
   still caught. */

const BANNED_CLAIM_RE = new RegExp(
  String.raw`\b(` + BANNED_CLAIM_TERMS.join("|") + String.raw`)\b`,
  "i",
);

export function assertNoHealthClaims(p: Product): void {
  const haystack = `${p.summary} ${p.description} ${p.odourProfile}`;
  const hit = BANNED_CLAIM_RE.exec(haystack);
  if (hit) {
    throw new Error(
      `Product "${p.slug}" contains a possible health claim ("${hit[0]}"). ` +
        `The brief forbids therapeutic claims — rewrite the copy.`,
    );
  }
}

/* ---------------------------------------------------------------
   Enquiry schema — exactly the fields Q6 asked for.
   Shared by the client form and (later) the API route, so the
   browser and the server can never validate differently.
   --------------------------------------------------------------- */
export const ENQUIRY_INTENTS = ["quote", "sample", "call", "document"] as const;
export type EnquiryIntent = (typeof ENQUIRY_INTENTS)[number];

export const QUANTITY_UNITS = ["kg", "g", "L", "mL"] as const;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  company: z.string().trim().min(2, "Please enter your company name"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Please enter a contactable number"),
  country: z.string().trim().min(2, "Please select your country"),
  products: z.array(z.string()).min(1, "Please select at least one product"),
  form: z.string().optional(),
  quantity: z
    .string()
    .trim()
    .min(1, "Quantity is required — we cannot quote without it")
    .regex(/^[0-9]+(\.[0-9]+)?$/, "Quantity must be a number"),
  unit: z.enum(QUANTITY_UNITS),
  intent: z.enum(ENQUIRY_INTENTS),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, {
    message: "Please accept the privacy notice to continue",
  }),
  /** Anti-spam. Bots fill hidden fields; humans never see this one. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/* Short gate for document downloads — five fields, nothing more.
   Anything longer kills the download, and the point is the lead. */
export const documentRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  company: z.string().trim().min(2, "Please enter your company name"),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  country: z.string().trim().min(2, "Please select your country"),
  documentId: z.string().min(1),
  productSlug: z.string().optional(),
  consent: z.literal(true, {
    message: "Please accept the privacy notice to continue",
  }),
  website: z.string().max(0).optional(),
});

export type DocumentRequestInput = z.infer<typeof documentRequestSchema>;
