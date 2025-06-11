
import { useState } from 'react'
import { LayoutDashboard, Clock, AlertTriangle, CheckCircle, Users, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useChamados } from '@/hooks/useChamados'

const DashboardChamados = () => {
  const { chamados, metricas, loading, getKPIs } = useChamados()
  const [activeTab, setActiveTab] = useState('overview')

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <LayoutDashboard className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Carregando dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const kpis = getKPIs()

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Crítica': return 'destructive'
      case 'Alta': return 'default'
      case 'Normal': return 'secondary'
      case 'Baixa': return 'outline'
      default: return 'secondary'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto': return 'destructive'
      case 'Em Andamento': return 'default'
      case 'Resolvido': return 'default'
      case 'Cancelado': return 'secondary'
      default: return 'secondary'
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8" />
            Dashboard Chamados Equipes
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitoramento e métricas das equipes de segurança
          </p>
        </div>
      </div>

      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Chamados</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_chamados}</div>
            <p className="text-xs text-muted-foreground">últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chamados Abertos</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{kpis.chamados_abertos}</div>
            <p className="text-xs text-muted-foreground">aguardando atendimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{kpis.chamados_criticos}</div>
            <p className="text-xs text-muted-foreground">alta prioridade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.tempo_medio_resolucao}min</div>
            <p className="text-xs text-muted-foreground">resolução</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Resolução</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{kpis.taxa_resolucao}%</div>
            <p className="text-xs text-muted-foreground">eficiência</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="equipes">Equipes</TabsTrigger>
          <TabsTrigger value="chamados">Chamados Ativos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Métricas por Equipe */}
            <Card>
              <CardHeader>
                <CardTitle>Performance das Equipes</CardTitle>
                <CardDescription>Métricas de desempenho atual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {metricas.map((metrica) => (
                  <div key={metrica.equipe} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metrica.equipe}</span>
                      <span className="text-sm text-muted-foreground">
                        {metrica.eficiencia}% eficiência
                      </span>
                    </div>
                    <Progress value={metrica.eficiencia} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{metrica.chamados_ativos} ativos</span>
                      <span>{metrica.chamados_resolvidos} resolvidos</span>
                      <span>{metrica.tempo_medio_resposta}min resposta</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Chamados Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Chamados Recentes</CardTitle>
                <CardDescription>Últimas solicitações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chamados.slice(0, 5).map((chamado) => (
                    <div key={chamado.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{chamado.titulo}</p>
                        <p className="text-xs text-muted-foreground">{chamado.local}</p>
                        <div className="flex gap-2">
                          <Badge variant={getPrioridadeColor(chamado.prioridade)} className="text-xs">
                            {chamado.prioridade}
                          </Badge>
                          <Badge variant={getStatusColor(chamado.status)} className="text-xs">
                            {chamado.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <p>{chamado.equipe_responsavel}</p>
                        <p>{new Date(chamado.data_abertura).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metricas.map((metrica) => (
              <Card key={metrica.equipe}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {metrica.equipe}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Ativos</p>
                      <p className="text-2xl font-bold text-blue-600">{metrica.chamados_ativos}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Resolvidos</p>
                      <p className="text-2xl font-bold text-green-600">{metrica.chamados_resolvidos}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Tempo Médio Resposta</p>
                    <p className="text-xl font-bold">{metrica.tempo_medio_resposta} min</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Eficiência</p>
                    <Progress value={metrica.eficiencia} className="h-2 mt-1" />
                    <p className="text-right text-sm font-medium mt-1">{metrica.eficiencia}%</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chamados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chamados Ativos</CardTitle>
              <CardDescription>Chamados em andamento ou aguardando atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chamados
                  .filter(c => c.status === 'Aberto' || c.status === 'Em Andamento')
                  .map((chamado) => (
                  <div key={chamado.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{chamado.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{chamado.descricao}</p>
                        <div className="flex gap-2">
                          <Badge variant={getPrioridadeColor(chamado.prioridade)}>
                            {chamado.prioridade}
                          </Badge>
                          <Badge variant={getStatusColor(chamado.status)}>
                            {chamado.status}
                          </Badge>
                          <Badge variant="outline">{chamado.tipo}</Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{chamado.equipe_responsavel}</p>
                        <p>{chamado.agente_responsavel}</p>
                        <p>{new Date(chamado.data_abertura).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">{chamado.local}</span>
                      {chamado.tempo_resposta && (
                        <span className="text-sm text-green-600">
                          Resposta em {chamado.tempo_resposta} min
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DashboardChamados
