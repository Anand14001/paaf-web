import CategoryLanding from "@/components/product/CategoryLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Floral Concretes Manufacturer — Jasmine, Tuberose, Champaca",
  description:
    "7 solvent-extracted floral concretes from Tamil Nadu: jasmine sambac, grandiflorum and auriculatum, tuberose, champaca, frangipani and lotus. GC-MS certified.",
  path: "/products/concretes",
});

export default function Page() {
  return (
    <CategoryLanding
      category="concrete"
      path="/products/concretes"
      method="Solvent extraction"
      lede="A concrete is the first thing the flower gives up. Fresh blossoms are washed with food-grade solvent in stainless-steel extractors at controlled low temperature, and what comes back is aromatic oil still held in the plant's own waxes. It carries the closest impression of the living flower, and for our florals it is the material the absolute is then made from."
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
          title: "Waxes intact",
          body: "A concrete keeps the plant waxes an absolute leaves behind. That is what gives it its weight and tenacity, and why some formulations ask for it specifically.",
        },
      ]}
    />
  );
}
