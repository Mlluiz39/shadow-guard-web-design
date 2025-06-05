
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Usuario } from '@/types/usuario'
import { UsuariosSearch } from './usuarios/UsuariosSearch'
import { UsuariosTable } from './usuarios/UsuariosTable'
import { NovoUsuarioDialog } from './usuarios/NovoUsuarioDialog'
import { Badge } from '@/components/ui/badge'
import { getPerfilById } from '@/types/perfil'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

// Mockup data
const empresas = [
  { id: '1', nome: 'Proteção Segurança Ltda' },
  { id: '2', nome: 'Escolta Expressa S.A.' },
  { id: '3', nome: 'Segurança Total' },
]

const cargos = ['Administrador', 'Supervisor', 'Operador', 'Agente', 'Analista']
const departamentos = [
  'TI',
  'Operações',
  'Financeiro',
  'Comercial',
  'Logística',
  'RH',
]

export const UsuariosTab = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'Marcelo Luiz',
      email: 'marcelo@proteqrv.com',
      empresa: 'MlluizDevTech Ltda',
      cargo: 'Administrador',
      departamento: 'TI',
      perfil: 'master',
      ativo: true,
    },
    {
      id: '2',
      nome: 'Ana Oliveira',
      email: 'ana@escolta.com',
      empresa: 'Escolta Expressa S.A.',
      cargo: 'Supervisor',
      departamento: 'Operações',
      perfil: 'operacional',
      ativo: true,
    },
    {
      id: '3',
      nome: 'Roberto Alves',
      email: 'roberto@total.com',
      empresa: 'Segurança Total',
      cargo: 'Analista',
      departamento: 'Financeiro',
      perfil: 'financeiro',
      ativo: true,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddUsuario = (newUsuario: Usuario) => {
    setUsuarios([...usuarios, newUsuario])
  }

  const filteredUsuarios = usuarios.filter(
    usuario =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPerfilBadgeColor = (perfilId: string) => {
    switch (perfilId) {
      case 'master':
        return 'bg-red-100 text-red-800'
      case 'supervisor':
        return 'bg-purple-100 text-purple-800'
      case 'financeiro':
        return 'bg-green-100 text-green-800'
      case 'operacional':
        return 'bg-blue-100 text-blue-800'
      case 'logistica':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.length > 0 ? (
              filteredUsuarios.map(usuario => (
                <TableRow
                  key={usuario.id}
                  className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300"
                >
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.empresa}</TableCell>
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>{usuario.departamento}</TableCell>
                  <TableCell>
                    <Badge className={getPerfilBadgeColor(usuario.perfil)}>
                      {getPerfilById(usuario.perfil)?.nome || 'Indefinido'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={usuario.ativo ? 'default' : 'secondary'}>
                      {usuario.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
