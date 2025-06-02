
import {
  DollarSign,
  CreditCard,
  Building,
  Calendar,
  Calculator,
  Wallet,
  Receipt,
} from 'lucide-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PlaceholderPage from './PlaceholderPage'
import { FinanceiroDropdown } from '@/components/navigation/FinanceiroDropdown'

const Financeiro = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <DollarSign className="h-6 w-6" /> Financeiro
        </h1>
        <div className="flex items-center gap-4">
          <FinanceiroDropdown />
          <div className="text-sm text-security-muted">
            Última atualização: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <Routes>
        <Route index element={<FinanceiroHome />} />
        <Route
          path="centros-custo"
          element={
            <PlaceholderPage
              title="Centros de Custo"
              icon={<Building className="h-6 w-6" />}
            />
          }
        />
        <Route
          path="condicoes-pagamento"
          element={
            <PlaceholderPage
              title="Condições de Pagamento"
              icon={<CreditCard className="h-6 w-6" />}
            />
          }
        />
        <Route
          path="contas"
          element={
            <PlaceholderPage
              title="Contas"
              icon={<Wallet className="h-6 w-6" />}
            />
          }
        />
        <Route
          path="dashboard"
          element={
            <PlaceholderPage
              title="Dashboard Financeiro"
              icon={<Calculator className="h-6 w-6" />}
            />
          }
        />
        <Route
          path="feriados"
          element={
            <PlaceholderPage
              title="Feriados"
              icon={<Calendar className="h-6 w-6" />}
            />
          }
        />
        <Route
          path="formas-pagamento"
          element={
            <PlaceholderPage
              title="Formas de Pagamento"
              icon={<CreditCard className="h-6 w-6" />}
            />
          }
        />
        <Route
          path="lancamentos-caixa"
          element={
            <PlaceholderPage
              title="Lançamentos em Caixa"
              icon={<Receipt className="h-6 w-6" />}
            />
          }
        />
        <Route path="*" element={<Navigate to="/financeiro" replace />} />
      </Routes>
    </div>
  )
}

// Home page with basic info
const FinanceiroHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Módulos Financeiros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Gestão Financeira</h3>
          <p className="text-gray-600 text-sm">
            Controle completo das operações financeiras da empresa.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Financeiro
