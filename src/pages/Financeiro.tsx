
import {
  DollarSign,
  CreditCard,
  Building,
  Calendar,
  Calculator,
  Wallet,
  Receipt,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Financeiro = () => {
  const financeiroModules = [
    {
      title: 'Dashboard Financeiro',
      description: 'Visão geral e relatórios financeiros',
      icon: Calculator,
      path: '/financeiro/dashboard'
    },
    {
      title: 'Centros de Custo',
      description: 'Gerenciamento de centros de custo',
      icon: Building,
      path: '/financeiro/centros-custo'
    },
    {
      title: 'Contas',
      description: 'Gestão de contas bancárias e financeiras',
      icon: Wallet,
      path: '/financeiro/contas'
    },
    {
      title: 'Formas de Pagamento',
      description: 'Configuração de formas de pagamento',
      icon: CreditCard,
      path: '/financeiro/formas-pagamento'
    },
    {
      title: 'Condições de Pagamento',
      description: 'Definição de condições de pagamento',
      icon: CreditCard,
      path: '/financeiro/condicoes-pagamento'
    },
    {
      title: 'Lançamentos em Caixa',
      description: 'Registro de movimentações financeiras',
      icon: Receipt,
      path: '/financeiro/lancamentos-caixa'
    },
    {
      title: 'Feriados',
      description: 'Calendário de feriados',
      icon: Calendar,
      path: '/financeiro/feriados'
    }
  ]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <DollarSign className="h-6 w-6" /> Financeiro
        </h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-medium">Módulos Financeiros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {financeiroModules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <Link 
                key={index}
                to={module.path}
                className="p-6 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-blue-700" />
                  <h3 className="font-semibold text-lg group-hover:text-blue-700">{module.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {module.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Financeiro
