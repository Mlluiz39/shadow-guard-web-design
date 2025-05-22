
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
import { gridOperacionalData } from "./types";

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
    { id: "cod", label: "Código Específico" },
    { id: "cliente", label: "Cliente" },
    { id: "dataSolicitacao", label: "Data Solicitação" },
    { id: "mtsOs", label: "MTS/OS" },
    { id: "agente1", label: "Agente 1" },
    { id: "agente2", label: "Agente 2" },
    { id: "status", label: "Status" },
    { id: "origem", label: "Origem" },
    { id: "destino", label: "Destino" },
  ];

  // Função para imprimir dados
  const printData = (selectedFields: string[], specificCode?: string) => {
    // Add print-specific styles
    const style = document.createElement('style');
    style.id = 'print-style';
    
    if (specificCode) {
      // When printing a specific code
      toast(`Imprimindo registro com código: ${specificCode}`);
      
      // Find the specific record
      const record = gridOperacionalData.find(item => item.cod === specificCode);
      
      if (!record) {
        toast("Código não encontrado!");
        return;
      }
      
      // Create a temporary div for printing just this record
      const tempDiv = document.createElement('div');
      tempDiv.id = 'temp-print-container';
      tempDiv.className = 'p-8';
      
      // Create detailed view of the record
      tempDiv.innerHTML = `
        <h1 class="text-xl font-bold mb-4">Detalhes do Registro - Código: ${record.cod}</h1>
        <div class="grid grid-cols-2 gap-4">
          <div><strong>Cliente:</strong> ${record.cliente}</div>
          <div><strong>Data Solicitação:</strong> ${record.dataSolicitacao}</div>
          <div><strong>MTS/OS:</strong> ${record.mtsOs}</div>
          <div><strong>Placa Auto:</strong> ${record.placaAuto}</div>
          <div><strong>Parceiro:</strong> ${record.parceiro}</div>
          <div><strong>Agente 1:</strong> ${record.agente1}</div>
          <div><strong>Agente 2:</strong> ${record.agente2}</div>
          <div><strong>VTR:</strong> ${record.vtr}</div>
          <div><strong>Origem:</strong> ${record.origem}</div>
          <div><strong>Destino:</strong> ${record.destino}</div>
          <div><strong>Data Missão:</strong> ${record.dataMissao}</div>
          <div><strong>Hora Missão:</strong> ${record.horaMissao}</div>
          <div><strong>Hora Equipe:</strong> ${record.horaEquipe}</div>
          <div><strong>Hora Início Real:</strong> ${record.horaInicioReal}</div>
          <div><strong>KM Início:</strong> ${record.kmInicio}</div>
          <div><strong>Data Fim Missão:</strong> ${record.dataFimMissao}</div>
          <div><strong>KM Final:</strong> ${record.kmFinal}</div>
          <div><strong>Hora Final:</strong> ${record.horaFinal}</div>
          <div><strong>Status:</strong> ${record.status}</div>
          <div><strong>Total Hora Missão:</strong> ${record.totalHoraMissao}</div>
          <div><strong>KM Total:</strong> ${record.kmTotal}</div>
        </div>
      `;
      
      document.body.appendChild(tempDiv);
      
      // Hide everything else
      style.innerHTML = `
        @media print {
          body > *:not(#temp-print-container) {
            display: none !important;
          }
          #temp-print-container {
            display: block !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
          }
        }
      `;
      
    } else if (selectedFields.length > 0) {
      // When printing specific fields
      toast(`Imprimindo campos selecionados: ${selectedFields.join(", ")}`);
      
      // Create CSS to hide non-selected columns
      const hideColumns = printOptions
        .filter(option => !selectedFields.includes(option.id))
        .map(option => `[data-field="${option.id}"]`)
        .join(', ');
      
      if (hideColumns) {
        style.innerHTML = `@media print { ${hideColumns} { display: none !important; } }`;
      }
    } else {
      toast("Imprimindo todos os campos");
    }
    
    document.head.appendChild(style);
    window.print();
    
    // Clean up print styles and temporary elements after printing
    const styleElement = document.getElementById('print-style');
    if (styleElement) {
      document.head.removeChild(styleElement);
    }
    
    const tempPrintContainer = document.getElementById('temp-print-container');
    if (tempPrintContainer) {
      document.body.removeChild(tempPrintContainer);
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
