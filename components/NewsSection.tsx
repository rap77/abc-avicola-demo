import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import news from "@/data/news.json";
export default function NewsSection() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-14">
      <h2 className="text-center font-heading text-4xl font-bold text-brand-primary md:text-5xl">Últimas noticias</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <article key={n.id} className="rounded-card border border-line-border bg-white p-6 shadow-cta transition hover:-translate-y-1">
            <div className="flex items-center gap-3 font-body text-sm capitalize text-ink-footer">
              <CalendarDays className="size-4 text-info-link" /> {n.meta}
            </div>
            <h3 className="mt-3 font-heading text-2xl font-semibold leading-snug text-ink-dark">{n.title}</h3>
            <p className="mt-2 font-body text-base text-ink-footer">{n.excerpt}</p>
            <Link href={`/articulo/${n.id}`} className="mt-4 inline-flex flex-col gap-1 font-heading text-base font-medium text-brand-primary">
              Leer artículo
              <span className="h-0.5 w-8 rounded-pill bg-brand-accent" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
