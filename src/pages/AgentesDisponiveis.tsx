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
import { toast } from '@/components/ui/use-toast'
import { Card, CardContent } from '@/components/ui/card'

const agentesData = [
  {
    id: 1,
    nome: 'Carlos Silva',
    nomeGuerra: 'Silva',
    situacao: 'Disponível',
    re: '12345',
    telefone: '(11) 99999-1111',
  },
  {
    id: 2,
    nome: 'Ana Oliveira',
    nomeGuerra: 'Ana',
    situacao: 'Em serviço',
    re: '23456',
    telefone: '(11) 99999-2222',
  },
  {
    id: 3,
    nome: 'João Santos',
    nomeGuerra: 'João',
    situacao: 'Disponível',
    re: '34567',
    telefone: '(11) 99999-3333',
  },
  {
    id: 4,
    nome: 'Maria Costa',
    nomeGuerra: 'Costa',
    situacao: 'Folga',
    re: '45678',
    telefone: '(11) 99999-4444',
  },
  {
    id: 5,
    nome: 'Pedro Almeida',
    nomeGuerra: 'Almeida',
    situacao: 'Disponível',
    re: '56789',
    telefone: '(11) 99999-5555',
  },
  {
    id: 6,
    nome: 'Julia Pereira',
    nomeGuerra: 'Julia',
    situacao: 'Em serviço',
    re: '67890',
    telefone: '(11) 99999-6666',
  },
  {
    id: 7,
    nome: 'Roberto Ferreira',
    nomeGuerra: 'Roberto',
    situacao: 'Disponível',
    re: '78901',
    telefone: '(11) 99999-7777',
  },
  {
    id: 8,
    nome: 'Fernanda Lima',
    nomeGuerra: 'Fernanda',
    situacao: 'Folga',
    re: '89012',
    telefone: '(11) 99999-8888',
  },
]

const AgentesDisponiveis = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAgentes, setFilteredAgentes] = useState(agentesData)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const term = searchTerm.toLowerCase().trim()
      const results = agentesData.filter(
        a =>
          a.nome.toLowerCase().includes(term) ||
          a.nomeGuerra.toLowerCase().includes(term) ||
          a.re.includes(term)
      )
      setFilteredAgentes(results)
      setCurrentPage(1)
    }, 300)
    return () => clearTimeout(timeout)
  }, [searchTerm])

  const clearFilter = () => {
    setSearchTerm('')
    setFilteredAgentes(agentesData)
    setCurrentPage(1)
  }

  const refreshData = () => {
    setFilteredAgentes([...agentesData])
    toast('Dados atualizados com sucesso!')
  }

  const handleSort = (field: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortField === field && sortDirection === 'asc') direction = 'desc'
    setSortField(field)
    setSortDirection(direction)
  }

  const sortedAgentes = [...filteredAgentes].sort((a, b) => {
    if (!sortField) return 0
    const aValue = a[sortField]
    const bValue = b[sortField]
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedAgentes.length / itemsPerPage)
  const paginatedAgentes = sortedAgentes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs defaultValue="lista">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Agentes</TabsTrigger>
        </TabsList>
        <TabsContent value="lista" className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Buscar por nome, nome de guerra ou RE"
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
                    {['nome', 'nomeGuerra', 'situacao', 're', 'telefone'].map(
                      field => (
                        <TableHead
                          key={field}
                          onClick={() => handleSort(field)}
                          className="cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-1 capitalize">
                            {field}
                            <ChevronsUpDown className="w-4 h-4" />
                          </div>
                        </TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAgentes.map(agente => (
                    <TableRow key={agente.id}>
                      <TableCell>{agente.nome}</TableCell>
                      <TableCell>{agente.nomeGuerra}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            agente.situacao === 'Disponível'
                              ? 'bg-green-100 text-green-800'
                              : agente.situacao === 'Em serviço'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {agente.situacao}
                        </span>
                      </TableCell>
                      <TableCell>{agente.re}</TableCell>
                      <TableCell>{agente.telefone}</TableCell>
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
    </div>
  )
}

export default AgentesDisponiveis
