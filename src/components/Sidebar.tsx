
import { useState } from "react";
import { Logo } from "./Logo";
import { NavLink, useLocation } from "react-router-dom";
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
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  collapsed: boolean;
  permission?: string;
}

const NavItem = ({ icon: Icon, label, to, collapsed, permission }: NavItemProps) => {
  const location = useLocation();
  const { hasPermission } = usePermissions();
  const isActive = location.pathname === to;

  if (permission && !hasPermission(permission)) {
    return null;
  }

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
  const { signOut, profile } = useAuth();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logout realizado com sucesso.");
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
        <NavItem icon={BarChart4} label="Comercial" to="/dashboard" collapsed={collapsed} permission="dashboard" />
        <NavItem icon={Settings} label="Configurações" to="/configuracoes" collapsed={collapsed} permission="configuracoes" />
        <NavItem icon={FileText} label="Operações" to="/operacoes" collapsed={collapsed} permission="operacoes" />
        <NavItem icon={DollarSign} label="Financeiro" to="/financeiro" collapsed={collapsed} permission="financeiro" />
        <NavItem icon={Car} label="Logística" to="/logistica" collapsed={collapsed} permission="logistica" />
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="flex flex-col gap-1">
          {!collapsed && profile && (
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <UserCircle className="h-5 w-5 text-sidebar-foreground" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">{profile.nome}</span>
                <span className="text-xs text-sidebar-foreground/70">{profile.perfil}</span>
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
