"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Heart, Send, Share2 } from "lucide-react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import postsData from "@/data/posts.json";

type Post = (typeof postsData)[number];

export default function FeedList() {
  const [posts, setPosts] = useState<Post[]>(() => [...postsData].sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [body, setBody] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const toggleLike = (id: string) => {
    setLikedIds((current) => {
      const next = new Set(current);
      const liked = next.has(id);
      if (liked) next.delete(id);
      else next.add(id);
      setToast(liked ? "Me gusta retirado — DE MUESTRA" : "Me gusta registrado — DE MUESTRA");
      return next;
    });
  };

  const publishPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = body.trim();
    if (!content) return;

    setPosts((current) => [{
      id: `sample-${Date.now()}`,
      empresa: "Empresa de muestra",
      avatar: "/img/avatar-1.webp",
      timestamp: new Date().toISOString(),
      cuerpo: content,
      likes: 0,
      comentarios: 0,
      sponsored: false,
    }, ...current]);
    setBody("");
    setToast("Publicación agregada localmente — DE MUESTRA");
  };

  return (
    <>
      <NavBar />
      <main className="mx-auto min-h-screen max-w-2xl px-6 py-10">
        <header className="border-b border-line-border pb-6">
          <p className="font-body text-sm font-bold text-brand-primary">DE MUESTRA</p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-brand-primary">Comunidad B2B</h1>
          <p className="mt-2 font-body text-base text-ink-dark">Conversaciones entre empresas del sector avícola, simuladas para esta demo.</p>
        </header>

        <form onSubmit={publishPost} className="mt-6 rounded-card border border-line-border bg-white p-5 shadow-cta">
          <label htmlFor="post-body" className="font-heading text-lg font-bold text-ink-dark">Crear publicación</label>
          <textarea id="post-body" value={body} onChange={(event) => setBody(event.target.value)} required rows={4} placeholder="Comparte una actualización de muestra..." className="mt-3 w-full rounded-card border border-line-border p-3 font-body text-base text-ink-dark outline-none focus:shadow-ring-primary" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-body text-xs text-ink-dark">Se guarda solo en este navegador y es DE MUESTRA.</p>
            <button type="submit" className="inline-flex items-center gap-2 rounded-pill bg-brand-accent px-5 py-2.5 font-body text-sm font-bold text-brand-primary shadow-cta transition hover:bg-brand-accent-hover"><Send className="size-4" aria-hidden />Publicar (mock)</button>
          </div>
        </form>

        <section className="mt-6 space-y-4" aria-label="Feed de publicaciones de muestra">
          {posts.map((post) => {
            const isLiked = likedIds.has(post.id);
            return (
              <article key={post.id} className="rounded-card border border-line-border bg-white p-5 shadow-cta">
                <header className="flex items-start gap-3">
                  <Image src={post.avatar} alt={`Avatar de ${post.empresa} (de muestra)`} width={48} height={48} className="size-12 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-base font-bold text-ink-dark">{post.empresa}</h2>
                      {post.sponsored && <span className="rounded-pill bg-brand-accent px-2 py-1 font-body text-xs font-bold text-brand-primary">Patrocinado</span>}
                    </div>
                    <p className="font-body text-xs text-ink-dark">{new Date(post.timestamp).toLocaleString("es-ES")} · DE MUESTRA</p>
                  </div>
                </header>
                <p className="mt-4 font-body text-base leading-relaxed text-ink-dark">{post.cuerpo}</p>
                <div className="mt-5 flex items-center gap-5 border-t border-line-border pt-4">
                  <button type="button" onClick={() => toggleLike(post.id)} aria-pressed={isLiked} className={`inline-flex items-center gap-2 font-body text-sm font-bold ${isLiked ? "text-brand-primary" : "text-ink-dark"}`}><Heart className="size-5" fill={isLiked ? "currentColor" : "none"} aria-hidden />{post.likes + (isLiked ? 1 : 0)} me gusta</button>
                  <button type="button" onClick={() => setToast("Compartido localmente — DE MUESTRA")} className="inline-flex items-center gap-2 font-body text-sm font-bold text-brand-primary"><Share2 className="size-5" aria-hidden />Compartir</button>
                </div>
              </article>
            );
          })}
        </section>
      </main>
      {toast && <div role="status" className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-pill bg-brand-accent px-6 py-2 font-heading text-sm font-bold text-brand-primary shadow-cta">{toast}</div>}
      <Footer />
    </>
  );
}
