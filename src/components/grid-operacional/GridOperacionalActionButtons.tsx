
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
  // Função para imprimir dados
  const printData = () => {
    toast("Enviando os dados para impressão");
    window.print();
  };

  return (
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
  );
};
