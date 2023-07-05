export const driversStatusRF = {
  EM_ANALISE: 'EM ANÁLISE',
  APROVADO: 'APROVADO',
  REPROVADO: 'REPROVADO',
  BLOQUEADO: 'BLOQUEADO',
  DESATIVADO: 'DESATIVADO',
  NOVO_CADASTRO: 'NOVO CADASTRO',
};

export const driversStatusGR = {
  NAO_CONSULTADO: 'NÃO CONSULTADO',
  PENDENTE: 'PENDENTE',
  ACORDO: 'ACORDO',
  REQUER_ATENÇAO: 'REQUER ATENÇÃO'
};

export type driversStatusRFKeys = keyof typeof driversStatusRF;
export type driversStatusGRKeys = keyof typeof driversStatusGR;
