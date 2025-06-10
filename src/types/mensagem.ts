
export interface Setor {
  id: string
  nome: string
  descricao?: string
  created_at: string
  updated_at: string
}

export interface MensagemSetor {
  id: string
  remetente_id: string
  setor_origem_id: string
  setor_destino_id: string
  assunto?: string
  mensagem: string
  lida: boolean
  created_at: string
  updated_at: string
  // Dados relacionados via join
  setor_origem?: Setor
  setor_destino?: Setor
  remetente_nome?: string
}
