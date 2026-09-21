import Link from "next/link";
import { notFound } from "next/navigation";
import { Curso } from "../../../types";
import AnimatedTimeline from "../../componentes/AnimatedTimeline";

async function getCursoBySlug(slug: string): Promise<Curso | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${apiUrl}/api/cursos/`, { cache: 'no-store' });
    if (!res.ok) return null;
    const cursos: Curso[] = await res.json();
    return cursos.find(c => c.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function CursoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  //const curso = await getCursoBySlug(params.slug);
  const resolvedParams = await params;
  const curso = await getCursoBySlug(resolvedParams.slug);

  if (!curso) {
    notFound();
  }

  // DADOS VISUAIS (Podem passar para o Django no futuro)
  const estatisticas = [
    { numero: "96%", label: "Empregabilidade após 6 meses" },
    { numero: "12+", label: "Companhias Aéreas Parceiras" },
    { numero: "250+", label: "Pilotos Formados na Lusofly" }
  ];

  const testemunhos = [
    {
      nome: "João Pedro",
      cargo: "First Officer - Avião Comercial",
      texto: "O nível de exigência na Lusofly é altíssimo, mas é exatamente isso que nos prepara para o simulador das companhias aéreas. Quando cheguei à minha primeira entrevista, sentia-me anos à frente."
    },
    {
      nome: "Sofia Costa",
      cargo: "Piloto de Aviação Executiva",
      texto: "A formação técnica é brilhante, mas o que destaco é a mentalidade de tomada de decisão (Airmanship) que nos incutem desde o primeiro voo no monomotor. Recomendo a 100%."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-300 font-sans">
      
      {/* 1. HERO SECTION CINEMATOGRÁFICA */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {curso.imagem_destaque && (
          <img 
            src={curso.imagem_destaque} 
            alt={curso.titulo} 
            className="absolute inset-0 w-full h-full object-cover opacity-50 transform scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/60 to-slate-900"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <div className="inline-block bg-blue-600 text-white font-bold tracking-widest text-sm py-2 px-6 rounded-full mb-6 uppercase">
            Programa Intensivo • {curso.horas_totais}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">{curso.titulo}</h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">{curso.descricao_curta}</p>
        </div>
      </section>

      {/* 2. ESTATÍSTICAS DE IMPACTO (O "Social Proof") */}
      <section className="relative -mt-16 z-20 max-w-5xl mx-auto px-6">
        <div className="bg-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-700">
          {estatisticas.map((stat, i) => (
            <div key={i} className="flex-1 text-center w-full pt-6 md:pt-0 first:pt-0">
              <h3 className="text-5xl font-black text-blue-500 mb-2">{stat.numero}</h3>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TIMELINE INTERATIVA (O que vai acontecer) */}
      <section className="py-24 px-6 relative max-w-5xl mx-auto overflow-hidden">
        <div className="text-center mb-20 relative z-20">
          <h2 className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-3">O Teu Percurso</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">A Linha de Voo da Tua Formação</h3>
        </div>

        {/* Injetar o componente cliente com as animações */}
        <AnimatedTimeline etapas={curso.etapas} />
      </section>

      {/* 4. CARREIRAS (Saídas Profissionais) */}
      <section className="bg-slate-950 py-24 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-3">Futuro Profissional</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Onde Vais Voar Depois do Curso?</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">A tua licença abre portas para diferentes estilos de vida na aviação. Escolhe o caminho que mais te apaixona.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Saída 1 - A Mais Comum */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6 text-2xl">✈️</div>
              <h4 className="text-xl font-bold text-white mb-3">Linha Aérea (Comercial)</h4>
              <p className="text-slate-400 text-sm leading-relaxed">A rota mais tradicional. Começas como Primeiro Oficial a transportar passageiros na Europa ou no Mundo, com uma rotina estruturada e progressão de carreira até Comandante.</p>
            </div>
            
            {/* Saída 2 - Executiva */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6 text-2xl">🍸</div>
              <h4 className="text-xl font-bold text-white mb-3">Aviação Executiva</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Para quem procura luxo e flexibilidade. Vais pilotar jatos privados para clientes VIP. Os horários são dinâmicos e os destinos variam de capitais europeias a ilhas exóticas.</p>
            </div>

            {/* Saída 3 - Carga/Trabalho Aéreo */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6 text-2xl">📦</div>
              <h4 className="text-xl font-bold text-white mb-3">Carga & Operações Especiais</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Focado na pura pilotagem. Desde aviões cargueiros que voam durante a noite, a voos de emergência médica ou combate a incêndios. Pura técnica e adrenalina.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTEMUNHOS (O lado humano) */}
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white">Vozes do Cockpit</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testemunhos.map((test, i) => (
              <div key={i} className="bg-slate-800/80 backdrop-blur-sm p-10 rounded-2xl border border-slate-700 relative">
                <span className="absolute top-6 left-6 text-6xl text-slate-700 opacity-50 font-serif">"</span>
                <p className="text-lg text-slate-300 italic mb-8 relative z-10 pt-4 leading-relaxed">
                  {test.texto}
                </p>
                <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white">
                    {test.nome.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{test.nome}</h5>
                    <p className="text-sm text-blue-400">{test.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <section className="py-24 px-6 text-center bg-blue-600">
        <h2 className="text-4xl font-bold text-white mb-6">Pronto para assumir os comandos?</h2>
        <p className="text-xl text-blue-100 max-w-xl mx-auto mb-10">
          Dá o primeiro passo em direção à tua carreira na aviação. A nossa equipa de admissões está pronta para esclarecer todas as tuas dúvidas.
        </p>
        <Link 
          href="/become-pilot" 
          className="inline-block bg-white text-blue-700 hover:bg-slate-100 font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-xl text-lg"
        >
          Iniciar Candidatura Hoje
        </Link>
      </section>
    </main>
  );
}