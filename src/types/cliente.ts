
export interface Cliente {
  id: string;
  nome: string;
  razaoSocial: string;
  documento: string;
  telefone: string;
  contrato: string;
  pastaN: string;
  dataImportacao: string;
  status: 'Ativo' | 'Inativo' | 'Suspenso';
}
