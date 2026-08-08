import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, searchProducts } from "@/data/products";
import { cn } from "@/lib/utils";

type ShopSearch = { q?: string | undefined; category?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search['q'] === "string" && search['q'] ? search['q'] : undefined,
    category:
      typeof search['category'] === "string" && search['category'] ? search['category'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Indian Spices Online | KREUPA SPICES" },
      {
        name: "description",
        content:
          "Browse estate-direct cardamom, Tellicherry pepper, Lakadong turmeric and small-batch masala blends from KREUPA SPICES.",
      },
      { property: "og:title", content: "Shop Indian Spices Online | KREUPA SPICES" },
      {
        property: "og:description",
        content: "Single-origin whole spices, ground spices and house blends, packed in small batches.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState("featured");
  const activeCategory = search.category ?? "all";

  const results = useMemo(() => {
    const list = searchProducts(search.q ?? "", activeCategory);
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [search.q, activeCategory, sort]);

  return (
    <div className="container-page py-10">
      <p className="eyebrow text-primary">Shop</p>
      <h1 className="mt-2 text-4xl">The KREUPA pantry</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Every lot is traceable to a single estate or farmer collective. Prices include GST.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <CategoryChip
          label="All spices"
          active={activeCategory === "all"}
          to={{ q: search.q, category: undefined }}
        />
        {categories.map((c) => (
          <CategoryChip
            key={c.slug}
            label={c.name}
            active={activeCategory === c.slug}
            to={{ q: search.q, category: c.slug }}
          />
        ))}

        <div className="ml-auto flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            className="h-9 rounded-full border border-border bg-card px-3 text-sm outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <input
          value={search.q ?? ""}
          onChange={(e) =>
            navigate({ search: { q: e.target.value || undefined, category: search.category } })
          }
          placeholder="Search by name, origin or flavour…"
          aria-label="Search products"
          className="h-12 w-full rounded-full border border-border bg-card px-5 text-sm outline-none focus:border-ring"
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} product{results.length === 1 ? "" : "s"}
        {search.q ? ` for “${search.q}”` : ""}
      </p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-12 text-center">
          <p className="font-display text-xl">Nothing matched that search</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a broader term, or ask us on WhatsApp — we often stock more than we list.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  label,
  active,
  to,
}: {
  label: string;
  active: boolean;
  to: ShopSearch;
}) {
  return (
    <Link
      to="/shop"
      search={to}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card hover:border-ring",
      )}
    >
      {label}
    </Link>
  );
}