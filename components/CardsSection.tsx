import Image from "next/image";
import Link from "next/link";
const CARDS = [
  { href: "/mercado", img: "/img/card-avian.webp", title: "Avian Business" },
  { href: "/comunidad", img: "/img/card-agro.webp", title: "Agro&Talento" },
  { href: "/academia", img: "/img/card-academia.webp", title: "Academia Avícola" },
];
export default function CardsSection() {
  return (
    <section className="mx-auto grid max-w-[1320px] gap-7 px-6 py-14 md:grid-cols-3">
      {CARDS.map((c) => (
        <Link key={c.title} href={c.href} className="group relative block h-80 overflow-hidden rounded-2xl">
          <Image src={c.img} alt={`${c.title} (de muestra)`} fill className="object-cover transition-transform group-hover:scale-105" />
          <div className="absolute inset-0 bg-card-overlay" />
          <h3 className="absolute bottom-6 left-6 font-heading text-2xl font-bold text-white">{c.title}</h3>
        </Link>
      ))}
    </section>
  );
}
