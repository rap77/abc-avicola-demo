import Link from "next/link";
export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-white px-6 text-center">
      <div>
        <h1 className="font-heading text-5xl font-bold text-brand-primary">Página no encontrada</h1>
        <p className="mt-4 font-body text-base text-ink-footer">Contenido de muestra — prototipo funcional.</p>
        <Link href="/" className="mt-8 inline-block rounded-pill bg-brand-accent px-6 py-3 font-body font-bold text-brand-primary shadow-cta">Volver al inicio</Link>
      </div>
    </div>
  );
}
