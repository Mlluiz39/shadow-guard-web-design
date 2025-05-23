import { useState } from 'react'
import { Shield } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { EscoltaActionButtons } from '@/components/solicitacoes-escolta/EscoltaActionButtons'
import { EscoltaFilter } from '@/components/solicitacoes-escolta/EscoltaFilter'
import { EscoltaTable } from '@/components/solicitacoes-escolta/EscoltaTable'
import { escoltasData } from '@/components/solicitacoes-escolta/types'

export interface EscoltaFilterProps {
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onApplyFilter: () => void
  onClearFilter: () => void
  className?: string
}

const SolicitacoesEscolta = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredEscoltas, setFilteredEscoltas] = useState(escoltasData)
  const [activeTab, setActiveTab] = useState('solicitacoes')

  const filterEscoltas = () => {
    const filtered = escoltasData.filter(
      item =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.solicitacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.operador.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEscoltas(filtered)
  }

  const clearFilter = () => {
    setSearchTerm('')
    setFilteredEscoltas(escoltasData)
  }

  const refreshData = () => {
    setFilteredEscoltas([...escoltasData])
    setSearchTerm('')
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Shield className="h-6 w-6" /> Solicitações de escolta
        </h1>
      </div>

      <Tabs
        defaultValue="solicitacoes"
        className="w-full"
        onValueChange={value => setActiveTab(value)}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
          </TabsList>

          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <div className="flex gap-2">
              <CollapsibleTrigger asChild>
                <EscoltaActionButtons
                  isFilterOpen={isFilterOpen}
                  onFilterToggle={setIsFilterOpen}
                  onRefresh={refreshData}
                />
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <EscoltaFilter
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onApplyFilter={filterEscoltas}
                onClearFilter={clearFilter}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>

        <TabsContent value="solicitacoes" className="space-y-4">
          <EscoltaTable
            escoltas={filteredEscoltas}
            totalEscoltas={escoltasData.length}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SolicitacoesEscolta
