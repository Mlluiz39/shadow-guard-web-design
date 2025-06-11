
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Bell, 
  Clock, 
  MapPin, 
  Building, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Search, 
  Filter,
  AlertTriangle,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlertsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { toast } = useToast();

  const preAlerts = [
    {
      id: "PA-2024-001",
      empresa: "Banco Central do Brasil",
      contato: "Maria Silva",
      telefone: "(11) 99999-1234",
      email: "maria.silva@bancobrasil.com.br",
      tipoServico: "Transporte de Valores",
      dataServico: "2024-12-15",
      horarioInicio: "08:00",
      horarioFim: "18:00",
      origem: "Agência Centro - São Paulo",
      destino: "Agência Zona Sul - São Paulo",
      prioridade: "Alta",
      status: "Pendente",
      observacoes: "Transporte de grande volume monetário para inauguração de nova agência",
      dataAlerta: "2024-12-10 14:30",
      valorEstimado: "R$ 25.000,00"
    },
    {
      id: "PA-2024-002",
      empresa: "Transportadora Premium Ltda",
      contato: "João Santos",
      telefone: "(21) 98888-5678",
      email: "joao.santos@premium.com.br",
      tipoServico: "Escolta Executiva",
      dataServico: "2024-12-12",
      horarioInicio: "06:00",
      horarioFim: "20:00",
      origem: "Aeroporto Internacional do Rio",
      destino: "Hotel Copacabana Palace",
      prioridade: "Crítica",
      status: "Em Análise",
      observacoes: "CEO internacional chegando para reunião estratégica",
      dataAlerta: "2024-12-09 16:45",
      valorEstimado: "R$ 15.000,00"
    },
    {
      id: "PA-2024-003",
      empresa: "Mineração Ouro Verde",
      contato: "Ana Costa",
      telefone: "(31) 97777-9012",
      email: "ana.costa@ouroverde.com.br",
      tipoServico: "Transporte de Carga Valiosa",
      dataServico: "2024-12-20",
      horarioInicio: "05:00",
      horarioFim: "16:00",
      origem: "Mina Ouro Verde - MG",
      destino: "Porto de Santos - SP",
      prioridade: "Alta",
      status: "Aprovado",
      observacoes: "Transporte de ouro refinado para exportação",
      dataAlerta: "2024-12-08 09:15",
      valorEstimado: "R$ 45.000,00"
    },
    {
      id: "PA-2024-004",
      empresa: "Joalheria Diamante Real",
      contato: "Pedro Oliveira",
      telefone: "(11) 96666-3456",
      email: "pedro@diamantereal.com.br",
      tipoServico: "Transporte de Valores",
      dataServico: "2024-12-18",
      horarioInicio: "10:00",
      horarioFim: "15:00",
      origem: "Loja Jardins - São Paulo",
      destino: "Exposição Shopping Iguatemi",
      prioridade: "Média",
      status: "Rejeitado",
      observacoes: "Coleção de joias para exposição de fim de ano",
      dataAlerta: "2024-12-07 11:20",
      valorEstimado: "R$ 8.500,00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Em Análise": return "bg-blue-100 text-blue-800";
      case "Aprovado": return "bg-green-100 text-green-800";
      case "Rejeitado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  const handleApprove = (alertId: string) => {
    toast({
      title: "Pré-alerta Aprovado",
      description: `Pré-alerta ${alertId} foi aprovado e será convertido em operação.`,
    });
  };

  const handleReject = (alertId: string) => {
    toast({
      title: "Pré-alerta Rejeitado",
      description: `Pré-alerta ${alertId} foi rejeitado.`,
      variant: "destructive",
    });
  };

  const filteredAlerts = preAlerts.filter(alert => {
    const matchesSearch = alert.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.contato.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || alert.prioridade === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const pendingAlertsCount = preAlerts.filter(alert => alert.status === "Pendente").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pré-Alertas de Escolta</h1>
          <p className="text-muted-foreground">Gerenciamento de solicitações de escolta de empresas cadastradas</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {pendingAlertsCount} Pendentes
          </Badge>
        </div>
      </div>

      {/* Alert Summary */}
      {pendingAlertsCount > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Existem {pendingAlertsCount} pré-alertas pendentes que precisam de análise.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por empresa, ID ou contato..."
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
            <SelectItem value="Pendente">Pendente</SelectItem>
            <SelectItem value="Em Análise">Em Análise</SelectItem>
            <SelectItem value="Aprovado">Aprovado</SelectItem>
            <SelectItem value="Rejeitado">Rejeitado</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Prioridades</SelectItem>
            <SelectItem value="Crítica">Crítica</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Média">Média</SelectItem>
            <SelectItem value="Baixa">Baixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{alert.id}</CardTitle>
                  <CardDescription className="font-medium text-base">{alert.empresa}</CardDescription>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(alert.prioridade)}`}>
                    {alert.prioridade}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>{alert.contato} - {alert.telefone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{alert.tipoServico}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{alert.dataServico} • {alert.horarioInicio} - {alert.horarioFim}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{alert.origem} → {alert.destino}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-3">{alert.observacoes}</p>
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm">
                    <span className="font-medium">Valor Estimado: </span>
                    <span className="text-primary font-bold">{alert.valorEstimado}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Recebido em: {alert.dataAlerta}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {alert.status === "Pendente" && (
                    <>
                      <Button 
                        size="sm" 
                        onClick={() => handleApprove(alert.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Aprovar
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleReject(alert.id)}
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Detalhes do Pré-Alerta - {alert.id}</DialogTitle>
                        <DialogDescription>
                          Informações completas da solicitação de escolta
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Empresa</Label>
                          <p className="text-sm font-medium">{alert.empresa}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Contato</Label>
                          <p className="text-sm">{alert.contato}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Telefone</Label>
                          <p className="text-sm">{alert.telefone}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>E-mail</Label>
                          <p className="text-sm">{alert.email}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo de Serviço</Label>
                          <p className="text-sm">{alert.tipoServico}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Data do Serviço</Label>
                          <p className="text-sm">{alert.dataServico}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Horário</Label>
                          <p className="text-sm">{alert.horarioInicio} - {alert.horarioFim}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Valor Estimado</Label>
                          <p className="text-sm font-bold text-primary">{alert.valorEstimado}</p>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Origem</Label>
                          <p className="text-sm">{alert.origem}</p>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Destino</Label>
                          <p className="text-sm">{alert.destino}</p>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Observações</Label>
                          <p className="text-sm">{alert.observacoes}</p>
                        </div>
                      </div>
                      {alert.status === "Pendente" && (
                        <div className="flex justify-end space-x-2">
                          <Button variant="destructive" onClick={() => handleReject(alert.id)}>
                            Rejeitar
                          </Button>
                          <Button onClick={() => handleApprove(alert.id)}>
                            Aprovar e Criar Operação
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
