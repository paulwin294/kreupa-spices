import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  MessageCircle,
  Package,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import heroSpices from "@/assets/hero-spices.jpg";
import { ProductCard } from "@/components/ProductCard";
import { categories, getProducts } from "@/data/products";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "KREUPA SPICES | Premium Green Cardamom from Kerala",
      },
      {
        name: "description",
        content:
          "Discover KREUPA SPICES premium green cardamom from Kerala, with retail packs, bulk quantities and wholesale enquiries.",
      },
      {
        property: "og:title",
        content: "KREUPA SPICES | Premium Green Cardamom",
      },
      {
        property: "og:description",
        content:
          "Premium green cardamom from Kerala for homes, retailers and business buyers.",
      },
    ],
  }),

  component: Index,
});

function Index() {
  const products = getProducts();

  const featured = products.slice(0, 4);

  return (
    <div>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroSpices}
          alt="KREUPA SPICES premium green cardamom"
          width={1600}
          height={1104}
          className="absolute inset-0 -z-20 size-full object-cover"
        />

        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden="true"
        />

        <div className="container-page flex min-h-[78vh] flex-col justify-center py-24 text-primary-foreground">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent">
              KERALA · INDIA · KREUPA SPICES
            </p>

            <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Premium green cardamom,
              <br />
              <span className="text-accent">naturally aromatic.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
              Discover carefully selected whole green cardamom from Kerala,
              packed for homes, retailers, restaurants and business buyers.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Shop Green Cardamom
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/wholesale"
                className="rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold text-primary-foreground backdrop-blur transition hover:bg-primary-foreground/10"
              >
                Wholesale & Export
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-primary-foreground/75">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" />
                Whole green cardamom
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" />
                Kerala origin
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" />
                Retail & bulk packs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}
      <section className="border-b border-border bg-card">
        <div className="container-page grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem
            icon={<Leaf className="size-4" />}
            title="Kerala Origin"
            body="Green cardamom from Kerala"
          />

          <TrustItem
            icon={<ShieldCheck className="size-4" />}
            title="Quality Focused"
            body="Selected whole pods"
          />

          <TrustItem
            icon={<Package className="size-4" />}
            title="Multiple Packs"
            body="Retail to bulk quantities"
          />

          <TrustItem
            icon={<Truck className="size-4" />}
            title="Delivery"
            body={`Free above ₹${site.freeShippingOver}`}
          />
        </div>
      </section>

      {/* =========================================================
          FLAGSHIP PRODUCT
      ========================================================= */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-primary">
              OUR SIGNATURE PRODUCT
            </p>

            <h2 className="mt-3 text-4xl leading-tight sm:text-5xl">
              Green cardamom is where KREUPA begins.
            </h2>

            <p className="mt-5 max-w-xl text-muted-foreground leading-relaxed">
              We are building KREUPA SPICES around one product we believe
              deserves special attention: premium green cardamom.
            </p>

            <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
              From a small household pack to larger quantities for businesses,
              choose the size that works for you.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                search={{
                  category: "premium",
                  q: undefined,
                }}
                className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Explore Cardamom
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/contact"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
              >
                Contact KREUPA
              </Link>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-12"
            style={{ background: "var(--gradient-warm)" }}
          >
            <div className="absolute right-5 top-5 rounded-full border border-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              KREUPA
            </div>

            <div className="flex min-h-[300px] flex-col justify-end">
              <div className="mb-auto text-[100px] leading-none sm:text-[140px]">
                🌿
              </div>

              <p className="eyebrow text-primary">
                PREMIUM GREEN CARDAMOM
              </p>

              <h3 className="mt-2 text-3xl">
                Whole aromatic pods
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Suitable for tea, desserts, cooking, gifting and everyday
                kitchen use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SHOP BY CATEGORY
      ========================================================= */}
      <section className="bg-secondary/40 py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-primary">
                SHOP KREUPA
              </p>

              <h2 className="mt-2 text-3xl sm:text-4xl">
                Choose your quantity
              </h2>

              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                From everyday retail packs to larger quantities for business
                buyers.
              </p>
            </div>

            <Link
              to="/shop"
              className="flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to="/shop"
                search={{
                  category: category.slug,
                  q: undefined,
                }}
                className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                  <Leaf className="size-5" />
                </span>

                <h3 className="mt-5 text-xl">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {category.blurb}
                </p>

                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Browse
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================= */}
      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">
              FEATURED
            </p>

            <h2 className="mt-2 text-3xl sm:text-4xl">
              Shop KREUPA
            </h2>

            <p className="mt-3 text-sm text-muted-foreground">
              Start with the pack that suits you.
            </p>
          </div>

          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Shop all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* =========================================================
          WHY KREUPA
      ========================================================= */}
      <section className="bg-espresso py-20 text-primary-foreground">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">
              WHY KREUPA
            </p>

            <h2 className="mt-3 text-4xl sm:text-5xl">
              A brand built around quality, not clutter.
            </h2>

            <p className="mt-5 leading-relaxed text-primary-foreground/70">
              KREUPA SPICES starts with a focused product range and a simple
              promise: present good spices clearly, make them easy to buy,
              and build trust with every order.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <WhyItem
              number="01"
              title="Careful selection"
              text="Focus on whole green cardamom pods and product quality."
            />

            <WhyItem
              number="02"
              title="Clear products"
              text="Straightforward pack sizes and product information."
            />

            <WhyItem
              number="03"
              title="Flexible buying"
              text="Retail packs as well as larger quantities for businesses."
            />

            <WhyItem
              number="04"
              title="Growing globally"
              text="A Kerala brand designed to serve buyers beyond India."
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          PACK SIZES
      ========================================================= */}
      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow text-primary">
              PACK SIZES
            </p>

            <h2 className="mt-3 text-4xl">
              Buy the quantity you need.
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Whether you're trying KREUPA for the first time or buying for a
              business, we have different quantity options.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              See available packs
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["50 g", "100 g", "250 g", "500 g", "1 kg", "Bulk"].map(
              (size) => (
                <div
                  key={size}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <Package className="mx-auto size-5 text-primary" />

                  <p className="mt-3 font-display text-xl font-semibold">
                    {size}
                  </p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Green Cardamom
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHOLESALE
      ========================================================= */}
      <section className="container-page pb-20">
        <div
          className="overflow-hidden rounded-2xl p-8 sm:p-12"
          style={{ background: "var(--gradient-warm)" }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow text-primary">
                WHOLESALE & EXPORT
              </p>

              <h2 className="mt-3 text-3xl sm:text-4xl">
                Buying in larger quantities?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Retailers, restaurants, distributors and international buyers
                can contact KREUPA SPICES with their quantity and destination
                requirements.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>✓ Bulk enquiries</span>
                <span>✓ Retailer enquiries</span>
                <span>✓ Export enquiries</span>
              </div>
            </div>

            <Link
              to="/wholesale"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Send an enquiry
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHATSAPP CTA
      ========================================================= */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-page flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-primary">
              NEED HELP?
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl">
              Talk directly with KREUPA SPICES.
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Ask about products, quantities, wholesale or availability.
            </p>
          </div>

          <Link
            to="/contact"
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground"
          >
            <MessageCircle className="size-4" />
            Contact KREUPA
          </Link>
        </div>
      </section>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="rounded-full bg-secondary p-2.5 text-primary">
        {icon}
      </span>

      <div>
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-muted-foreground">
          {body}
        </p>
      </div>
    </div>
  );
}

function WhyItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
      <span className="text-xs font-bold tracking-widest text-accent">
        {number}
      </span>

      <h3 className="mt-5 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-primary-foreground/60">
        {text}
      </p>
    </div>
  );
}