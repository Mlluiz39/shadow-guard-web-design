import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/use-toast';
import { GridOperacionalTable } from '../components/grid-operacional/GridOperacionalTable';
import { GridOperacionalFilter } from '../components/grid-operacional/GridOperacionalFilter';
import { GridOperacionalActionButtons } from '@/components/grid-operacional/GridOperacionalActionButtons';
import { gridOperacionalData } from '../components/grid-operacional/types';

const GridOperacional = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDados, setFilteredDados] = useState(gridOperacionalData);

  const filterDados = () => {
    const filtered = gridOperacionalData.filter(
      item =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mtsOs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agente1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agente2.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDados(filtered);
  };

  const clearFilter = () => {
    setSearchTerm('');
    setFilteredDados(gridOperacionalData);
  };

  const refreshData = () => {
    setFilteredDados([...gridOperacionalData]);
    setSearchTerm('');
    toast(
        <>
      <strong> "Dados atualizados",</strong>
      <div>"Os dados foram atualizados com sucesso",</div> 
      </>
    );
  };

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
      />
    </div>
  );
};

export default GridOperacional;