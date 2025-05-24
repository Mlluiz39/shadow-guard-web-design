
import { 
  Plus, 
  Filter, 
  HelpCircle, 
  RefreshCw 
} from "lucide-react";
import { useState } from "react";
import { ActionButton } from "./components/ActionButton";
import { PrintDropdown } from "./components/PrintDropdown";
import { HelpModal } from "./HelpModal";
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
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <ActionButton
          icon={Plus}
          tooltip="Adicionar novo registro"
          onClick={() => console.log("Adicionar novo registro")}
        />
        
        <ActionButton
          icon={Filter}
          tooltip="Filtrar resultados"
          onClick={() => onFilterToggle(!isFilterOpen)}
        />
        
        <ActionButton
          icon={HelpCircle}
          tooltip="Ajuda"
          onClick={() => setShowHelpModal(true)}
        />
        
        <PrintDropdown dados={dados} />
        
        <ActionButton
          icon={RefreshCw}
          tooltip="Atualizar dados"
          onClick={onRefresh}
        />
      </div>

      <HelpModal
        open={showHelpModal}
        onOpenChange={setShowHelpModal}
      />
    </>
  );
};
