
import { 
  Calendar,
  MapPin,
  User,
  FileText,
  Phone
} from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface EscoltaItem {
  id: number;
  cliente: string;
  solicitacao: string;
  dataInicioPrevisto: string;
  origem: string;
  destino: string;
  tratativas: string;
  operador: string;
  numeroEO: string;
}

interface EscoltaTableProps {
  escoltas: EscoltaItem[];
  totalEscoltas: number;
}

export const EscoltaTable = ({ escoltas, totalEscoltas }: EscoltaTableProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold" data-field="cliente">
                    Cliente
                  </TableHead>
                  <TableHead className="font-semibold" data-field="solicitacao">
                    Solicitação
                  </TableHead>
                  <TableHead className="font-semibold" data-field="dataInicio">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> Data Início Previsto
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold" data-field="origem">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> Origem
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold" data-field="destino">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> Destino
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold" data-field="tratativas">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" /> Tratativas
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold" data-field="operador">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> Operador
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold" data-field="numeroEO">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" /> Número E.O
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    Espelhamento
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {escoltas.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.solicitacao}</TableCell>
                    <TableCell>{item.dataInicioPrevisto}</TableCell>
                    <TableCell>{item.origem}</TableCell>
                    <TableCell>{item.destino}</TableCell>
                    <TableCell>{item.tratativas}</TableCell>
                    <TableCell>{item.operador}</TableCell>
                    <TableCell>{item.numeroEO}</TableCell>
                    <TableCell>{item.espelhamento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Mostrando {escoltas.length} de {totalEscoltas} registros
        </div>
        <div>Última atualização: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};
