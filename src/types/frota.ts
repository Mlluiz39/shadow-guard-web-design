
export interface Frota {
  id: string
  placa: string
  modelo: string
  marca: string
  ano?: number
  cor?: string
  combustivel?: string
  quilometragem: number
  status: 'Disponível' | 'Em uso' | 'Manutenção' | 'Indisponível'
  motorista_responsavel?: string
  observacoes?: string
  created_at?: string
  updated_at?: string
}
