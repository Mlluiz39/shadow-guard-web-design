
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getPerfilById } from '@/types/perfil'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'react-toastify'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { UsuariosSearch } from './usuarios/UsuariosSearch'
import { NovoUsuarioDialog } from './usuarios/NovoUsuarioDialog'
import { usePermissions } from '@/hooks/usePermissions'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

interface Profile {
  id: string
  nome: string
  email: string
  empresa?: string
  cargo?: string
  departamento?: string
  perfil: string
  ativo: boolean
}

const empresas = [
  { id: '1', nome: 'MlluizDevTech Ltda' },
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
  const { isMaster, canAccessUsuarios } = usePermissions()
  
  // Verificar se o usuário tem permissão para acessar usuários
  if (!canAccessUsuarios()) {
    return (
      <div className="space-y-4">
        <Card className="p-12">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <CardTitle className="text-xl text-red-600">
              Acesso Restrito
            </CardTitle>
            <p className="text-gray-600 text-center max-w-md">
              Apenas usuários master podem gerenciar usuários do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const [usuarios, setUsuarios] = useState<Profile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchUsuarios = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('nome')

      if (error) {
        console.error('Erro ao buscar usuários:', error)
        toast.error('Erro ao carregar usuários')
        return
      }

      setUsuarios(data || [])
    } catch (error) {
      console.error('Erro:', error)
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const handleAddUsuario = async (newUsuario: any) => {
    // Verificar se é master antes de permitir criação
    if (!isMaster()) {
      toast.error('Apenas usuários master podem criar usuários!')
      return
    }
    
    // Usuários são criados via auth, então apenas atualizamos a lista
    await fetchUsuarios()
  }

  const filteredUsuarios = usuarios.filter(
    usuario =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (usuario.empresa && usuario.empresa.toLowerCase().includes(searchTerm.toLowerCase()))
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 border-2 border-security-accent border-opacity-50 border-t-security-accent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <UsuariosSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        {isMaster() && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Novo Usuário
          </Button>
        )}
      </div>

      {isMaster() && (
        <NovoUsuarioDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onUsuarioAdded={handleAddUsuario}
          empresas={empresas}
          cargos={cargos}
          departamentos={departamentos}
        />
      )}

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
                  <TableCell>{usuario.empresa || '-'}</TableCell>
                  <TableCell>{usuario.cargo || '-'}</TableCell>
                  <TableCell>{usuario.departamento || '-'}</TableCell>
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
