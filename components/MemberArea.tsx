"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, CircleHelp, LogOut, UserRound } from "lucide-react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import courses from "@/data/courses.json";
import { DEMO_EMAIL, getProgress, getPurchased } from "@/lib/store";

type PurchasedCourse = (typeof courses)[number];

function getCourseProgress(course: PurchasedCourse) {
  const lessons = course.modules.flatMap((module) => module.lessons);
  if (lessons.length === 0) return 0;
  const lessonIds = new Set(lessons.map((lesson) => lesson.id));
  return Math.round((getProgress(course.id).filter((id) => lessonIds.has(id)).length / lessons.length) * 100);
}

export default function MemberArea() {
  const router = useRouter();
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);
  const [progressByCourse, setProgressByCourse] = useState<Record<string, number>>({});

  useEffect(() => {
    const purchasedIds = new Set(getPurchased());
    const selectedCourses = courses.filter((course) => purchasedIds.has(course.id));
    setPurchasedCourses(selectedCourses);
    setProgressByCourse(Object.fromEntries(selectedCourses.map((course) => [course.id, getCourseProgress(course)])));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <NavBar />
      <main className="mx-auto max-w-[1320px] px-6 py-10">
        <header className="flex flex-col gap-4 border-b border-line-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-body text-sm text-ink-footer">Área miembro de muestra</p>
            <h1 className="font-heading text-3xl font-bold text-brand-primary">Hola, {DEMO_EMAIL}</h1>
          </div>
          <button onClick={handleLogout} className="inline-flex w-fit items-center gap-2 rounded-pill border border-line-border px-5 py-2.5 font-body text-sm font-bold text-brand-primary transition hover:bg-brand-primary-soft">
            <LogOut className="size-4" aria-hidden />
            Logout
          </button>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <section aria-labelledby="my-courses-title">
              <h2 id="my-courses-title" className="font-heading text-2xl font-bold text-ink-dark">Mis cursos</h2>
              {purchasedCourses.length > 0 ? (
                <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {purchasedCourses.map((course) => {
                    const progress = progressByCourse[course.id] ?? 0;
                    return (
                      <article key={course.id} className="overflow-hidden rounded-card border border-line-border bg-white shadow-cta">
                        <div className="relative h-40">
                          <Image src={course.img} alt={`${course.title} (de muestra)`} fill className="object-cover" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading text-lg font-bold leading-snug text-ink-dark">{course.title}</h3>
                          <div className="mt-4" aria-label={`${progress}% completado`}>
                            <div className="h-2 overflow-hidden rounded-pill bg-brand-primary-soft">
                              <div className="h-full rounded-pill bg-brand-accent" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="mt-2 font-body text-sm text-ink-footer">{progress}% completado</p>
                          </div>
                          <Link href={`/academia/${course.id}`} className="mt-4 inline-flex rounded-pill bg-brand-accent px-5 py-2.5 font-body text-sm font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover">
                            Continuar
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 rounded-card border border-line-border bg-white p-6">
                  <p className="font-body text-base text-ink-footer">Todavía no tenés cursos comprados en este navegador.</p>
                  <Link href="/academia" className="mt-4 inline-flex rounded-pill bg-brand-accent px-5 py-2.5 font-body text-sm font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover">
                    Ver academia
                  </Link>
                </div>
              )}
            </section>

            <section className="mt-10" aria-labelledby="certificates-title">
              <h2 id="certificates-title" className="font-heading text-2xl font-bold text-ink-dark">Certificados</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {purchasedCourses.slice(0, 2).map((course) => (
                  <article key={course.id} className="flex items-start gap-3 rounded-card border border-line-border bg-white p-5">
                    <BadgeCheck className="size-6 shrink-0 text-brand-primary" aria-hidden />
                    <div>
                      <h3 className="font-heading text-base font-bold text-ink-dark">{course.title}</h3>
                      <span className="mt-2 inline-block rounded-pill bg-line-border px-3 py-1 font-body text-xs font-bold text-ink-footer">Próximamente</span>
                    </div>
                  </article>
                ))}
                {purchasedCourses.length === 0 && (
                  <article className="rounded-card border border-line-border bg-white p-5">
                    <span className="inline-block rounded-pill bg-line-border px-3 py-1 font-body text-xs font-bold text-ink-footer">Próximamente</span>
                    <p className="mt-3 font-body text-sm text-ink-footer">Los certificados se habilitarán en una futura demostración.</p>
                  </article>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label="Opciones de cuenta de muestra">
            <div className="rounded-card border border-line-border bg-white p-5 shadow-cta">
              <h2 className="font-heading text-lg font-bold text-brand-primary">Mi cuenta</h2>
              <ul className="mt-4 space-y-3 font-body text-sm text-ink-footer">
                <li><a href="#" className="flex items-center gap-2 hover:text-brand-primary"><UserRound className="size-4 text-brand-primary" aria-hidden /> Perfil (mock)</a></li>
                <li><a href="#" className="flex items-center gap-2 hover:text-brand-primary"><BadgeCheck className="size-4 text-brand-primary" aria-hidden /> Suscripción: demo</a></li>
                <li><a href="mailto:soporte@abcavicola.demo" className="flex items-center gap-2 hover:text-brand-primary"><CircleHelp className="size-4 text-brand-primary" aria-hidden /> Soporte: soporte@abcavicola.demo</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
