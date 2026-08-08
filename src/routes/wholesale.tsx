import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { BadgeCheck, Container, FileText, Globe2 } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/wholesale")({
  head: () => ({
    meta: [
      { title: "Wholesale & Export Enquiry | KREUPA SPICES" },
      {
        name: "description",
        content:
          "Bulk pricing, container-load export and full documentation from KREUPA SPICES. Send your wholesale or import enquiry.",
      },
      { property: "og:title", content: "Wholesale & Export | KREUPA SPICES" },
      { property: "og:description", content: "Bulk and export-grade Indian spices with complete documentation." },
    ],
  }),
  component: WholesalePage,
});

const schema = z.object({
  company: z.string().trim().min(2, "Company name required").max(120),
  contact: z.string().trim().min(2, "Contact name required").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  country: z.string().trim().min(2, "Country required").max(80),
  product: z.string().trim().min(2, "Which spices?").max(200),
  quantity: z.string().trim().min(1, "Estimated quantity required").max(60),
  notes: z.string().trim().max(1000).optional(),
});

const perks = [
  { icon: Container, title: "From 25 kg to full containers", body: "Retail packs, 25 kg sacks or FCL shipments." },
  { icon: FileText, title: "Complete documentation", body: "Phytosanitary, COA, invoice and packing list." },
  { icon: BadgeCheck, title: "Lab-tested lots", body: "Moisture, pesticide residue and aflatoxin reports." },
  { icon: Globe2, title: "Global freight", body: "FOB Kochi or CIF to your nearest port." },
];

function WholesalePage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const d = parsed.data;
    window.open(
      whatsappLink(
        `Wholesale / Export enquiry\nCompany: ${d.company}\nContact: ${d.contact}\nEmail: ${d.email}\nCountry: ${d.country}\nProducts: ${d.product}\nQuantity: ${d.quantity}${d.notes ? `\nNotes: ${d.notes}` : ""}`,
      ),
      "_blank",
      "noopener,noreferrer",
    );
    toast.success("Enquiry sent — our export desk will respond within 24 hours.");
    form.reset();
  }

  return (
    <div>
      <section className="bg-espresso py-16 text-primary-foreground">
        <div className="container-page">
          <p className="eyebrow text-accent">Wholesale & export</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
            Indian spice supply for importers, distributors and kitchens at scale
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/70">
            We supply cardamom, pepper, turmeric, chilli and blends in bulk, with the traceability and paperwork
            your buyers ask for. Write to {site.exportEmail} or use the form below.
          </p>
        </div>
      </section>

      <div className="container-page -mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {perks.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-lg border border-border bg-card p-6 shadow-lift">
            <Icon className="size-5 text-primary" />
            <h2 className="mt-3 text-base">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <div className="container-page mt-16 max-w-3xl">
        <h2 className="text-2xl">Send an enquiry</h2>
        <form onSubmit={onSubmit} className="mt-6 rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="company" label="Company" error={errors['company']} />
            <Field name="contact" label="Contact person" error={errors['contact']} />
            <Field name="email" label="Email" type="email" error={errors['email']} />
            <Field name="country" label="Country" error={errors['country']} />
            <Field name="product" label="Products of interest" error={errors['product']} />
            <Field name="quantity" label="Estimated quantity" error={errors['quantity']} />
          </div>
          <div className="mt-5">
            <label htmlFor="notes" className="text-sm font-medium">Additional requirements</label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              maxLength={1000}
              className="mt-1.5 w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-ring"
            />
          </div>
          <button
            type="submit"
            className="mt-6 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Submit enquiry
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={200}
        className="mt-1.5 h-11 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}