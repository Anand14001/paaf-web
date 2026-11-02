# PAAF — paaforigin.com (frontend)

Marketing and lead-capture site for Paandia Agro Foods. Next.js 16 (App Router) +
TypeScript + Tailwind v4. **Frontend only** — `api/` and `admin/` are Phase 3 and 5
and are deliberately untouched.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + data validation
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

---

## What's here

| | |
|---|---|
| Pages | 50 static routes, including 31 prerendered product pages |
| Products | All 31 SKUs with technical, commercial and traceability data |
| Forms | Enquiry (quote / sample) and five-field document gate, fully validated |
| SEO | Per-page titles and meta, JSON-LD (Organization, Product, Breadcrumb), sitemap, robots |
| A11y | Single `h1` per page, no heading-level jumps, labelled fields, skip link, zoom enabled |

---

## Architecture: the two rules that keep the backend a drop-in

**1. Data access is async, always.** `lib/products.ts` exposes `await getProducts()`,
`await getProduct(slug)` even though it reads local TypeScript modules today. When the
source becomes MongoDB, that one file changes and no page does. The module is marked
`server-only`, so the content layer can never leak into a client bundle — display
labels live separately in `lib/labels.ts` for exactly this reason.

**2. Submissions go through one client.** `lib/api/client.ts` has a single interface and
two adapters:

```
NEXT_PUBLIC_API_MODE=mock   (default)  validate → log → resolve with a reference
NEXT_PUBLIC_API_MODE=http             POST /api/enquiry, /api/document-request
```

No component calls `fetch` directly. Switching to the real backend is an env var plus
the route handlers.

### Validation is the build gate

`lib/schema.ts` is the single Zod schema. It validates the content files now and becomes
the Mongoose schema in Phase 3 — defined once so the two cannot drift. At module load it
enforces:

- every required product field present (a missing `moq` or `odourProfile` fails the build)
- CAS numbers match the registry format
- no duplicate slugs
- every `relatedSlugs` entry resolves to a real product
- **no health or therapeutic claims** in any product copy

That last one is requirement #6 of the brief enforced mechanically. It is a backstop for
review, not a replacement: it matches on word boundaries and deliberately permits
"cure"/"cured"/"curing", which are processing vocabulary for vanilla and tobacco.

---

## Layout

```
app/
  page.tsx                     home
  products/
    page.tsx                   catalogue (client filtering) + server-rendered A–Z index
    [slug]/page.tsx            31 SSG product pages
    concretes-absolutes/       category landing
    essential-oils/            category landing
  process/ traceability/ about/ quality-documents/ contact/
  request-quote/ request-sample/ thank-you/
  catalogue/                   free, ungated, print-optimised full listing
  privacy/ terms/ not-found.tsx
  sitemap.ts  robots.ts  layout.tsx  globals.css

components/
  ui.tsx                       primitives: Button, Badge, Curve, Photo, Icon, Rail, Section
  layout/                      Header (mega menu), Footer, WhatsAppFloat
  product/                     ProductCard, CatalogueBrowser, BuyPanel, CategoryLanding
  forms/                       EnquiryForm, DocumentGate, fields, PrefilledEnquiryForm
  sections/                    CTABand, EnquiryPage, ThankYou

content/
  products/_shared.ts          commercial defaults + builders
  products/concretes-absolutes.ts   14 SKUs
  products/essential-oils.ts        17 SKUs
  process.ts                   Six-Stage Protocol, drives home strip and /process

lib/
  schema.ts    Zod — the single source of truth
  products.ts  server-only data access
  labels.ts    display labels + the client-safe index type
  api/client.ts  mock / http adapters
  images.ts    image registry (see below)
  seo.tsx      metadata + JSON-LD
  site.ts      company facts, nav, contact — one place for every number
  countries.ts
```

---

## Design system

Tokens live in `app/globals.css` under `@theme`, with WCAG ratios annotated per colour.
Change the brand in one file.

- **Type** — Playfair Display (headings), Inter (body, specs, buttons), self-hosted via
  `next/font`. Spec tables use tabular figures so CAS columns align.
- **Colour** — golden yellow accent on a deep forest ground, sage support, warm neutrals.
  Gold is for fills and accents; **gold text on light uses `gold-700`**, never `gold-500`,
  which fails AA. Buttons on gold carry forest-900 text, not white.
- **Curves** — the arc transitions between sections. A `<Curve>` sits on a section edge
  filled with the *adjacent* section's colour:

  ```tsx
  <Section tone="forest" className="has-curve curve-pad-b">
    …
    <Curve edge="bottom-up" fill="light" />   {/* next section is ivory */}
  </Section>
  ```

  Get the `fill` wrong and you get a visible colour seam. `curve-pad-b` / `curve-pad-t`
  keep content clear of the sweep.

---

## Imagery — read before launch

`lib/images.ts` currently points at **licensed Unsplash stock**, used so the layout reads
as a finished site. All 32 URLs are verified.

**This is interim.** Brief #10 asks for real photography of the farms, harvest, lab and
packaging; Q15 confirms Nishok/Sam are supplying it. Stock botanicals actively undercut a
traceability claim — a buyer who reverse-image-searches an "our fields" photo and finds it
on a stock library has learned something you did not want to teach them.

To replace: drop files into `public/img/` and change the values in `lib/images.ts`.
Nothing else needs touching; every component reads through that module.

---

## Brand assets

`public/img/logo.png` is the **master** — the client's artwork, flower mark plus wordmark,
horizontal, on transparency. Nothing else is drawn by hand. `npm run logo:assets` derives
everything the site renders from it:

| Derived file | What it is | Used by |
|---|---|---|
| `public/img/logo-lockup.png` | the master, trimmed to its ink | `<BrandLockup>` — header, mobile sheet |
| `public/img/logo-mark.png` | the flower alone, squared | `<BrandMark>` — footer; and the `logo` in Organization JSON-LD |
| `app/icon.png`, `app/apple-icon.png` | the mark on a forest-900 plate | favicon + touch icon, wired up by Next automatically |

Two things the script does that are worth not undoing by hand:

- **It trims the master.** The supplied file has 64px of transparent padding above the
  artwork and 161px below. Dropped into a flex row untrimmed, the logo sits visibly high.
- **It finds the mark/wordmark gap by scanning the alpha profile**, rather than from a
  hard-coded x. A re-exported master with different spacing still cuts cleanly.

The lockup's wordmark is forest green, so it is unusable on the dark footer — that is why
the footer pairs `<BrandMark>` with typeset "PAAF" instead. If the client ever supplies a
reversed (light) lockup, that is the one place to revisit.

**To swap in a new logo:** replace `public/img/logo.png`, run `npm run logo:assets`, commit
the regenerated files.

---

## Before launch

1. Replace the stock imagery (above).
2. Real contact details — `lib/site.ts` has `TODO` markers on the WhatsApp number, phone
   and registered address. The WhatsApp number must be digits-only international format.
3. Client sign-off on product data — see `../docs/PRODUCT-DATA-SIGNOFF.md`. **CAS numbers
   in particular.**
4. Legal review of `/privacy` and `/terms` (both are marked as templates in the source).
5. The exact brand gold hex. (Logo: done — the client's artwork is in place. If they
   send a revised file, see **Brand assets** below; it is a two-step swap.)
6. Set `metadataBase` / `site.url` if the domain differs from `paaforigin.com`.
7. Add GA4 and verify in Search Console; the `enquiry_submitted` dataLayer event already
   fires on `/thank-you`.
