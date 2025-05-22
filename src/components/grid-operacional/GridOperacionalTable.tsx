
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
                  <TableHead className="font-semibold" data-field="cod">Cód</TableHead>
                  <TableHead className="font-semibold" data-field="dataSolicitacao">Data Solicitação</TableHead>
                  <TableHead className="font-semibold" data-field="mtsOs">MTS-OS</TableHead>
                  <TableHead className="font-semibold" data-field="cliente">Cliente</TableHead>
                  <TableHead className="font-semibold" data-field="placaAuto">Placa Auto</TableHead>
                  <TableHead className="font-semibold" data-field="parceiro">Parceiro</TableHead>
                  <TableHead className="font-semibold" data-field="agente1">Agente 1</TableHead>
                  <TableHead className="font-semibold" data-field="agente2">Agente 2</TableHead>
                  <TableHead className="font-semibold" data-field="vtr">VTR</TableHead>
                  <TableHead className="font-semibold" data-field="origem">Origem</TableHead>
                  <TableHead className="font-semibold" data-field="destino">Destino</TableHead>
                  <TableHead className="font-semibold" data-field="dataMissao">Data Missão</TableHead>
                  <TableHead className="font-semibold" data-field="horaMissao">Hora Missão</TableHead>
                  <TableHead className="font-semibold" data-field="horaEquipe">Hora Equipe</TableHead>
                  <TableHead className="font-semibold" data-field="horaInicioReal">Hora Início Real</TableHead>
                  <TableHead className="font-semibold" data-field="kmInicio">KM Início</TableHead>
                  <TableHead className="font-semibold" data-field="dataFimMissao">Data Fim Missão</TableHead>
                  <TableHead className="font-semibold" data-field="kmFinal">KM Final</TableHead>
                  <TableHead className="font-semibold" data-field="horaFinal">Hora Final</TableHead>
                  <TableHead className="font-semibold" data-field="status">Status</TableHead>
                  <TableHead className="font-semibold" data-field="totalHoraMissao">Total Hora Missão</TableHead>
                  <TableHead className="font-semibold" data-field="kmTotal">KM Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.map((item) => (
                  <TableRow key={item.cod}>
                    <TableCell data-field="cod">{item.cod}</TableCell>
                    <TableCell data-field="dataSolicitacao">{item.dataSolicitacao}</TableCell>
                    <TableCell data-field="mtsOs">{item.mtsOs}</TableCell>
                    <TableCell data-field="cliente">{item.cliente}</TableCell>
                    <TableCell data-field="placaAuto">{item.placaAuto}</TableCell>
                    <TableCell data-field="parceiro">{item.parceiro}</TableCell>
                    <TableCell data-field="agente1">{item.agente1}</TableCell>
                    <TableCell data-field="agente2">{item.agente2}</TableCell>
                    <TableCell data-field="vtr">{item.vtr}</TableCell>
                    <TableCell data-field="origem">{item.origem}</TableCell>
                    <TableCell data-field="destino">{item.destino}</TableCell>
                    <TableCell data-field="dataMissao">{item.dataMissao}</TableCell>
                    <TableCell data-field="horaMissao">{item.horaMissao}</TableCell>
                    <TableCell data-field="horaEquipe">{item.horaEquipe}</TableCell>
                    <TableCell data-field="horaInicioReal">{item.horaInicioReal}</TableCell>
                    <TableCell data-field="kmInicio">{item.kmInicio}</TableCell>
                    <TableCell data-field="dataFimMissao">{item.dataFimMissao}</TableCell>
                    <TableCell data-field="kmFinal">{item.kmFinal}</TableCell>
                    <TableCell data-field="horaFinal">{item.horaFinal}</TableCell>
                    <TableCell data-field="status">{item.status}</TableCell>
                    <TableCell data-field="totalHoraMissao">{item.totalHoraMissao}</TableCell>
                    <TableCell data-field="kmTotal">{item.kmTotal}</TableCell>
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
