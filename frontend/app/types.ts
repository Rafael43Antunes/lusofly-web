export type ImagemGaleria = {
  id: number;
  imagem: string;
  legenda: string | null;
};

export type Aeronave = {
  id: number;
  nome: string;
  descricao_curta: string;
  imagem_principal: string;
  historia: string;
  motor: string;
  capacidade: number;
  velocidade_cruzeiro: string;
  autonomia: string;
  ativo: boolean;
  galeria: ImagemGaleria[];
};