
import { Calculator, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DashboardFinanceiro = () => {
  const metricas = [
    {
      titulo: 'Receitas do Mês',
      valor: 'R$ 45.231,50',
      icone: TrendingUp,
      cor: 'text-green-600',
      variacao: '+12.5%'
    },
    {
      titulo: 'Despesas do Mês',
      valor: 'R$ 23.456,80',
      icone: TrendingDown,
      cor: 'text-red-600',
      variacao: '-5.2%'
    },
    {
      titulo: 'Saldo Atual',
      valor: 'R$ 21.774,70',
      icone: DollarSign,
      cor: 'text-blue-600',
      variacao: '+18.3%'
    },
    {
      titulo: 'Contas a Receber',
      valor: 'R$ 12.890,30',
      icone: Calculator,
      cor: 'text-orange-600',
      variacao: '+3.7%'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricas.map((metrica, index) => {
          const IconeComponent = metrica.icone
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metrica.titulo}
                </CardTitle>
                <IconeComponent className={`h-4 w-4 ${metrica.cor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrica.valor}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metrica.cor}>{metrica.variacao}</span> desde o mês passado
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { descricao: 'Pagamento de Salários', valor: '-R$ 15.000,00', data: '15/12/2024' },
                { descricao: 'Serviços Prestados', valor: '+R$ 8.500,00', data: '14/12/2024' },
                { descricao: 'Aluguel', valor: '-R$ 3.200,00', data: '10/12/2024' },
                { descricao: 'Consultoria', valor: '+R$ 5.000,00', data: '08/12/2024' }
              ].map((mov, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{mov.descricao}</p>
                    <p className="text-sm text-muted-foreground">{mov.data}</p>
                  </div>
                  <span className={`font-bold ${mov.valor.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {mov.valor}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Centros de Custo - Top 5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: 'Operações', valor: 'R$ 12.500,00', percentual: 45 },
                { nome: 'Administrativo', valor: 'R$ 8.200,00', percentual: 30 },
                { nome: 'Comercial', valor: 'R$ 4.100,00', percentual: 15 },
                { nome: 'TI', valor: 'R$ 2.200,00', percentual: 8 },
                { nome: 'RH', valor: 'R$ 600,00', percentual: 2 }
              ].map((centro, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{centro.nome}</span>
                    <span className="font-bold">{centro.valor}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${centro.percentual}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardFinanceiro
