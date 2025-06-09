import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Download, Upload, Loader2 } from 'lucide-react'
import { ClientesTable } from '@/components/clientes/ClientesTable'
import { ClientesFilter } from '@/components/clientes/ClientesFilter'
import { ClienteModal } from '@/components/clientes/ClienteModal'
import { useClientes } from '@/hooks/useClientes'
import { toast } from 'sonner'
import type { Database } from '@/integrations/supabase/types'

type Cliente = Database['public']['Tables']['clientes']['Row']

const Clientes = () => {
  const { clientes, loading, createCliente, updateCliente, deleteCliente } = useClientes()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch =
      searchTerm === '' ||
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.razao_social && cliente.razao_social.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cliente.documento.includes(searchTerm)

    const matchesStatus =
      statusFilter === 'todos' || cliente.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleView = (cliente: any) => {
    toast.info(`Visualizando cliente: ${cliente.nome}`)
  }

  const handleEdit = (cliente: any) => {
    // Convert Supabase data to Cliente interface
    const clienteFormatted: Cliente = {
      id: cliente.id,
      nome: cliente.nome,
      razaoSocial: cliente.razao_social || '',
      documento: cliente.documento,
      telefone: cliente.telefone || '',
      contrato: cliente.contrato || '',
      pastaN: cliente.pasta_n || '',
      dataImportacao: cliente.data_importacao ? new Date(cliente.data_importacao).toLocaleDateString() : '',
      status: cliente.status as 'Ativo' | 'Inativo' | 'Suspenso',
      created_at: cliente.created_at,
      updated_at: cliente.updated_at,
      razao_social: cliente.razao_social,
      pasta_n: cliente.pasta_n,
      data_importacao: cliente.data_importacao,
    }
    setClienteSelecionado(clienteFormatted)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    const cliente = clientes.find(c => c.id === id)
    if (!cliente) return

    const confirm = window.confirm(
      `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`
    )

    if (confirm) {
      await deleteCliente(id)
    }
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
    setClienteSelecionado(null)
    setIsModalOpen(true)
  }

  const handleSave = async (clienteData: any) => {
    const existe = clienteSelecionado

    if (existe) {
      await updateCliente(existe.id, {
        nome: clienteData.nome,
        razao_social: clienteData.razaoSocial,
        documento: clienteData.documento,
        telefone: clienteData.telefone,
        contrato: clienteData.contrato,
        pasta_n: clienteData.pastaN,
        status: clienteData.status,
      })
    } else {
      await createCliente({
        nome: clienteData.nome,
        razao_social: clienteData.razaoSocial,
        documento: clienteData.documento,
        telefone: clienteData.telefone,
        contrato: clienteData.contrato,
        pasta_n: clienteData.pastaN,
        status: clienteData.status,
      })
    }
    
    setIsModalOpen(false)
    setClienteSelecionado(null)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          Clientes
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <Button
            onClick={handleAddNew}
            className="bg-security text-white hover:bg-security/90"
          >
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

      <ClientesFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onClearFilters={handleClearFilters}
      />

      <Card className="p-0">
        <ClientesTable
          clientes={filteredClientes.map(cliente => ({
            id: cliente.id,
            nome: cliente.nome,
            razaoSocial: cliente.razao_social || '',
            documento: cliente.documento,
            telefone: cliente.telefone || '',
            contrato: cliente.contrato || '',
            pastaN: cliente.pasta_n || '',
            dataImportacao: cliente.data_importacao ? new Date(cliente.data_importacao).toLocaleDateString() : '',
            status: cliente.status as 'Ativo' | 'Inativo' | 'Suspenso',
          }))}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <div className="flex justify-between items-center text-sm text-security-muted bg-white p-4 rounded-lg border">
        <div>Total de registros: {clientes.length}</div>
        <div>Quantidade de Linhas: {filteredClientes.length}</div>
      </div>

      <ClienteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        cliente={clienteSelecionado ? {
          id: clienteSelecionado.id,
          nome: clienteSelecionado.nome,
          razaoSocial: clienteSelecionado.razao_social || '',
          documento: clienteSelecionado.documento,
          telefone: clienteSelecionado.telefone || '',
          contrato: clienteSelecionado.contrato || '',
          pastaN: clienteSelecionado.pasta_n || '',
          dataImportacao: clienteSelecionado.data_importacao ? new Date(clienteSelecionado.data_importacao).toLocaleDateString() : '',
          status: clienteSelecionado.status as 'Ativo' | 'Inativo' | 'Suspenso',
        } : null}
      />
    </div>
  )
}

export default Clientes
