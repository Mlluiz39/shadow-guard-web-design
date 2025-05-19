
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EscoltaFilterProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

export const EscoltaFilter = ({
  searchTerm,
  onSearchTermChange,
  onApplyFilter,
  onClearFilter
}: EscoltaFilterProps) => {
  return (
    <div className="p-4 bg-muted/50 rounded-md mb-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Input
            placeholder="Buscar por cliente, solicitação ou operador"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="mb-0"
          />
        </div>
        <Button onClick={onApplyFilter}>Aplicar Filtro</Button>
        <Button variant="outline" onClick={onClearFilter}>
          Limpar
        </Button>
      </div>
    </div>
  );
};
