"use client";
// F3 — CHECKOUT SIMULADO (AT-DEMO-001, DEC-005). Un solo flujo. CERO red (CA-4):
// ningún fetch a pasarela; el "pago" es setTimeout 1.2s y la compra se marca en
// localStorage vía lib/store (clave abc_demo_purchased, que F4 leerá).
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import courses from "@/data/courses.json";
import { DEMO_EMAIL, markPurchased } from "@/lib/store";

const SUBS_PRICE = 9; // $9 USD/mes — cifra DE MUESTRA (mock)
type Plan = "curso" | "subs";
const STEPS = ["Resumen", "Pago", "Confirmación"] as const;

export default function CheckoutFlow({ initialCourseId }: { initialCourseId?: string }) {
  const [courseId, setCourseId] = useState<string>(initialCourseId ?? "");
  const [step, setStep] = useState(0);
  const [plan, setPlan] = useState<Plan>("curso");
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL); // prefill email FICTICIO de muestra
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const course = courses.find((c) => c.id === courseId);
  const total = course ? (plan === "subs" ? SUBS_PRICE : course.priceUSD) : 0;

  // Paso 2 -> Paso 3: latencia simulada SIN red (CA-4). Aquí NO hay fetch.
  useEffect(() => {
    if (!processing) return;
    const t = setTimeout(() => {
      if (course) markPurchased(course.id); // purchased:[id] → lo que F4 leerá
      setProcessing(false);
      setStep(2);
    }, 1200);
    return () => clearTimeout(t);
  }, [processing, course]);

  const stepValid =
    step !== 1 ||
    /.+@.+\..+/.test(email) && cardName.trim().length > 2 &&
    /^\d{2}\/\d{2}$/.test(expiry) && /^\d{3,4}$/.test(cvv);

  const field =
    "w-full rounded-card border border-line-border bg-white px-4 py-3 font-body text-base text-ink-dark placeholder:text-ink-footer focus:outline-none focus:shadow-input";

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-12">
      {/* CA-5 banner mock + aviso de pago simulado */}
      <div className="rounded-pill bg-brand-accent px-4 py-2 text-center font-body text-xs font-bold uppercase text-brand-primary">
        PROTOTIPO FUNCIONAL — DATOS DE MUESTRA · Checkout simulado — no se procesa pago real
      </div>

      <h1 className="mt-6 font-heading text-3xl font-bold text-brand-primary md:text-4xl">
        Checkout <span className="text-ink-footer">(simulado)</span>
      </h1>

      {/* Stepper: horizontal <sm → vertical (mobile-first), activo brand.accent */}
      <ol className="mt-6 flex flex-col gap-3 font-body text-sm sm:flex-row sm:items-center sm:gap-2">
        {STEPS.map((label, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={label} className="flex items-center gap-3 sm:gap-2">
              <span
                aria-current={active ? "step" : undefined}
                className={`inline-flex items-center gap-2 rounded-pill px-4 py-2 font-medium transition ${
                  active
                    ? "bg-brand-accent text-brand-primary shadow-ring-accent"
                    : done
                      ? "bg-brand-primary-soft text-brand-primary"
                      : "bg-brand-primary-soft text-ink-footer"
                }`}
              >
                <span
                  className={`grid size-5 place-items-center rounded-full text-xs font-bold ${
                    active ? "bg-brand-primary text-brand-accent" : "bg-white text-brand-primary"
                  }`}
                >
                  {done ? <CheckCircle2 className="size-4" /> : i + 1}
                </span>
                {label}
              </span>
              {i < STEPS.length - 1 && <span className="hidden h-px w-6 bg-line-border sm:block" />}
            </li>
          );
        })}
      </ol>

      {/* PASO 0 — Resumen / selector mock si no vino ?course= */}
      {step === 0 && !course && (
        <section className="mt-8 rounded-card border border-line-border bg-white p-5 shadow-cta md:p-6">
          <h2 className="font-heading text-xl font-bold text-ink-dark">Elige tu curso (de muestra)</h2>
          <p className="mt-1 font-body text-sm text-ink-footer">
            No recibimos un curso en la URL (<code className="font-body text-xs">/checkout?course=[id]</code>). Selecciona uno del catálogo mock:
          </p>
          <ul className="mt-4 grid gap-3">
            {courses.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setCourseId(c.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-card border border-line-border bg-white px-4 py-3 text-left transition hover:bg-brand-primary-soft hover:shadow-ring-primary"
                >
                  <span>
                    <span className="block font-heading text-base font-medium text-ink-dark">{c.title}</span>
                    <span className="block font-body text-xs text-ink-footer">{c.instructor} · {c.category} · DE MUESTRA</span>
                  </span>
                  <span className="shrink-0 rounded-pill bg-brand-accent px-3 py-1 font-body text-xs font-bold text-brand-primary">
                    {c.type === "Gratis" ? "Gratis" : `$${c.priceUSD} USD`}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {step === 0 && course && (
        <section className="mt-8 rounded-card border border-line-border bg-white p-5 shadow-cta md:p-6">
          <div className="flex gap-4">
            <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-card sm:block">
              <Image src={course.img} alt={`${course.title} (de muestra)`} fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold leading-snug text-ink-dark">{course.title}</h2>
              <p className="mt-1 font-body text-sm text-ink-footer">{course.instructor} · DE MUESTRA</p>
            </div>
          </div>

          {course.type !== "Gratis" && (
            <fieldset className="mt-5">
              <legend className="font-heading text-sm font-bold text-ink-dark">Tipo de acceso (mock)</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <button
                  onClick={() => setPlan("curso")}
                  className={`rounded-card border px-4 py-3 text-left font-body text-sm transition ${
                    plan === "curso"
                      ? "border-brand-primary bg-brand-primary-soft text-brand-primary shadow-ring-primary"
                      : "border-line-border text-ink-footer hover:shadow-ring-primary"
                  }`}
                >
                  <span className="block font-bold">Curso individual</span>
                  <span className="block">${course.priceUSD} USD · pago único (simulado)</span>
                </button>
                <button
                  onClick={() => setPlan("subs")}
                  className={`rounded-card border px-4 py-3 text-left font-body text-sm transition ${
                    plan === "subs"
                      ? "border-brand-primary bg-brand-primary-soft text-brand-primary shadow-ring-primary"
                      : "border-line-border text-ink-footer hover:shadow-ring-primary"
                  }`}
                >
                  <span className="block font-bold">Suscripción premium</span>
                  <span className="block">${SUBS_PRICE} USD/mes · todos los cursos (simulado)</span>
                </button>
              </div>
            </fieldset>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-line-border pt-4">
            <p className="font-body text-sm text-ink-footer">Total (DE MUESTRA)</p>
            <p className="font-heading text-2xl font-bold text-brand-primary">
              {total === 0 ? "Gratis" : `$${total} USD`}
            </p>
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-pill bg-brand-accent px-6 py-3 font-body text-base font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover"
          >
            Continuar
            <CreditCard className="size-5" aria-hidden />
          </button>
        </section>
      )}

      {/* PASO 1 — Pago MOCK (CA-4: cero fetch a pasarela) */}
      {step === 1 && course && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (stepValid) setProcessing(true);
          }}
          className="mt-8 rounded-card bg-white p-5 shadow-input md:p-6"
        >
          <p className="rounded-pill bg-brand-accent px-4 py-1.5 text-center font-body text-xs font-bold text-brand-primary">
            Checkout simulado — no se procesa pago real
          </p>
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="font-body text-sm font-medium text-ink-dark">Email (demo, ficticio)</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1 ${field}`} autoComplete="off" />
            </label>
            <label className="block">
              <span className="font-body text-sm font-medium text-ink-dark">Nombre en la tarjeta</span>
              <input type="text" required value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Ej. Productor Demo" className={`mt-1 ${field}`} autoComplete="off" />
            </label>
            <label className="block">
              <span className="font-body text-sm font-medium text-ink-dark">Número de tarjeta (mock)</span>
              <input inputMode="numeric" value="4242 4242 4242 4242" readOnly onFocus={(e) => e.currentTarget.blur()} className={`mt-1 ${field} text-ink-footer`} aria-readonly />
              <span className="mt-1 block font-body text-xs text-ink-footer">Número precargado de muestra — no se envía a ninguna pasarela.</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="font-body text-sm font-medium text-ink-dark">Vencimiento (MM/AA)</span>
                <input inputMode="numeric" required maxLength={5} value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="12/28" className={`mt-1 ${field}`} autoComplete="off" />
              </label>
              <label className="block">
                <span className="font-body text-sm font-medium text-ink-dark">CVV</span>
                <input inputMode="numeric" required maxLength={4} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))} placeholder="123" className={`mt-1 ${field}`} autoComplete="off" />
              </label>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between font-body text-sm text-ink-footer">
            <span>Total a &ldquo;pagar&rdquo; (simulado)</span>
            <span className="font-heading text-lg font-bold text-brand-primary">{total === 0 ? "Gratis" : `$${total} USD`}</span>
          </div>
          {!stepValid && (
            <p className="mt-3 font-body text-xs text-danger">Revisa el formato de los campos (validación ligera, sin verificación real).</p>
          )}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => setStep(0)} className="rounded-pill border border-line-border px-6 py-3 font-body text-sm font-medium text-brand-primary transition hover:bg-brand-primary-soft">
              Volver al resumen
            </button>
            <button
              type="submit"
              disabled={processing || !stepValid}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-brand-accent px-6 py-3 font-body text-base font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover disabled:opacity-60"
            >
              {processing ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden /> Procesando (simulado)…
                </>
              ) : (
                "Pagar (simulado)"
              )}
            </button>
          </div>
        </form>
      )}

      {/* PASO 2 — Confirmación + desbloqueo persistido para F4 */}
      {step === 2 && course && (
        <section className="mt-8 rounded-card border border-line-border bg-white p-6 text-center shadow-cta md:p-8">
          <CheckCircle2 className="mx-auto size-16 text-brand-accent" aria-hidden />
          <h2 className="mt-4 font-heading text-2xl font-bold text-brand-primary">Acceso desbloqueado</h2>
          <p className="mt-2 font-body text-sm text-ink-footer">
            &ldquo;Pago&rdquo; simulado de {total === 0 ? "0 USD (curso gratuito de muestra)" : `$${total} USD`} — no se procesó ningún cobro real.
            La compra quedó marcada en este navegador (localStorage) y alimenta tu área miembro (F4).
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={`/academia/${course.id}`}
              className="inline-flex items-center justify-center rounded-pill bg-brand-accent px-6 py-3 font-body text-base font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover"
            >
              Ir a mi curso
            </Link>
            <Link href="/academia" className="inline-flex items-center justify-center rounded-pill border border-line-border px-6 py-3 font-body text-sm font-medium text-brand-primary transition hover:bg-brand-primary-soft">
              Ver más cursos (mock)
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
