
import { useState } from "react";
import { Logo } from "./Logo";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Settings, 
  DollarSign, 
  FileText, 
  MapPin, 
  Car, 
  Archive,
  BarChart4,
  Menu,
  LogOut,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useEffect } from "react";
import { set } from "date-fns";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
}

const NavItem = ({ icon: Icon, label, to, collapsed }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink to={to} className="w-full">
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span>{label}</span>}
      </div>
    </NavLink>
  );
};

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState("Usuário");
  const [role, setRole] = useState("...");
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar informações do usuário do localStorage
    const storedUser = localStorage.getItem('proteqrvUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username || "Usuário");
      setRole(user.role || "usuário");
      
    }
  }, []);

  const handleLogout = () => {
    // Remover dados de autenticação - corrigindo o nome da chave para proteqrvLoggedIn
    localStorage.removeItem('proteqrvLoggedIn');
    toast.success("Logout realizado com sucesso.");
    navigate("/", { replace: true });
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex-1 flex justify-center md:justify-start">
          {collapsed ? <Logo variant="icon" /> : <Logo />}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground md:flex hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        <NavItem icon={BarChart4} label="Comercial" to="/dashboard" collapsed={collapsed} />
        <NavItem icon={Settings} label="Configurações" to="/configuracoes" collapsed={collapsed} />
        <NavItem icon={MapPin} label="Escolta" to="/escolta" collapsed={collapsed} />
        <NavItem icon={DollarSign} label="Financeiro" to="/financeiro" collapsed={collapsed} />
        <NavItem icon={Car} label="Frotas" to="/frotas" collapsed={collapsed} />
        <NavItem icon={FileText} label="Operacional" to="/operacional" collapsed={collapsed} />
        <NavItem icon={Archive} label="Suprimentos" to="/suprimentos" collapsed={collapsed} />
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="flex flex-col gap-1">
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <UserCircle className="h-5 w-5 text-sidebar-foreground" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">{username}</span>
                <span className="text-xs text-sidebar-foreground/70">{role}</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
