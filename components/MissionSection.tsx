import Image from "next/image";
const CARDS = [
  { img: "/img/mission-1.webp", title: "Propósito", body: "Impulsar el desarrollo técnico y comercial de la avicultura latinoamericana." },
  { img: "/img/mission-2.webp", title: "Misión", body: "Formar, conectar e informar con datos confiables (en este prototipo: ficticios)." },
  { img: "/img/mission-3.webp", title: "Visión", body: "Ser la plataforma B2B de referencia del sector en la región." },
];
export default function MissionSection() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-14">
      <h2 className="text-center font-heading text-4xl font-bold text-brand-primary md:text-5xl">¿Quiénes Somos?</h2>
      <div className="mt-10 grid gap-7 md:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="relative h-72 overflow-hidden rounded-card">
            <Image src={c.img} alt={`${c.title} (de muestra)`} fill className="object-cover" />
            <div className="absolute inset-0 bg-mission-overlay mix-blend-normal opacity-80" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-heading text-3xl font-bold text-white drop-shadow">{c.title}</h3>
              <p className="mt-2 font-body text-base font-bold text-white drop-shadow">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
