
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface PrintOption {
  id: string;
  label: string;
}

interface PrintFieldSelectorProps {
  options: PrintOption[];
  onPrint: (selectedFields: string[]) => void;
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

  const handleSelectField = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId) 
        : [...prev, fieldId]
    );
  };

  const handlePrint = () => {
    onPrint(selectedFields);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar campos para impressão</DialogTitle>
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
          {options.length > 0 && (
            <div className="text-sm text-muted-foreground mt-2">
              Se nenhum campo for selecionado, toda a tela será impressa.
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handlePrint}>Imprimir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrintFieldSelector;
