import { createFileRoute, Link } from "@tanstack/react-router";
import heroSpices from "@/assets/hero-spices.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KREUPA SPICES | Estate-Direct Indian Spices" },
      {
        name: "description",
        content:
          "KREUPA SPICES buys directly from Kerala estates and farmer collectives, cures slowly and packs in small batches for maximum aroma.",
      },
      { property: "og:title", content: "About KREUPA SPICES" },
      { property: "og:description", content: "Estate-direct Indian spices, sourced from growers we know by name." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <div className="container-page py-10">
        <p className="eyebrow text-primary">Our story</p>
        <h1 className="mt-2 max-w-3xl text-4xl sm:text-5xl">
          A spice house built on knowing exactly where every pod came from
        </h1>
      </div>

      <div className="container-page">
        <img
          src={heroSpices}
          alt="Whole Indian spices arranged on dark slate"
          loading="lazy"
          width={1600}
          height={1104}
          className="aspect-[21/9] w-full rounded-xl object-cover"
        />
      </div>

      <div className="container-page mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-muted-foreground">
          <p className="text-lg text-foreground">
            KREUPA SPICES began in a family kitchen in Kerala, where the difference between a good curry and a great
            one was never the recipe — it was the spice.
          </p>
          <p>
            We work with a small circle of growers across Idukki, Wayanad, the Jaintia Hills and Byadgi. No auction
            floors, no blending houses, no anonymous sacks. When you buy a pouch of our cardamom, we can tell you
            which estate it grew on and the week it was picked.
          </p>
          <p>
            Everything is cured slowly, cleaned twice and milled in small batches rather than months in advance.
            Ground spices lose their oils quickly, so we grind close to dispatch and pack into nitrogen-flushed
            pouches. It costs more. It also means the aroma hits you the moment the seal breaks.
          </p>
          <p>
            We sell to home cooks, restaurants and, increasingly, to importers abroad who want traceable Indian
            spice with paperwork to match.
          </p>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-7 shadow-soft">
          <h2 className="text-xl">What we promise</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Single origin.</strong> Named estate or collective on every lot.</li>
            <li><strong className="text-foreground">Nothing added.</strong> No colour, no filler, no anti-caking agent.</li>
            <li><strong className="text-foreground">Small batches.</strong> Milled close to dispatch, never warehoused.</li>
            <li><strong className="text-foreground">Fair buying.</strong> Direct payment to growers, no middlemen.</li>
          </ul>
          <Link
            to="/shop"
            className="mt-6 block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Explore the range
          </Link>
        </aside>
      </div>
    </div>
  );
}