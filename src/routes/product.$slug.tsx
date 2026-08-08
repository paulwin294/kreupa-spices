import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Leaf, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, getProductBySlug, getProducts } from "@/data/products";
import { site, whatsappLink } from "@/lib/site";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found | KREUPA SPICES" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    return {
      meta: [
        { title: `${p.name} | KREUPA SPICES` },
        { name: "description", content: p.short },
        { property: "og:title", content: `${p.name} | KREUPA SPICES` },
        { property: "og:description", content: p.short },
      ],
    };
  },
  notFoundComponent: ProductMissing,
  component: ProductPage,
});

function ProductMissing() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl">We couldn't find that spice</h1>
      <Link to="/shop" className="mt-6 inline-block text-primary underline">
        Back to the shop
      </Link>
    </div>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [qty, setQty] = useState(1);
  const wished = isWishlisted(product.id);
  const related = getProducts().filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container-page py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="size-full object-cover"
          />
        </div>

        <div>
          <p className="eyebrow text-primary">{product.origin}</p>
          <h1 className="mt-2 text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn("size-4", i < Math.round(product.rating) ? "fill-accent text-accent" : "text-border")}
                />
              ))}
            </span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted-foreground">· {product.reviewCount} reviews</span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="pb-1 text-muted-foreground line-through">{formatPrice(product.compareAt)}</span>
            )}
            <span className="pb-1.5 text-sm text-muted-foreground">/ {product.weight}</span>
          </div>

          <p className="mt-5 text-muted-foreground">{product.description}</p>

          <p className="mt-4 text-sm text-leaf">
            {product.stock > 0 ? `In stock — ${product.stock} packs ready to ship` : "Currently out of stock"}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-border">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 hover:text-primary"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="p-3 hover:text-primary"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product.id, qty);
                toast.success(`${product.name} added to cart`);
              }}
              className="h-12 flex-1 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:flex-none"
            >
              Add to cart
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="rounded-full border border-border p-3.5 hover:border-ring"
            >
              <Heart className={cn("size-5", wished && "fill-primary text-primary")} />
            </button>
          </div>

          <a
            href={whatsappLink(`Hi ${site.name}, I'd like to enquire about ${product.name} (${product.weight}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-leaf underline underline-offset-4"
          >
            Enquire about bulk pricing on WhatsApp
          </a>

          <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <Feature icon={<Leaf className="size-4" />} title="Estate direct" body="Bought from named growers" />
            <Feature icon={<ShieldCheck className="size-4" />} title="No additives" body="Zero colour or filler" />
            <Feature icon={<Truck className="size-4" />} title="Ships in 24h" body="Across India" />
          </dl>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl">Pairs well with</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <dt className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-primary">{icon}</span>
        {title}
      </dt>
      <dd className="mt-1 text-xs text-muted-foreground">{body}</dd>
    </div>
  );
}