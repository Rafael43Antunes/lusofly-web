'use client';

import { motion } from 'framer-motion';
import { Carreira } from '../types';

export default function AnimatedCareers({ carreiras }: { carreiras: Carreira[] }) {
  if (!carreiras || carreiras.length === 0) {
    return <p className="text-center text-slate-500 py-12">Carreiras em atualização.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {carreiras.map((carreira, index) => (
        <motion.div 
          key={carreira.id}
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-xl flex items-center justify-center mb-6 text-2xl">
            {carreira.icone}
          </div>
          <h4 className="text-xl font-bold text-white mb-3">{carreira.titulo}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{carreira.descricao}</p>
        </motion.div>
      ))}
    </div>
  );
}