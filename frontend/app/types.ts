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
  link_externo?: string;
};

export type EtapaCurso{
  d: number;
  numero_etapa: number;
  titulo_etapa: string;
  descricao: string;
  horas_associadas?: string;
}

export type Curso{
  id: number;
  titulo: string;
  slug: string;
  imagem_destaque?: string;
  horas_totais: string;
  descricao_curta: string;
  descricao_completa?: string;
  saidas_profissionais?: string;
  ordem: number;
  etapas: EtapaCurso[];
  testemunhos?: Testemunho[];
  carreiras?: Carreira[];
}

export interface Testemunho {
  id: number;
  nome: string;
  cargo: string;
  texto: string;
  ativo: boolean;
}

export interface Carreira {
  id: number;
  icone: string;
  titulo: string;
  descricao: string;
}