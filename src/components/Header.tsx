import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { site } from "@/lib/site";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/wholesale", label: "Wholesale & Export" },
  { to: "/delivery", label: "Delivery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { cartCount, wishlist } = useStore();

  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [q, setQ] = useState("");

  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();

    navigate({
      to: "/shop",
      search: {
        q: q || undefined,
        category: undefined,
      },
    });

    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-page flex min-h-8 items-center justify-between gap-4 text-[11px]">
          <span className="hidden sm:block">
            🌿 Kerala, India · Premium Green Cardamom
          </span>

          <span className="mx-auto sm:mx-0">
            Free delivery above ₹{site.freeShippingOver}
          </span>

          <span className="hidden sm:block">
            Wholesale & export enquiries welcome
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="container-page flex h-[72px] items-center gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="KREUPA SPICES home"
        >
          <span className="grid size-10 place-items-center rounded-full bg-primary font-display text-xl font-semibold text-primary-foreground shadow-sm">
            K
          </span>

          <span className="leading-none">
            <span className="block font-display text-xl font-semibold tracking-tight text-foreground">
              KREUPA
            </span>

            <span className="eyebrow mt-1 block text-[8px] tracking-[0.28em] text-primary">
              SPICES
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="ml-6 hidden items-center gap-5 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShopOpen((v) => !v)}
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Shop
              <ChevronDown
                className={`size-3.5 transition-transform ${
                  shopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-8 w-56 rounded-xl border border-border bg-card p-2 shadow-lift">
                <Link
                  to="/shop"
                  search={{ category: "premium", q: undefined }}
                  onClick={() => setShopOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                >
                  <strong className="block">Green Cardamom</strong>
                  <span className="text-xs text-muted-foreground">
                    Our signature product
                  </span>
                </Link>

                <Link
                  to="/shop"
                  search={{ category: "whole-spices", q: undefined }}
                  onClick={() => setShopOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                >
                  Whole Spices
                </Link>

                <Link
                  to="/shop"
                  search={{ category: "ground-spices", q: undefined }}
                  onClick={() => setShopOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                >
                  Ground Spices
                </Link>

                <Link
                  to="/shop"
                  search={{ category: "blends", q: undefined }}
                  onClick={() => setShopOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm hover:bg-secondary"
                >
                  Masala Blends
                </Link>
              </div>
            )}
          </div>

          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{
                className: "text-sm font-semibold text-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form
          onSubmit={submit}
          className="ml-auto hidden max-w-sm flex-1 items-center md:flex"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cardamom, spices..."
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:bg-card"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-0.5 md:ml-2">
          <Link
            to="/account"
            aria-label="Account"
            className="rounded-full p-2.5 transition hover:bg-secondary"
          >
            <User className="size-[19px]" />
          </Link>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2.5 transition hover:bg-secondary"
          >
            <Heart className="size-[19px]" />

            {wishlist.length > 0 && (
              <Badge count={wishlist.length} />
            )}
          </Link>

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative rounded-full p-2.5 transition hover:bg-secondary"
          >
            <ShoppingBag className="size-[19px]" />

            {cartCount > 0 && (
              <Badge count={cartCount} />
            )}
          </Link>

          {/* Mobile menu */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            className="rounded-full p-2.5 transition hover:bg-secondary lg:hidden"
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container-page space-y-1 py-4">
            <form onSubmit={submit} className="mb-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search cardamom, spices..."
                  aria-label="Search products"
                  className="h-11 w-full rounded-full border border-border bg-secondary/60 pl-9 pr-4 text-sm outline-none focus:border-primary"
                />
              </div>
            </form>

            <Link
              to="/shop"
              search={{ category: "premium", q: undefined }}
              onClick={() => setOpen(false)}
              className="block rounded-lg bg-secondary px-3 py-3 text-sm font-semibold"
            >
              🌿 Green Cardamom
            </Link>

            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 border-t border-border pt-3">
              <Link
                to="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-secondary"
              >
                <Heart className="size-4" />
                Wishlist
                {wishlist.length > 0 && (
                  <Badge count={wishlist.length} />
                )}
              </Link>

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-secondary"
              >
                <ShoppingBag className="size-4" />
                Cart
                {cartCount > 0 && (
                  <Badge count={cartCount} />
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold leading-4 text-accent-foreground">
      {count > 99 ? "99+" : count}
    </span>
  );
}