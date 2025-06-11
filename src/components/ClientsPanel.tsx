
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Plus, Search, Building, Phone, Mail, MapPin, Calendar, DollarSign } from "lucide-react";

const ClientsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: "CLI-001",
      name: "Banco Central do Brasil",
      type: "Instituição Financeira",
      contact: "Roberto Silva",
      email: "roberto.silva@bcb.gov.br",
      phone: "(11) 3214-5678",
      address: "Brasília - DF",
      status: "Ativo",
      contractStart: "2024-01-15",
      contractEnd: "2024-12-31",
      monthlyValue: "R$ 450.000",
      operationsCount: 23,
      lastOperation: "2024-06-08",
      riskLevel: "Alto",
      services: ["Transporte de Valores", "Escolta Armada"]
    },
    {
      id: "CLI-002",
      name: "Transportadora Premium Ltda",
      type: "Transportadora",
      contact: "Ana Carolina",
      email: "ana.carolina@premium.com.br",
      phone: "(21) 2567-8901",
      address: "Rio de Janeiro - RJ",
      status: "Ativo",
      contractStart: "2024-02-01",
      contractEnd: "2025-01-31",
      monthlyValue: "R$ 180.000",
      operationsCount: 15,
      lastOperation: "2024-06-07",
      riskLevel: "Médio",
      services: ["Escolta Executiva", "Transporte de Carga"]
    },
    {
      id: "CLI-003",
      name: "Empresa Metalúrgica Nacional",
      type: "Indústria",
      contact: "Carlos Mendes",
      email: "carlos.mendes@metalurgica.com.br",
      phone: "(31) 3456-7890",
      address: "Belo Horizonte - MG",
      status: "Pendente",
      contractStart: "2024-06-15",
      contractEnd: "2025-06-14",
      monthlyValue: "R$ 320.000",
      operationsCount: 0,
      lastOperation: null,
      riskLevel: "Alto",
      services: ["Transporte de Carga", "Segurança Industrial"]
    },
    {
      id: "CLI-004",
      name: "Joalheria Luxo Premium",
      type: "Varejo",
      contact: "Marina Santos",
      email: "marina@luxopremium.com.br",
      phone: "(11) 9876-5432",
      address: "São Paulo - SP",
      status: "Ativo",
      contractStart: "2024-03-01",
      contractEnd: "2024-12-31",
      monthlyValue: "R$ 95.000",
      operationsCount: 8,
      lastOperation: "2024-06-10",
      riskLevel: "Crítico",
      services: ["Transporte de Valores", "Segurança de Evento"]
    },
    {
      id: "CLI-005",
      name: "Shopping Center Plaza",
      type: "Imobiliário",
      contact: "Fernando Lima",
      email: "fernando@plazashopping.com.br",
      phone: "(47) 3321-9876",
      address: "Florianópolis - SC",
      status: "Inativo",
      contractStart: "2023-08-01",
      contractEnd: "2024-05-31",
      monthlyValue: "R$ 85.000",
      operationsCount: 45,
      lastOperation: "2024-05-30",
      riskLevel: "Baixo",
      services: ["Segurança Patrimonial"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "default";
      case "Pendente": return "secondary";
      case "Inativo": return "outline";
      default: return "secondary";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Crítico": return "bg-red-100 text-red-800";
      case "Alto": return "bg-orange-100 text-orange-800";
      case "Médio": return "bg-yellow-100 text-yellow-800";
      case "Baixo": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Clientes</h1>
          <p className="text-muted-foreground">Controle de contratos e relacionamento comercial</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo cliente
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" placeholder="Razão social" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-type">Tipo de Empresa</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banco">Instituição Financeira</SelectItem>
                    <SelectItem value="transportadora">Transportadora</SelectItem>
                    <SelectItem value="industria">Indústria</SelectItem>
                    <SelectItem value="varejo">Varejo</SelectItem>
                    <SelectItem value="imobiliario">Imobiliário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contato Principal</Label>
                <Input id="contact-name" placeholder="Nome do responsável" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Telefone</Label>
                <Input id="contact-phone" placeholder="(xx) xxxxx-xxxx" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">E-mail</Label>
                <Input id="contact-email" type="email" placeholder="email@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Cidade - Estado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="risk-level">Nível de Risco</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Avaliar risco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critico">Crítico</SelectItem>
                    <SelectItem value="alto">Alto</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="baixo">Baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-value">Valor Mensal</Label>
                <Input id="monthly-value" placeholder="R$ 0,00" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Cadastrar Cliente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar clientes por nome, contato ou ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-2">
                  <Building className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-lg leading-tight">{client.name}</CardTitle>
                    <CardDescription>{client.type}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(client.riskLevel)}`}>
                    {client.riskLevel}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{client.contact}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{client.address}</span>
                </div>
              </div>

              {/* Contract Info */}
              <div className="bg-muted/30 p-3 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valor Mensal</span>
                  <span className="font-bold text-primary">{client.monthlyValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Operações</span>
                  <span className="font-medium">{client.operationsCount}</span>
                </div>
                {client.lastOperation && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Última Op.</span>
                    <span className="text-sm">{new Date(client.lastOperation).toLocaleDateString('pt-BR')}</span>
                  </div>
                )}
              </div>

              {/* Services */}
              <div>
                <div className="text-sm font-medium mb-2">Serviços Contratados</div>
                <div className="flex flex-wrap gap-1">
                  {client.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contract Dates */}
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <div>Início</div>
                  <div className="font-medium">{new Date(client.contractStart).toLocaleDateString('pt-BR')}</div>
                </div>
                <div>
                  <div>Fim</div>
                  <div className="font-medium">{new Date(client.contractEnd).toLocaleDateString('pt-BR')}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Detalhes
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientsPanel;
