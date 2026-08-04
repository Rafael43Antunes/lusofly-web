import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-10">
      <h1 className="text-6xl font-extrabold mb-6">Lusofly Academy</h1>
      <p className="text-xl mb-10 text-slate-300">Bem-vindo à nova plataforma da escola de aviação.</p>
      
      {/* Botão para navegar para a nossa página da frota */}
      <Link 
        href="/frota" 
        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold transition-all"
      >
        Ver a Nossa Frota
      </Link>
    </main>
  );
}