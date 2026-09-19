import Link from "next/link";

export default function CursosHome(){
    return(
        <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none">
            </div>
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-blue-400 font-bold tracking-widest text-sm uppercase mb-4"> A Tua Carreira Começa Aqui</h2>
                <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                    Não te pedimos apenas para preencher um formulário. Explora as nossas linhas temporais interativas e descobre o passo-a-passo exato, as horas de voo e as certificações que vais conquistar em cada fase.
                </p>
                <Link 
                    href="/cursos" 
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                >
                    Explorar Programas de Voo <span className="text-xl">&rarr;</span>
                </Link>

            </div>
        </section>
    )
}