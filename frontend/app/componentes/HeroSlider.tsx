"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const heroImages = [
  "/lusofly-1.jpg",
  "/lusofly-2.jpg"
];

export default function HeroSlider() {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const temporizador = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(temporizador);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-900">
      
      {/* RENDERIZAR AS IMAGENS COM TRANSIÇÃO SUAVE */}
      {heroImages.map((img, index) => (
        <img 
          key={img}
          src={img} 
          alt={`Lusofly destaque ${index + 1}`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === imgIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* OVERLAY ESCURO */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* CONTEÚDO DE TEXTO */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex flex-col items-center justify-center text-center">
        <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/40 mb-6 bg-black/20 backdrop-blur-sm">
          Lisboa • Portugal
        </span>
        
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-6">
          Elite Aviation<br />Training
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed mb-10 opacity-90">
          Formamos os comandantes do amanhã com tecnologia de ponta, segurança rigorosa e uma frota moderna.
        </p>
        
        <div id="become-pilot" className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/inscricao" 
            className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-extrabold shadow-2xl shadow-blue-600/50 transition-all transform hover:-translate-y-1 hover:scale-105 text-lg group flex items-center gap-2"
          >
            Become Pilot <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}