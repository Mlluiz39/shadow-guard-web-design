
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { GridOperacionalItem } from './types'

interface GridOperacionalTableProps {
  dados: GridOperacionalItem[]
  totalRegistros: number
}

export const GridOperacionalTable = ({
  dados,
  totalRegistros,
}: GridOperacionalTableProps) => {
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
              <TableHeader className="bg-gray-200 whitespace-nowrap">
                <TableRow>
                  {colunas.map((titulo, index) => (
                    <TableHead 
                      key={index} 
                      className="font-semibold whitespace-nowrap p-2 text-center text-black"
                      data-field={index === 0 ? "cod" : 
                                 index === 1 ? "dataSolicitacao" :
                                 index === 2 ? "mtsOs" :
                                 index === 3 ? "cliente" :
                                 index === 4 ? "placaAuto" :
                                 index === 5 ? "parceiro" :
                                 index === 6 ? "agente1" :
                                 index === 7 ? "agente2" :
                                 index === 8 ? "vtr" :
                                 index === 9 ? "origem" :
                                 index === 10 ? "destino" :
                                 index === 11 ? "dataMissao" :
                                 index === 12 ? "horaMissao" :
                                 index === 13 ? "horaEquipe" :
                                 index === 14 ? "horaInicioReal" :
                                 index === 15 ? "kmInicio" :
                                 index === 16 ? "dataFimMissao" :
                                 index === 17 ? "kmFinal" :
                                 index === 18 ? "horaFinal" :
                                 index === 19 ? "status" :
                                 index === 20 ? "totalHoraMissao" :
                                 "kmTotal"}
                    >
                      {titulo}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dados.map((item) => (
                  <TableRow
                    key={item.cod}
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
  )
}

export default GridOperacionalTable
