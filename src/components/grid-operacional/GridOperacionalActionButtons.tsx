
import { 
  Plus, 
  Filter, 
  HelpCircle, 
  Printer,
  RefreshCw 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useState } from "react";
import { PrintFieldSelector } from "../PrintFieldSelector";
import { GridOperacionalItem } from "./types";

interface GridOperacionalActionButtonsProps {
  onFilterToggle: (isOpen: boolean) => void;
  isFilterOpen: boolean;
  onRefresh: () => void;
  dados: GridOperacionalItem[];
}

export const GridOperacionalActionButtons = ({
  onFilterToggle,
  isFilterOpen,
  onRefresh,
  dados
}: GridOperacionalActionButtonsProps) => {
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  // Função para imprimir dados completos
  const printData = () => {
    toast("Enviando os dados para impressão");
    window.print();
  };

  // Função para imprimir linha específica
  const printSpecificLine = (codigo: string) => {
    const item = dados.find(d => d.cod === codigo);
    
    if (!item) {
      toast("Código não encontrado!");
      return;
    }

    const printContent = `
      <div id="temp-print-container">
        <h1>Relatório Detalhado - Código: ${item.cod}</h1>
        <div class="grid">
          <div><strong>Código:</strong> ${item.cod}</div>
          <div><strong>Data Solicitação:</strong> ${item.dataSolicitacao}</div>
          <div><strong>MTS-OS:</strong> ${item.mtsOs}</div>
          <div><strong>Cliente:</strong> ${item.cliente}</div>
          <div><strong>Placa Auto:</strong> ${item.placaAuto}</div>
          <div><strong>Parceiro:</strong> ${item.parceiro}</div>
          <div><strong>Agente 1:</strong> ${item.agente1}</div>
          <div><strong>Agente 2:</strong> ${item.agente2}</div>
          <div><strong>VTR:</strong> ${item.vtr}</div>
          <div><strong>Origem:</strong> ${item.origem}</div>
          <div><strong>Destino:</strong> ${item.destino}</div>
          <div><strong>Data Início Missão:</strong> ${item.dataMissao}</div>
          <div><strong>Hora Missão:</strong> ${item.horaMissao}</div>
          <div><strong>Hora Equipe:</strong> ${item.horaEquipe}</div>
          <div><strong>Hora Início Real:</strong> ${item.horaInicioReal}</div>
          <div><strong>KM Início:</strong> ${item.kmInicio}</div>
          <div><strong>Data Fim Missão:</strong> ${item.dataFimMissao}</div>
          <div><strong>KM Final:</strong> ${item.kmFinal}</div>
          <div><strong>Hora Final:</strong> ${item.horaFinal}</div>
          <div><strong>Status:</strong> ${item.status}</div>
          <div><strong>Total Hora Missão:</strong> ${item.totalHoraMissao}</div>
          <div><strong>KM Total:</strong> ${item.kmTotal}</div>
        </div>
      </div>
    `;

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
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
              <Button variant="outline" size="icon" onClick={printData}>
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Imprimir relatório completo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => setShowPrintDialog(true)}>
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Imprimir linha específica
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
        open={showPrintDialog}
        onOpenChange={setShowPrintDialog}
        onPrint={printSpecificLine}
      />
    </>
  );
};
