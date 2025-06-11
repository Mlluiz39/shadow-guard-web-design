
export interface Chamado {
  id: string
  titulo: string
  tipo: 'Emergência' | 'Patrulhamento' | 'Escolta' | 'Investigação' | 'Manutenção'
  prioridade: 'Baixa' | 'Normal' | 'Alta' | 'Crítica'
  status: 'Aberto' | 'Em Andamento' | 'Aguardando' | 'Resolvido' | 'Cancelado'
  descricao: string
  local: string
  data_abertura: string
  data_atribuicao?: string
  data_resolucao?: string
  agente_responsavel?: string
  equipe_responsavel?: string
  tempo_resposta?: number // em minutos
  observacoes?: string
  created_at?: string
  updated_at?: string
}

export interface MetricaEquipe {
  equipe: string
  chamados_ativos: number
  chamados_resolvidos: number
  tempo_medio_resposta: number
  eficiencia: number
}

export interface KPISecurity {
  total_chamados: number
  chamados_abertos: number
  chamados_criticos: number
  tempo_medio_resolucao: number
  taxa_resolucao: number
}
