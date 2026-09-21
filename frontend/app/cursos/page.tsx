import Link from "next/link";
import { Curso } from "../../types";

async function getCursos(): Promise<Curso[]>{
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        const res = await fetch(`${apiUrl}/api/cursos/`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function CursosHubPage() {
  const cursos = await getCursos();

  return (
    <main className="min-h-screen bg-slate-50">
      
      {/* 1. HEADER DO HUB DE CURSOS */}
      <section className="bg-slate-900 pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">A Tua Rota Para o Cockpit</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Seja para iniciares a tua carreira do zero como Piloto de Linha Aérea, ou para dares o próximo passo como Instrutor, temos o programa desenhado à tua medida.
          </p>
        </div>
      </section>

      {/* 2. CATÁLOGO DE CURSOS */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-16">
          {cursos.map((curso, index) => (
            <div 
              key={curso.id} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow group`}
            >
              {/* Imagem */}
              <div className="md:w-1/2 h-72 md:h-auto relative overflow-hidden bg-slate-900">
                {curso.imagem_destaque && (
                  <img 
                    src={curso.imagem_destaque} 
                    alt={curso.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                )}
                <div className="absolute top-6 left-6 bg-blue-600 text-white font-black text-sm py-1 px-4 rounded-lg shadow-lg">
                  {curso.horas_totais}
                </div>
              </div>

              {/* Informação */}
              <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{curso.titulo}</h2>
                <div className="w-12 h-1 bg-blue-500 mb-6 rounded-full"></div>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {curso.descricao_curta}
                </p>
                <Link 
                  href={`/cursos/${curso.slug}`} 
                  className="inline-block bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-colors text-center w-max"
                >
                  Descobrir o Roteiro Completo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}