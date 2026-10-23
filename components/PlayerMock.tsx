"use client";
// F2 PlayerMock: <video> local + overlay marca de agua (email ficticio, rotado -45deg).
// Sin demo.mp4 => VIDEO_ASSET_PENDIENTE: poster local + controles visibles, NO simula reproducción.
import { useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, Maximize, Lock } from "lucide-react";

const EMAIL = "demo@abcavicola.com"; // FICTICIO — precondición del contrato §7 security_constraints

export default function PlayerMock({ poster, locked }: { poster: string; locked: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-card bg-ink-dark shadow-play">
      <Image src={poster} alt="Poster de video de muestra" fill className={`object-cover ${playing ? "opacity-90" : ""}`} />
      {/* Overlay marca de agua: repetido, rotado -45deg, opacidad baja, no interactivo */}
      <div className="pointer-events-none absolute inset-0 flex flex-wrap items-center justify-around gap-x-16 gap-y-10 overflow-hidden opacity-20" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="-rotate-45 whitespace-nowrap font-heading text-xl font-bold text-white md:text-2xl">{EMAIL}</span>
        ))}
      </div>
      {locked ? (
        <div className="absolute inset-0 grid place-items-center bg-ink-dark/70">
          <div className="text-center">
            <Lock className="mx-auto size-10 text-brand-accent" />
            <p className="mt-3 font-heading text-lg font-medium text-white">Contenido bloqueado</p>
            <p className="font-body text-sm text-ink-footer">Compra el curso (checkout simulado) para desbloquear.</p>
          </div>
        </div>
      ) : (
        <>
          <video
            className="absolute inset-0 h-full w-full opacity-0"
            poster={poster}
            controls={playing}
            preload="none"
            aria-label="Reproductor VOD simulado (VIDEO_ASSET_PENDIENTE)"
          >
            {/* src /video/demo.mp4 se activará cuando el humano suba el clip de 5s */}
          </video>
          {!playing && (
            <button onClick={() => setPlaying(true)} aria-label="Play (simulado)" className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-brand-accent/90 shadow-cta"><Play className="size-7 text-brand-primary" /></span>
            </button>
          )}
          {playing && (
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink-dark to-transparent px-4 pb-3 pt-8">
              <button onClick={() => setPlaying(false)} aria-label="Pausa (simulada)"><Pause className="size-6 text-white" /></button>
              <div className="h-1 flex-1 rounded-pill bg-white/25"><div className="h-1 w-1/4 rounded-pill bg-brand-accent" /></div>
              <Volume2 className="size-5 text-white" />
              <Maximize className="size-5 text-white" />
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-pill bg-brand-accent px-3 py-1 font-body text-xs font-bold uppercase text-brand-primary">VIDEO_ASSET_PENDIENTE · DE MUESTRA</span>
        </>
      )}
    </div>
  );
}
