
export interface Empresa {
  id: string
  nome: string
  cnpj: string
  proprietario: string
  email: string
}

export const empresasSchema = {
  nome: { min: 3, message: "Nome deve ter pelo menos 3 caracteres" },
  cnpj: { min: 14, message: "CNPJ inválido" },
  proprietario: { min: 1, message: "Proprietário é obrigatório" },
  email: { format: "email", message: "Email inválido" }
}
