import Link from "next/link";
import { Badge, Icon, Photo, cx } from "@/components/ui";
import { photo, productImage } from "@/lib/images";
import { CATEGORY_LABELS, FORM_LABELS, type ProductIndexEntry } from "@/lib/labels";

export default function ProductCard({
  product,
  selectable,
  selected,
  onToggle,
  className,
}: {
  product: ProductIndexEntry;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: (slug: string) => void;
  className?: string;
}) {
  const isFloral = product.category === "concrete-absolute";
  const img = productImage(product.slug, product.category);

  return (
    <article
      className={cx(
        "card card-hover group relative flex flex-col overflow-hidden",
        selected && "border-forest-500 ring-2 ring-forest-500/25",
        className,
      )}
    >
      {selectable && (
        <label
          className="absolute right-3.5 top-3.5 z-10 flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white/95 py-1.5 pl-2.5 pr-3 text-[0.75rem] font-semibold text-forest-900 shadow-sm backdrop-blur transition-colors hover:border-forest-500"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={Boolean(selected)}
            onChange={() => onToggle?.(product.slug)}
            className="h-4 w-4 cursor-pointer accent-forest-700"
            aria-label={`Add ${product.commonName} to enquiry`}
          />
          {selected ? "Added" : "Add"}
        </label>
      )}

      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="overflow-hidden">
          <Photo
            src={photo(img.id, 700)}
            alt={img.alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            tone={isFloral ? "forest" : "sage"}
            className="aspect-[4/3] w-full"
            imgClassName="transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={isFloral ? "gold" : "sage"}>
              {CATEGORY_LABELS[product.category]}
            </Badge>
          </div>

          <h3 className="mt-3 font-display text-[1.375rem] leading-tight tracking-tight text-forest-900 transition-colors group-hover:text-gold-700">
            {product.commonName}
          </h3>
          <p className="mt-1 text-[0.8125rem] italic text-muted">{product.botanicalName}</p>

          <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-muted">
            {product.summary}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3.5">
            <p className="spec text-[0.75rem] text-muted">
              CAS {product.casNumber[0]}
            </p>
            <span className="flex items-center gap-1.5 text-[0.8125rem] font-semibold text-forest-700">
              Details
              <Icon
                name="arrow-up-right"
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </span>
          </div>

          <p className="mt-2 text-[0.75rem] text-muted">
            {product.availableForms
              .map((f) => FORM_LABELS[f as keyof typeof FORM_LABELS])
              .join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}
