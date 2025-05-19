
import { useState } from "react";
import { 
  Users, 
  Filter, 
  Bell, 
  X,
  RefreshCw
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Collapsible, 
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";

// Sample data for agentes
const agentesData = [
  { id: 1, nome: "Carlos Silva", nomeGuerra: "Silva", situacao: "Disponível", re: "12345", telefone: "(11) 99999-1111" },
  { id: 2, nome: "Ana Oliveira", nomeGuerra: "Ana", situacao: "Em serviço", re: "23456", telefone: "(11) 99999-2222" },
  { id: 3, nome: "João Santos", nomeGuerra: "João", situacao: "Disponível", re: "34567", telefone: "(11) 99999-3333" },
  { id: 4, nome: "Maria Costa", nomeGuerra: "Costa", situacao: "Folga", re: "45678", telefone: "(11) 99999-4444" },
  { id: 5, nome: "Pedro Almeida", nomeGuerra: "Almeida", situacao: "Disponível", re: "56789", telefone: "(11) 99999-5555" },
  { id: 6, nome: "Julia Pereira", nomeGuerra: "Julia", situacao: "Em serviço", re: "67890", telefone: "(11) 99999-6666" },
  { id: 7, nome: "Roberto Ferreira", nomeGuerra: "Roberto", situacao: "Disponível", re: "78901", telefone: "(11) 99999-7777" },
  { id: 8, nome: "Fernanda Lima", nomeGuerra: "Fernanda", situacao: "Folga", re: "89012", telefone: "(11) 99999-8888" },
];

const AgentesDisponiveis = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAgentes, setFilteredAgentes] = useState(agentesData);

  // Function to filter agentes based on search term
  const filterAgentes = () => {
    const filtered = agentesData.filter(
      (agente) =>
        agente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agente.nomeGuerra.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agente.re.includes(searchTerm)
    );
    setFilteredAgentes(filtered);
  };

  // Function to clear the filter
  const clearFilter = () => {
    setSearchTerm("");
    setFilteredAgentes(agentesData);
  };

  // Function to refresh the data
  const refreshData = () => {
    setFilteredAgentes([...agentesData]);
    // Here you would typically fetch fresh data from an API
    console.log("Recarregando dados...");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Users className="h-6 w-6" /> Agentes disponíveis
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log("Notificações")}
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Agentes</TabsTrigger>
          <TabsTrigger value="mapa">Mapa</TabsTrigger>
        </TabsList>
        <TabsContent value="lista" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CollapsibleTrigger
                asChild
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtro
                </Button>
              </CollapsibleTrigger>
              {isFilterOpen && (
                <Button 
                  variant="ghost" 
                  className="gap-2" 
                  onClick={clearFilter}
                >
                  <X className="h-4 w-4" />
                  Limpar Filtro
                </Button>
              )}
            </div>
            <Button variant="outline" onClick={refreshData} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          </div>
          
          <Collapsible open={isFilterOpen}>
            <CollapsibleContent className="p-4 bg-muted/50 rounded-md mb-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por nome, nome de guerra ou RE"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                </div>
                <Button onClick={filterAgentes}>Aplicar Filtro</Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Nome de Guerra</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>RE</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgentes.map((agente) => (
                    <TableRow key={agente.id}>
                      <TableCell>{agente.nome}</TableCell>
                      <TableCell>{agente.nomeGuerra}</TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            agente.situacao === "Disponível" 
                              ? "bg-green-100 text-green-800" 
                              : agente.situacao === "Em serviço" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {agente.situacao}
                        </span>
                      </TableCell>
                      <TableCell>{agente.re}</TableCell>
                      <TableCell>{agente.telefone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
            <div>
              Mostrando {filteredAgentes.length} de {agentesData.length} agentes
            </div>
          </div>
        </TabsContent>
        <TabsContent value="mapa">
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Agentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted">
                Visualização do mapa será implementada em breve.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentesDisponiveis;
