const STATS = [
  { n: "+0190", l: "Proyectos" }, { n: "+89", l: "Asesores" },
  { n: "+2390", l: "Años" }, { n: "+1290", l: "Clientes" },
];
export default function StatsBand() {
  return (
    <section className="bg-brand-primary py-12">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.l} className={`text-center ${i !== 0 ? "md:border-l md:border-divider-v" : ""}`}>
            <div className="font-heading text-5xl font-bold text-brand-accent md:text-6xl">{s.n}</div>
            <div className="mt-1 font-heading text-lg font-medium text-white md:text-xl">{s.l}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center font-body text-xs uppercase tracking-wide text-ink-footer">Cifras DE MUESTRA — no representan datos reales de la empresa</p>
    </section>
  );
}
