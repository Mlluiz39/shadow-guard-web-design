import { useNavigate, useLocation } from 'react-router-dom'
import {
  Users,
  LayoutGrid,
  Shield,
  Truck,
  BookOpen,
  Bell,
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface OperationsNavProps {
  className?: string
}

const operationItems = [
  {
    name: 'Grid Operacional',
    description: 'Gerencie as operações em tempo real',
    path: '/operacoes/grid',
    icon: <LayoutGrid className="h-6 w-6" />,
  },
  {
    name: 'Funcionarios',
    description: 'Gerencie suas equipes.',
    path: '/operacoes/quadro',
    icon: <LayoutGrid className="h-6 w-6" />,
  },
  {
    name: 'Avisos',
    description: 'Gerencie as solicitações de escoltas.',
    path: '/operacoes/avisos',
    icon: <Bell className="h-6 w-6" />,
  },
  {
    name: 'Clientes',
    description: 'Gerencie os clientes e suas informações.',
    path: '/operacoes/clientes',
    icon: <Truck className="h-6 w-6" />,
  },
  {
    name: 'Livro de ocorrências',
    description: 'Registre e visualize ocorrências operacionais.',
    path: '/operacoes/ocorrencias',
    icon: <BookOpen className="h-6 w-6" />,
  },
  {
    name: 'Dashboard Chamados Equipes',
    description: 'Visualize o desempenho das equipes.',
    path: '/operacoes/chamados',
    icon: <LayoutDashboard className="h-6 w-6" />,
  },
  {
    name: 'Chat',
    description: 'Comunique-se com as equipes em tempo real.',
    path: '/operacoes/chat',
    icon: <MessageSquare className="h-6 w-6" />,
  },
]

export function OperationsNavigation({ className }: OperationsNavProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
        className
      )}
    >
      {operationItems.map(item => (
        <Card
          key={item.path}
          className={cn(
            'p-6 cursor-pointer transition-shadow hover:shadow-md group',
            'bg-white rounded-lg border shadow-sm',
            location.pathname === item.path
              ? 'bg-sidebar-accent border-sidebar-accent-foreground'
              : 'hover:bg-sidebar-accent/10'
          )}
          onClick={() => navigate(item.path)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="text-blue-600 group-hover:text-blue-700">
              {item.icon}
            </div>
            <div className="font-semibold text-lg group-hover:text-blue-700">
              {item.name}
            </div>
          </div>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </Card>
      ))}
    </div>
  )
}

export default OperationsNavigation
