import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { categories } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-semibold">KREUPA</p>
          <p className="eyebrow mt-1 text-accent">Spices</p>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            {site.tagline}. Sourced from growers we know by name, packed in small batches.
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop"
                  search={{ category: c.slug, q: undefined }}
                  className="hover:text-accent"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/about" className="hover:text-accent">About KREUPA</Link></li>
            <li><Link to="/wholesale" className="hover:text-accent">Wholesale & Export</Link></li>
            <li><Link to="/delivery" className="hover:text-accent">Delivery Information</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link to="/account" className="hover:text-accent">My Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Reach us</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 size-4 shrink-0" />{site.phoneDisplay}</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 size-4 shrink-0" />{site.email}</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0" />{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/55 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} KREUPA SPICES. All rights reserved.</p>
          <p>Online ordering & payments arriving soon.</p>
        </div>
      </div>
    </footer>
  );
}