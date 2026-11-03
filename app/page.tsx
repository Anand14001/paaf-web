import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ProductCard from "@/components/product/ProductCard";
import ProcessScatter from "@/components/sections/ProcessScatter";
import {
  Button,
  Curve,
  Icon,
  Photo,
  Rail,
  Section,
  SectionHeading,
} from "@/components/ui";
import { LOCAL_IMAGES, SECTION_IMAGES, photo } from "@/lib/images";
import {
  CATEGORY_LABELS,
  CATEGORY_PATHS,
  getFeaturedProducts,
  getProductIndex,
  getProductsByCategory,
} from "@/lib/products";
import { qualityCommitments, segments, site } from "@/lib/site";

/* Curated showcase order for the category chips. Sorting by name
   alphabetically would lead with Chrysanthemum and Fenugreek, which
   is not what you put in front of a perfumer. Any slug that does not
   resolve is dropped and backfilled, so a typo degrades to a
   reasonable list rather than a gap. */
function pick<T extends { slug: string }>(pool: T[], slugs: string[]): T[] {
  const chosen = slugs
    .map((s) => pool.find((p) => p.slug === s))
    .filter((p): p is T => Boolean(p));
  const backfill = pool.filter((p) => !chosen.some((c) => c.slug === p.slug));
  return [...chosen, ...backfill].slice(0, slugs.length);
}

export default async function HomePage() {
  const [featured, index, concretes, absolutes, oils] = await Promise.all([
    getFeaturedProducts(),
    getProductIndex(),
    getProductsByCategory("concrete"),
    getProductsByCategory("absolute"),
    getProductsByCategory("essential-oil"),
  ]);

  const featuredIndex = featured
    .map((f) => index.find((i) => i.slug === f.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="has-curve relative isolate -mt-[78px] overflow-hidden bg-forest-900 pt-[78px] text-white sm:-mt-[84px] sm:pt-[84px] lg:-mt-[92px] lg:pt-[92px]">
        {/* The subjects sit centre-right and low in the frame, so the
            crop is biased downward to keep them visible when the hero
            is short and wide. The headline sits over the plainer field
            on the left. */}
        <Photo
          src={LOCAL_IMAGES.hero.src}
          alt={LOCAL_IMAGES.hero.alt}
          sizes="100vw"
          priority
          blur
          quality={62}
          overlay="hero"
          className="absolute inset-0 -z-10 h-full w-full"
          imgClassName="object-[50%_62%]"
        />

        <Rail className="relative py-[80px] lg:py-[150px]">
          <div className="max-w-3xl">
            <h1 className="text-white">
              Natural aromatics,
              <br />
              traceable to the field.
            </h1>
            <p className="mt-7 max-w-2xl text-[1.1875rem] leading-relaxed text-sage-200">
              Concretes, absolutes and essential oils from the flower belt of Tamil Nadu.
              Hand-picked at dawn, extracted within hours, and certified on our own GC-MS
              before a single kilo leaves the facility.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/request-quote" variant="accent">
                Request a quote
                <Icon name="arrow-up-right" size={18} />
              </Button>
              <Button href="/products" variant="light">
                Explore 31 products
              </Button>
            </div>
          </div>
        </Rail>

        <Curve edge="bottom-up" fill="light" tall />
      </section>

      {/* ============ ABOUT PRÉCIS ============ */}
      <Section className="has-curve curve-pad-b">
        {/* Editorial split: statement left, narrative right.

            With the image and the stat tiles gone, a single left
            column would strand this text at under half the rail — and
            the rail now runs to 1560px on a large display. Splitting
            heading from body fills the measure deliberately, and keeps
            the body to a readable line length instead of letting it
            run the full width. */}
        <Rail>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-24">
            <div>
              <h2 className="h3 text-balance">
                Every great fragrance begins before sunrise
              </h2>
            </div>

            <div className="lg:pt-2">
              <div className="prose-paaf max-w-[42rem] text-[1.125rem]">
                <p>
                  PAAF was founded in {site.foundedYear} in Nilakottai, in the heart of
                  Tamil Nadu&rsquo;s flower belt, and launched its first products in{" "}
                  {site.firstProductsYear}. We make natural concretes, absolutes and
                  essential oils from jasmine, tuberose and other botanicals grown in the
                  fields around us, where floral farming has been a way of life for
                  generations.
                </p>
                <p>
                  Our blossoms are hand-picked at dawn and taken to extraction within
                  hours, so their fragrance is captured at its peak. Every batch is tested
                  before it ships, and we work directly with local farmers to keep our
                  sourcing fair and traceable.
                </p>
              </div>

              {/* The closing line was bold body copy; at this size it
                  carries more as a display-face statement. No rule —
                  the face and colour shift do the work. */}
              <p className="mt-8 max-w-[34rem] font-display text-[1.5rem] leading-snug tracking-[-0.015em] text-forest-900 lg:text-[1.75rem]">
                A young company with deep roots, growing one season at a time.
              </p>

              <div className="mt-9">
                <Button href="/about" variant="ghost">
                  More about PAAF
                  <Icon name="arrow-up-right" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Rail>

        <Curve edge="bottom-up" fill="bone" />
      </Section>

      {/* ============ QUALITY COMMITMENTS ============
          The slot where competitors put certification logos. PAAF was
          founded in 2024 and holds none yet, so this carries what is
          verifiable today instead. */}
      <section className="bg-bone pb-12 pt-12 lg:pb-16 lg:pt-16">
        <Rail>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {qualityCommitments.map((c) => (
              <div key={c.title} className="flex gap-3.5">
                <Icon name="check" size={19} className="mt-1 shrink-0 text-gold-700" />
                <div>
                  <p className="font-semibold text-forest-900">{c.title}</p>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Rail>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <Section className="has-curve curve-pad-b bg-bone">
        <Rail>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              title="What buyers come to us for"
              lede="Six of our thirty-one. The florals are solvent extracted within hours of the pluck; the oils are steam distilled at low pressure on a separate dedicated line."
            />
            <Link
              href="/products"
              className="arrow-shift inline-flex items-center gap-2 pb-2 font-semibold text-forest-700 hover:text-gold-700"
            >
              View the full catalogue
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>

          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredIndex.map((p, i) => (
              /* Stagger is per row, not per card: 3 across on lg, so
                 the delay resets every third one. A flat i * 70 would
                 leave the last card of a six-card grid waiting a third
                 of a second after the first, which reads as lag. */
              <Reveal key={p.slug} delay={(i % 3) * 70} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Rail>

        <Curve edge="bottom-up" fill="light" />
      </Section>

      {/* ============ CATEGORIES ============ */}
      <Section className="has-curve curve-pad-b">
        <Rail>
          <SectionHeading
            title="Extraction chosen by botanical chemistry"
            lede="Delicate florals and heat-stable aromatic crops need fundamentally different treatment, so they run on separate dedicated lines."
          />

          {/* Three signposts, one system.

              Text sits on a solid surface, never over the photograph:
              contrast would otherwise depend on whichever image lands
              in the slot, and these get replaced with the client's own
              farm photography that we cannot art-direct in advance.

              Two rules keep the three reading as a set rather than as
              three unrelated cards:

              · the lede is clamped to three lines AND floored at three
                lines, so the divider under it lands on the same
                baseline in all three whatever the copy length;
              · the CTA is pushed down with `mt-auto`, so it sits on a
                common baseline however the chips above it wrap.

              The per-category selling points that used to sit here
              were cut, not lost — CategoryLanding already renders them
              on each destination page, and they were most of the card
              height. A signpost says what the thing is and proves it
              with examples; the argument belongs on the page it points
              to. */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                href: CATEGORY_PATHS.concrete,
                label: CATEGORY_LABELS.concrete,
                count: concretes.length,
                method: "Solvent extraction",
                body:
                  "Washed with food-grade solvent at controlled low temperature, so the aromatic oil comes back still held in the plant's own waxes.",
                highlights: pick(concretes, [
                  "jasmine-sambac",
                  "jasmine-grandiflorum",
                  "tuberose",
                  "champaca",
                ]),
                img: SECTION_IMAGES.categoryFloral,
                accent: "gold" as const,
              },
              {
                href: CATEGORY_PATHS.absolute,
                label: CATEGORY_LABELS.absolute,
                count: absolutes.length,
                method: "Solvent extraction",
                body:
                  "The concrete taken a stage further — waxes washed out with alcohol and chilled away, leaving the soluble aromatic fraction.",
                highlights: pick(absolutes, [
                  "indian-rose-centifolia",
                  "rose-edward",
                  "mimosa",
                  "vanilla",
                ]),
                img: SECTION_IMAGES.packing,
                accent: "gold" as const,
              },
              {
                href: CATEGORY_PATHS["essential-oil"],
                label: CATEGORY_LABELS["essential-oil"],
                count: oils.length,
                method: "Steam distillation",
                body:
                  "Low-pressure steam lifts the volatile fraction from crops, roots and spices without thermal scorch, on a dedicated second line.",
                highlights: pick(oils, [
                  "vetiver",
                  "cypriol-nagarmotha",
                  "cardamom",
                  "lemongrass",
                ]),
                img: SECTION_IMAGES.categoryOil,
                accent: "sage" as const,
              },
            ].map((c, i) => {
              /* Derived, not hard-coded to the slice length: a category
                 holding fewer highlights than the slice would otherwise
                 render a wrong, or negative, "+N more". */
              const chips = c.highlights.slice(0, 4);
              const remaining = c.count - chips.length;

              return (
                <Reveal key={c.href} delay={i * 90} className="h-full">
                <article
                  className="group flex h-full flex-col overflow-hidden rounded-30 border border-border bg-white transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-xl"
                >
                  <div className="relative">
                    <Photo
                      src={photo(c.img.id, 900)}
                      alt={c.img.alt}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      tone={c.accent === "gold" ? "forest" : "sage"}
                      className="aspect-[16/10] w-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-forest-900 shadow-sm backdrop-blur">
                      <Icon
                        name={c.accent === "gold" ? "leaf" : "flask"}
                        size={13}
                        className="text-gold-700"
                      />
                      {c.method}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.5rem] leading-tight tracking-tight text-forest-900 lg:text-[1.625rem]">
                        {c.label}
                      </h3>
                      <span className="spec shrink-0 rounded-full bg-bone px-2.5 py-1 text-[0.75rem] font-semibold text-gold-700">
                        {c.count}
                      </span>
                    </div>

                    {/* Clamped and floored at three lines — see above. */}
                    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-[0.9375rem] leading-relaxed text-muted">
                      {c.body}
                    </p>

                    <div className="mt-5 border-t border-border pt-5">
                      <p className="eyebrow mb-3 text-muted">Includes</p>
                      <ul className="flex flex-wrap gap-2">
                        {chips.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/products/${p.slug}`}
                              className="inline-block rounded-full border border-border bg-bone px-3 py-1.5 text-[0.8125rem] font-medium text-forest-900 transition-colors hover:border-forest-500 hover:bg-white hover:text-gold-700"
                            >
                              {p.commonName}
                            </Link>
                          </li>
                        ))}
                        {remaining > 0 && (
                          <li className="flex items-center px-1 text-[0.8125rem] text-muted">
                            +{remaining} more
                          </li>
                        )}
                      </ul>
                    </div>

                    <Link
                      href={c.href}
                      className="arrow-shift-diag mt-auto inline-flex items-center gap-2 self-start border-b-2 border-gold-500 pb-1 pt-7 font-semibold text-forest-700 transition-colors hover:text-gold-700"
                    >
                      Browse {c.label.toLowerCase()}
                      <Icon name="arrow-up-right" size={17} />
                    </Link>
                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        </Rail>

        <Curve edge="bottom-up" fill="forest" />
      </Section>

      {/* ============ PROCESS ============ */}
      <Section id="process" tone="forest" className="has-curve curve-pad-b">
        {/* Heading, lede and CTA live inside the ring — see
            ProcessScatter. The section only supplies the ground. */}
        <ProcessScatter />

        <Rail>
          <div className="mt-4 flex justify-center">
            <Button href="/process" variant="accent">
              See the full process
              <Icon name="arrow-up-right" size={18} />
            </Button>
          </div>
        </Rail>

        <Curve edge="bottom-up" fill="light" />
      </Section>

      {/* ============ TRACEABILITY ============ */}
      <Section className="has-curve curve-pad-b">
        <Rail>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Photo
              src={photo(SECTION_IMAGES.traceability.id, 1100)}
              alt={SECTION_IMAGES.traceability.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              rounded="rounded-40"
              className="aspect-[4/3] w-full"
              tone="sage"
            />
            <div>
              <SectionHeading
                title="Every kilo traces back to a field and a date"
                lede="Each crate is weighed, moisture-screened and barcoded at the intake bay. That single-batch barcode follows the material through extraction, into the drum and onto the Certificate of Analysis."
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Grower and field recorded against the incoming crate",
                  "Single-batch barcode assigned before the material is charged",
                  "GC-MS fingerprint linked to the intake record",
                  "Batch-specific Certificate of Analysis available with any order",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Icon name="check" size={19} className="mt-0.5 shrink-0 text-gold-700" />
                    <span className="leading-relaxed text-ink">{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/traceability" variant="primary">
                  How traceability works
                  <Icon name="arrow-up-right" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Rail>

        <Curve edge="bottom-up" fill="bone" />
      </Section>

      {/* ============ SEGMENTS ============ */}
      <Section tone="bone">
        <Rail>
          <SectionHeading
            title="Built for the people who buy ingredients"
            lede="Purchasing and sourcing managers, perfumers and flavourists. The documentation, the batch consistency and the lead times are set up for how you actually work."
          />
          <div className="mt-11 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {segments.map((s) => (
              <div key={s.title} className="card p-6">
                <h3 className="font-display text-[1.25rem] leading-snug text-forest-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </Rail>
      </Section>

    </>
  );
}
