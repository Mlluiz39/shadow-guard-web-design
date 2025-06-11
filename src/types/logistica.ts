
export interface Veiculo {
  id: string
  placa: string
  modelo: string
  marca: string
  ano: number
  cor: string
  tipo: 'Patrulha' | 'Escolta' | 'Suporte' | 'Administrativa'
  status: 'Disponível' | 'Em Uso' | 'Manutenção' | 'Indisponível'
  combustivel: number // percentual
  quilometragem: number
  localizacao?: string
  motorista_atual?: string
  ultima_manutencao?: string
  proxima_manutencao?: string
  observacoes?: string
  created_at?: string
  updated_at?: string
}

export interface Equipamento {
  id: string
  nome: string
  tipo: 'Arma' | 'Colete' | 'Rádio' | 'Câmera' | 'Detector' | 'Outros'
  modelo: string
  numero_serie: string
  status: 'Disponível' | 'Em Uso' | 'Manutenção' | 'Danificado'
  responsavel_atual?: string
  localizacao: string
  data_aquisicao: string
  validade?: string
  ultima_manutencao?: string
  observacoes?: string
  created_at?: string
  updated_at?: string
}

export interface Rota {
  id: string
  nome: string
  tipo: 'Patrulhamento' | 'Escolta' | 'Ronda' | 'Emergência'
  pontos: RotaPonto[]
  tempo_estimado: number // em minutos
  distancia: number // em km
  ativa: boolean
  observacoes?: string
  created_at?: string
  updated_at?: string
}

export interface RotaPonto {
  id: string
  nome: string
  endereco: string
  coordenadas?: {
    lat: number
    lng: number
  }
  tempo_permanencia: number // em minutos
  ordem: number
  tipo: 'Checkpoint' | 'Parada' | 'Destino'
}

export interface AbastecimentoRecord {
  id: string
  veiculo_id: string
  data: string
  litros: number
  valor: number
  posto: string
  quilometragem: number
  responsavel: string
  observacoes?: string
}
