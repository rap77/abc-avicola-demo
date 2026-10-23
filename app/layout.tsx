import type { Metadata } from "next";
import { Work_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";
import PrototypeBanner from "@/components/PrototypeBanner";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans", display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito-sans", display: "swap" });

export const metadata: Metadata = {
  title: "ABC Avícola — PROTOTIPO FUNCIONAL (datos de muestra)",
  description: "Prototipo frontend-only AT-DEMO-001. No es el producto.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${workSans.variable} ${nunito.variable}`}>
      <body className="pb-12">
        {children}
        <PrototypeBanner />
      </body>
    </html>
  );
}
