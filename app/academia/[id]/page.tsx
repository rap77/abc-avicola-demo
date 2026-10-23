"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PlayerMock from "@/components/PlayerMock";
import courses from "@/data/courses.json";
import { getPurchased, getProgress, setLessonDone } from "@/lib/store";
import { ChevronDown, CheckCircle2, Circle, Lock } from "lucide-react";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((c) => c.id === id);
  const [purchased, setPurchased] = useState(false);
  const [done, setDone] = useState<string[]>([]);
  const [openMod, setOpenMod] = useState<string | null>("m1");
  useEffect(() => { if (id) { setPurchased(getPurchased().includes(id)); setDone(getProgress(id)); } }, [id]);
  const lessons = useMemo(() => (course ? course.modules.flatMap((m) => m.lessons) : []), [course]);
  if (!course) return <><NavBar /><p className="py-20 text-center font-heading text-2xl text-brand-primary">Curso no encontrado (mock)</p><Footer /></>;
  const pct = lessons.length ? Math.round((done.length / lessons.length) * 100) : 0;
  const R = 44, CIRC = 2 * Math.PI * R;
  const toggle = (lid: string) => {
    const nd = !done.includes(lid);
    setLessonDone(course.id, lid, nd);
    setDone(getProgress(course.id));
  };
  return (
    <>
      <NavBar />
      {/* Hero del curso */}
      <section className="relative h-[360px] overflow-hidden bg-ink-dark">
        <Image src={course.img} alt={`${course.title} (de muestra)`} fill className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-card-overlay" />
        <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-6 pb-8">
          <span className="mb-3 w-fit rounded-pill bg-brand-accent px-3 py-1 font-body text-xs font-bold uppercase text-brand-primary">{course.type} · DE MUESTRA</span>
          <h1 className="max-w-3xl font-heading text-3xl font-bold text-white md:text-4xl">{course.title}</h1>
          <p className="mt-2 font-body text-base text-white">{course.category} · {course.level} · {course.modality}</p>
          {purchased || course.type === "Gratis" ? (
            <Link href="#player" className="mt-5 w-fit rounded-pill bg-brand-accent px-6 py-3 font-body text-base font-bold text-brand-primary shadow-cta">Continuar</Link>
          ) : (
            <Link href={`/checkout?curso=${course.id}`} className="mt-5 w-fit rounded-pill bg-brand-accent px-6 py-3 font-body text-base font-bold text-brand-primary shadow-cta">Inscribirme (pago simulado)</Link>
          )}
        </div>
      </section>
      <main className="mx-auto grid max-w-[1320px] gap-8 px-6 py-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div id="player"><PlayerMock poster={course.img} locked={!purchased && course.type !== "Gratis"} /></div>
          <h2 className="mt-8 font-heading text-2xl font-bold text-brand-primary">Módulos del curso</h2>
          <div className="mt-4 divide-y divide-line-border rounded-card border border-line-border">
            {course.modules.map((m) => (
              <div key={m.id}>
                <button onClick={() => setOpenMod(openMod === m.id ? null : m.id)} className="flex w-full items-center justify-between px-5 py-4 font-heading text-lg font-medium text-ink-dark">
                  {m.title}
                  <ChevronDown className={`size-5 transition ${openMod === m.id ? "rotate-180" : ""}`} />
                </button>
                {openMod === m.id && (
                  <ul className="space-y-2 px-5 pb-4">
                    {m.lessons.map((l) => {
                      const locked = !purchased && course.type !== "Gratis";
                      const isDone = done.includes(l.id);
                      return (
                        <li key={l.id} className="flex items-center justify-between gap-3 rounded-md bg-brand-primary-soft px-4 py-2.5">
                          <span className="flex items-center gap-3 font-body text-sm text-ink-dark">
                            {locked ? <Lock className="size-4 text-danger" /> : isDone ? <CheckCircle2 className="size-4 text-overlay-event" /> : <Circle className="size-4 text-brand-primary" />}
                            {l.title}
                          </span>
                          <span className="flex items-center gap-3">
                            <span className="font-body text-sm capitalize text-ink-footer">{l.duration}</span>
                            {!locked && (
                              <label className="flex items-center gap-1 font-body text-xs text-brand-primary">
                                <input type="checkbox" checked={isDone} onChange={() => toggle(l.id)} /> completada
                              </label>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card border border-line-border p-6 text-center shadow-cta">
            <h3 className="font-heading text-lg font-bold text-brand-primary">Tu progreso</h3>
            <svg viewBox="0 0 100 100" className="mx-auto mt-3 size-28 -rotate-90">
              <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" className="stroke-brand-primary-soft" />
              <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" strokeLinecap="round" className="stroke-brand-accent" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct / 100)} />
            </svg>
            <p className="mt-2 font-heading text-xl font-bold text-ink-dark">{pct}%</p>
            <p className="font-body text-sm text-ink-footer">{done.length}/{lessons.length} lecciones</p>
          </div>
          <div className="rounded-card border border-line-border p-6 shadow-cta">
            <div className="flex items-center gap-4">
              <Image src="/img/avatar-1.webp" alt="Instructor de muestra" width={96} height={96} className="size-24 rounded-full object-cover" />
              <div>
                <h3 className="font-heading text-lg font-bold text-ink-dark">{course.instructor}</h3>
                <p className="mt-1 line-clamp-3 font-body text-sm text-ink-footer">{course.bio}</p>
              </div>
            </div>
          </div>
          <div className="rounded-card border border-line-border p-6 text-center shadow-cta">
            <h3 className="font-heading text-lg font-bold text-brand-primary">Precio (DE MUESTRA)</h3>
            <p className="mt-2 font-heading text-3xl font-bold text-brand-primary">{course.type === "Gratis" ? "Gratis" : `$${course.priceUSD}`}</p>
            {course.type !== "Gratis" && !purchased && (
              <Link href={`/checkout?curso=${course.id}`} className="mt-4 inline-block w-full rounded-pill bg-brand-accent px-6 py-3 font-body text-base font-bold text-brand-primary shadow-cta">Comprar (simulado)</Link>
            )}
            {purchased && <p className="mt-3 font-body text-sm text-overlay-event">✔ Acceso activo en este navegador (localStorage)</p>}
          </div>
        </aside>
      </main>
      <Footer />
    </>
  );
}
