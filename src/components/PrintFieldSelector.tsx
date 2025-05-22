
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";

interface PrintOption {
  id: string;
  label: string;
}

interface PrintFieldSelectorProps {
  options: PrintOption[];
  onPrint: (selectedFields: string[], specificCode?: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrintFieldSelector = ({
  options,
  onPrint,
  open,
  onOpenChange
}: PrintFieldSelectorProps) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [specificCode, setSpecificCode] = useState<string>("");
  const [printMode, setPrintMode] = useState<"fields" | "specific-code">("fields");

  const handleSelectField = (fieldId: string) => {
    // If selecting the code field, switch to specific code mode
    if (fieldId === "cod") {
      setPrintMode("specific-code");
      setSelectedFields([fieldId]);
    } else {
      // If we're already in specific code mode and selecting a different field
      if (printMode === "specific-code" && selectedFields.includes("cod")) {
        setPrintMode("fields");
        setSelectedFields([fieldId]);
        setSpecificCode("");
      } else {
        setSelectedFields(prev => 
          prev.includes(fieldId) 
            ? prev.filter(id => id !== fieldId) 
            : [...prev, fieldId]
        );
      }
    }
  };

  const handlePrint = () => {
    if (printMode === "specific-code" && specificCode) {
      onPrint(["cod"], specificCode);
    } else {
      onPrint(selectedFields);
    }
    onOpenChange(false);
  };

  // Reset state when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedFields([]);
      setSpecificCode("");
      setPrintMode("fields");
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar campos para impressão</DialogTitle>
          <DialogDescription>
            Selecione os campos que deseja imprimir ou um código específico para imprimir completo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {options.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox 
                id={option.id} 
                checked={selectedFields.includes(option.id)}
                onCheckedChange={() => handleSelectField(option.id)}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}

          {printMode === "specific-code" && (
            <div className="mt-4 border-t pt-4">
              <Label htmlFor="specific-code">Digite o código específico para impressão completa:</Label>
              <Input 
                id="specific-code"
                className="mt-2"
                placeholder="Informe o código"
                value={specificCode}
                onChange={(e) => setSpecificCode(e.target.value)}
              />
            </div>
          )}

          {options.length > 0 && (
            <div className="text-sm text-muted-foreground mt-2">
              {printMode === "specific-code" 
                ? "A impressão mostrará todos os detalhes do código especificado." 
                : "Se nenhum campo for selecionado, toda a tela será impressa."}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button 
            onClick={handlePrint}
            disabled={printMode === "specific-code" && !specificCode}
          >
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintFieldSelector;
