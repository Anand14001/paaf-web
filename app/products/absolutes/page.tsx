import CategoryLanding from "@/components/product/CategoryLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Floral Absolutes Manufacturer — Rose, Mimosa, Vanilla",
  description:
    "7 solvent-extracted absolutes from Tamil Nadu: Indian rose centifolia, rose edward, mimosa, tobacco flower, chrysanthemum, fenugreek and vanilla. GC-MS certified.",
  path: "/products/absolutes",
});

export default function Page() {
  return (
    <CategoryLanding
      category="absolute"
      path="/products/absolutes"
      method="Solvent extraction"
      lede="An absolute is the soluble aromatic fraction on its own. For the florals it is the concrete taken one stage further — the waxes washed out with alcohol and chilled away — leaving a material that is more concentrated than the concrete it came from and that dissolves cleanly in alcohol."
      points={[
        {
          title: "Alcohol-washed and chilled",
          body: "The waxes are taken out by cold filtration, so what remains is the aromatic fraction and very little else.",
        },
        {
          title: "Ready for fine fragrance",
          body: "Alcohol-soluble, so it goes into compounding without the warming and handling a concrete needs.",
        },
        {
          title: "Fingerprinted before release",
          body: "Every batch runs on our own Shimadzu GC-MS, and the Certificate of Analysis travels with the drum.",
        },
      ]}
    />
  );
}
