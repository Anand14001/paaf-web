import ProductCard from "@/components/product/ProductCard";
import { Breadcrumb, Button, Icon, Rail, Section } from "@/components/ui";
import { CATEGORY_LABELS, getProductIndex, getProductsByCategory } from "@/lib/products";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import type { Category } from "@/lib/schema";

export default async function CategoryLanding({
  category,
  path,
  lede,
  method,
  points,
}: {
  category: Category;
  path: string;
  lede: string;
  method: string;
  points: { title: string; body: string }[];
}) {
  const [items, index] = await Promise.all([
    getProductsByCategory(category),
    getProductIndex(),
  ]);
  const cards = index.filter((i) => items.some((p) => p.slug === i.slug));

  const trail = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: CATEGORY_LABELS[category], path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div className="border-b border-border bg-bone">
        <Rail className="pb-12 pt-6">
          <Breadcrumb trail={trail} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div className="max-w-2xl">
              <h1 className="h2">{CATEGORY_LABELS[category]}</h1>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{lede}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href="/request-quote" variant="accent">
                Request a quote
                <Icon name="arrow-up-right" size={18} />
              </Button>
              <Button href="/products" variant="ghost">
                All 31 products
              </Button>
            </div>
          </div>
        </Rail>
      </div>

      <Section>
        <Rail>
          <div className="grid gap-6 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.title} className="border-t border-border pt-5">
                <p className="font-semibold text-forest-900">{p.title}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>

          <h2 className="h5 mt-16">
            All {CATEGORY_LABELS[category].toLowerCase()}{" "}
            <span className="spec align-middle text-[1.125rem] font-semibold text-gold-700">
              ({items.length})
            </span>
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1536px]:grid-cols-4">
            {cards.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Rail>
      </Section>

    </>
  );
}
