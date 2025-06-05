
export interface Perfil {
  id: string
  nome: string
  descricao: string
  permissoes: string[]
}

export const PERFIS_SISTEMA: Perfil[] = [
  {
    id: 'master',
    nome: 'Master',
    descricao: 'Acesso total ao sistema',
    permissoes: ['configuracoes', 'financeiro', 'operacoes', 'logistica', 'dashboard']
  },
  {
    id: 'financeiro',
    nome: 'Financeiro',
    descricao: 'Acesso apenas ao módulo financeiro',
    permissoes: ['financeiro', 'dashboard']
  },
  {
    id: 'operacional',
    nome: 'Operacional',
    descricao: 'Acesso apenas ao módulo operacional',
    permissoes: ['operacoes', 'dashboard']
  },
  {
    id: 'logistica',
    nome: 'Logística',
    descricao: 'Acesso apenas ao módulo logística',
    permissoes: ['logistica', 'dashboard']
  },
  {
    id: 'supervisor',
    nome: 'Supervisor',
    descricao: 'Acesso a operações e logística',
    permissoes: ['operacoes', 'logistica', 'dashboard']
  }
]

export const getPerfilById = (id: string): Perfil | undefined => {
  return PERFIS_SISTEMA.find(perfil => perfil.id === id)
}
