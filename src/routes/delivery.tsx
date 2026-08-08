import { createFileRoute } from "@tanstack/react-router";
import { Globe2, PackageCheck, RefreshCcw, Truck } from "lucide-react";
import { site } from "@/lib/site";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery Information | KREUPA SPICES" },
      {
        name: "description",
        content: "Dispatch times, shipping charges, international delivery and our replacement policy at KREUPA SPICES.",
      },
      { property: "og:title", content: "Delivery Information | KREUPA SPICES" },
      { property: "og:description", content: "How and when your KREUPA SPICES order reaches you." },
    ],
  }),
  component: DeliveryPage,
});

const cards = [
  { icon: PackageCheck, title: "Dispatch in 24 hours", body: "Orders confirmed before 4pm IST leave the same working day." },
  { icon: Truck, title: "3–6 days across India", body: "Metro cities usually 2–3 days. Tracking is shared as soon as the parcel is picked up." },
  { icon: Globe2, title: "International shipping", body: "We ship worldwide via air freight for retail parcels and sea freight for bulk." },
  { icon: RefreshCcw, title: "Damaged in transit?", body: "Send a photo within 48 hours of delivery and we replace it, no argument." },
];

const table = [
  ["Kerala & Tamil Nadu", "2–3 working days", "₹49"],
  ["Rest of India", "3–6 working days", "₹79"],
  [`Orders above ₹${site.freeShippingOver}`, "Standard timelines", "Free"],
  ["International (retail)", "7–14 working days", "Quoted per order"],
];

function DeliveryPage() {
  return (
    <div className="container-page py-10">
      <p className="eyebrow text-primary">Delivery</p>
      <h1 className="mt-2 text-4xl">Getting your spices to you</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Spices are packed in food-grade, nitrogen-flushed pouches inside a rigid carton, so nothing crushes or leaks
        on the way.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-soft">
            <Icon className="size-5 text-primary" />
            <h2 className="mt-3 text-base">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="p-4 font-semibold">Destination</th>
              <th className="p-4 font-semibold">Estimated time</th>
              <th className="p-4 font-semibold">Charge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {table.map((row) => (
              <tr key={row[0]}>
                <td className="p-4">{row[0]}</td>
                <td className="p-4 text-muted-foreground">{row[1]}</td>
                <td className="p-4 font-semibold">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Orders are currently confirmed over WhatsApp or email — online checkout and live tracking are on the way.
      </p>
    </div>
  );
}