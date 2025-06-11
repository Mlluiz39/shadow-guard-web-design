
import { useState, useEffect } from 'react'
import { Chamado, MetricaEquipe, KPISecurity } from '@/types/chamado'

// Mock data para demonstração
const mockChamados: Chamado[] = [
  {
    id: '1',
    titulo: 'Ronda noturna - Shopping Center',
    tipo: 'Patrulhamento',
    prioridade: 'Normal',
    status: 'Em Andamento',
    descricao: 'Patrulhamento de rotina no período noturno',
    local: 'Shopping Center Norte - Piso L1',
    data_abertura: '2024-01-15T20:00:00',
    data_atribuicao: '2024-01-15T20:05:00',
    agente_responsavel: 'Carlos Silva',
    equipe_responsavel: 'Equipe Alpha',
    tempo_resposta: 5,
    created_at: '2024-01-15T20:00:00',
    updated_at: '2024-01-15T20:05:00'
  },
  {
    id: '2',
    titulo: 'Emergência médica - Edifício Principal',
    tipo: 'Emergência',
    prioridade: 'Crítica',
    status: 'Resolvido',
    descricao: 'Atendimento a emergência médica no 3º andar',
    local: 'Edifício Principal - 3º Andar',
    data_abertura: '2024-01-15T14:30:00',
    data_atribuicao: '2024-01-15T14:32:00',
    data_resolucao: '2024-01-15T15:15:00',
    agente_responsavel: 'Ana Santos',
    equipe_responsavel: 'Equipe Bravo',
    tempo_resposta: 2,
    observacoes: 'SAMU acionado. Vítima encaminhada ao hospital.',
    created_at: '2024-01-15T14:30:00',
    updated_at: '2024-01-15T15:15:00'
  },
  {
    id: '3',
    titulo: 'Escolta executiva - Centro Empresarial',
    tipo: 'Escolta',
    prioridade: 'Alta',
    status: 'Aberto',
    descricao: 'Escolta armada para executivo da empresa XYZ',
    local: 'Centro Empresarial - Bloco A',
    data_abertura: '2024-01-16T08:00:00',
    agente_responsavel: 'João Oliveira',
    equipe_responsavel: 'Equipe Charlie',
    created_at: '2024-01-16T08:00:00',
    updated_at: '2024-01-16T08:00:00'
  }
]

const mockMetricas: MetricaEquipe[] = [
  {
    equipe: 'Equipe Alpha',
    chamados_ativos: 2,
    chamados_resolvidos: 15,
    tempo_medio_resposta: 4.5,
    eficiencia: 87.5
  },
  {
    equipe: 'Equipe Bravo',
    chamados_ativos: 1,
    chamados_resolvidos: 22,
    tempo_medio_resposta: 3.2,
    eficiencia: 92.3
  },
  {
    equipe: 'Equipe Charlie',
    chamados_ativos: 3,
    chamados_resolvidos: 18,
    tempo_medio_resposta: 5.1,
    eficiencia: 84.1
  }
]

export const useChamados = () => {
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [metricas, setMetricas] = useState<MetricaEquipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setChamados(mockChamados)
      setMetricas(mockMetricas)
      setLoading(false)
    }, 1000)
  }, [])

  const getKPIs = (): KPISecurity => {
    const total = chamados.length
    const abertos = chamados.filter(c => c.status === 'Aberto' || c.status === 'Em Andamento').length
    const criticos = chamados.filter(c => c.prioridade === 'Crítica').length
    const resolvidos = chamados.filter(c => c.status === 'Resolvido')
    
    const tempoMedio = resolvidos.length > 0 
      ? resolvidos.reduce((acc, c) => {
          if (c.data_resolucao && c.data_abertura) {
            const diff = new Date(c.data_resolucao).getTime() - new Date(c.data_abertura).getTime()
            return acc + (diff / (1000 * 60)) // em minutos
          }
          return acc
        }, 0) / resolvidos.length
      : 0

    const taxaResolucao = total > 0 ? (resolvidos.length / total) * 100 : 0

    return {
      total_chamados: total,
      chamados_abertos: abertos,
      chamados_criticos: criticos,
      tempo_medio_resolucao: Math.round(tempoMedio),
      taxa_resolucao: Math.round(taxaResolucao * 100) / 100
    }
  }

  const createChamado = (chamado: Omit<Chamado, 'id' | 'created_at' | 'updated_at'>) => {
    const newChamado: Chamado = {
      ...chamado,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setChamados(prev => [newChamado, ...prev])
    return newChamado
  }

  const updateChamado = (id: string, updates: Partial<Chamado>) => {
    setChamados(prev => 
      prev.map(chamado => 
        chamado.id === id 
          ? { ...chamado, ...updates, updated_at: new Date().toISOString() }
          : chamado
      )
    )
  }

  return {
    chamados,
    metricas,
    loading,
    getKPIs,
    createChamado,
    updateChamado
  }
}
