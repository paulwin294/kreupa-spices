import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/products";
import { site, whatsappLink } from "@/lib/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | KREUPA SPICES" },
      { name: "description", content: "Review the spices in your KREUPA SPICES cart and send your order enquiry." },
      { property: "og:title", content: "Your Cart | KREUPA SPICES" },
      { property: "og:description", content: "Review your selected spices and place an enquiry." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartLines, setQty, removeFromCart, subtotal, ready } = useStore();
  const shipping = subtotal === 0 || subtotal >= site.freeShippingOver ? 0 : 79;

  const orderMessage =
    `Hello ${site.name}, I would like to order:\n` +
    cartLines.map((l) => `• ${l.product.name} (${l.product.weight}) × ${l.qty}`).join("\n") +
    `\n\nSubtotal: ${formatPrice(subtotal)}`;

  if (!ready) return <div className="container-page py-20 text-muted-foreground">Loading your cart…</div>;

  return (
    <div className="container-page py-10">
      <h1 className="text-4xl">Your cart</h1>

      {cartLines.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-14 text-center">
          <p className="font-display text-xl">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">Start with our signature garam masala.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse spices
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {cartLines.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-4 p-4">
                <Link to="/product/$slug" params={{ slug: product.slug }} className="shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={112}
                    height={112}
                    className="size-24 rounded-md object-cover sm:size-28"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link to="/product/$slug" params={{ slug: product.slug }} className="font-display hover:text-primary">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.weight} · {product.origin}</p>
                  <div className="mt-auto flex items-center gap-3 pt-3">
                    <div className="flex items-center rounded-full border border-border">
                      <button aria-label="Decrease" onClick={() => setQty(product.id, qty - 1)} className="p-2">
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm">{qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(product.id, qty + 1)} className="p-2">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-display font-semibold">{formatPrice(product.price * qty)}</p>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Delivery" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <div className="border-t border-border pt-3">
                <Row label="Total" value={formatPrice(subtotal + shipping)} bold />
              </div>
            </dl>

            <a
              href={whatsappLink(orderMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full bg-leaf px-6 py-3.5 text-center text-sm font-semibold text-leaf-foreground"
            >
              Place order via WhatsApp
            </a>
            <Link
              to="/contact"
              className="mt-3 block rounded-full border border-border px-6 py-3.5 text-center text-sm font-semibold hover:border-ring"
            >
              Send an enquiry instead
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Online card & UPI checkout is coming in the next phase. For now we confirm every order personally.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</dt>
      <dd className={bold ? "font-display text-lg font-semibold" : ""}>{value}</dd>
    </div>
  );
}