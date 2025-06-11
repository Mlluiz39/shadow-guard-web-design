
import { useState } from 'react'
import { Truck, Car, Shield, MapPin, Fuel, Wrench, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useLogistica } from '@/hooks/useLogistica'

const Logistica = () => {
  const { veiculos, equipamentos, rotas, loading, getStatusCounts, updateVeiculoStatus, updateEquipamentoStatus } = useLogistica()
  const [activeTab, setActiveTab] = useState('veiculos')

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Truck className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Carregando dados de logística...</p>
          </div>
        </div>
      </div>
    )
  }

  const statusCounts = getStatusCounts()

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Disponível': return 'default'
      case 'Em Uso': return 'secondary'
      case 'Manutenção': return 'destructive'
      case 'Indisponível': return 'outline'
      case 'Danificado': return 'destructive'
      default: return 'secondary'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível': return 'text-green-600'
      case 'Em Uso': return 'text-blue-600'
      case 'Manutenção': return 'text-red-600'
      case 'Indisponível': return 'text-gray-600'
      case 'Danificado': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getCombustivelColor = (percentual: number) => {
    if (percentual >= 50) return 'text-green-600'
    if (percentual >= 25) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Truck className="h-8 w-8" />
            Logística de Segurança
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestão de frota, equipamentos e recursos operacionais
          </p>
        </div>
      </div>

      {/* Cards de Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Veículos</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.veiculos.total}</div>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="text-green-600">{statusCounts.veiculos.disponiveis} disp.</span>
              <span className="text-blue-600">{statusCounts.veiculos.emUso} uso</span>
              <span className="text-red-600">{statusCounts.veiculos.manutencao} mnt.</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipamentos</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.equipamentos.total}</div>
            <div className="flex gap-2 mt-2 text-xs">
              <span className="text-green-600">{statusCounts.equipamentos.disponiveis} disp.</span>
              <span className="text-blue-600">{statusCounts.equipamentos.emUso} uso</span>
              <span className="text-red-600">{statusCounts.equipamentos.manutencao} mnt.</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rotas Ativas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rotas.filter(r => r.ativa).length}</div>
            <p className="text-xs text-muted-foreground">de {rotas.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Combustível Médio</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(veiculos.reduce((acc, v) => acc + v.combustivel, 0) / veiculos.length)}%
            </div>
            <p className="text-xs text-muted-foreground">frota geral</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="veiculos">Veículos</TabsTrigger>
          <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
          <TabsTrigger value="rotas">Rotas</TabsTrigger>
          <TabsTrigger value="manutencao">Manutenção</TabsTrigger>
        </TabsList>

        <TabsContent value="veiculos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {veiculos.map((veiculo) => (
              <Card key={veiculo.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="font-mono">{veiculo.placa}</span>
                    <Badge variant={getStatusBadgeVariant(veiculo.status)}>
                      {veiculo.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {veiculo.marca} {veiculo.modelo} - {veiculo.ano}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Combustível:</span>
                    <span className={`font-medium ${getCombustivelColor(veiculo.combustivel)}`}>
                      {veiculo.combustivel}%
                    </span>
                  </div>
                  <Progress value={veiculo.combustivel} className="h-2" />
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>{veiculo.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">KM:</span>
                      <span>{veiculo.quilometragem.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local:</span>
                      <span>{veiculo.localizacao}</span>
                    </div>
                    {veiculo.motorista_atual && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Motorista:</span>
                        <span>{veiculo.motorista_atual}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {veiculo.status === 'Disponível' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateVeiculoStatus(veiculo.id, 'Em Uso')}
                      >
                        Alocar
                      </Button>
                    )}
                    {veiculo.status === 'Em Uso' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateVeiculoStatus(veiculo.id, 'Disponível')}
                      >
                        Liberar
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Wrench className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipamentos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipamentos.map((equipamento) => (
              <Card key={equipamento.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-base">{equipamento.nome}</span>
                    <Badge variant={getStatusBadgeVariant(equipamento.status)}>
                      {equipamento.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {equipamento.tipo} - {equipamento.modelo}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Série:</span>
                      <span className="font-mono">{equipamento.numero_serie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Local:</span>
                      <span>{equipamento.localizacao}</span>
                    </div>
                    {equipamento.responsavel_atual && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Responsável:</span>
                        <span>{equipamento.responsavel_atual}</span>
                      </div>
                    )}
                    {equipamento.validade && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Validade:</span>
                        <span>{new Date(equipamento.validade).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {equipamento.status === 'Disponível' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateEquipamentoStatus(equipamento.id, 'Em Uso')}
                      >
                        Alocar
                      </Button>
                    )}
                    {equipamento.status === 'Em Uso' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateEquipamentoStatus(equipamento.id, 'Disponível')}
                      >
                        Devolver
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Wrench className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rotas" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rotas.map((rota) => (
              <Card key={rota.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{rota.nome}</span>
                    <div className="flex gap-2">
                      <Badge variant={rota.ativa ? "default" : "secondary"}>
                        {rota.ativa ? 'Ativa' : 'Inativa'}
                      </Badge>
                      <Badge variant="outline">{rota.tipo}</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Duração:</p>
                      <p className="font-medium flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {rota.tempo_estimado} min
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Distância:</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {rota.distancia} km
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-sm">Pontos da Rota:</p>
                    <div className="space-y-1">
                      {rota.pontos.map((ponto) => (
                        <div key={ponto.id} className="flex items-center gap-2 text-sm">
                          <span className="bg-muted rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {ponto.ordem}
                          </span>
                          <span>{ponto.nome}</span>
                          <Badge variant="outline" className="text-xs">
                            {ponto.tipo}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      Iniciar Rota
                    </Button>
                    <Button size="sm" variant="ghost">
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manutencao" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Veículos em Manutenção */}
            <Card>
              <CardHeader>
                <CardTitle>Veículos - Agenda de Manutenção</CardTitle>
                <CardDescription>Próximas manutenções programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {veiculos.map((veiculo) => (
                    <div key={veiculo.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{veiculo.placa} - {veiculo.modelo}</p>
                        <p className="text-sm text-muted-foreground">
                          KM atual: {veiculo.quilometragem.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">Próxima manutenção:</p>
                        <p className="font-medium">
                          {veiculo.proxima_manutencao ? 
                            new Date(veiculo.proxima_manutencao).toLocaleDateString() : 
                            'Não agendada'
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipamentos - Manutenção */}
            <Card>
              <CardHeader>
                <CardTitle>Equipamentos - Status de Manutenção</CardTitle>
                <CardDescription>Equipamentos que necessitam atenção</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {equipamentos.map((equipamento) => (
                    <div key={equipamento.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{equipamento.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {equipamento.tipo} - {equipamento.numero_serie}
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <Badge variant={getStatusBadgeVariant(equipamento.status)}>
                          {equipamento.status}
                        </Badge>
                        {equipamento.validade && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Val: {new Date(equipamento.validade).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Logistica
