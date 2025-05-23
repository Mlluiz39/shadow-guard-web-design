
import { FileText, Users, LayoutGrid, Shield, Truck, BookOpen, Bell, LayoutDashboard, MessageSquare } from "lucide-react";
import { Routes, Route, Navigate } from "react-router-dom";
import OperationsNavigation from "@/components/OperationsNavigation";
import PlaceholderPage from "./PlaceholderPage";
import AgentesDisponiveis from "./AgentesDisponiveis";
import QuadroOperacional from "./QuadroOperacional";
import SolicitacoesEscolta from "./SolicitacoesEscolta";
import GridOperacional from "./GridOperacional";

const Operations = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <FileText className="h-6 w-6" /> Operações
        </h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Routes>
        <Route index element={<OperationsHome />} />
        <Route path="grid" element={<GridOperacional />} />
        <Route path="escoltas" element={<SolicitacoesEscolta />} />
        <Route path="transportadoras" element={
          <PlaceholderPage 
            title="Transportadoras" 
            icon={<Truck className="h-6 w-6" />} 
          />
        } />
        <Route path="quadro" element={<QuadroOperacional />} />
        <Route path="ocorrencias" element={
          <PlaceholderPage 
            title="Livro de ocorrências" 
            icon={<BookOpen className="h-6 w-6" />} 
          />
        } />
        <Route path="avisos" element={
          <PlaceholderPage 
            title="Avisos" 
            icon={<Bell className="h-6 w-6" />} 
          />
        } />
        <Route path="chamados" element={
          <PlaceholderPage 
            title="Dashboard Chamados Equipes" 
            icon={<LayoutDashboard className="h-6 w-6" />} 
          />
        } />
        <Route path="chat" element={
          <PlaceholderPage 
            title="Chat" 
            icon={<MessageSquare className="h-6 w-6" />} 
          />
        } />
        <Route path="*" element={<Navigate to="/operacoes" replace />} />
      </Routes>
    </div>
  );
};

// Home page with the navigation menu
const OperationsHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Módulos de operações</h2>
      <OperationsNavigation />
    </div>
  );
};

export default Operations;
