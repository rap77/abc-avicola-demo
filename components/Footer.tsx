"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
export default function Footer() {
  const [toast, setToast] = useState<string | null>(null);
  return (
    <footer className="bg-brand-primary pb-20 pt-24 text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-heading text-2xl font-semibold">Contáctanos</h3>
          <ul className="mt-4 space-y-3 font-body text-base text-ink-footer">
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Ciudad de Guatemala (dirección ficticia)</li>
            <li className="flex items-center gap-2"><Mail className="size-4" /> info@abcavicola.com</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> +55 000 000 000 (mock)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-2xl font-semibold">Noticias</h3>
          <p className="mt-4 font-body text-base text-ink-footer">Suscríbete al boletín (simulado — sin backend).</p>
          <form className="mt-4 flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setToast("DE MUESTRA — suscripción simulada, no se envió nada."); }}>
            <input aria-label="correo" placeholder="tu@email.com" className="rounded-md bg-brand-primary-soft px-4 py-3 font-body text-base text-white outline outline-line-border shadow-input placeholder:text-ink-footer" />
            <button className="rounded-md bg-brand-accent px-4 py-3 font-heading text-base capitalize font-medium text-brand-primary">Subscribir</button>
          </form>
        </div>
        <div>
          <h3 className="font-heading text-2xl font-semibold">Enlaces</h3>
          <ul className="mt-4 space-y-2 font-body text-base text-ink-footer">
            <li><a href="/academia" className="hover:text-white">Academia Avícola</a></li>
            <li><a href="/mercado" className="hover:text-white">Agro & Talento</a></li>
            <li><a href="/comunidad" className="hover:text-white">Comunidad B2B</a></li>
            <li><a href="/mi-cuenta" className="hover:text-white">Mi cuenta</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-2xl font-semibold">Únete</h3>
          <p className="mt-4 font-body text-base text-ink-footer">Sé parte del ecosistema avícola. Registro simulado en este prototipo.</p>
        </div>
      </div>
      <div className="mx-auto mt-12 h-px max-w-[1320px] bg-white/16" />
      <div className="mx-auto mt-6 max-w-[1320px] px-6 font-body text-base text-ink-footer">
        © 2026 ABC Avícola — PROTOTIPO con datos de muestra. Contenido ficticio.
      </div>
      {toast && <div className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-pill bg-brand-accent px-6 py-2 font-heading text-sm font-bold text-brand-primary shadow-cta">{toast}</div>}
    </footer>
  );
}
