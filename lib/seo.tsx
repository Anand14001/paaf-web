import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { Product } from "@/lib/schema";
import { CATEGORY_LABELS, EXTRACTION_LABELS } from "@/lib/products";

/* ---------------------------------------------------------------
   Metadata and structured data.

   Requirement #7: unique titles and meta descriptions per product,
   structured data, canonical URLs. Everything funnels through here
   so no page can quietly ship a duplicate title.
   --------------------------------------------------------------- */

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Omit to fall back to the site OG image. */
  image?: string;
};

export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;

  /* Titles are declared absolute so the layout's "%s | PAAF" template
     cannot double the brand on the many titles that already carry it
     (every product title ends "| PAAF India"). Where a title has no
     brand at all, add it here — once, in one place. */
  const full = /\bPAAF\b/.test(title) ? title : `${title} | ${site.brand}`;

  return {
    title: { absolute: full },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: full,
      description,
      url,
      siteName: `${site.brand} — ${site.legalName}`,
      locale: "en_IN",
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
    },
  };
}

/* -- JSON-LD ----------------------------------------------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.brand,
    url: site.url,
    /* Google reads this for the knowledge panel and for the brand
       avatar beside search results, so it points at the square mark
       rather than the 3.6:1 lockup, which gets letterboxed. */
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/img/logo-mark.png`,
      width: 512,
      height: 512,
    },
    slogan: site.tagline,
    foundingDate: String(site.foundedYear),
    description: site.positioning,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.village,
      addressRegion: site.location.state,
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.contact.salesEmail,
      availableLanguage: ["en"],
    },
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.commonName} ${CATEGORY_LABELS[product.category]}`,
    sku: product.slug,
    description: product.summary,
    category: CATEGORY_LABELS[product.category],
    url: `${site.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: site.brand },
    manufacturer: { "@id": `${site.url}/#organization` },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Botanical name", value: product.botanicalName },
      { "@type": "PropertyValue", name: "CAS number", value: product.casNumber.join(", ") },
      {
        "@type": "PropertyValue",
        name: "Extraction method",
        value: EXTRACTION_LABELS[product.extractionMethod],
      },
      { "@type": "PropertyValue", name: "Plant part", value: product.plantPart },
      { "@type": "PropertyValue", name: "Origin", value: product.origin },
      { "@type": "PropertyValue", name: "Appearance", value: product.appearance },
    ],
    offers: {
      "@type": "Offer",
      /* Q10: prices are never published. Declaring the offer without a
         price and pointing at the RFQ is the honest schema for a
         quote-basis B2B material. */
      availability: "https://schema.org/InStock",
      url: `${site.url}/request-quote?product=${product.slug}`,
      priceSpecification: {
        "@type": "PriceSpecification",
        valueAddedTaxIncluded: false,
        description: "Price on application",
      },
      seller: { "@id": `${site.url}/#organization` },
    },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

/** Renders a JSON-LD block. Next dedupes nothing here, so call once per graph. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
