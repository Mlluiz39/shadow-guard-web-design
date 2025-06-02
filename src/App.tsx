import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Dashboard from './pages/Dashboard'
import PlaceholderPage from './pages/PlaceholderPage'
import NotFound from './pages/NotFound'
import Operations from './pages/Operations'
import Financeiro from './pages/Financeiro'
import Configuracoes from './pages/Configuracoes'
import CentrosCusto from './pages/financeiro/CentrosCusto'
import CondicoesPagamento from './pages/financeiro/CondicoesPagamento'
import Contas from './pages/financeiro/Contas'
import DashboardFinanceiro from './pages/financeiro/DashboardFinanceiro'
import Feriados from './pages/financeiro/Feriados'
import FormasPagamento from './pages/financeiro/FormasPagamento'
import LancamentosCaixa from './pages/financeiro/LancamentosCaixa'
import {
  DollarSign,
  FileText,
  Archive,
  BarChart4,
} from 'lucide-react'
import { useEffect, useState } from 'react'

// Componente para proteção de rotas - corrigido para evitar loops de renderização
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Verificando apenas uma vez na montagem do componente
    const isLoggedIn = localStorage.getItem('proteqrvLoggedIn') === 'true'
    setIsAuthenticated(isLoggedIn)
  }, []) // Array de dependências vazio para executar apenas uma vez

  if (isAuthenticated === null) {
    // Estado de carregamento, poderia mostrar um spinner aqui
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <ProtectedRoute>
                <Layout>
                  <Configuracoes />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro"
            element={
              <ProtectedRoute>
                <Layout>
                  <Financeiro />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/centros-custo"
            element={
              <ProtectedRoute>
                <Layout>
                  <CentrosCusto />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/condicoes-pagamento"
            element={
              <ProtectedRoute>
                <Layout>
                  <CondicoesPagamento />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/contas"
            element={
              <ProtectedRoute>
                <Layout>
                  <Contas />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardFinanceiro />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/feriados"
            element={
              <ProtectedRoute>
                <Layout>
                  <Feriados />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/formas-pagamento"
            element={
              <ProtectedRoute>
                <Layout>
                  <FormasPagamento />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/financeiro/lancamentos-caixa"
            element={
              <ProtectedRoute>
                <Layout>
                  <LancamentosCaixa />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operacoes/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Operations />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/logistica"
            element={
              <ProtectedRoute>
                <Layout>
                  <PlaceholderPage
                    title="Logística"
                    icon={<Archive className="h-6 w-6" />}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/comercial"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
