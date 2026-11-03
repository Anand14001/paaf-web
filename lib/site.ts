/* ---------------------------------------------------------------
   Single source of truth for company facts, contact details and
   navigation. Requirement #6 of the brief: one place for every
   number and name, so nothing drifts between pages.

   Anything here marked TODO is awaiting client sign-off — see
   docs/PRODUCT-DATA-SIGNOFF.md.
   --------------------------------------------------------------- */

export const site = {
  legalName: "Paandia Agro Foods",
  brand: "PAAF",
  domain: "paaforigin.com",
  url: "https://paaforigin.com",

  tagline: "Born in Nilakottai. Created for the world.",
  positioning:
    "Natural concretes, absolutes and essential oils from the Tamil Nadu flower belt — hand-picked at dawn, extracted within hours, certified in our own lab.",

  /** Q12: founded 2024. Q2: first products 2025. Both are true and
      both appear; they are not in conflict once stated in order. */
  foundedYear: 2024,
  firstProductsYear: 2025,

  location: {
    village: "Nilakottai",
    district: "Dindigul",
    state: "Tamil Nadu",
    country: "India",
    /** TODO: client to supply full registered address and postcode. */
    addressLine: "Nilakottai, Dindigul District, Tamil Nadu, India",
  },

  contact: {
    /** TODO: confirm final mailbox routing with the client. */
    salesEmail: "sales@paaforigin.com",
    generalEmail: "info@paaforigin.com",
    /** TODO: replace with the real number before launch.
        Format: full international, digits only, for wa.me links. */
    whatsapp: "919000000000",
    whatsappDisplay: "+91 90000 00000",
    phone: "+91 90000 00000",
  },

  logistics: {
    airports: ["Madurai International Airport", "Coimbatore International Airport"],
    ports: ["Tuticorin (V.O. Chidambaranar)", "Chennai"],
  },

  social: {
    linkedin: "",
  },
} as const;

/* -- WhatsApp -------------------------------------------------- */

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function whatsappProductLink(productName: string): string {
  return whatsappLink(
    `Hello PAAF, I would like to enquire about ${productName}. Please send pricing and availability.`,
  );
}

/* -- Navigation -------------------------------------------------
   One dropdown total (brief #8). Everything else is a flat link. */

export type NavLink = { label: string; href: string; description?: string };

export const productNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Browse by category",
    links: [
      {
        label: "Concretes",
        href: "/products/concretes",
        description: "7 solvent-extracted floral concretes",
      },
      {
        label: "Absolutes",
        href: "/products/absolutes",
        description: "7 alcohol-washed absolutes",
      },
      {
        label: "Essential Oils",
        href: "/products/essential-oils",
        description: "17 steam-distilled oils",
      },
      {
        label: "Full catalogue",
        href: "/products",
        description: "All 31 products, filterable",
      },
    ],
  },
  {
    heading: "Featured",
    links: [
      { label: "Jasmine Sambac", href: "/products/jasmine-sambac" },
      { label: "Jasmine Grandiflorum", href: "/products/jasmine-grandiflorum" },
      { label: "Tuberose", href: "/products/tuberose" },
      { label: "Vetiver", href: "/products/vetiver" },
      { label: "Cypriol / Nagarmotha", href: "/products/cypriol-nagarmotha" },
      { label: "Nutmeg", href: "/products/nutmeg" },
    ],
  },
];

/* -- Mega menu --------------------------------------------------
   Two panels, each one level deep. The brief's objection (#8) was to
   *stacked* popups, not to a single full-width panel — this keeps
   everything reachable in one hop. */

export type MegaTile = {
  label: string;
  href: string;
  description: string;
  icon: "leaf" | "flask" | "shield" | "search" | "download" | "check";
};

export type MegaMenu = {
  id: string;
  label: string;
  /** Tile grid. */
  tiles: MegaTile[];
  /** Right-hand rail: a plain link list. */
  asideHeading: string;
  aside: NavLink[];
  /** Footer strip of the panel. */
  footnote: string;
  footLink: NavLink;
};

export const megaMenus: MegaMenu[] = [
  {
    id: "products",
    label: "Products",
    tiles: [
      {
        label: "Concretes",
        href: "/products/concretes",
        description: "7 floral concretes — jasmine, tuberose, champaca and lotus",
        icon: "leaf",
      },
      {
        label: "Absolutes",
        href: "/products/absolutes",
        description: "7 absolutes — rose, mimosa, tobacco flower and vanilla",
        icon: "leaf",
      },
      {
        label: "Essential Oils",
        href: "/products/essential-oils",
        description: "17 steam-distilled oils — vetiver, cypriol, spices and grasses",
        icon: "flask",
      },
      {
        label: "Full catalogue",
        href: "/products",
        description: "All 31 products, filterable by form, method and application",
        icon: "search",
      },
      {
        /* Named as the footer names it. "Catalogue" alone sat next to
           "Full catalogue" and the two were indistinguishable. */
        label: "Printable catalogue",
        href: "/catalogue",
        description: "Every product with its specification, on one printable page",
        icon: "download",
      },
      {
        label: "Request a sample",
        href: "/request-sample",
        description: "Sent in the form and grade that matches your application",
        icon: "check",
      },
    ],
    asideHeading: "Featured materials",
    aside: [
      { label: "Jasmine Sambac", href: "/products/jasmine-sambac" },
      { label: "Tuberose", href: "/products/tuberose" },
      { label: "Vetiver", href: "/products/vetiver" },
      { label: "Cypriol / Nagarmotha", href: "/products/cypriol-nagarmotha" },
    ],
    footnote: "31 products · All prices on quotation",
    footLink: { label: "Browse the catalogue", href: "/products" },
  },
  {
    id: "company",
    label: "Facilities & Commitments",
    tiles: [
      {
        label: "About PAAF",
        href: "/about",
        description: `Founded ${site.foundedYear} in Nilakottai, in the Tamil Nadu flower belt`,
        icon: "check",
      },
      {
        label: "Our process",
        href: "/process",
        description: "The Six-Stage Extraction Protocol, from dawn pluck to release",
        icon: "flask",
      },
      {
        label: "Quality & documents",
        href: "/quality-documents",
        description: "In-house GC-MS, CoA per batch, SDS and IFRA on request",
        icon: "shield",
      },
      {
        label: "Request a quote",
        href: "/request-quote",
        description: "Tell us the product, form and quantity — we price on application",
        icon: "download",
      },
    ],
    asideHeading: "Get in touch",
    aside: [
      { label: "Request a quote", href: "/request-quote" },
      { label: "Request a sample", href: "/request-sample" },
      { label: "Contact us", href: "/contact" },
    ],
    footnote: "Born in Nilakottai. Created for the world.",
    footLink: { label: "Talk to our team", href: "/contact" },
  },
];

export const mainNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Process", href: "/process" },
  { label: "Traceability", href: "/traceability" },
  { label: "Quality & Documents", href: "/quality-documents" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Concretes", href: "/products/concretes" },
      { label: "Absolutes", href: "/products/absolutes" },
      { label: "Essential Oils", href: "/products/essential-oils" },
      { label: "Full catalogue", href: "/products" },
      { label: "Printable catalogue", href: "/catalogue" },
      { label: "The jasmine range", href: "/products?q=jasmine" },
      { label: "Request a sample", href: "/request-sample" },
    ],
  },
  {
    heading: "Facilities & Commitments",
    links: [
      { label: "Our process", href: "/process" },
      { label: "Six-Stage Protocol", href: "/process#stage-01" },
      { label: "Infrastructure", href: "/process#infrastructure" },
      { label: "Traceability", href: "/traceability" },
      { label: "Quality & documents", href: "/quality-documents" },
      { label: "Certifications", href: "/quality-documents#certifications" },
      { label: "About PAAF", href: "/about" },
    ],
  },
  {
    heading: "Documentation",
    links: [
      { label: "Technical data sheets", href: "/quality-documents#documents" },
      { label: "CoA, SDS & IFRA", href: "/quality-documents#documents" },
      { label: "Batch-specific CoA", href: "/quality-documents#documents" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Request a quote", href: "/request-quote" },
      { label: "Request a sample", href: "/request-sample" },
    ],
  },
];

/* -- Buyer segments --------------------------------------------- */

export const segments = [
  {
    title: "Fragrance houses",
    body: "Concretes, absolutes and woody oils for fine fragrance, with the batch consistency a repeat formula depends on.",
  },
  {
    title: "Flavour houses",
    body: "Food-grade spice and herb oils — cardamom, nutmeg, pepper, ginger, curry leaf, davana — with constituent assays per lot.",
  },
  {
    title: "Cosmetics & personal care",
    body: "Naturals for skincare, haircare and body care, supplied with the documentation your regulatory team needs.",
  },
  {
    title: "Aromatherapy & wellness brands",
    body: "Single-origin essential oils, traceable to the field and certified for authenticity on our own GC-MS.",
  },
] as const;

/* -- Quality commitments ----------------------------------------
   These fill the homepage slot that certification logos would
   otherwise occupy. Every line is verifiable today — see §4.3 of
   docs/PROJECT-STRUCTURE.md for why we are not showing borrowed
   certification badges. */

export const qualityCommitments = [
  {
    title: "In-house GC-MS",
    body: "Every production batch is fingerprinted on our own Shimadzu AOC-20i Plus suite before it is released.",
  },
  {
    title: "Certificate of Analysis per batch",
    body: "No lot leaves the facility without one. Batch-specific CoAs are available on request with any order.",
  },
  {
    title: "Single-batch traceability",
    body: "Barcoded at the intake bay and tracked through to the drum, so every kilo traces back to a field and a date.",
  },
  {
    title: "Closed-loop recovery",
    body: "Solvent and cooling circuits are hermetically sealed, with process media condensed and recycled on site.",
  },
] as const;
