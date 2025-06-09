
export interface Funcionario {
  id: string
  nome: string
  cpf: string
  rg?: string
  telefone?: string
  email?: string
  endereco?: string
  cargo?: string
  departamento?: string
  salario?: number
  data_admissao?: string
  status: 'Ativo' | 'Inativo' | 'Afastado'
  empresa?: string
  created_at?: string
  updated_at?: string
}
