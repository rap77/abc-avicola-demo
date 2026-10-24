"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import marketData from "@/data/market.json";

const categories = [
  { id: "pollo", label: "Pollo" },
  { id: "huevo", label: "Huevo" },
  { id: "maiz", label: "Maíz" },
  { id: "soya", label: "Soya" },
] as const;

export default function MarketTable() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]["id"]>("pollo");
  const [toast, setToast] = useState<string | null>(null);
  const rows = marketData.filter((row) => row.categoria === selectedCategory);

  return (
    <>
      <NavBar />
      <main className="mx-auto min-h-screen max-w-[1320px] px-6 py-10">
        <header className="border-b border-line-border pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-heading text-3xl font-bold text-brand-primary">Cotizaciones de mercado</h1>
            <span className="rounded-pill bg-brand-accent px-3 py-1 font-body text-xs font-bold text-brand-primary">DE MUESTRA</span>
          </div>
          <p className="mt-3 max-w-2xl font-body text-base text-ink-dark">Carga editorial simulada. Todas las cifras son ficticias y se muestran solo para esta demo.</p>
        </header>

        <section className="mt-8" aria-labelledby="market-table-title">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías de mercado de muestra">
              {categories.map((category) => (
                <button key={category.id} type="button" role="tab" aria-selected={selectedCategory === category.id} onClick={() => setSelectedCategory(category.id)} className={`rounded-pill border px-4 py-2 font-heading text-sm font-bold transition ${selectedCategory === category.id ? "border-brand-primary bg-brand-primary text-white" : "border-line-border text-brand-primary hover:bg-brand-primary-soft"}`}>
                  {category.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setToast("Exportación simulada — DE MUESTRA")} className="inline-flex w-fit items-center gap-2 rounded-pill bg-brand-accent px-5 py-2.5 font-body text-sm font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover">
              <Download className="size-4" aria-hidden />
              Exportar CSV (mock)
            </button>
          </div>

          <h2 id="market-table-title" className="sr-only">Tabla de cotizaciones de mercado de muestra</h2>
          <div className="mt-5 overflow-x-auto rounded-card border border-line-border">
            <table className="min-w-[900px] w-full border-collapse text-left">
              <thead className="bg-brand-primary text-white">
                <tr className="font-heading text-sm font-bold">
                  <th scope="col" className="px-4 py-4">Producto</th><th scope="col" className="px-4 py-4">Presentación</th><th scope="col" className="px-4 py-4">Unidad</th><th scope="col" className="px-4 py-4">Moneda</th><th scope="col" className="px-4 py-4">Ubicación</th><th scope="col" className="px-4 py-4">Fecha</th><th scope="col" className="px-4 py-4">Precio USD</th><th scope="col" className="px-4 py-4">Var. %</th><th scope="col" className="px-4 py-4">Responsable</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`${row.producto}-${row.ubicacion}`} className={index % 2 === 0 ? "bg-white" : "bg-brand-primary-soft"}>
                    <td className="px-4 py-4 font-body text-sm font-bold text-ink-dark">{row.producto}</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.presentacion}</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.unidad}</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.moneda}</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.ubicacion}</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.fecha}</td><td className="px-4 py-4 font-body text-sm font-bold text-ink-dark">{row.precio.toFixed(2)}</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.variacion_pct > 0 ? "+" : ""}{row.variacion_pct.toFixed(1)}%</td><td className="px-4 py-4 font-body text-sm text-ink-dark">{row.responsable} — DE MUESTRA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      {toast && <div role="status" className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-pill bg-brand-accent px-6 py-2 font-heading text-sm font-bold text-brand-primary shadow-cta">{toast}</div>}
      <Footer />
    </>
  );
}
