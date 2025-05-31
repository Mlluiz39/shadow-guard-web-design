
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, X } from 'lucide-react'

interface ClientesFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onClearFilters: () => void
}

export const ClientesFilter = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onClearFilters,
}: ClientesFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg border">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por nome, documento ou razão social..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Ativo">Ativo</SelectItem>
            <SelectItem value="Inativo">Inativo</SelectItem>
            <SelectItem value="Suspenso">Suspenso</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" onClick={onClearFilters}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
