"use client";

import { useState, useEffect } from "react";
import { Aeronave } from "../types";

export default function FrotaInteractive({ frota }: { frota: Aeronave[] }) {
  // Estados para controlar o modal e o carrossel
  const [aviaoAtivo, setAviaoAtivo] = useState<Aeronave | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const abrirModal = (aviao: Aeronave) => {
    setAviaoAtivo(aviao);
    setImgIndex(0); // Volta à primeira foto sempre que abre um avião
  };

  const fecharModal = () => {
    setAviaoAtivo(null);
  };

  // Prepara o array de imagens (Principal + Galeria)
  const imagens = aviaoAtivo
    ? [aviaoAtivo.imagem_principal, ...aviaoAtivo.galeria.map((g) => g.imagem)]
    : [];

  const proximaImagem = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que o clique feche o modal
    setImgIndex((prev) => (prev + 1) % imagens.length);
  };

  const imagemAnterior = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  useEffect(() => {
    // Se não houver avião aberto ou se só houver 1 imagem, não faz nada
    if (!aviaoAtivo || imagens.length <= 1) return;

    // Cria o temporizador (3000ms = 3 segundos)
    const temporizador = setInterval(() => {
      // Usamos a função de próxima imagem, mas sem o evento de clique do rato
      setImgIndex((prev) => (prev + 1) % imagens.length);
    }, 5000);

    // Função de limpeza: Quando o modal fecha, apagamos o temporizador para não ficar a consumir memória no browser!
    return () => clearInterval(temporizador);
  }, [aviaoAtivo, imagens.length]); // Este efeito "acorda" sempre que o avião ativo muda

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Injeta o localhost:8000 antes do /media/
  const historiaCorrigida = aviaoAtivo?.historia.replace(
    /src="\/media\//g,
    `src="${apiUrl}/media/`
  );

  return (
    <>
      {/* 1. GRELHA DE CARTÕES */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {frota.map((aviao) => (
          <div
            key={aviao.id}
            onClick={() => abrirModal(aviao)}
            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 block cursor-pointer"
          >
            <div className="h-64 w-full relative bg-slate-200">
              <img src={aviao.imagem_principal} alt={aviao.nome} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900">{aviao.nome}</h2>
              <p className="text-slate-600 mt-3 leading-relaxed">{aviao.descricao_curta}</p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-semibold text-slate-500">
                <span className="bg-slate-100 px-3 py-1 rounded-full">{aviao.velocidade_cruzeiro}</span>
                <span>{aviao.capacidade} Lugares</span>
              </div>
              {/* Botão de Link Externo*/}
              <div className="mt-auto pt-4 border-t border-slate-100">
                {aviao.link_externo ? (
                  <a 
                    href={aviao.link_externo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} 
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-blue-600 text-sm font-bold py-3 px-4 rounded-xl transition-colors border border-slate-100 hover:border-blue-100"
                  >
                    Site Oficial da Aeronave
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ) : (
                  <div className="w-full text-center text-sm text-slate-400 py-3 font-semibold">
                    Clique no cartão para ver detalhes
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. MODAL */}
      {aviaoAtivo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-10"
          onClick={fecharModal} // Se clicar no fundo desfocado, fecha!
        >
          {/* Card interno  */}
          <div
            className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Botão de Fechar */}
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-all"
            >
              &times;
            </button>

            {/* Carrossel de Imagens */}
            <div className="w-full h-80 md:h-[400px] relative bg-slate-50 group border-b border-slate-100">
              <img 
                src={imagens[imgIndex]} 
                alt="Avião" 
                className="w-full h-full object-contain transition-opacity duration-700 ease-in-out" 
              />
              
              {/* Controlos do Carrossel (Só aparecem se houver mais de 1 foto) */}
              {imagens.length > 1 && (
                <>
                  <button onClick={imagemAnterior} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    &larr;
                  </button>
                  <button onClick={proximaImagem} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-10 h-10 rounded-full font-bold shadow opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    &rarr;
                  </button>
                  {/* Indicador de fotos (1/3) */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full z-20">
                    {imgIndex + 1} / {imagens.length}
                  </div>
                </>
              )}
            </div>

            {/* Corpo do Detalhe */}
            <div className="p-8 md:p-10">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-8">{aviaoAtivo.nome}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                
                {/* Texto com a correção das imagens do Summernote aplicada */}
                <div 
                  className="md:col-span-2 text-lg text-slate-700 leading-relaxed space-y-4 prose prose-img:rounded-xl prose-img:shadow-md"
                  dangerouslySetInnerHTML={{ __html: historiaCorrigida || "" }} 
                />

                <div className="bg-slate-50 p-6 rounded-2xl h-fit border border-slate-100">
                  <h3 className="font-bold text-xl mb-4 text-slate-800">Especificações</h3>
                  <ul className="space-y-3 text-slate-600">
                    <li><strong className="text-slate-900">Motor:</strong> {aviaoAtivo.motor}</li>
                    <li><strong className="text-slate-900">Lugares:</strong> {aviaoAtivo.capacidade}</li>
                    <li><strong className="text-slate-900">Velocidade:</strong> {aviaoAtivo.velocidade_cruzeiro}</li>
                    <li><strong className="text-slate-900">Autonomia:</strong> {aviaoAtivo.autonomia}</li>
                  </ul>

                  {aviaoAtivo.link_externo && (
                    <div className="mt-auto pt-6 border-t border-slate-200">
                      <a 
                        href={(aviaoAtivo as any).link_externo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        Ver no Site Oficial
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}