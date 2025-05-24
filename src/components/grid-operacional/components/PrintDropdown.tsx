
import { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PrintFieldSelector } from "../../PrintFieldSelector";
import { GridOperacionalItem } from "../types";
import { printCompleteData, printSpecificLine } from "../utils/printUtils";

interface PrintDropdownProps {
  dados: GridOperacionalItem[];
}

export const PrintDropdown = ({ dados }: PrintDropdownProps) => {
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  const handlePrintCompleteData = () => {
    printCompleteData(dados);
  };

  const handlePrintSpecificLine = (codigo: string) => {
    printSpecificLine(codigo, dados);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handlePrintCompleteData}>
                  Imprimir relatório completo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPrintDialog(true)}>
                  Imprimir linha específica
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          <TooltipContent>
            Imprimir
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PrintFieldSelector
        open={showPrintDialog}
        onOpenChange={setShowPrintDialog}
        onPrint={handlePrintSpecificLine}
      />
    </>
  );
};
