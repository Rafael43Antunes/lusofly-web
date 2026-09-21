import Link from "next/link";
import {Curso} from "../types";

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

export default async function CursosHome(){
    const cursos = await getCursos();
    
    return(
        <section className="min-h-screen flex flex-col justify-center bg-slate-900 text-white pt-40 pb-24 px-6 relative overflow-hidden w-full">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none">
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4"> A Tua Carreira Começa Aqui</h2>
                    <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                        Da formação inicial à certificação de Linha Aérea. Escolhe o teu percurso e descobre cada fase da tua formação.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {cursos.map((curso) => (
                        <div 
                        key={curso.id} 
                        className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20"
                        >
                        {/* Imagem de Destaque com Overlay Escuro */}
                        <div className="h-48 w-full bg-slate-950 relative overflow-hidden shrink-0 tranform-gpu">
                            {curso.imagem_destaque ? (
                            <img 
                                src={curso.imagem_destaque} 
                                alt={curso.titulo} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                            />
                            ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-700">
                                <span className="text-sm">Sem imagem</span>
                            </div>
                            )}
                            {/* Gradiente para fundir a foto com o fundo do cartão */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent"></div>
                        </div>

                        {/* Corpo do Cartão */}
                        <div className="p-8 flex flex-col flex-grow relative">
                            {/* Etiqueta de Horas Flutuante (Inspirado no design original) */}
                            <div className="absolute -top-6 left-8 bg-blue-600 text-white font-black text-lg py-1 px-4 rounded-lg shadow-lg shadow-blue-900/50">
                            {curso.horas_totais}
                            </div>
                            
                            <h4 className="text-2xl font-bold text-white mb-3 mt-4">{curso.titulo}</h4>
                            <div className="w-12 h-1 bg-blue-500 mb-4 rounded-full"></div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                            {curso.descricao_curta}
                            </p>
                            
                            {/* Botão de Roteamento Dinâmico */}
                            <Link 
                            href={`/cursos/${curso.slug}`} 
                            className="mt-auto w-full text-center bg-slate-700/50 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors border border-slate-600 hover:border-blue-500"
                            >
                            Ver Programa Detalhado
                            </Link>
                        </div>
                    </div>
                    ))}
                </div>

                {/* Botão para a Página Central de Cursos (Adicionar depois da grelha) */}
                <div className="mt-16 text-center">
                    <Link 
                        href="/cursos" 
                        className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-bold py-3 px-8 rounded-full transition-all hover:scale-105"
                    >
                        Ver Catálogo de Cursos <span className="text-xl">&rarr;</span>
                    </Link>
                </div>
                

            </div>
        </section>
    );
}

