
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Download, Upload } from 'lucide-react'
import { ClientesTable } from '@/components/clientes/ClientesTable'
import { ClientesFilter } from '@/components/clientes/ClientesFilter'
import { Cliente } from '@/types/cliente'
import { toast } from 'sonner'

// Dados mockados para demonstração
const mockClientes: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    razaoSocial: 'Silva & Associados Ltda',
    documento: '12.345.678/0001-90',
    telefone: '(11) 99999-9999',
    contrato: 'CT001',
    pastaN: 'P001',
    dataImportacao: '31/05/2024',
    status: 'Ativo'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    razaoSocial: 'Santos Comércio S.A.',
    documento: '98.765.432/0001-10',
    telefone: '(11) 88888-8888',
    contrato: 'CT002',
    pastaN: 'P002',
    dataImportacao: '30/05/2024',
    status: 'Ativo'
  },
  {
    id: '3',
    nome: 'Pedro Costa',
    razaoSocial: 'Costa Transportes Ltda',
    documento: '11.222.333/0001-44',
    telefone: '(11) 77777-7777',
    contrato: 'CT003',
    pastaN: 'P003',
    dataImportacao: '29/05/2024',
    status: 'Suspenso'
  }
]

const Clientes = () => {
  const [clientes] = useState<Cliente[]>(mockClientes)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  // Filtrar clientes baseado na busca e filtros
  const filteredClientes = clientes.filter((cliente) => {
    const matchesSearch = searchTerm === '' || 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.documento.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'todos' || cliente.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleView = (cliente: Cliente) => {
    toast.info(`Visualizando cliente: ${cliente.nome}`)
  }

  const handleEdit = (cliente: Cliente) => {
    toast.info(`Editando cliente: ${cliente.nome}`)
  }

  const handleDelete = (id: string) => {
    const cliente = clientes.find(c => c.id === id)
    toast.error(`Excluindo cliente: ${cliente?.nome}`)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setStatusFilter('todos')
  }

  const handleImport = () => {
    toast.info('Função de importação será implementada')
  }

  const handleExport = () => {
    toast.info('Exportando dados dos clientes...')
  }

  const handleAddNew = () => {
    toast.info('Adicionando novo cliente...')
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          Clientes
        </h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Barra de ações */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <Button onClick={handleAddNew} className="bg-security text-white hover:bg-security/90">
            <Plus className="h-4 w-4 mr-2" />
            Incluir
          </Button>
          <Button variant="outline" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
        
        <div className="text-sm text-security-muted">
          Mostrando {filteredClientes.length} de {clientes.length} registros
        </div>
      </div>

      {/* Filtros */}
      <ClientesFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Tabela de clientes */}
      <Card className="p-0">
        <ClientesTable
          clientes={filteredClientes}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Rodapé com informações */}
      <div className="flex justify-between items-center text-sm text-security-muted bg-white p-4 rounded-lg border">
        <div>
          Total de registros: {clientes.length}
        </div>
        <div>
          Localizar: Quantide Linhas: {filteredClientes.length}
        </div>
      </div>
    </div>
  )
}

export default Clientes
