import CategoryLanding from "@/components/product/CategoryLanding";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Essential Oil Manufacturer India — Vetiver, Cypriol, Spice Oils",
  description:
    "17 steam-distilled essential oils from Tamil Nadu: vetiver, cypriol, cardamom, black pepper, lemongrass, palmarosa, davana and more. GC-MS certified per batch.",
  path: "/products/essential-oils",
});

export default function Page() {
  return (
    <CategoryLanding
      category="essential-oil"
      path="/products/essential-oils"
      method="Steam distillation"
      lede="Aromatic crops, roots and spices run on a dedicated second route. Low-pressure steam lifts the volatile fraction without thermal scorch, followed by cooling and Florentine flask gravity separation. Nothing crosses between this line and the floral extractors."
      points={[
        {
          title: "Distilled fresh",
          body: "Grasses and leaves are cut and charged the same day. Citral and other key constituents degrade fast in stored crop.",
        },
        {
          title: "Low pressure, long cycle",
          body: "Root materials like vetiver need an extended, gentle distillation. Rushing it leaves the heaviest and most valuable fractions behind.",
        },
        {
          title: "Assays stated per batch",
          body: "Where a constituent governs the specification — cineole, citral, geraniol, davanone — the figure is on the Certificate of Analysis.",
        },
      ]}
    />
  );
}
