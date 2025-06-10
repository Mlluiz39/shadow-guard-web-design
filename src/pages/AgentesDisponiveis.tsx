
import { useState, useEffect } from 'react'
import {
  Users,
  Filter,
  Bell,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Edit,
  Loader2,
} from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { EditAgenteModal } from '../components/agentes/EditAgenteModal'
import { useFuncionarios } from '@/hooks/useFuncionarios'
import type { Funcionario } from '@/types/funcionario'

const AgentesDisponiveis = () => {
  const { funcionarios, loading, updateFuncionario, refetch } = useFuncionarios()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAgentes, setFilteredAgentes] = useState<Funcionario[]>([])

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const [editingAgente, setEditingAgente] = useState<Funcionario | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Filtrar apenas funcionários que podem ser considerados agentes
  const agenteFuncionarios = funcionarios.filter(funcionario => 
    funcionario.status === 'Ativo' && 
    (funcionario.cargo?.toLowerCase().includes('agente') || 
     funcionario.cargo?.toLowerCase().includes('segurança') ||
     funcionario.departamento?.toLowerCase().includes('operacional'))
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      const term = searchTerm.toLowerCase().trim()
      const results = agenteFuncionarios.filter(
        funcionario =>
          funcionario.nome.toLowerCase().includes(term) ||
          funcionario.cpf.includes(term) ||
          (funcionario.cargo && funcionario.cargo.toLowerCase().includes(term)) ||
          (funcionario.telefone && funcionario.telefone.includes(term))
      )
      setFilteredAgentes(results)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchTerm, agenteFuncionarios])

  useEffect(() => {
    setFilteredAgentes(agenteFuncionarios)
  }, [funcionarios])

  const clearFilter = () => {
    setSearchTerm('')
    setFilteredAgentes(agenteFuncionarios)
    setCurrentPage(1)
  }

  const refreshData = () => {
    refetch()
    toast.success("Dados atualizados com sucesso!")
  }

  const handleSort = (field: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortField === field && sortDirection === 'asc') direction = 'desc'
    setSortField(field)
    setSortDirection(direction)
  }

  const handleEditAgente = (funcionario: Funcionario) => {
    setEditingAgente(funcionario)
    setIsEditModalOpen(true)
  }

  const handleSaveAgente = async (updatedAgente: Funcionario) => {
    const result = await updateFuncionario(updatedAgente.id, updatedAgente)
    if (result) {
      setIsEditModalOpen(false)
      setEditingAgente(null)
    }
  }

  const sortedAgentes = [...filteredAgentes].sort((a, b) => {
    if (!sortField) return 0
    const aValue = a[sortField as keyof Funcionario]
    const bValue = b[sortField as keyof Funcionario]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedAgentes.length / itemsPerPage)
  const paginatedAgentes = sortedAgentes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Função para mapear status do funcionário para status de disponibilidade
  const getStatusDisponibilidade = (funcionario: Funcionario) => {
    if (funcionario.status === 'Ativo') return 'Disponível'
    if (funcionario.status === 'Afastado') return 'Afastado'
    return 'Inativo'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="lista">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Agentes</TabsTrigger>
        </TabsList>
        <TabsContent value="lista" className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Buscar por nome, CPF, cargo ou telefone"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="mb-2"
              onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
            />
            <Button onClick={clearFilter}>Limpar Filtro</Button>
            <Button onClick={refreshData} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" /> Atualizar
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {['nome', 'cargo', 'status', 'cpf', 'telefone'].map(
                      field => (
                        <TableHead
                          key={field}
                          onClick={() => handleSort(field)}
                          className="cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-1 capitalize">
                            {field === 'nome' ? 'Nome' :
                             field === 'cargo' ? 'Cargo' :
                             field === 'status' ? 'Status' :
                             field === 'cpf' ? 'CPF' :
                             field === 'telefone' ? 'Telefone' : field}
                            <ChevronsUpDown className="w-4 h-4" />
                          </div>
                        </TableHead>
                      )
                    )}
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAgentes.map(funcionario => (
                    <TableRow key={funcionario.id}
                    className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300"
                    >
                      <TableCell>{funcionario.nome}</TableCell>
                      <TableCell>{funcionario.cargo || 'Não informado'}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusDisponibilidade(funcionario) === 'Disponível'
                              ? 'bg-green-100 text-green-800'
                              : getStatusDisponibilidade(funcionario) === 'Afastado'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {getStatusDisponibilidade(funcionario)}
                        </span>
                      </TableCell>
                      <TableCell>{funcionario.cpf}</TableCell>
                      <TableCell>{funcionario.telefone || 'Não informado'}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditAgente(funcionario)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
            <div>
              Mostrando {paginatedAgentes.length} de {filteredAgentes.length}{' '}
              agentes
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <label htmlFor="perPage">Por página:</label>
                <select
                  id="perPage"
                  value={itemsPerPage}
                  onChange={e => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {[5, 10, 15, 20].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setCurrentPage(p => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <EditAgenteModal
        agente={editingAgente}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingAgente(null)
        }}
        onSave={handleSaveAgente}
      />
    </div>
  )
}

export default AgentesDisponiveis
