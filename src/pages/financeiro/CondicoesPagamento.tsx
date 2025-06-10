
import { CreditCard, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const CondicoesPagamento = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const condicoes = [
    { id: '1', nome: 'À Vista', parcelas: 1, intervalo: 0, descricao: 'Pagamento imediato', ativo: true },
    { id: '2', nome: '30 dias', parcelas: 1, intervalo: 30, descricao: 'Pagamento em 30 dias', ativo: true },
    { id: '3', nome: '2x sem juros', parcelas: 2, intervalo: 30, descricao: 'Parcelado em 2x', ativo: true },
    { id: '4', nome: '3x sem juros', parcelas: 3, intervalo: 30, descricao: 'Parcelado em 3x', ativo: true },
    { id: '5', nome: '6x sem juros', parcelas: 6, intervalo: 30, descricao: 'Parcelado em 6x', ativo: true },
    { id: '6', nome: '12x com juros', parcelas: 12, intervalo: 30, descricao: 'Parcelado em 12x', ativo: false }
  ]

  const filteredCondicoes = condicoes.filter(condicao =>
    condicao.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Condições de Pagamento</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Condição
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{condicoes.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {condicoes.filter(c => c.ativo).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">À Vista</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {condicoes.filter(c => c.parcelas === 1 && c.ativo).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Parceladas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {condicoes.filter(c => c.parcelas > 1 && c.ativo).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Condições</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
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
                <TableHead>Nome</TableHead>
                <TableHead>Parcelas</TableHead>
                <TableHead>Intervalo (dias)</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCondicoes.map((condicao) => (
                <TableRow key={condicao.id}>
                  <TableCell className="font-medium">{condicao.nome}</TableCell>
                  <TableCell>
                    <Badge variant={condicao.parcelas === 1 ? "default" : "outline"}>
                      {condicao.parcelas}x
                    </Badge>
                  </TableCell>
                  <TableCell>{condicao.intervalo} dias</TableCell>
                  <TableCell>{condicao.descricao}</TableCell>
                  <TableCell>
                    <Badge variant={condicao.ativo ? "default" : "secondary"}>
                      {condicao.ativo ? 'Ativa' : 'Inativa'}
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

export default CondicoesPagamento
