import { Suspense } from "react";
import ThankYouDetails from "@/components/sections/ThankYou";
import { Button, Icon, Rail } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Thank you — your enquiry is with us",
    description: "We have your enquiry and will come back to you shortly.",
    path: "/thank-you",
  }),
  robots: { index: false, follow: false },
};

/* The heading and the static copy live here, outside the Suspense
   boundary, so they are in the prerendered HTML. Only the parts that
   depend on the query string — the reference, the product names and
   the analytics event — are deferred to the client. */

export default function Page() {
  return (
    <Rail className="flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-100 text-gold-700">
        <Icon name="check" size={30} />
      </span>

      <h1 className="mt-8 h3">Thank you — it&rsquo;s with us</h1>

      <Suspense
        fallback={
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            We have your enquiry. A member of our team will come back to you with a
            quotation, lead time and the documentation you asked for.
          </p>
        }
      >
        <ThankYouDetails />
      </Suspense>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/products" variant="primary">
          Back to the catalogue
        </Button>
        <Button href={whatsappLink()} variant="ghost">
          <Icon name="whatsapp" size={18} filled />
          Message us on WhatsApp
        </Button>
      </div>

      <p className="mt-8 text-[0.875rem] text-muted">
        Need to add something? Email{" "}
        <a
          href={`mailto:${site.contact.salesEmail}`}
          className="font-medium text-forest-700 underline underline-offset-2"
        >
          {site.contact.salesEmail}
        </a>{" "}
        quoting your reference.
      </p>
    </Rail>
  );
}
