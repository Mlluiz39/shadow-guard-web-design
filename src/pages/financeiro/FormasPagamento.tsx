
import { CreditCard, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const FormasPagamento = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const formasPagamento = [
    { id: '1', nome: 'Dinheiro', tipo: 'À Vista', descricao: 'Pagamento em espécie', ativo: true },
    { id: '2', nome: 'PIX', tipo: 'À Vista', descricao: 'Transferência instantânea', ativo: true },
    { id: '3', nome: 'Cartão de Débito', tipo: 'À Vista', descricao: 'Débito em conta corrente', ativo: true },
    { id: '4', nome: 'Cartão de Crédito', tipo: 'Prazo', descricao: 'Crédito parcelado', ativo: true },
    { id: '5', nome: 'Boleto Bancário', tipo: 'Prazo', descricao: 'Cobrança bancária', ativo: true },
    { id: '6', nome: 'Transferência TED', tipo: 'À Vista', descricao: 'Transferência eletrônica', ativo: true },
    { id: '7', nome: 'Cheque', tipo: 'Prazo', descricao: 'Ordem de pagamento', ativo: false }
  ]

  const filteredFormas = formasPagamento.filter(forma =>
    forma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    forma.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Formas de Pagamento</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Forma de Pagamento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Formas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formasPagamento.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">À Vista</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formasPagamento.filter(f => f.tipo === 'À Vista' && f.ativo).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">A Prazo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {formasPagamento.filter(f => f.tipo === 'Prazo' && f.ativo).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Formas de Pagamento</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou tipo..."
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
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFormas.map((forma) => (
                <TableRow key={forma.id}>
                  <TableCell className="font-medium">{forma.nome}</TableCell>
                  <TableCell>
                    <Badge variant={forma.tipo === 'À Vista' ? "default" : "outline"}>
                      {forma.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>{forma.descricao}</TableCell>
                  <TableCell>
                    <Badge variant={forma.ativo ? "default" : "secondary"}>
                      {forma.ativo ? 'Ativo' : 'Inativo'}
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

export default FormasPagamento
