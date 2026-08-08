import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | KREUPA SPICES" },
      { name: "description", content: "Spices you have saved for later at KREUPA SPICES." },
      { property: "og:title", content: "Wishlist | KREUPA SPICES" },
      { property: "og:description", content: "Your saved KREUPA SPICES favourites." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, ready } = useStore();
  const items = getProducts().filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-page py-10">
      <h1 className="text-4xl">Wishlist</h1>
      <p className="mt-2 text-muted-foreground">Saved on this device. It will follow your account once logins go live.</p>

      {!ready ? null : items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-14 text-center">
          <p className="font-display text-xl">Nothing saved yet</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Find your favourites
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}