"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const SLIDES = ["/img/hero-1.webp", "/img/hero-2.webp", "/img/hero-3.webp"];
export default function Hero() {
  const [i, setI] = useState(0);
  return (
    <section className="relative h-[420px] overflow-hidden bg-ink-dark md:h-[600px]">
      {SLIDES.map((s, idx) => (
        <Image key={s} src={s} alt={`Hero de muestra ${idx + 1}`} fill priority={idx === 0} className={`object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/55 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-end px-6 pb-16">
        <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-pill bg-brand-accent px-4 py-1 font-body text-xs font-bold uppercase tracking-wide text-brand-primary">DE MUESTRA</span>
        <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl">Formación y datos para la avicultura de Latinoamérica</h1>
        <p className="mt-4 max-w-xl font-body text-base text-white">Prototipo funcional: cursos, mercado simulado y comunidad B2B con contenido ficticio.</p>
        <Link href="/academia" className="mt-8 inline-flex w-fit items-center gap-2 rounded-pill bg-brand-accent px-6 py-3.5 font-body text-base font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover">Ver Academia</Link>
        <div className="mt-8 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button key={idx} aria-label={`slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-2 w-8 rounded-dot ${idx === i ? "bg-brand-accent-hover" : "bg-white/55"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
