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

interface EscoltaActionButtonsProps {
  onFilterToggle: (isOpen: boolean) => void;
  isFilterOpen: boolean;
  onRefresh: () => void;
}

export const EscoltaActionButtons = ({
  onFilterToggle,
  isFilterOpen,
  onRefresh
}: EscoltaActionButtonsProps) => {
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  
  const printOptions = [
    { id: "cliente", label: "Cliente" },
    { id: "solicitacao", label: "Solicitação" },
    { id: "dataInicio", label: "Data Início Previsto" },
    { id: "origem", label: "Origem" },
    { id: "destino", label: "Destino" },
    { id: "tratativas", label: "Tratativas" },
    { id: "operador", label: "Operador" },
    { id: "numeroEO", label: "Número E.O" },
    { id: "espelhamento", label: "Espelhamento" },
  ];

  // Function to print data
  const printData = () => {
    toast("Enviando os dados para impressão");
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
              <Button variant="outline" size="icon" onClick={() => console.log("Adicionar nova solicitação")}>
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Adicionar nova solicitação
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