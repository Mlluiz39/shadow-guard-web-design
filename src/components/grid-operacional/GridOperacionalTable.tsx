
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import { GridOperacionalItem } from './types'

interface GridOperacionalTableProps {
  dados: GridOperacionalItem[]
  totalRegistros: number
  onEdit?: (item: GridOperacionalItem) => void
}

export const GridOperacionalTable = ({
  dados,
  totalRegistros,
  onEdit,
}: GridOperacionalTableProps) => {
  // Títulos das colunas
  const colunas = [
    "Ações", "Cód", "Data Solicitação", "MTS-OS", "Cliente", "Placa Auto", 
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
                    <TableCell className="text-center">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
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
