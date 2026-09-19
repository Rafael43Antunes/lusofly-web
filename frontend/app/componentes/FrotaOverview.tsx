import Link from "next/link";
import { Aeronave } from "../types";

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

export default async function FrotaOverview() {
  // O componente é 'async' e vai buscar os dados ao Django do lado do servidor
  const frota = await getFrota();

  return (
    <section className="min-h-screen w-full flex flex-col justify-center pt-50 pb-16 px-6 bg-white">
      <div className="w-full max-w-5xl mx-auto">
      
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600">A Nossa Frota</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">Voa no Equipamento Certificado</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {frota.slice(0, 2).map((aviao) => (
            <div 
              key={aviao.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-52 w-full relative bg-slate-100 overflow-hidden">
                <img 
                  src={aviao.imagem_principal} 
                  alt={aviao.nome} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{aviao.nome}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">{aviao.descricao_curta}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/frota" className="px-6 py-3 border border-slate-200 hover:border-blue-200 text-blue-600 text-sm font-bold rounded-full transition-colors flex items-center gap-2 mx-auto w-fit hover:bg-blue-50">
            Explorar toda a frota &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}