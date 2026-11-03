import {
  Breadcrumb,
  Icon,
  Photo,
  Rail,
  Section,
  SectionHeading,
} from "@/components/ui";
import { SECTION_IMAGES, photo } from "@/lib/images";
import { infrastructure, processStages } from "@/content/process";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Process", path: "/process" },
];

export const metadata = pageMetadata({
  title: "Our Process — Six-Stage Extraction Protocol",
  description:
    "From dawn pluck to GC-MS certification: PAAF's six-stage extraction protocol, dual solvent and steam routes, and closed-loop resource recovery.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 max-w-3xl">
            <h1 className="h2">From dawn pluck to laboratory certification</h1>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              Every harvest follows the same closed-loop engineering standard. The order of
              these stages is not arbitrary — each one exists because skipping it costs
              aroma, traceability or both.
            </p>
          </div>
        </Rail>
      </div>

      {/* -- The six stages -- */}
      <Section>
        <Rail>
          <ol className="space-y-14 lg:space-y-20">
            {processStages.map((stage, i) => (
              <li
                key={stage.number}
                id={`stage-${stage.number}`}
                className="scroll-mt-32 border-t border-border pt-8"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[3.5rem] leading-none text-gold-500">
                        {stage.number}
                      </span>
                      <div>
                        <p className="eyebrow text-gold-700">{stage.badge}</p>
                        <p className="mt-1 text-[0.875rem] text-muted">{stage.meta}</p>
                      </div>
                    </div>
                    <h2 className="mt-6 font-display text-[1.75rem] leading-snug tracking-tight text-forest-900">
                      {stage.title}
                    </h2>
                  </div>

                  <div>
                    <p className="text-[1.0625rem] leading-relaxed text-ink">{stage.body}</p>

                    {stage.detail && (
                      <ul className="mt-6 space-y-3">
                        {stage.detail.map((d) => {
                          /* Stage 04's detail lines are route headings
                             formatted as "SEGMENT — description". */
                          const split = d.match(/^([A-Z][A-Z\s]+) — (.*)$/);
                          if (split) {
                            return (
                              <li
                                key={d}
                                className="rounded-20 border border-border bg-bone p-5"
                              >
                                <p className="eyebrow text-gold-700">{split[1]}</p>
                                <p className="mt-2.5 leading-relaxed text-ink">{split[2]}</p>
                              </li>
                            );
                          }
                          return (
                            <li key={d} className="flex items-start gap-3">
                              <Icon
                                name="check"
                                size={18}
                                className="mt-1 shrink-0 text-gold-700"
                              />
                              <span className="leading-relaxed text-muted">{d}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>

                {i === 2 && (
                  <Photo
                    src={photo(SECTION_IMAGES.extractionHall.id, 1600)}
                    alt={SECTION_IMAGES.extractionHall.alt}
                    sizes="100vw"
                    rounded="rounded-40"
                    className="mt-10 aspect-[21/9] w-full"
                  />
                )}
              </li>
            ))}
          </ol>
        </Rail>
      </Section>

      {/* -- Infrastructure -- */}
      {/* id is the anchor the footer's "Infrastructure" link targets. */}
      <Section id="infrastructure" tone="forest">
        <Rail>
          <SectionHeading
            onDark
            title="Industrial processing equipment"
            lede="Two dedicated extraction routes, a sealed recovery circuit and an analytical lab on site. The plant is built around the protocol, not the other way round."
          />
          <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map((item) => (
              <div key={item.title} className="border-t border-forest-600 pt-5">
                <div className="flex items-start gap-3">
                  <Icon name="flask" size={20} className="mt-0.5 shrink-0 text-gold-500" />
                  <div>
                    <h3 className="font-display text-[1.1875rem] leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-sage-300">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Rail>
      </Section>

      {/* -- Quality -- */}
      <Section>
        <Rail>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                title="Nothing ships on assumption"
                lede="Every production batch is fingerprinted on our in-house Shimadzu AOC-20i Plus GC-MS suite before dispatch. The analysis verifies the constituent profile and confirms natural authenticity, and the Certificate of Analysis travels with the batch."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/quality-documents" className="btn-primary">
                  Quality &amp; documents
                  <Icon name="arrow-up-right" size={18} />
                </a>
                <a href="/traceability" className="btn-ghost">
                  Traceability
                </a>
              </div>
            </div>
            <Photo
              src={photo(SECTION_IMAGES.lab.id, 1100)}
              alt={SECTION_IMAGES.lab.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              tone="gold"
              rounded="rounded-40"
              className="aspect-[4/3] w-full"
            />
          </div>
        </Rail>
      </Section>

    </>
  );
}
