
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - hidden on mobile unless toggled */}
      {showSidebar && (
        <div className={`${isMobile ? "fixed inset-y-0 left-0 z-50" : ""}`}>
          <Sidebar />
          
          {/* Close overlay for mobile */}
          {isMobile && (
            <div 
              className="fixed inset-0 bg-black/20 z-40" 
              onClick={() => setShowSidebar(false)}
            />
          )}
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile header with menu button */}
        {isMobile && (
          <div className="h-16 border-b flex items-center px-4 bg-white">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(true)}
              className="mr-4"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="font-semibold text-lg">ProteQrv</div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Layout;
