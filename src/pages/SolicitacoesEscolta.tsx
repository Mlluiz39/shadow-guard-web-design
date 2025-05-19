
import { useState } from "react";
import { Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { toast } from "@/components/ui/use-toast";

// Import our refactored components
import { EscoltaActionButtons } from "@/components/solicitacoes-escolta/EscoltaActionButtons";
import { EscoltaFilter } from "@/components/solicitacoes-escolta/EscoltaFilter";
import { EscoltaTable } from "@/components/solicitacoes-escolta/EscoltaTable";
import { EspelhamentoContent } from "@/components/solicitacoes-escolta/EspelhamentoContent";
import { escoltasData } from "@/components/solicitacoes-escolta/types";

const SolicitacoesEscolta = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEscoltas, setFilteredEscoltas] = useState(escoltasData);
  const [activeTab, setActiveTab] = useState("solicitacoes");

  // Function to filter escoltas based on search term
  const filterEscoltas = () => {
    const filtered = escoltasData.filter(
      (item) =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.solicitacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.operador.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEscoltas(filtered);
    toast({
      title: "Filtro aplicado",
      description: `Mostrando ${filtered.length} resultados para "${searchTerm}"`,
    });
  };

  // Function to clear the filter
  const clearFilter = () => {
    setSearchTerm("");
    setFilteredEscoltas(escoltasData);
    toast({
      title: "Filtro removido",
      description: "Mostrando todos os registros",
    });
  };

  // Function to refresh the data
  const refreshData = () => {
    setFilteredEscoltas([...escoltasData]);
    toast({
      title: "Dados atualizados",
      description: "As informações foram atualizadas com sucesso",
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Shield className="h-6 w-6" /> Solicitações de escolta
        </h1>
      </div>

      <Tabs defaultValue="solicitacoes" className="w-full" 
        onValueChange={(value) => setActiveTab(value)}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
            <TabsTrigger value="espelhamento">Espelhamento</TabsTrigger>
          </TabsList>
          
          <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <CollapsibleTrigger className="hidden">
              {/* Hidden trigger handled by EscoltaActionButtons */}
            </CollapsibleTrigger>
            
            <EscoltaActionButtons 
              isFilterOpen={isFilterOpen}
              onFilterToggle={setIsFilterOpen}
              onRefresh={refreshData}
            />
          </Collapsible>
        </div>
        
        <CollapsibleContent className="mb-4">
          <EscoltaFilter 
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onApplyFilter={filterEscoltas}
            onClearFilter={clearFilter}
          />
        </CollapsibleContent>

        <TabsContent value="solicitacoes" className="space-y-4">
          <EscoltaTable 
            escoltas={filteredEscoltas} 
            totalEscoltas={escoltasData.length} 
          />
        </TabsContent>

        <TabsContent value="espelhamento">
          <EspelhamentoContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolicitacoesEscolta;
