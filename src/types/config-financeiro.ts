
export interface ConfigFinanceiro {
  id: string
  nome: string
  tipo: string
  codigo?: string
  descricao?: string
  valor?: number
  ativo: boolean
  created_at?: string
  updated_at?: string
}
