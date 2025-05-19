
import { useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  LayoutGrid,
  Shield,
  Truck,
  BookOpen,
  Bell,
  LayoutDashboard,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface OperationsNavProps {
  className?: string;
}

const operationItems = [
  { 
    name: "Agentes disponíveis", 
    path: "/operacoes/agentes", 
    icon: <Users className="h-6 w-6" /> 
  },
  { 
    name: "Grid Operacional", 
    path: "/operacoes/grid", 
    icon: <LayoutGrid className="h-6 w-6" /> 
  },
  { 
    name: "Solicitações de escolta", 
    path: "/operacoes/escoltas", 
    icon: <Shield className="h-6 w-6" /> 
  },
  { 
    name: "Transportadoras", 
    path: "/operacoes/transportadoras", 
    icon: <Truck className="h-6 w-6" /> 
  },
  { 
    name: "Quadro Operacional", 
    path: "/operacoes/quadro", 
    icon: <LayoutGrid className="h-6 w-6" /> 
  },
  { 
    name: "Livro de ocorrências", 
    path: "/operacoes/ocorrencias", 
    icon: <BookOpen className="h-6 w-6" /> 
  },
  { 
    name: "Avisos", 
    path: "/operacoes/avisos", 
    icon: <Bell className="h-6 w-6" /> 
  },
  { 
    name: "Dashboard Chamados Equipes", 
    path: "/operacoes/chamados", 
    icon: <LayoutDashboard className="h-6 w-6" /> 
  },
  { 
    name: "Chat", 
    path: "/operacoes/chat", 
    icon: <MessageSquare className="h-6 w-6" /> 
  },
];

export function OperationsNavigation({ className }: OperationsNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", className)}>
      {operationItems.map((item) => (
        <Card
          key={item.path}
          className={cn(
            "p-4 cursor-pointer transition-all hover:shadow-md",
            location.pathname === item.path ? 
              "bg-sidebar-accent border-sidebar-accent-foreground" : 
              "hover:bg-sidebar-accent/10"
          )}
          onClick={() => navigate(item.path)}
        >
          <div className="flex items-center gap-3">
            <div className="text-sidebar-foreground">{item.icon}</div>
            <div className="font-medium">{item.name}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default OperationsNavigation;
