
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const FinanceiroDropdown = () => {
  const navigate = useNavigate()

  const financeiroItems = [
    { label: 'Centros de Custo', path: '/financeiro/centros-custo' },
    { label: 'Condições de Pagamento', path: '/financeiro/condicoes-pagamento' },
    { label: 'Contas', path: '/financeiro/contas' },
    { label: 'Dashboard Financeiro', path: '/financeiro/dashboard' },
    { label: 'Feriados', path: '/financeiro/feriados' },
    { label: 'Formas de Pagamento', path: '/financeiro/formas-pagamento' },
    { label: 'Lançamentos em Caixa', path: '/financeiro/lancamentos-caixa' },
  ]

  const handleItemClick = (path: string) => {
    navigate(path)
  }

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
            onClick={() => handleItemClick(item.path)}
            className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-gray-700"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
