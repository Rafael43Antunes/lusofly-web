import Link from "next/link";
import { Aeronave } from "../types";
import FrotaInteractive from "./FrotaInteractive";

// Função para ir buscar os dados à API do teu Django
async function getFrota(): Promise<Aeronave[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // O fetch vai ao teu backend. 
  // O cache: 'no-store' garante que se alterares algo no Django Admin, o Next.js atualiza instantaneamente
  const res = await fetch(`${apiUrl}/api/frota/`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Falha ao carregar a frota a partir do Django');
  }
  
  return res.json();
}

export default async function FrotaPage() {
  const frota = await getFrota();

  return (
    <main className="min-h-screen bg-slate-50 p-10 pt-32 pb-16 px-4">
      <h1 className="text-5xl font-extrabold text-center text-slate-800 mb-12 tracking-tight">
        A Nossa Frota
      </h1>
      
      {/* Chamamos o nosso novo Client Component e passamos-lhe a lista */}
      <FrotaInteractive frota={frota} />
    </main>
  );
}