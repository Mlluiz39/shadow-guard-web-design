
import { useState } from 'react'
import { MoreHorizontal, Eye, Edit, Trash2, FileText, Clock } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Ocorrencia } from '@/types/ocorrencia'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface OcorrenciasTableProps {
  ocorrencias: Ocorrencia[]
}

const OcorrenciasTable = ({ ocorrencias }: OcorrenciasTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-blue-100 text-blue-800'
      case 'Em Andamento': return 'bg-yellow-100 text-yellow-800'
      case 'Resolvida': return 'bg-green-100 text-green-800'
      case 'Cancelada': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGravidadeColor = (gravidade: string) => {
    switch (gravidade) {
      case 'Baixa': return 'bg-green-100 text-green-800'
      case 'Média': return 'bg-yellow-100 text-yellow-800'
      case 'Alta': return 'bg-orange-100 text-orange-800'
      case 'Crítica': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Segurança': return '🛡️'
      case 'Emergência': return '🚨'
      case 'Manutenção': return '🔧'
      case 'Administrativa': return '📋'
      default: return '📄'
    }
  }

  if (ocorrencias.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Nenhuma ocorrência encontrada</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tipo</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Local</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Gravidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data/Hora</TableHead>
            <TableHead className="w-[50px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ocorrencias.map((ocorrencia) => (
            <TableRow key={ocorrencia.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTipoIcon(ocorrencia.tipo)}</span>
                  <span className="text-sm font-medium">{ocorrencia.tipo}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium max-w-xs">
                <div className="truncate" title={ocorrencia.titulo}>
                  {ocorrencia.titulo}
                </div>
              </TableCell>
              <TableCell>{ocorrencia.local}</TableCell>
              <TableCell>{ocorrencia.responsavel}</TableCell>
              <TableCell>
                <Badge className={getGravidadeColor(ocorrencia.gravidade)}>
                  {ocorrencia.gravidade}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(ocorrencia.status)}>
                  {ocorrencia.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {format(new Date(ocorrencia.data_hora), 'dd/MM/yyyy', { locale: ptBR })}
                  <br />
                  <span className="text-muted-foreground">
                    {format(new Date(ocorrencia.data_hora), 'HH:mm', { locale: ptBR })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default OcorrenciasTable
