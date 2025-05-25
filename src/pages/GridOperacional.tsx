
import { useState } from 'react'
import { LayoutGrid } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { toast } from 'sonner'
import { GridOperacionalTable } from '../components/grid-operacional/GridOperacionalTable'
import { GridOperacionalFilter } from '../components/grid-operacional/GridOperacionalFilter'
import { GridOperacionalActionButtons } from '../components/grid-operacional/GridOperacionalActionButtons'
import { EditGridOperacionalModal } from '../components/grid-operacional/EditGridOperacionalModal'
import { gridOperacionalData, GridOperacionalItem } from '../components/grid-operacional/types'

const GridOperacional = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDados, setFilteredDados] = useState(gridOperacionalData)
  const [editingItem, setEditingItem] = useState<GridOperacionalItem | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const filterDados = () => {
    const filtered = gridOperacionalData.filter(
      item =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parceiro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dataSolicitacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agente1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agente2.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredDados(filtered)
  }

  const clearFilter = () => {
    setSearchTerm('')
    setFilteredDados(gridOperacionalData)
  }

  const refreshData = () => {
    setFilteredDados([...gridOperacionalData])
    setSearchTerm('')
    toast.success("Dados atualizados com sucesso!")
  }

  const handleEdit = (item: GridOperacionalItem) => {
    setEditingItem(item)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (updatedItem: GridOperacionalItem) => {
    // Aqui você faria a atualização no banco de dados
    // Por enquanto, apenas atualizamos o estado local
    const updatedData = filteredDados.map(item => 
      item.cod === updatedItem.cod ? updatedItem : item
    )
    setFilteredDados(updatedData)
    setIsEditModalOpen(false)
    setEditingItem(null)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingItem(null)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <LayoutGrid className="h-6 w-6" /> Grid Operacional
        </h1>
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <CollapsibleTrigger asChild>
            <div>
              <GridOperacionalActionButtons
                isFilterOpen={isFilterOpen}
                onFilterToggle={setIsFilterOpen}
                onRefresh={refreshData}
                dados={filteredDados}
              />
            </div>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <GridOperacionalFilter
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onApplyFilter={filterDados}
            onClearFilter={clearFilter}
          />
        </CollapsibleContent>
      </Collapsible>

      <GridOperacionalTable
        dados={filteredDados}
        totalRegistros={gridOperacionalData.length}
        onEdit={handleEdit}
      />

      <EditGridOperacionalModal
        item={editingItem}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
      />
    </div>
  )
}

export default GridOperacional
