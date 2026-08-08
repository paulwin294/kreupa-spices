import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CreditCard, Heart, Package, ShoppingBag, UserRound } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account | KREUPA SPICES" },
      { name: "description", content: "Your KREUPA SPICES account — orders, wishlist and addresses, coming soon." },
      { property: "og:title", content: "My Account | KREUPA SPICES" },
      { property: "og:description", content: "Accounts, orders and tracking are launching soon at KREUPA SPICES." },
    ],
  }),
  component: AccountPage,
});

const upcoming = [
  { icon: UserRound, title: "Registration & login", body: "One account for orders, addresses and saved spices." },
  { icon: Package, title: "My Orders", body: "Every past order with reorder in a tap." },
  { icon: ShoppingBag, title: "Order tracking", body: "Live courier status from dispatch to doorstep." },
  { icon: CreditCard, title: "Online payment", body: "UPI, cards and netbanking at checkout." },
  { icon: Bell, title: "Email notifications", body: "Order confirmations and restock alerts." },
];

function AccountPage() {
  return (
    <div className="container-page py-10">
      <p className="eyebrow text-primary">Account</p>
      <h1 className="mt-2 text-4xl">Your KREUPA account</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Accounts and online checkout arrive in the next phase. Your cart and wishlist are already saved on this
        device and will move across to your account automatically when it launches.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/cart" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
          View cart
        </Link>
        <Link to="/wishlist" className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-ring">
          <Heart className="size-4" /> View wishlist
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {upcoming.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-soft">
            <Icon className="size-5 text-primary" />
            <h2 className="mt-3 text-base">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            <p className="eyebrow mt-4 text-[0.6rem] text-accent-foreground/60">Coming soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}