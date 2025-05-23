
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface EmpresasSearchProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export const EmpresasSearch = ({ searchTerm, onSearchChange }: EmpresasSearchProps) => {
  return (
    <div className="relative w-72">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Buscar empresas..." 
        className="pl-8"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}
