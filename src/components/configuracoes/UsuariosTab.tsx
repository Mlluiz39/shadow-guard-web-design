
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Usuario } from "@/types/usuario"
import { UsuariosSearch } from "./usuarios/UsuariosSearch"
import { UsuariosTable } from "./usuarios/UsuariosTable"
import { NovoUsuarioDialog } from "./usuarios/NovoUsuarioDialog"

// Mockup data
const empresas = [
  { id: "1", nome: "Proteção Segurança Ltda" },
  { id: "2", nome: "Escolta Expressa S.A." },
  { id: "3", nome: "Segurança Total" },
]

const cargos = ["Administrador", "Supervisor", "Operador", "Agente", "Analista"]
const departamentos = ["TI", "Operações", "Financeiro", "Comercial", "Logística", "RH"]

export const UsuariosTab = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { 
      id: "1", 
      nome: "Carlos Mendes", 
      email: "carlos@proteqrv.com", 
      empresa: "Proteção Segurança Ltda", 
      cargo: "Administrador",
      departamento: "TI"
    },
    { 
      id: "2", 
      nome: "Ana Oliveira", 
      email: "ana@escolta.com", 
      empresa: "Escolta Expressa S.A.", 
      cargo: "Supervisor",
      departamento: "Operações"
    },
    { 
      id: "3", 
      nome: "Roberto Alves", 
      email: "roberto@total.com", 
      empresa: "Segurança Total", 
      cargo: "Operador",
      departamento: "Logística"
    },
  ])
  
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddUsuario = (newUsuario: Usuario) => {
    setUsuarios([...usuarios, newUsuario])
  }

  const filteredUsuarios = usuarios.filter(usuario => 
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <UsuariosSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Usuário
        </Button>
      </div>

      <NovoUsuarioDialog 
        dialogOpen={dialogOpen} 
        setDialogOpen={setDialogOpen}
        onUsuarioAdded={handleAddUsuario}
        empresas={empresas}
        cargos={cargos}
        departamentos={departamentos}
      />

      <UsuariosTable usuarios={filteredUsuarios} />
    </div>
  )
}
