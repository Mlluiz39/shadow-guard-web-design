
import { useState, useEffect } from 'react'
import { Ocorrencia } from '@/types/ocorrencia'

// Mock data para demonstração
const mockOcorrencias: Ocorrencia[] = [
  {
    id: '1',
    titulo: 'Falha no sistema de câmeras - Portaria Principal',
    tipo: 'Segurança',
    descricao: 'Sistema de monitoramento da portaria principal apresentou falha técnica. Câmeras ficaram offline por aproximadamente 30 minutos.',
    data_hora: '2024-01-15T14:30:00',
    local: 'Portaria Principal - Edifício Central',
    responsavel: 'Carlos Silva',
    gravidade: 'Alta',
    status: 'Resolvida',
    evidencias: ['camera_report.pdf', 'maintenance_log.jpg'],
    resolucao: 'Reinicialização do sistema e substituição do cabo de rede danificado.',
    resolvido_por: 'Equipe Técnica',
    data_resolucao: '2024-01-15T15:00:00',
    created_at: '2024-01-15T14:30:00',
    updated_at: '2024-01-15T15:00:00'
  },
  {
    id: '2',
    titulo: 'Tentativa de acesso não autorizado',
    tipo: 'Segurança',
    descricao: 'Indivíduo não identificado tentou acessar área restrita do 5º andar. Abordado pela equipe de segurança.',
    data_hora: '2024-01-16T09:15:00',
    local: '5º Andar - Área Restrita',
    responsavel: 'Ana Santos',
    gravidade: 'Média',
    status: 'Em Andamento',
    evidencias: ['incident_photo.jpg'],
    created_at: '2024-01-16T09:15:00',
    updated_at: '2024-01-16T09:15:00'
  },
  {
    id: '3',
    titulo: 'Manutenção preventiva - Detectores de fumaça',
    tipo: 'Manutenção',
    descricao: 'Realização de teste mensal nos detectores de fumaça de todos os andares.',
    data_hora: '2024-01-17T08:00:00',
    local: 'Todo o edifício',
    responsavel: 'João Oliveira',
    gravidade: 'Baixa',
    status: 'Aberta',
    created_at: '2024-01-17T08:00:00',
    updated_at: '2024-01-17T08:00:00'
  }
]

export const useOcorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setOcorrencias(mockOcorrencias)
      setLoading(false)
    }, 1000)
  }, [])

  const createOcorrencia = (ocorrencia: Omit<Ocorrencia, 'id' | 'created_at' | 'updated_at'>) => {
    const newOcorrencia: Ocorrencia = {
      ...ocorrencia,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setOcorrencias(prev => [newOcorrencia, ...prev])
    return newOcorrencia
  }

  const updateOcorrencia = (id: string, updates: Partial<Ocorrencia>) => {
    setOcorrencias(prev => 
      prev.map(ocorrencia => 
        ocorrencia.id === id 
          ? { ...ocorrencia, ...updates, updated_at: new Date().toISOString() }
          : ocorrencia
      )
    )
  }

  const deleteOcorrencia = (id: string) => {
    setOcorrencias(prev => prev.filter(ocorrencia => ocorrencia.id !== id))
  }

  return {
    ocorrencias,
    loading,
    createOcorrencia,
    updateOcorrencia,
    deleteOcorrencia
  }
}
