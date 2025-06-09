
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
  // Campos adicionais do Supabase
  created_at?: string;
  updated_at?: string;
  razao_social?: string;
  pasta_n?: string;
  data_importacao?: string;
}
