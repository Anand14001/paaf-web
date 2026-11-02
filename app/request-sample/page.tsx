import EnquiryPage from "@/components/sections/EnquiryPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Sample — PAAF Natural Aromatic Ingredients",
  description:
    "Request a sample of any PAAF concrete, absolute or essential oil. Tell us your application and we send the right form and grade, with a representative CoA.",
  path: "/request-sample",
});

export default function Page() {
  return <EnquiryPage intent="sample" />;
}
