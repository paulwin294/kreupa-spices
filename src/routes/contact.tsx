import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact KREUPA SPICES | Enquiries & WhatsApp" },
      {
        name: "description",
        content: "Talk to KREUPA SPICES on WhatsApp, by phone or through the enquiry form for retail and bulk orders.",
      },
      { property: "og:title", content: "Contact KREUPA SPICES" },
      { property: "og:description", content: "Reach our team for orders, bulk pricing and export enquiries." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().min(2, "Add a subject").max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1500),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
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
        `Enquiry from ${d.name}\nEmail: ${d.email}${d.phone ? `\nPhone: ${d.phone}` : ""}\nSubject: ${d.subject}\n\n${d.message}`,
      ),
      "_blank",
      "noopener,noreferrer",
    );
    toast.success("Thanks! We'll reply within one working day.");
    form.reset();
  }

  return (
    <div className="container-page py-10">
      <p className="eyebrow text-primary">Contact</p>
      <h1 className="mt-2 text-4xl">We answer every message</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="name" label="Your name" error={errors['name']} />
            <Field name="email" label="Email" type="email" error={errors['email']} />
            <Field name="phone" label="Phone (optional)" error={errors['phone']} />
            <Field name="subject" label="Subject" error={errors['subject']} />
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              maxLength={1500}
              className="mt-1.5 w-full rounded-md border border-border bg-background p-3 text-sm outline-none focus:border-ring"
            />
            {errors['message'] && <p className="mt-1 text-xs text-destructive">{errors['message']}</p>}
          </div>
          <button
            type="submit"
            className="mt-6 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Send enquiry
          </button>
        </form>

        <aside className="space-y-4">
          <a
            href={whatsappLink(`Hello ${site.name}, I have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-leaf p-5 text-leaf-foreground shadow-soft"
          >
            <MessageCircle className="size-6" />
            <span>
              <span className="block font-semibold">Chat on WhatsApp</span>
              <span className="text-sm opacity-80">Fastest reply, usually minutes</span>
            </span>
          </a>

          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><Phone className="mt-0.5 size-4 text-primary" />{site.phoneDisplay}</li>
              <li className="flex gap-3"><Mail className="mt-0.5 size-4 text-primary" />{site.email}</li>
              <li className="flex gap-3"><MapPin className="mt-0.5 size-4 text-primary" />{site.address}</li>
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Monday to Saturday, 9am – 7pm IST.
            </p>
          </div>
        </aside>
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