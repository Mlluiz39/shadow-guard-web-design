
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { toast } from 'sonner'

export const FinanceiroDropdown = () => {
  const handleItemClick = (moduleName: string) => {
    toast.info(`Módulo ${moduleName} será implementado em breve`)
  }

  const financeiroItems = [
    { label: 'Centros de Custo' },
    { label: 'Condições de Pagamento' },
    { label: 'Contas' },
    { label: 'Dashboard Financeiro' },
    { label: 'Feriados' },
    { label: 'Formas de Pagamento' },
    { label: 'Lançamentos em Caixa' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
        >
          Financeiro
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
        {financeiroItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => handleItemClick(item.label)}
            className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
