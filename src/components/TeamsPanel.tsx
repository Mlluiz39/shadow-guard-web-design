
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Shield, Plus, Search, Phone, MapPin, CheckCircle, AlertTriangle } from "lucide-react";

const TeamsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const teams = [
    {
      id: "ALPHA",
      name: "Equipe Alpha",
      leader: "Carlos Silva",
      status: "Em Operação",
      location: "São Paulo - SP",
      members: [
        { name: "Carlos Silva", role: "Líder", certification: "Ativo", phone: "(11) 99999-1111" },
        { name: "João Santos", role: "Agente", certification: "Ativo", phone: "(11) 99999-2222" },
        { name: "Maria Oliveira", role: "Agente", certification: "Ativo", phone: "(11) 99999-3333" },
        { name: "Pedro Costa", role: "Suporte", certification: "Ativo", phone: "(11) 99999-4444" }
      ],
      currentOperation: "OP-2024-001",
      equipment: { weapons: 4, vehicles: 2, radios: 8 }
    },
    {
      id: "BRAVO",
      name: "Equipe Bravo",
      leader: "Ana Rodriguez",
      status: "Disponível",
      location: "Rio de Janeiro - RJ",
      members: [
        { name: "Ana Rodriguez", role: "Líder", certification: "Ativo", phone: "(21) 99999-1111" },
        { name: "Roberto Lima", role: "Agente", certification: "Ativo", phone: "(21) 99999-2222" },
        { name: "Felipe Mendes", role: "Agente", certification: "Vencendo", phone: "(21) 99999-3333" }
      ],
      currentOperation: null,
      equipment: { weapons: 3, vehicles: 2, radios: 6 }
    },
    {
      id: "CHARLIE",
      name: "Equipe Charlie",
      leader: "Marcos Pereira",
      status: "Planejamento",
      location: "Belo Horizonte - MG",
      members: [
        { name: "Marcos Pereira", role: "Líder", certification: "Ativo", phone: "(31) 99999-1111" },
        { name: "Sandra Alves", role: "Agente", certification: "Ativo", phone: "(31) 99999-2222" },
        { name: "Ricardo Sousa", role: "Agente", certification: "Ativo", phone: "(31) 99999-3333" },
        { name: "Lucia Ferreira", role: "Agente", certification: "Ativo", phone: "(31) 99999-4444" },
        { name: "Thiago Barbosa", role: "Suporte", certification: "Ativo", phone: "(31) 99999-5555" },
        { name: "Camila Santos", role: "Suporte", certification: "Ativo", phone: "(31) 99999-6666" }
      ],
      currentOperation: "OP-2024-003",
      equipment: { weapons: 6, vehicles: 3, radios: 12 }
    },
    {
      id: "DELTA",
      name: "Equipe Delta",
      leader: "Paulo Henrique",
      status: "Em Operação",
      location: "Campinas - SP",
      members: [
        { name: "Paulo Henrique", role: "Líder", certification: "Ativo", phone: "(19) 99999-1111" },
        { name: "Rafael Gomes", role: "Agente", certification: "Ativo", phone: "(19) 99999-2222" },
        { name: "Beatriz Cardoso", role: "Agente", certification: "Ativo", phone: "(19) 99999-3333" },
        { name: "Diego Martins", role: "Suporte", certification: "Ativo", phone: "(19) 99999-4444" }
      ],
      currentOperation: "OP-2024-004",
      equipment: { weapons: 4, vehicles: 2, radios: 8 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Operação": return "destructive";
      case "Disponível": return "default";
      case "Planejamento": return "secondary";
      case "Manutenção": return "outline";
      default: return "secondary";
    }
  };

  const getCertificationColor = (cert: string) => {
    switch (cert) {
      case "Ativo": return "text-green-600";
      case "Vencendo": return "text-orange-600";
      case "Vencido": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestão de Equipes</h1>
          <p className="text-muted-foreground">Controle de agentes e equipes operacionais</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Equipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Nova Equipe</DialogTitle>
              <DialogDescription>
                Configure uma nova equipe operacional
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Nome da Equipe</Label>
                <Input id="team-name" placeholder="Ex: Equipe Echo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-leader">Líder da Equipe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar líder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agent1">João Silva</SelectItem>
                    <SelectItem value="agent2">Maria Santos</SelectItem>
                    <SelectItem value="agent3">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="base-location">Localização Base</Label>
                <Input id="base-location" placeholder="Cidade - Estado" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Criar Equipe</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar equipes por nome, líder ou código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{team.name}</span>
                  </CardTitle>
                  <CardDescription>Líder: {team.leader}</CardDescription>
                </div>
                <Badge variant={getStatusColor(team.status)}>
                  {team.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{team.location}</span>
                </div>
                <div className="text-muted-foreground">
                  {team.members.length} membros
                </div>
              </div>

              {/* Current Operation */}
              {team.currentOperation && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <div className="text-sm font-medium">Operação Atual</div>
                  <div className="text-sm text-muted-foreground">{team.currentOperation}</div>
                </div>
              )}

              {/* Equipment */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted/30 p-2 rounded">
                  <div className="text-lg font-bold">{team.equipment.weapons}</div>
                  <div className="text-xs text-muted-foreground">Armas</div>
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <div className="text-lg font-bold">{team.equipment.vehicles}</div>
                  <div className="text-xs text-muted-foreground">Veículos</div>
                </div>
                <div className="bg-muted/30 p-2 rounded">
                  <div className="text-lg font-bold">{team.equipment.radios}</div>
                  <div className="text-xs text-muted-foreground">Rádios</div>
                </div>
              </div>

              {/* Members */}
              <div>
                <div className="text-sm font-medium mb-2">Membros da Equipe</div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {team.members.map((member, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/20 rounded">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {member.certification === "Ativo" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        )}
                        <span className={`text-xs ${getCertificationColor(member.certification)}`}>
                          {member.certification}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Contatar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Shield className="w-4 h-4 mr-1" />
                  Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamsPanel;
