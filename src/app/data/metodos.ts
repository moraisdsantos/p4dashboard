// Tipos para os dados dos métodos
export interface Metodo {
  id: string;
  nome: string;
  familia: string;
  tipologia: string;
  descricao: string;
  objetivo: string;
  quandoUsar: string;
  quandoNaoUsar: string;
  publicoAdequado: string;
  vantagens: string;
  riscos: string;
  nivelEsforco: string;
  equipeNecessaria: string;
  tamanhoGrupo: string;
  entregaveis: string;
  duracao: string;
  modalidade: string;
  url?: string;
  anexo?: string;
}

export interface PassoMetodo {
  id: string;
  metodoId: string;
  passo: string;
  nomePasso: string;
  descricao: string;
  resultado: string;
}

// Parse dos dados do CSV
export const parseMetodo = (row: any): Metodo => {
  return {
    id: row['ID do Método'] || '',
    nome: row['Nome do Método'] || '',
    familia: row['Família (Eixo)'] || '',
    tipologia: row['Tipologia OCDE'] || '',
    descricao: row['Descrição Curta (O que é?)'] || '',
    objetivo: row['Objetivo'] || '',
    quandoUsar: row['Quando usar'] || '',
    quandoNaoUsar: row['Quando Não Usar (Caso Negativo)'] || '',
    publicoAdequado: row['Público Adequado'] || '',
    vantagens: row['Vantagens'] || '',
    riscos: row['Riscos e Limitações (Gestão de Expectativas)'] || '',
    nivelEsforco: row['Nível de Esforço'] || '',
    equipeNecessaria: row['Equipe Necessária'] || '',
    tamanhoGrupo: row['Tamanho do Grupo'] || '',
    entregaveis: row['Entregáveis'] || '',
    duracao: row['Duração'] || '',
    modalidade: row['Online ou Presencial?'] || '',
    url: row['URL'] || '',
    anexo: row['Anexo'] || '',
  };
};

export const parsePasso = (row: any): PassoMetodo => {
  return {
    id: row['ID'] || '',
    metodoId: row['Método'] || '',
    passo: row['Passos'] || '',
    nomePasso: row['Nome do Passo'] || '',
    descricao: row['Descrição'] || '',
    resultado: row['Resultado'] || '',
  };
};
