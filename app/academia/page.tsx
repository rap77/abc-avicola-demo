"use client";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import courses from "@/data/courses.json";

const uniq = (k: "category" | "level" | "modality") => ["Todas", ...Array.from(new Set<string>(courses.map((c) => c[k] as string)))];

export default function AcademiaPage() {
  const [cat, setCat] = useState("Todas");
  const [lvl, setLvl] = useState("Todos");
  const [mod, setMod] = useState("Todas");
  const list = courses.filter((c) => (cat === "Todas" || c.category === cat) && (lvl === "Todos" || c.level === lvl) && (mod === "Todas" || c.modality === mod));
  const Chip = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button onClick={onClick} className={`rounded-pill px-4 py-1.5 font-heading text-sm font-medium transition ${active ? "bg-brand-primary text-white shadow-ring-accent" : "bg-brand-primary-soft text-brand-primary hover:shadow-ring-primary"}`}>{label}</button>
  );
  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-[1320px] px-6 py-10">
        <nav className="font-body text-sm capitalize text-ink-footer">Inicio · <span className="text-brand-primary">Academia</span></nav>
        <h1 className="mt-2 font-heading text-4xl font-bold text-brand-primary md:text-5xl">Academia Avícola</h1>
        <p className="mt-2 font-body text-base text-ink-footer">Catálogo de muestra — cursos ficticios para el prototipo.</p>
        <div className="mt-6 flex flex-wrap gap-2">{uniq("category").map((c) => <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}</div>
        <div className="mt-3 flex flex-wrap gap-2">{uniq("level").map((c) => <Chip key={c} label={c} active={lvl === c} onClick={() => setLvl(c)} />)}</div>
        <div className="mt-3 flex flex-wrap gap-2">{uniq("modality").map((c) => <Chip key={c} label={c} active={mod === c} onClick={() => setMod(c)} />)}</div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => <CourseCard key={c.id} c={c} />)}
        </div>
        {list.length === 0 && <p className="mt-10 text-center font-body text-ink-footer">Sin resultados con ese filtro (mock).</p>}
      </main>
      <Footer />
    </>
  );
}
