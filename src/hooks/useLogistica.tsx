
import { useState, useEffect } from 'react'
import { Veiculo, Equipamento, Rota, AbastecimentoRecord } from '@/types/logistica'

// Mock data para demonstração
const mockVeiculos: Veiculo[] = [
  {
    id: '1',
    placa: 'ABC-1234',
    modelo: 'Hilux',
    marca: 'Toyota',
    ano: 2022,
    cor: 'Branca',
    tipo: 'Patrulha',
    status: 'Disponível',
    combustivel: 75,
    quilometragem: 15000,
    localizacao: 'Base Central',
    ultima_manutencao: '2024-01-01',
    proxima_manutencao: '2024-04-01',
    created_at: '2024-01-01T00:00:00',
    updated_at: '2024-01-15T10:30:00'
  },
  {
    id: '2',
    placa: 'DEF-5678',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2021,
    cor: 'Preta',
    tipo: 'Escolta',
    status: 'Em Uso',
    combustivel: 45,
    quilometragem: 22000,
    localizacao: 'Shopping Center',
    motorista_atual: 'Carlos Silva',
    ultima_manutencao: '2023-12-15',
    proxima_manutencao: '2024-03-15',
    created_at: '2023-12-01T00:00:00',
    updated_at: '2024-01-15T14:20:00'
  }
]

const mockEquipamentos: Equipamento[] = [
  {
    id: '1',
    nome: 'Pistola Glock 19',
    tipo: 'Arma',
    modelo: 'Glock 19 Gen 5',
    numero_serie: 'GL19001',
    status: 'Em Uso',
    responsavel_atual: 'Carlos Silva',
    localizacao: 'Base Central',
    data_aquisicao: '2023-06-01',
    ultima_manutencao: '2024-01-01',
    created_at: '2023-06-01T00:00:00',
    updated_at: '2024-01-15T08:00:00'
  },
  {
    id: '2',
    nome: 'Colete Balístico NIJ IIIA',
    tipo: 'Colete',
    modelo: 'Proteção NIJ IIIA',
    numero_serie: 'CBL001',
    status: 'Disponível',
    localizacao: 'Almoxarifado',
    data_aquisicao: '2023-08-15',
    validade: '2028-08-15',
    created_at: '2023-08-15T00:00:00',
    updated_at: '2024-01-10T15:30:00'
  }
]

const mockRotas: Rota[] = [
  {
    id: '1',
    nome: 'Ronda Shopping Norte',
    tipo: 'Patrulhamento',
    pontos: [
      {
        id: '1',
        nome: 'Portaria Principal',
        endereco: 'Entrada Principal - Shopping Norte',
        tempo_permanencia: 5,
        ordem: 1,
        tipo: 'Checkpoint'
      },
      {
        id: '2',
        nome: 'Estacionamento',
        endereco: 'Área de Estacionamento - Piso L1',
        tempo_permanencia: 10,
        ordem: 2,
        tipo: 'Parada'
      },
      {
        id: '3',
        nome: 'Praça de Alimentação',
        endereco: 'Praça de Alimentação - Piso L2',
        tempo_permanencia: 5,
        ordem: 3,
        tipo: 'Checkpoint'
      }
    ],
    tempo_estimado: 30,
    distancia: 2.5,
    ativa: true,
    created_at: '2024-01-01T00:00:00',
    updated_at: '2024-01-15T09:00:00'
  }
]

export const useLogistica = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([])
  const [rotas, setRotas] = useState<Rota[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setVeiculos(mockVeiculos)
      setEquipamentos(mockEquipamentos)
      setRotas(mockRotas)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusCounts = () => {
    const veiculosDisponiveis = veiculos.filter(v => v.status === 'Disponível').length
    const veiculosEmUso = veiculos.filter(v => v.status === 'Em Uso').length
    const veiculosManutencao = veiculos.filter(v => v.status === 'Manutenção').length
    
    const equipamentosDisponiveis = equipamentos.filter(e => e.status === 'Disponível').length
    const equipamentosEmUso = equipamentos.filter(e => e.status === 'Em Uso').length
    const equipamentosManutencao = equipamentos.filter(e => e.status === 'Manutenção').length

    return {
      veiculos: {
        total: veiculos.length,
        disponiveis: veiculosDisponiveis,
        emUso: veiculosEmUso,
        manutencao: veiculosManutencao
      },
      equipamentos: {
        total: equipamentos.length,
        disponiveis: equipamentosDisponiveis,
        emUso: equipamentosEmUso,
        manutencao: equipamentosManutencao
      }
    }
  }

  const updateVeiculoStatus = (id: string, status: Veiculo['status']) => {
    setVeiculos(prev => 
      prev.map(veiculo => 
        veiculo.id === id 
          ? { ...veiculo, status, updated_at: new Date().toISOString() }
          : veiculo
      )
    )
  }

  const updateEquipamentoStatus = (id: string, status: Equipamento['status']) => {
    setEquipamentos(prev => 
      prev.map(equipamento => 
        equipamento.id === id 
          ? { ...equipamento, status, updated_at: new Date().toISOString() }
          : equipamento
      )
    )
  }

  return {
    veiculos,
    equipamentos,
    rotas,
    loading,
    getStatusCounts,
    updateVeiculoStatus,
    updateEquipamentoStatus
  }
}
