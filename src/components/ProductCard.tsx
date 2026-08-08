import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { formatPrice, type Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={900}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => {
          toggleWishlist(product.id);
          toast(wished ? "Removed from wishlist" : "Saved to wishlist");
        }}
        className="absolute right-3 top-3 rounded-full bg-card/90 p-2 shadow-soft backdrop-blur transition hover:bg-card"
      >
        <Heart className={cn("size-4", wished && "fill-primary text-primary")} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow text-[0.62rem] text-muted-foreground">{product.origin}</p>
        <h3 className="mt-1.5 font-display text-base leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.short}</p>

        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-accent text-accent" />
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span>({product.reviewCount})</span>
          <span className="ml-auto">{product.weight}</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div>
            <span className="font-display text-lg font-semibold">{formatPrice(product.price)}</span>
            {product.compareAt && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              addToCart(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            className="flex items-center gap-1 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}