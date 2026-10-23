import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";
export default function TopBar() {
  return (
    <div className="bg-brand-primary py-4 font-body text-sm text-white">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <span>Avicultura en Latinoamérica</span>
          <span className="h-1 w-1 rounded-dot bg-brand-accent" aria-hidden />
          <span>Somos ABC avícola</span>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="inline-flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-full bg-brand-accent">
              <Mail className="size-4 text-brand-primary" />
            </span>
            info@abcavicola.com
          </span>
          {[Facebook, Instagram, Linkedin].map((I, i) => (
            <a key={i} href="#" aria-label="red social (demo)" className="grid size-8 place-items-center rounded-full bg-brand-accent-hover transition hover:brightness-95">
              <I className="size-4 text-ink-dark" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
