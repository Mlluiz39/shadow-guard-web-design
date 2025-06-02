
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinanceiroDropdown } from "@/components/navigation/FinanceiroDropdown";
import { DollarSign } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  icon: React.ReactNode;
}

const PlaceholderPage = ({ title, icon }: PlaceholderPageProps) => {
  const isFinanceiroModule = title === "Financeiro";

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          {icon} {title}
        </h1>
        <div className="flex items-center gap-4">
          {isFinanceiroModule && <FinanceiroDropdown />}
          <div className="text-sm text-security-muted">
            Última atualização: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="text-5xl text-security-muted">{icon}</div>
          <CardTitle className="text-xl text-security">Módulo {title}</CardTitle>
          <p className="text-security-muted text-center max-w-md">
            Esta seção está em desenvolvimento. Em breve você poderá gerenciar todas as funcionalidades do módulo {title}.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
