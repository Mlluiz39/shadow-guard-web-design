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
  // Títulos das colunas
  const colunas = [
    "Cód", "Data Solicitação", "MTS-OS", "Cliente", "Placa Auto", 
    "Parceiro", "Agente 1", "Agente 2", "VTR", "Origem", "Destino", 
    "Data Inicio Missão", "Hora Missão", "Hora Equipe", "Hora Início Real", 
    "KM Início", "Data Fim Missão", "KM Final", "Hora Final", "Status", 
    "Total Hora Missão", "KM Total"
  ];

  return (
    <div className="space-y-4">
      <Card className="shadow-lg rounded-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full bg-white rounded-lg shadow-md">
              <TableHeader className="bg-blue-100">
                <TableRow>
                  {colunas.map((titulo, index) => (
                    <TableHead 
                      key={index} 
                      className="font-semibold whitespace-nowrap p-2 text-center text-black"
                    >
                      {titulo}
                    </TableHead>
                  ))}
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
                  <TableRow 
                    key={item.cod} 
                    className="hover:bg-gray-200 even:bg-gray-50"
                  >
                    <TableCell className="p-2 text-center">{item.cod}</TableCell>
                    <TableCell className="p-2 text-center">{item.dataSolicitacao}</TableCell>
                    <TableCell className="p-2 text-center">{item.mtsOs}</TableCell>
                    <TableCell className="p-2 text-center">{item.cliente}</TableCell>
                    <TableCell className="p-2 text-center">{item.placaAuto}</TableCell>
                    <TableCell className="p-2 text-center">{item.parceiro}</TableCell>
                    <TableCell className="p-2 text-center">{item.agente1}</TableCell>
                    <TableCell className="p-2 text-center">{item.agente2}</TableCell>
                    <TableCell className="p-2 text-center">{item.vtr}</TableCell>
                    <TableCell className="p-2 text-center">{item.origem}</TableCell>
                    <TableCell className="p-2 text-center">{item.destino}</TableCell>
                    <TableCell className="p-2 text-center">{item.dataMissao}</TableCell>
                    <TableCell className="p-2 text-center">{item.horaMissao}</TableCell>
                    <TableCell className="p-2 text-center">{item.horaEquipe}</TableCell>
                    <TableCell className="p-2 text-center">{item.horaInicioReal}</TableCell>
                    <TableCell className="p-2 text-center">{item.kmInicio}</TableCell>
                    <TableCell className="p-2 text-center">{item.dataFimMissao}</TableCell>
                    <TableCell className="p-2 text-center">{item.kmFinal}</TableCell>
                    <TableCell className="p-2 text-center">{item.horaFinal}</TableCell>
                    <TableCell className="p-2 text-center">{item.status}</TableCell>
                    <TableCell className="p-2 text-center">{item.totalHoraMissao}</TableCell>
                    <TableCell className="p-2 text-center">{item.kmTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">

        <div>
          Mostrando {dados.length} de {totalRegistros} registros
        </div>
        <div>Última atualização: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};
