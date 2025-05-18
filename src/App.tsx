
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import Dashboard from "./pages/Dashboard";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { 
  Settings, 
  DollarSign, 
  FileText, 
  MapPin, 
  Car, 
  Archive,
  BarChart4
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/configuracoes" element={
            <Layout>
              <PlaceholderPage title="Configurações" icon={<Settings className="h-6 w-6" />} />
            </Layout>
          } />
          <Route path="/escolta" element={
            <Layout>
              <PlaceholderPage title="Escolta" icon={<MapPin className="h-6 w-6" />} />
            </Layout>
          } />
          <Route path="/financeiro" element={
            <Layout>
              <PlaceholderPage title="Financeiro" icon={<DollarSign className="h-6 w-6" />} />
            </Layout>
          } />
          <Route path="/frotas" element={
            <Layout>
              <PlaceholderPage title="Frotas" icon={<Car className="h-6 w-6" />} />
            </Layout>
          } />
          <Route path="/operacional" element={
            <Layout>
              <PlaceholderPage title="Operacional" icon={<FileText className="h-6 w-6" />} />
            </Layout>
          } />
          <Route path="/suprimentos" element={
            <Layout>
              <PlaceholderPage title="Suprimentos" icon={<Archive className="h-6 w-6" />} />
            </Layout>
          } />
          <Route path="/comercial" element={<Navigate replace to="/dashboard" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
