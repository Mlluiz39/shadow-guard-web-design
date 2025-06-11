
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Clock, Users, Shield, Plus, Search, Filter, Eye } from "lucide-react";

const OperationsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const operations = [
    {
      id: "OP-2024-001",
      client: "Banco Central do Brasil",
      type: "Transporte de Valores",
      status: "Em Andamento",
      priority: "Alta",
      startTime: "08:00",
      endTime: "18:00",
      route: "Brasília → São Paulo",
      team: "Equipe Alpha",
      agents: 4,
      vehicles: 2,
      description: "Transporte de valores para agências bancárias"
    },
    {
      id: "OP-2024-002",
      client: "Transportadora Premium Ltda",
      type: "Escolta Executiva",
      status: "Concluída",
      priority: "Média",
      startTime: "06:00",
      endTime: "14:00",
      route: "Rio de Janeiro → Belo Horizonte",
      team: "Equipe Bravo",
      agents: 3,
      vehicles: 2,
      description: "Escolta de executivo durante viagem de negócios"
    },
    {
      id: "OP-2024-003",
      client: "Empresa Metalúrgica Nacional",
      type: "Transporte de Carga",
      status: "Planejada",
      priority: "Alta",
      startTime: "05:00",
      endTime: "16:00",
      route: "Minas Gerais → Santos",
      team: "Equipe Charlie",
      agents: 6,
      vehicles: 3,
      description: "Transporte de metais preciosos para exportação"
    },
    {
      id: "OP-2024-004",
      client: "Joalheria Luxo Premium",
      type: "Transporte de Valores",
      status: "Em Andamento",
      priority: "Crítica",
      startTime: "10:00",
      endTime: "15:00",
      route: "São Paulo → Campinas",
      team: "Equipe Delta",
      agents: 4,
      vehicles: 2,
      description: "Transporte de joias para exposição"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Andamento": return "destructive";
      case "Concluída": return "default";
      case "Planejada": return "secondary";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Crítica": return "bg-red-100 text-red-800";
      case "Alta": return "bg-orange-100 text-orange-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOperations = operations.filter(op => {
    const matchesSearch = op.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         op.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || op.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Operações</h1>
          <p className="text-muted-foreground">Controle completo das operações de escolta armada</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Operação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Operação</DialogTitle>
              <DialogDescription>
                Preencha os dados para criar uma nova operação de escolta
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Input id="client" placeholder="Nome do cliente" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Operação</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transporte-valores">Transporte de Valores</SelectItem>
                    <SelectItem value="escolta-executiva">Escolta Executiva</SelectItem>
                    <SelectItem value="transporte-carga">Transporte de Carga</SelectItem>
                    <SelectItem value="seguranca-evento">Segurança de Evento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-time">Horário Início</Label>
                <Input id="start-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">Horário Fim</Label>
                <Input id="end-time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Origem</Label>
                <Input id="origin" placeholder="Local de origem" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino</Label>
                <Input id="destination" placeholder="Local de destino" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team">Equipe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar equipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpha">Equipe Alpha</SelectItem>
                    <SelectItem value="bravo">Equipe Bravo</SelectItem>
                    <SelectItem value="charlie">Equipe Charlie</SelectItem>
                    <SelectItem value="delta">Equipe Delta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critica">Crítica</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" placeholder="Detalhes da operação" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Criar Operação</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por cliente ou ID da operação..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
            <SelectItem value="Concluída">Concluída</SelectItem>
            <SelectItem value="Planejada">Planejada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOperations.map((operation) => (
          <Card key={operation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{operation.id}</CardTitle>
                  <CardDescription className="font-medium">{operation.client}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={getStatusColor(operation.status)}>
                    {operation.status}
                  </Badge>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(operation.priority)}`}>
                    {operation.priority}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>{operation.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{operation.team}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{operation.startTime} - {operation.endTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{operation.route}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-3">{operation.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4 text-xs text-muted-foreground">
                    <span>{operation.agents} agentes</span>
                    <span>{operation.vehicles} veículos</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OperationsPanel;
