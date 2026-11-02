import { Button, Icon, Rail } from "@/components/ui";
import { whatsappLink } from "@/lib/site";

/* ---------------------------------------------------------------
   Contextual page CTA.

   This used to be a full-bleed forest band, which put it immediately
   above an identically coloured footer whose first block is also a
   heading plus a CTA — two dark CTA blocks stacked, reading as a
   duplicated footer.

   It is now a light, contained card: unmistakably page content, so
   the footer stays the end of the page. It also no longer carries a
   curve — the footer draws its own arc, and a second one here would
   compete with it.

   Use this ONLY where the copy is specific to the page (a product, a
   document request). Generic "get in touch" copy belongs in the
   footer, where it already is.
   --------------------------------------------------------------- */

export default function CTABand({
  title,
  body,
  primaryLabel = "Request a quote",
  primaryHref = "/request-quote",
  secondaryLabel = "Request a sample",
  secondaryHref = "/request-sample",
}: {
  title: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  /* All three pages that use this end on a bone section, so the
     wrapper is bone too — an ivory wrapper would put a hard colour
     change immediately above the card. No top padding: the section
     above already supplies it. The bottom padding has to clear the
     footer's arc, which overlaps upward by 48–80px. */
  return (
    <section className="bg-bone pb-[80px] lg:pb-[110px]">
      <Rail>
        <div className="rounded-40 border border-border bg-white px-7 py-10 lg:px-12 lg:py-12">
          <div className="grid items-center gap-9 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <div className="max-w-xl">
              <h2 className="font-display text-[1.75rem] leading-[1.15] tracking-[-0.02em] text-forest-900 lg:text-[2.25rem]">
                {title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{body}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Button href={primaryHref} variant="accent" className="w-full justify-center">
                {primaryLabel}
                <Icon name="arrow-up-right" size={18} />
              </Button>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={secondaryHref}
                  variant="ghost"
                  className="w-full justify-center"
                >
                  {secondaryLabel}
                </Button>
                <Button
                  href={whatsappLink()}
                  variant="ghost"
                  className="w-full justify-center"
                >
                  <Icon name="whatsapp" size={18} filled />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Rail>
    </section>
  );
}
