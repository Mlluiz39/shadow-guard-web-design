
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthPage from "@/components/AuthPage";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Configuracoes from "./pages/Configuracoes";
import Operations from "./pages/Operations";
import Financeiro from "./pages/Financeiro";
import GridOperacional from "./pages/GridOperacional";
import SolicitacoesEscolta from "./pages/SolicitacoesEscolta";
import AgentesDisponiveis from "./pages/AgentesDisponiveis";
import Clientes from "./pages/Clientes";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import DashboardFinanceiro from "./pages/financeiro/DashboardFinanceiro";
import LancamentosCaixa from "./pages/financeiro/LancamentosCaixa";
import Contas from "./pages/financeiro/Contas";
import CentrosCusto from "./pages/financeiro/CentrosCusto";
import FormasPagamento from "./pages/financeiro/FormasPagamento";
import CondicoesPagamento from "./pages/financeiro/CondicoesPagamento";
import Feriados from "./pages/financeiro/Feriados";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/configuracoes"
              element={
                <ProtectedRoute>
                  <Configuracoes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/operacoes"
              element={
                <ProtectedRoute>
                  <Operations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro"
              element={
                <ProtectedRoute>
                  <Financeiro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardFinanceiro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/lancamentos"
              element={
                <ProtectedRoute>
                  <LancamentosCaixa />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/contas"
              element={
                <ProtectedRoute>
                  <Contas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/centros-custo"
              element={
                <ProtectedRoute>
                  <CentrosCusto />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/formas-pagamento"
              element={
                <ProtectedRoute>
                  <FormasPagamento />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/condicoes-pagamento"
              element={
                <ProtectedRoute>
                  <CondicoesPagamento />
                </ProtectedRoute>
              }
            />
            <Route
              path="/financeiro/feriados"
              element={
                <ProtectedRoute>
                  <Feriados />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grid-operacional"
              element={
                <ProtectedRoute>
                  <GridOperacional />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitacoes-escolta"
              element={
                <ProtectedRoute>
                  <SolicitacoesEscolta />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agentes-disponiveis"
              element={
                <ProtectedRoute>
                  <AgentesDisponiveis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clientes"
              element={
                <ProtectedRoute>
                  <Clientes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logistica"
              element={
                <ProtectedRoute>
                  <PlaceholderPage title="Logística" />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
