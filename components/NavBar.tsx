"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Menu, X, UserRound } from "lucide-react";
const LINKS = [
  { href: "/", label: "Avian Business" },
  { href: "/academia", label: "Academia Avícola" },
  { href: "/mercado", label: "Agro&Talento" },
  { href: "/comunidad", label: "Blog" },
];
export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 h-20 border-b border-line-border bg-white md:h-28">
      <nav className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/brand/logo.svg" alt="Logo ABC Avícola" width={96} height={80} className="h-14 w-auto md:h-20" priority />
        </Link>
        <ul className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="font-heading text-lg font-medium text-brand-primary hover:text-brand-accent-hover">{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/mi-cuenta" className="inline-flex items-center gap-2 font-heading text-lg font-medium text-brand-primary">
              <UserRound className="size-5" /> Login/Registro
            </Link>
          </li>
          <li>
            <Link href="/mi-cuenta" className="inline-flex items-center gap-2 rounded-pill-nav bg-brand-primary px-5 py-3 font-heading text-base font-medium capitalize text-white shadow-cta">
              contáctanos
              <span className="grid size-6 place-items-center rounded-full bg-brand-accent">
                <ArrowRight className="size-3.5 text-brand-primary" />
              </span>
            </Link>
          </li>
        </ul>
        <button aria-label="Abrir menú" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-md text-brand-primary lg:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul className="space-y-2 border-t border-line-border bg-white px-6 py-4 lg:hidden">
          {LINKS.map((l) => (
            <li key={l.label}><Link onClick={() => setOpen(false)} href={l.href} className="block py-2 font-heading text-lg font-medium text-brand-primary">{l.label}</Link></li>
          ))}
          <li><Link onClick={() => setOpen(false)} href="/mi-cuenta" className="block py-2 font-heading text-lg font-medium text-brand-primary">Login/Registro</Link></li>
        </ul>
      )}
    </header>
  );
}
