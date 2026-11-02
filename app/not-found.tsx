import { Button, Icon, Rail } from "@/components/ui";

export default function NotFound() {
  return (
    <Rail className="flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow text-gold-700">404</p>
      <h1 className="mt-5 h3">We couldn&rsquo;t find that page</h1>
      <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
        The link may be out of date, or the material may be listed under a different name.
        The catalogue is searchable by common name, botanical name and CAS number.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/products" variant="accent">
          Search the catalogue
          <Icon name="search" size={18} />
        </Button>
        <Button href="/" variant="ghost">
          Back to the homepage
        </Button>
      </div>
    </Rail>
  );
}
