import CategoryLanding from "@/components/product/CategoryLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Concretes & Absolutes Manufacturer — Jasmine, Tuberose, Rose",
  description:
    "14 solvent-extracted floral concretes and absolutes from Tamil Nadu: jasmine sambac, grandiflorum, tuberose, champaca, rose, lotus and more. GC-MS certified.",
  path: "/products/concretes-absolutes",
});

export default function Page() {
  return (
    <CategoryLanding
      category="concrete-absolute"
      path="/products/concretes-absolutes"
      method="Solvent extraction"
      lede="Delicate florals cannot be steam distilled — heat destroys the very compounds that make them worth having. Our floral line is washed with food-grade solvent in stainless-steel extractors at controlled low temperature, yielding concrete, and then alcohol-washed and chilled to give the absolute."
      points={[
        {
          title: "Picked before sunrise",
          body: "Blossoms are hand-picked at dawn, when the volatile fraction is at its richest, and reach the extraction bays the same morning.",
        },
        {
          title: "No intermediate storage",
          body: "Material moves by automated hoist from the intake bay directly into the vessel. Nothing waits in a warehouse.",
        },
        {
          title: "Concrete or absolute",
          body: "Most of this line is available in both forms. Specify which you need on the enquiry, or ask us which suits your application.",
        },
      ]}
    />
  );
}
