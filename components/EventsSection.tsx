import Image from "next/image";
const EVENTS = [
  { img: "/img/event-1.webp", title: "Cumbre Avícola 2026 (ficticia)" },
  { img: "/img/event-2.webp", title: "Expo Feed LatAm (ficticia)" },
  { img: "/img/event-3.webp", title: "Congreso de Biosseguridad (ficticio)" },
];
export default function EventsSection() {
  return (
    <section className="bg-brand-primary py-14">
      <div className="mx-auto max-w-[1320px] px-6">
        <h2 className="text-center font-heading text-4xl font-bold text-brand-accent md:text-5xl">Eventos destacados</h2>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {EVENTS.map((e) => (
            <article key={e.title} className="relative h-64 overflow-hidden rounded-card">
              <Image src={e.img} alt={`${e.title} — de muestra`} fill className="object-cover" />
              <div className="absolute inset-0 bg-event-overlay" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-heading text-2xl font-medium text-white">{e.title}</h3>
                <span className="mt-2 block h-0.5 w-14 rounded-pill bg-brand-accent" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
