
import { Calendar, Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const Feriados = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const feriados = [
    { id: '1', nome: 'Confraternização Universal', data: '01/01/2024', tipo: 'Nacional', ativo: true },
    { id: '2', nome: 'Carnaval', data: '13/02/2024', tipo: 'Nacional', ativo: true },
    { id: '3', nome: 'Paixão de Cristo', data: '29/03/2024', tipo: 'Nacional', ativo: true },
    { id: '4', nome: 'Tiradentes', data: '21/04/2024', tipo: 'Nacional', ativo: true },
    { id: '5', nome: 'Dia do Trabalhador', data: '01/05/2024', tipo: 'Nacional', ativo: true },
    { id: '6', nome: 'Independência do Brasil', data: '07/09/2024', tipo: 'Nacional', ativo: true },
    { id: '7', nome: 'Nossa Senhora Aparecida', data: '12/10/2024', tipo: 'Nacional', ativo: true },
    { id: '8', nome: 'Finados', data: '02/11/2024', tipo: 'Nacional', ativo: true },
    { id: '9', nome: 'Proclamação da República', data: '15/11/2024', tipo: 'Nacional', ativo: true },
    { id: '10', nome: 'Natal', data: '25/12/2024', tipo: 'Nacional', ativo: true },
    { id: '11', nome: 'Aniversário da Cidade', data: '25/01/2024', tipo: 'Municipal', ativo: true }
  ]

  const filteredFeriados = feriados.filter(feriado =>
    feriado.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feriado.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const feriadosNacionais = feriados.filter(f => f.tipo === 'Nacional' && f.ativo).length
  const feriadosMunicipais = feriados.filter(f => f.tipo === 'Municipal' && f.ativo).length
  const feriadosEstaduais = feriados.filter(f => f.tipo === 'Estadual' && f.ativo).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Calendário de Feriados</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Feriado
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total de Feriados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{feriados.filter(f => f.ativo).length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Nacionais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{feriadosNacionais}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Estaduais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{feriadosEstaduais}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Municipais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">{feriadosMunicipais}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Feriados</CardTitle>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar feriado..."
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
                <TableHead>Nome do Feriado</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeriados.map((feriado) => (
                <TableRow key={feriado.id}>
                  <TableCell className="font-medium">{feriado.nome}</TableCell>
                  <TableCell>{feriado.data}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        feriado.tipo === 'Nacional' ? 'default' : 
                        feriado.tipo === 'Estadual' ? 'secondary' : 'outline'
                      }
                    >
                      {feriado.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={feriado.ativo ? "default" : "secondary"}>
                      {feriado.ativo ? 'Ativo' : 'Inativo'}
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

export default Feriados
