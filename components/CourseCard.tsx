import Image from "next/image";
import Link from "next/link";
type Course = { id: string; title: string; category: string; instructor: string; priceUSD: number; type: string; img: string };
export default function CourseCard({ c }: { c: Course }) {
  const price = c.type === "Gratis" ? "Gratis" : `$${c.priceUSD} USD · DE MUESTRA`;
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-line-border bg-white shadow-cta transition hover:-translate-y-1">
      <div className="relative h-48">
        <Image src={c.img} alt={`${c.title} (de muestra)`} fill className="object-cover" />
        <span className="absolute left-4 top-4 rounded-pill bg-brand-accent px-3 py-1 font-body text-xs font-bold text-brand-primary">{c.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-bold leading-snug text-ink-dark">{c.title}</h3>
        <p className="mt-1 font-body text-sm text-ink-footer">{c.instructor}</p>
        <p className="mt-2 font-heading text-base font-bold text-brand-primary">{price}</p>
        <Link href={`/academia/${c.id}`} className="mt-4 inline-flex w-fit items-center rounded-pill bg-brand-accent px-5 py-2.5 font-body text-sm font-bold text-brand-primary shadow-cta hover:bg-brand-accent-hover">Ver curso</Link>
      </div>
    </article>
  );
}
