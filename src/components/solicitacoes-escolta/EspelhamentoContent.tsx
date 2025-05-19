
import { Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const EspelhamentoContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Espelhamento de Solicitações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] flex flex-col items-center justify-center bg-muted">
          <Info className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-center text-muted-foreground">
            Visualização de espelhamento será implementada em breve.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
