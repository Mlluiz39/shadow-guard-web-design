
export interface Ocorrencia {
  id: string
  titulo: string
  tipo: 'Segurança' | 'Emergência' | 'Manutenção' | 'Administrativa'
  descricao: string
  data_hora: string
  local: string
  responsavel: string
  gravidade: 'Baixa' | 'Média' | 'Alta' | 'Crítica'
  status: 'Aberta' | 'Em Andamento' | 'Resolvida' | 'Cancelada'
  evidencias?: string[]
  resolucao?: string
  resolvido_por?: string
  data_resolucao?: string
  created_at?: string
  updated_at?: string
}
