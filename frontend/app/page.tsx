import Link from "next/link";
import { Aeronave } from "./types";
import HeroSlider from "./componentes/HeroSlider";

async function getFrota(): Promise<Aeronave[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/frota/`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const frota = await getFrota();

  return (
    <main className="min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <HeroSlider />

      {/* 2. SECÇÃO DE RESUMO DA FROTA */}
      <section className="max-w-6xl mx-auto pt-32 py-24 px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-600">A Nossa Frota</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">Voa no Equipamento Certificado</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {frota.slice(0, 2).map((aviao) => (
            <div 
              key={aviao.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col group transition-all hover:shadow-2xl"
            >
              <div className="h-72 w-full relative bg-slate-200 overflow-hidden">
                <img 
                  src={aviao.imagem_principal} 
                  alt={aviao.nome} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{aviao.nome}</h3>
                <p className="text-slate-600 mt-3 leading-relaxed">{aviao.descricao_curta}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/frota" className="px-6 py-3 border border-slate-200 hover:border-blue-200 text-blue-600 font-bold rounded-full transition-colors flex items-center gap-2 mx-auto w-fit hover:bg-blue-50">
            Explorar toda a frota &rarr;
          </Link>
        </div>
      </section>

      {/* 3. FOOTER PROFISSIONAL E SÚBTIL */}
      <footer className="bg-slate-950 text-slate-500 py-12 text-center text-sm border-t border-slate-800">
        <p>&copy; 2026 Lusofly Academy. Desenvolvido para a excelência na aviação.</p>
      </footer>

    </main>
  );
}