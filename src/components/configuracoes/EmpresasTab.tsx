
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Empresa } from "@/types/empresa"
import { NovaEmpresaDialog } from "./empresas/NovaEmpresaDialog"
import { EmpresasSearch } from "./empresas/EmpresasSearch"
import { EmpresasTable } from "./empresas/EmpresasTable"

export const EmpresasTab = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([
    { 
      id: "1", 
      nome: "Proteção Segurança Ltda", 
      cnpj: "12.345.678/0001-90", 
      proprietario: "João Silva", 
      email: "joao@protecao.com" 
    },
    { 
      id: "2", 
      nome: "Escolta Expressa S.A.", 
      cnpj: "98.765.432/0001-10", 
      proprietario: "Maria Souza", 
      email: "maria@escolta.com" 
    },
    { 
      id: "3", 
      nome: "Segurança Total", 
      cnpj: "45.678.901/0001-23", 
      proprietario: "Pedro Santos", 
      email: "pedro@total.com" 
    },
  ])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddEmpresa = (empresa: Empresa) => {
    setEmpresas([...empresas, empresa])
  }

  const filteredEmpresas = empresas.filter(empresa => 
    empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.cnpj.includes(searchTerm) ||
    empresa.proprietario.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <EmpresasSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nova Empresa
        </Button>
      </div>

      <NovaEmpresaDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onAddEmpresa={handleAddEmpresa} 
      />

      <EmpresasTable empresas={filteredEmpresas} />
    </div>
  )
}
