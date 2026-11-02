import Link from "next/link";
import { BrandMark, Icon, Rail } from "@/components/ui";
import { footerNav, site, whatsappLink } from "@/lib/site";

/* ---------------------------------------------------------------
   Footer — one continuous dark field, four stacked blocks:

     1. CTA          large heading left, pill button right
     2. Brand        wordmark left, social circles right
     3. Links        four columns, full width
     4. Legal        copyright, disclaimer, legal links

   No rules or divider lines anywhere: separation comes from spacing
   alone. Adding hairlines back would cut the field into stripes,
   which is the thing being avoided.

   Deliberately absent: any admin or customer login. Q20 criticised
   exactly that on floralaromatics.in — internal access belongs behind
   a known URL, not advertised in a public footer.
   --------------------------------------------------------------- */

const SOCIAL = [
  site.social.linkedin
    ? { label: "LinkedIn", href: site.social.linkedin, icon: "linkedin" as const }
    : null,
  { label: "WhatsApp", href: whatsappLink(), icon: "whatsapp" as const },
  { label: "Email us", href: `mailto:${site.contact.salesEmail}`, icon: "mail" as const },
].filter(Boolean) as {
  label: string;
  href: string;
  icon: "linkedin" | "whatsapp" | "mail";
}[];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-forest-900 text-sage-200">
      {/* Curved top edge.

          Drawn as an SVG path rather than a CSS mask. A radial-gradient
          mask is an ellipse, so anywhere outside its width the strip
          stays fully opaque and the arc ends in a vertical step. This
          path spans 0..1440 with preserveAspectRatio="none", so it
          stretches edge to edge and stays smooth at any viewport.

          Concave: the dark field is tallest at the left and right and
          dips through the middle. Flip to the convex version by
          swapping the control points' y to 0 and the endpoints' to 96.

          The strip overlaps the footer by 1px so no hairline seam can
          appear between the two at fractional device pixel ratios. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[47px] h-[48px] overflow-hidden lg:-top-[79px] lg:h-[80px]"
      >
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="h-full w-full"
          focusable="false"
        >
          <path
            d="M0 0C420 96 1020 96 1440 0v96H0z"
            fill="var(--color-forest-900)"
          />
        </svg>
      </div>

      <Rail wide className="pb-10 pt-[70px] lg:pb-12 lg:pt-[100px]">
        {/* ============ 1. CTA ============ */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
          <h2 className="max-w-2xl font-display text-[2rem] leading-[1.12] tracking-[-0.02em] text-white lg:text-[2.75rem]">
            Tell us the botanical, the form and the quantity. We&rsquo;ll do the rest.
          </h2>
          <Link
            href="/contact"
            className="arrow-shift-diag inline-flex shrink-0 items-center gap-2.5 self-start rounded-full bg-gold-500 px-8 py-4 text-[1rem] font-semibold text-forest-900 transition-colors hover:bg-gold-700 hover:text-white lg:self-auto"
          >
            Get in touch
            <Icon name="arrow-up-right" size={18} />
          </Link>
        </div>

        {/* ============ 2. BRAND + SOCIAL ============ */}
        <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <Link
            href="/"
            aria-label={`${site.brand} — ${site.legalName}, home`}
            className="inline-flex items-center gap-4"
          >
            <BrandMark size={56} onDark />
            <span>
              <span className="block font-display text-[2.5rem] leading-none tracking-[-0.03em] text-white lg:text-[3rem]">
                PAAF
              </span>
              <span className="mt-2 block text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-sage-400">
                Since {site.foundedYear}
              </span>
            </span>
          </Link>

          <ul className="flex items-center gap-3">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-700 text-white transition-colors hover:bg-gold-500 hover:text-forest-900"
                >
                  <Icon name={s.icon} size={20} filled={s.icon !== "mail"} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ============ 3. LINK COLUMNS ============ */}
        <nav
          aria-label="Footer"
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {footerNav.map((col) => (
            <div key={col.heading}>
              <p className="font-display text-[1.125rem] leading-snug text-white">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-[0.875rem] leading-snug text-sage-300 transition-colors hover:text-gold-500"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* ============ 4. LEGAL ============ */}
        <div className="mt-16 lg:mt-20">
          <p className="text-[0.8125rem] font-medium text-sage-200">
            © {year} {site.legalName} — Natural concretes, absolutes and essential oils,
            Nilakottai, Tamil Nadu, India.
          </p>

          <div className="mt-5 grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <p className="text-[0.6875rem] uppercase leading-[1.7] tracking-[0.02em] text-sage-400">
              PAAF supplies natural aromatic materials as ingredients for formulation by
              professional buyers. Nothing on this site is a medical, therapeutic or
              health claim. Natural materials vary between harvests — the authoritative
              figures for any consignment are those on the Certificate of Analysis issued
              with it. Please obtain and read the current Safety Data Sheet before
              handling, and satisfy yourself that the material is suitable and compliant
              for your intended application and market.
            </p>

            <div className="lg:justify-self-end">
              <nav
                aria-label="Legal"
                className="flex flex-wrap gap-x-7 gap-y-3 lg:justify-end"
              >
                {LEGAL_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[0.75rem] font-medium text-sage-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              {/* Build credit. Deliberately the quietest line in the
                  footer: below PAAF's own legal links and a step down
                  in contrast, so it signs the work without competing
                  with the client's navigation. It sits outside the
                  Legal nav on purpose — it is a credit, not a legal
                  link, and screen-reader users tabbing that landmark
                  should not be handed an outbound agency link as part
                  of it. */}
              <p className="mt-5 text-[0.75rem] leading-none text-sage-400 lg:text-right">
                Powered by{" "}
                <a
                  href="https://digital-dude.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sage-300 underline decoration-sage-400/40 underline-offset-4 transition-colors hover:text-gold-500 hover:decoration-gold-500"
                >
                  Digital Dude
                </a>
              </p>
            </div>
          </div>
        </div>
      </Rail>
    </footer>
  );
}
