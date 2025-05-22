import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

interface GridOperacionalFilterProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
  className?: string;
}

export const GridOperacionalFilter = ({ 
  searchTerm, 
  onSearchTermChange, 
  onApplyFilter, 
  onClearFilter, 
  className 
}: GridOperacionalFilterProps) => {
  return (
    <Card className={`p-4 mb-4 ${className}`}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Buscar por Cliente, Cód, Data</Label>
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Digite para buscar..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClearFilter}>
            Limpar
          </Button>
          <Button onClick={onApplyFilter}>
            Aplicar filtro
          </Button>
        </div>
      </div>
    </Card>
  );
};