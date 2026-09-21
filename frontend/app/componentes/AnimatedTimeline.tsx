'use client';

import { motion } from 'framer-motion';
import { EtapaCurso } from '../types';

export default function AnimatedTimeline({ etapas }: { etapas: EtapaCurso[] }) {
  if (!etapas || etapas.length === 0) {
    return <p className="text-center text-slate-500">Etapas em atualização.</p>;
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* A Linha Central que cresce à medida que fazes scroll */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: '100%' }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute left-6 md:left-1/2 top-0 w-1 bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden origin-top"
      >
        <div className="w-full h-full bg-blue-600/50"></div>
      </motion.div>

      {etapas.map((etapa, index) => {
        // Determinar se aparece pela esquerda ou direita
        const isEven = index % 2 === 0;
        const xOffset = isEven ? -50 : 50; 
        
        return (
          <div key={etapa.id} className={`relative flex flex-col md:flex-row items-center md:justify-between mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            
            {/* O Círculo Central com o Número */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
              className="w-14 h-14 absolute left-6 md:left-1/2 -translate-x-1/2 rounded-full bg-slate-900 border-4 border-blue-600 flex items-center justify-center z-10 shadow-lg shadow-blue-900/50"
            >
              <span className="text-white font-bold text-xl">{etapa.numero_etapa}</span>
            </motion.div>

            {/* O Cartão com a Informação que desliza de lado */}
            <motion.div 
              initial={{ opacity: 0, x: xOffset }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className={`w-[calc(100%-5rem)] ml-auto md:w-[calc(50%-4rem)] md:ml-0 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-colors shadow-xl ${isEven ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}
            >
              <h4 className="text-2xl font-bold text-white mb-3">{etapa.titulo_etapa}</h4>
              {etapa.horas_associadas && (
                <span className="inline-block bg-blue-600/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {etapa.horas_associadas}
                </span>
              )}
              <p className="text-slate-400 text-base leading-relaxed">{etapa.descricao}</p>
            </motion.div>

          </div>
        );
      })}
    </div>
  );
}