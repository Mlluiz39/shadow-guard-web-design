
export interface Usuario {
  id: string
  nome: string
  email: string
  empresa: string
  cargo: string
  departamento: string
  perfil: string
  ativo: boolean
}

export const usuariosSchema = {
  nome: { min: 3, message: "Nome deve ter pelo menos 3 caracteres" },
  email: { format: "email", message: "Email inválido" },
  empresa: { min: 1, message: "Empresa é obrigatória" },
  cargo: { min: 1, message: "Cargo é obrigatório" },
  departamento: { min: 1, message: "Departamento é obrigatório" },
  perfil: { min: 1, message: "Perfil é obrigatório" }
}
