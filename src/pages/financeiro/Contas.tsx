
import { Wallet, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const Contas = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const contas = [
    { 
      id: '1', 
      nome: 'Conta Corrente Principal', 
      banco: 'Banco do Brasil', 
      agencia: '1234-5', 
      conta: '67890-1', 
      tipo: 'Corrente',
      saldo: 25450.30,
      ativo: true 
    },
    { 
      id: '2', 
      nome: 'Poupança Reserva', 
      banco: 'Caixa Econômica', 
      agencia: '9876', 
      conta: '54321-0', 
      tipo: 'Poupança',
      saldo: 12800.00,
      ativo: true 
    },
    { 
      id: '3', 
      nome: 'Conta Investimentos', 
      banco: 'Santander', 
      agencia: '5555', 
      conta: '11111-1', 
      tipo: 'Investimento',
      saldo: 50000.00,
      ativo: true 
    }
  ]

  const filteredContas = contas.filter(conta =>
    conta.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conta.banco.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Contas Financeiras</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Saldo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(contas.reduce((total, conta) => total + conta.saldo, 0))}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Contas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {contas.filter(conta => conta.ativo).length}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bancos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Set(contas.map(conta => conta.banco)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Contas</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou banco..."
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
                <TableHead>Nome da Conta</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Agência</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContas.map((conta) => (
                <TableRow key={conta.id}>
                  <TableCell className="font-medium">{conta.nome}</TableCell>
                  <TableCell>{conta.banco}</TableCell>
                  <TableCell className="font-mono">{conta.agencia}</TableCell>
                  <TableCell className="font-mono">{conta.conta}</TableCell>
                  <TableCell>{conta.tipo}</TableCell>
                  <TableCell className="font-bold text-green-600">
                    {formatCurrency(conta.saldo)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={conta.ativo ? "default" : "secondary"}>
                      {conta.ativo ? 'Ativa' : 'Inativa'}
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

export default Contas
