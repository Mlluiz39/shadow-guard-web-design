
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
              <TableHeader className="bg-gray-200 whitespace-nowrap">
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
                  
                  <TableRow key={item.cod}
                  className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300"
                  >
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
