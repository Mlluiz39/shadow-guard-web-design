
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { Cliente } from '@/types/cliente'

interface ClientesTableProps {
  clientes: Cliente[]
  onView: (cliente: Cliente) => void
  onEdit: (cliente: Cliente) => void
  onDelete: (id: string) => void
}

export const ClientesTable = ({ clientes, onView, onEdit, onDelete }: ClientesTableProps) => {
  const getStatusColor = (status: Cliente['status']) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800'
      case 'Inativo':
        return 'bg-gray-100 text-gray-800'
      case 'Suspenso':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Razão Social</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Contrato</TableHead>
            <TableHead>Pasta Nº</TableHead>
            <TableHead>Data Importação</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow key={cliente.id}>
              <TableCell className="font-medium">{cliente.nome}</TableCell>
              <TableCell>{cliente.razaoSocial}</TableCell>
              <TableCell>{cliente.documento}</TableCell>
              <TableCell>{cliente.telefone}</TableCell>
              <TableCell>{cliente.contrato}</TableCell>
              <TableCell>{cliente.pastaN}</TableCell>
              <TableCell>{cliente.dataImportacao}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(cliente.status)}>
                  {cliente.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(cliente)}
                    title="Visualizar"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(cliente)}
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(cliente.id)}
                    title="Excluir"
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
