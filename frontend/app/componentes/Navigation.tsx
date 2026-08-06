"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const AirplaneIcon = ({ className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L3 8l5.5 5.5-3 3-3.2-.8c-.4-.1-.8.1-1 .5L1 17l4.5 1.5 1.5 4.5.8-1c.4-.2.6-.6.5-1L7.5 17l3-3 5.5 5.5.8-.8c.4-.2.7-.6.6-1.1z" />
  </svg>
);

export default function Navigation() {
  const pathname = usePathname();

  return (
    // Top-8 empurra o header para baixo para criar o efeito flutuante real
    <header className="fixed top-8 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      
      {/* O overflow-hidden aqui é o segredo para o avião não "fugir" da pílula */}
      <nav className="relative flex items-center justify-between bg-white rounded-full px-8 py-4 shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Logótipo */}
        <Link href="/" className="text-2xl font-black text-slate-950 tracking-tighter flex items-center gap-1 z-20">
          <img src="/logo.png" alt="Lusofly Academy Logo" className="h-6 w-auto object-contain" />
        </Link>
        
        {/* Menu Centrado */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm font-semibold text-slate-700 z-20 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
          <Link href="/" className={`${pathname === '/' ? 'text-blue-600' : 'hover:text-blue-600'} transition-colors`}>Home</Link>
          <Link href="/frota" className={`${pathname === '/frota' ? 'text-blue-600' : 'hover:text-blue-600'} transition-colors`}>Frota</Link>
          <Link href="/cursos" className="hover:text-blue-600 transition-colors">Cursos</Link>
        </div>

        {/* Lado Direito */}
        <div className="flex items-center gap-6 z-20">
          
          {/* Seletor de Idioma com o teu avião estático */}
          <div className="flex items-center gap-2 text-slate-600 hover:text-blue-600 cursor-pointer transition-colors bg-slate-50 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-100 shadow-sm">
            <span>PT</span>
            <AirplaneIcon className="w-4 h-4 transform rotate-45" />
          </div>

          <Link href="/#become-pilot" className="px-6 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-full hover:bg-slate-800 transition-all shadow-md shadow-slate-950/20 hover:-translate-y-0.5">
            Become Pilot
          </Link>
        </div>

        {/* ANIMAÇÃO DO AVIÃO */}
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ left: "-15%", opacity: 0 }}
              animate={{ 
                left: ["-10%", "100%"], 
                opacity: [0, 1, 1, 0], 
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut",
              }}
              className="absolute text-blue-600 drop-shadow-xl" 
            >
              <AirplaneIcon className="w-20 h-20 transform rotate-45" />
            </motion.div>
          </AnimatePresence>
        </div>

      </nav>
    </header>
  );
}