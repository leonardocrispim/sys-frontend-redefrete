export const DbError = {
  P2002:
    'Tentativa de cadastro duplicado. Dados como CPF ou placa de veículos são únicos no sistema.',
  P2003: 'Um ou mais dados inseridos são inválidos',
};

export type DbErrorKeys = keyof typeof DbError;
