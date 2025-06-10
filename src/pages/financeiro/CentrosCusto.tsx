
import { Building, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const CentrosCusto = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const centrosCusto = [
    { id: '1', codigo: 'OP001', nome: 'Operações', descricao: 'Centro de custo operacional', ativo: true },
    { id: '2', codigo: 'ADM001', nome: 'Administrativo', descricao: 'Setor administrativo', ativo: true },
    { id: '3', codigo: 'COM001', nome: 'Comercial', descricao: 'Setor comercial e vendas', ativo: true },
    { id: '4', codigo: 'TI001', nome: 'Tecnologia', descricao: 'Departamento de TI', ativo: true },
    { id: '5', codigo: 'RH001', nome: 'Recursos Humanos', descricao: 'Setor de RH', ativo: false }
  ]

  const filteredCentros = centrosCusto.filter(centro =>
    centro.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    centro.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Centros de Custo</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Centro de Custo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Centros de Custo</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCentros.map((centro) => (
                <TableRow key={centro.id}>
                  <TableCell className="font-mono">{centro.codigo}</TableCell>
                  <TableCell className="font-medium">{centro.nome}</TableCell>
                  <TableCell>{centro.descricao}</TableCell>
                  <TableCell>
                    <Badge variant={centro.ativo ? "default" : "secondary"}>
                      {centro.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default CentrosCusto
