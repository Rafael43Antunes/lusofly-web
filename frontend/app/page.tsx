import Link from "next/link";
import { Aeronave } from "./types";
import HeroSlider from "./componentes/HeroSlider";
import FrotaOverview from "./componentes/FrotaOverview";

export default async function Home() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <HeroSlider />

      {/* 2. SECÇÃO DE RESUMO DA FROTA */}
      <FrotaOverview />

      {/* 3. FOOTER PROFISSIONAL E SÚBTIL */}
      <footer className="bg-slate-950 text-slate-500 py-12 text-center text-sm border-t border-slate-800">
        <p>&copy; 2026 Lusofly Academy. Desenvolvido para a excelência na aviação.</p>
      </footer>

    </main>
  );
}