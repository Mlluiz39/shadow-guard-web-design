
import {
  DollarSign,
  Calculator,
  Building,
  Wallet,
  CreditCard,
  Receipt,
  Calendar,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardFinanceiro from './financeiro/DashboardFinanceiro'
import CentrosCusto from './financeiro/CentrosCusto'
import Contas from './financeiro/Contas'
import FormasPagamento from './financeiro/FormasPagamento'
import CondicoesPagamento from './financeiro/CondicoesPagamento'
import LancamentosCaixa from './financeiro/LancamentosCaixa'
import Feriados from './financeiro/Feriados'

const Financeiro = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="h-6 w-6" /> Financeiro
        </h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="centros-custo" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Centros
          </TabsTrigger>
          <TabsTrigger value="contas" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Contas
          </TabsTrigger>
          <TabsTrigger value="formas-pagamento" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Formas
          </TabsTrigger>
          <TabsTrigger value="condicoes-pagamento" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Condições
          </TabsTrigger>
          <TabsTrigger value="lancamentos" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Lançamentos
          </TabsTrigger>
          <TabsTrigger value="feriados" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Feriados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardFinanceiro />
        </TabsContent>
        
        <TabsContent value="centros-custo">
          <CentrosCusto />
        </TabsContent>
        
        <TabsContent value="contas">
          <Contas />
        </TabsContent>
        
        <TabsContent value="formas-pagamento">
          <FormasPagamento />
        </TabsContent>
        
        <TabsContent value="condicoes-pagamento">
          <CondicoesPagamento />
        </TabsContent>
        
        <TabsContent value="lancamentos">
          <LancamentosCaixa />
        </TabsContent>
        
        <TabsContent value="feriados">
          <Feriados />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Financeiro
