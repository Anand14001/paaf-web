import EnquiryPage from "@/components/sections/EnquiryPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote — Natural Concretes, Absolutes & Essential Oils",
  description:
    "Tell us the product, form and quantity you need. PAAF prices on application and replies with a quotation, lead time and the documentation your team requires.",
  path: "/request-quote",
});

export default function Page() {
  return <EnquiryPage intent="quote" />;
}
