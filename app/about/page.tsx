import {
  Breadcrumb,
  Icon,
  Photo,
  Rail,
  Section,
  SectionHeading,
} from "@/components/ui";
import { SECTION_IMAGES, photo } from "@/lib/images";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { segments, site } from "@/lib/site";

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = pageMetadata({
  title: "About PAAF — Natural Aromatics from Nilakottai, Tamil Nadu",
  description:
    "Paandia Agro Foods was founded in 2024 in Nilakottai, Tamil Nadu, making natural concretes, absolutes and essential oils from botanicals grown around us.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 max-w-3xl">
            <h1 className="h2">Every great fragrance begins before sunrise</h1>
          </div>
        </Rail>
      </div>

      {/* -- Story -- */}
      <Section>
        <Rail>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div className="prose-paaf max-w-2xl text-[1.125rem]">
              <p>
                PAAF — Paandia Agro Foods — was founded in {site.foundedYear} in Nilakottai,
                in the heart of Tamil Nadu&rsquo;s flower belt, and launched its first
                products in {site.firstProductsYear}. We make natural concretes, absolutes
                and essential oils from jasmine, tuberose and other botanicals grown in the
                fields around us, where floral farming has been a way of life for
                generations.
              </p>
              <p>
                Our blossoms are hand-picked at dawn and taken to extraction within hours,
                so their fragrance is captured at its peak. Every batch is tested before it
                ships, and we work directly with local farmers to keep our sourcing fair and
                traceable.
              </p>
              <p>
                We are a young company with deep roots, and we&rsquo;re growing one season
                at a time.
              </p>
              <p className="!mt-8 font-display text-[1.5rem] italic leading-snug text-gold-700">
                {site.tagline}
              </p>
            </div>

            <Photo
              src={photo(SECTION_IMAGES.fields.id, 900)}
              alt={SECTION_IMAGES.fields.alt}
              sizes="(max-width: 1024px) 100vw, 42vw"
              rounded="rounded-40"
              className="aspect-[4/5] w-full"
            />
          </div>
        </Rail>
      </Section>

      {/* -- Where we are -- */}
      <Section tone="forest">
        <Rail>
          <SectionHeading
            onDark
            title="Nilakottai is not an accident of geography"
            lede="For a business whose quality depends on the hours between pluck and extraction, being inside the flower belt is the whole proposition — and being near the airports is what lets it reach you."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "In the flower belt",
                d: "Jasmine, tuberose and champaca grown in the fields immediately around the facility.",
              },
              {
                t: "Nearby flower markets",
                d: "Established local markets give us reach beyond our own farms when a season runs long.",
              },
              {
                t: "Two international airports",
                d: `${site.logistics.airports.join(" and ")} — within practical reach for air freight.`,
              },
              {
                t: "Port access",
                d: `${site.logistics.ports.join(" and ")} for sea freight on volume orders.`,
              },
            ].map((x) => (
              <div key={x.t} className="border-t border-forest-600 pt-5">
                <p className="font-semibold text-white">{x.t}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-sage-300">{x.d}</p>
              </div>
            ))}
          </div>
        </Rail>
      </Section>

      {/* -- Farmers -- */}
      <Section>
        <Rail>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Photo
              src={photo(SECTION_IMAGES.growers.id, 1100)}
              alt={SECTION_IMAGES.growers.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              tone="sage"
              rounded="rounded-40"
              className="aspect-[4/3] w-full"
            />
            <div>
              <SectionHeading
                title="A short chain, kept short on purpose"
              />
              <div className="prose-paaf mt-7">
                <p>
                  We buy from the growers in the fields around us. Usually there is a single
                  step between the plant and our intake bay, and that is deliberate: it is
                  what makes same-morning extraction possible, and it is what makes the
                  sourcing checkable rather than asserted.
                </p>
                <p>
                  It also means the relationship is a real one. Floral farming here is
                  generational, and the people growing for us are not an abstraction in a
                  supplier database.
                </p>
              </div>
              <a
                href="/traceability"
                className="arrow-shift mt-7 inline-flex items-center gap-2 font-semibold text-forest-700 hover:text-gold-700"
              >
                How we trace a batch
                <Icon name="arrow-right" size={17} />
              </a>
            </div>
          </div>
        </Rail>
      </Section>

      {/* -- Who we supply -- */}
      <Section tone="bone">
        <Rail>
          <SectionHeading
            title="Fragrance, flavour, cosmetics and aromatherapy"
            lede="We sell business to business, worldwide. Our documentation, batch consistency and lead times are built around how ingredient buyers actually work."
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
