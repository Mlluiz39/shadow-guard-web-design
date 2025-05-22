
import { 
  Plus, 
  Filter, 
  HelpCircle, 
  Printer,
  RefreshCw 
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { PrintFieldSelector } from "@/components/PrintFieldSelector";

interface GridOperacionalActionButtonsProps {
  onFilterToggle: (isOpen: boolean) => void;
  isFilterOpen: boolean;
  onRefresh: () => void;
}

export const GridOperacionalActionButtons = ({
  onFilterToggle,
  isFilterOpen,
  onRefresh
}: GridOperacionalActionButtonsProps) => {
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  
  const printOptions = [
    { id: "cliente", label: "Cliente" },
    { id: "cod", label: "Código" },
    { id: "dataHora", label: "Data/Hora" },
    { id: "mtsOs", label: "MTS/OS" },
    { id: "agente1", label: "Agente 1" },
    { id: "agente2", label: "Agente 2" },
    { id: "status", label: "Status" },
    { id: "prioridade", label: "Prioridade" },
  ];

  // Função para imprimir dados
  const printData = (selectedFields: string[]) => {
    if (selectedFields.length === 0) {
      toast("Imprimindo todos os campos");
    } else {
      toast(`Imprimindo campos selecionados: ${selectedFields.join(", ")}`);
    }
    
    // Add print-specific styles
    if (selectedFields.length > 0) {
      const style = document.createElement('style');
      style.id = 'print-style';
      
      // Create CSS to hide non-selected columns
      const hideColumns = printOptions
        .filter(option => !selectedFields.includes(option.id))
        .map(option => `[data-field="${option.id}"]`)
        .join(', ');
      
      if (hideColumns) {
        style.innerHTML = `@media print { ${hideColumns} { display: none !important; } }`;
        document.head.appendChild(style);
      }
    }
    
    window.print();
    
    // Clean up print styles after printing
    const styleElement = document.getElementById('print-style');
    if (styleElement) {
      document.head.removeChild(styleElement);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => console.log("Adicionar novo registro")}>
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Adicionar novo registro
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => onFilterToggle(!isFilterOpen)}>
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Filtrar resultados
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => console.log("Mostrar legendas")}>
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Legenda
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setPrintDialogOpen(true)}>
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Imprimir relatório
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Atualizar dados
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <PrintFieldSelector 
        options={printOptions}
        onPrint={printData}
        open={printDialogOpen}
        onOpenChange={setPrintDialogOpen}
      />
    </>
  );
};
