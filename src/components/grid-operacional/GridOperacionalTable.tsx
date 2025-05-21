
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { GridOperacionalItem } from "./types";

interface GridOperacionalTableProps {
  dados: GridOperacionalItem[];
  totalRegistros: number;
}

export const GridOperacionalTable = ({ dados, totalRegistros }: GridOperacionalTableProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Cód</TableHead>
                  <TableHead className="font-semibold">Data Solicitação</TableHead>
                  <TableHead className="font-semibold">MTS-OS</TableHead>
                  <TableHead className="font-semibold">Cliente</TableHead>
                  <TableHead className="font-semibold">Placa Auto</TableHead>
                  <TableHead className="font-semibold">Parceiro</TableHead>
                  <TableHead className="font-semibold">Agente 1</TableHead>
                  <TableHead className="font-semibold">Agente 2</TableHead>
                  <TableHead className="font-semibold">VTR</TableHead>
                  <TableHead className="font-semibold">Origem</TableHead>
                  <TableHead className="font-semibold">Destino</TableHead>
                  <TableHead className="font-semibold">Data Missão</TableHead>
                  <TableHead className="font-semibold">Hora Missão</TableHead>
                  <TableHead className="font-semibold">Hora Equipe</TableHead>
                  <TableHead className="font-semibold">Hora Início Real</TableHead>
                  <TableHead className="font-semibold">KM Início</TableHead>
                  <TableHead className="font-semibold">Data Fim Missão</TableHead>
                  <TableHead className="font-semibold">KM Final</TableHead>
                  <TableHead className="font-semibold">Hora Final</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Total Hora Missão</TableHead>
                  <TableHead className="font-semibold">KM Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.map((item) => (
                  <TableRow key={item.cod}>
                    <TableCell>{item.cod}</TableCell>
                    <TableCell>{item.dataSolicitacao}</TableCell>
                    <TableCell>{item.mtsOs}</TableCell>
                    <TableCell>{item.cliente}</TableCell>
                    <TableCell>{item.placaAuto}</TableCell>
                    <TableCell>{item.parceiro}</TableCell>
                    <TableCell>{item.agente1}</TableCell>
                    <TableCell>{item.agente2}</TableCell>
                    <TableCell>{item.vtr}</TableCell>
                    <TableCell>{item.origem}</TableCell>
                    <TableCell>{item.destino}</TableCell>
                    <TableCell>{item.dataMissao}</TableCell>
                    <TableCell>{item.horaMissao}</TableCell>
                    <TableCell>{item.horaEquipe}</TableCell>
                    <TableCell>{item.horaInicioReal}</TableCell>
                    <TableCell>{item.kmInicio}</TableCell>
                    <TableCell>{item.dataFimMissao}</TableCell>
                    <TableCell>{item.kmFinal}</TableCell>
                    <TableCell>{item.horaFinal}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.totalHoraMissao}</TableCell>
                    <TableCell>{item.kmTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Mostrando {dados.length} de {totalRegistros} registros
        </div>
        <div>Última atualização: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};
