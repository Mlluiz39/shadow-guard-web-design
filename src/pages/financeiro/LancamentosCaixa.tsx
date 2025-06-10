
import { Receipt, Plus, Search, Filter, Download } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const LancamentosCaixa = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const lancamentos = [
    { 
      id: '1', 
      data: '15/12/2024', 
      descricao: 'Pagamento de Salários', 
      tipo: 'Saída', 
      valor: -15000.00, 
      categoria: 'Folha de Pagamento',
      conta: 'Conta Corrente Principal'
    },
    { 
      id: '2', 
      data: '14/12/2024', 
      descricao: 'Serviços de Segurança', 
      tipo: 'Entrada', 
      valor: 8500.00, 
      categoria: 'Receitas',
      conta: 'Conta Corrente Principal'
    },
    { 
      id: '3', 
      data: '10/12/2024', 
      descricao: 'Aluguel do Escritório', 
      tipo: 'Saída', 
      valor: -3200.00, 
      categoria: 'Despesas Fixas',
      conta: 'Conta Corrente Principal'
    },
    { 
      id: '4', 
      data: '08/12/2024', 
      descricao: 'Consultoria Jurídica', 
      tipo: 'Entrada', 
      valor: 5000.00, 
      categoria: 'Receitas',
      conta: 'Conta Corrente Principal'
    },
    { 
      id: '5', 
      data: '05/12/2024', 
      descricao: 'Combustível Veículos', 
      tipo: 'Saída', 
      valor: -2800.00, 
      categoria: 'Despesas Operacionais',
      conta: 'Conta Corrente Principal'
    }
  ]

  const filteredLancamentos = lancamentos.filter(lancamento =>
    lancamento.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lancamento.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const totalEntradas = lancamentos.filter(l => l.tipo === 'Entrada').reduce((sum, l) => sum + l.valor, 0)
  const totalSaidas = lancamentos.filter(l => l.tipo === 'Saída').reduce((sum, l) => sum + Math.abs(l.valor), 0)
  const saldo = totalEntradas - totalSaidas

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Lançamentos em Caixa</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalEntradas)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Saídas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalSaidas)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(saldo)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Lançamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{lancamentos.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Movimentações Financeiras</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar lançamentos..."
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
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLancamentos.map((lancamento) => (
                <TableRow key={lancamento.id}>
                  <TableCell>{lancamento.data}</TableCell>
                  <TableCell className="font-medium">{lancamento.descricao}</TableCell>
                  <TableCell>{lancamento.categoria}</TableCell>
                  <TableCell>{lancamento.conta}</TableCell>
                  <TableCell>
                    <Badge variant={lancamento.tipo === 'Entrada' ? "default" : "destructive"}>
                      {lancamento.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${lancamento.valor >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(lancamento.valor))}
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

export default LancamentosCaixa
