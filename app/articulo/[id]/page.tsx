import news from "@/data/news.json";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
export default function ArticlePage({ params }: { params: { id: string } }) {
  const n = news.find((x) => x.id === params.id);
  if (!n) notFound();
  return (
    <>
      <NavBar />
      <article className="mx-auto max-w-2xl px-6 py-14">
        <span className="rounded-pill bg-brand-accent px-3 py-1 font-body text-xs font-bold uppercase text-brand-primary">DE MUESTRA</span>
        <h1 className="mt-4 font-heading text-4xl font-bold text-ink-dark">{n.title}</h1>
        <p className="mt-2 font-body text-sm capitalize text-ink-footer">{n.meta}</p>
        <p className="mt-6 font-body text-base leading-relaxed text-ink-dark">{n.excerpt}</p>
        <p className="mt-4 font-body text-base leading-relaxed text-ink-dark">Este artículo es contenido ficticio generado exclusivamente para el prototipo AT-DEMO-001. No representa información real de ABC Avícola ni del sector.</p>
      </article>
      <Footer />
    </>
  );
}
