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

  // Injeta o localhost:8000 antes do /media/
  const historiaCorrigida = aviaoAtivo?.historia.replace(
    /src="\/media\//g,
    'src="http://127.0.0.1:8000/media/'
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
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}