// CA-5: banner permanente en TODAS las vistas. bg brand.accent, texto brand.primary.
export default function PrototypeBanner() {
  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-50 bg-brand-accent py-1.5 text-center font-heading text-sm font-bold text-brand-primary"
    >
      PROTOTIPO FUNCIONAL — DATOS DE MUESTRA
    </div>
  );
}
