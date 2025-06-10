
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FuncionariosSearchProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export const FuncionariosSearch = ({ searchTerm, onSearchChange }: FuncionariosSearchProps) => {
  return (
    <div className="relative w-72">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Buscar funcionários..." 
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
