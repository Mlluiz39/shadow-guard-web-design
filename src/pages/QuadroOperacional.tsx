
import { useState } from "react";
import { 
  LayoutGrid, 
  Filter, 
  Bell, 
  X,
  RefreshCw,
  Calendar
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
import { toast } from "@/components/ui/use-toast";

// Sample data for quadro operacional
const quadroData = [
  { 
    id: 1, 
    prefixo: "QO-001", 
    rodizio: "A", 
    operacao: "Escolta VIP", 
    equipe: "Alpha", 
    entrada: "08:00", 
    saida: "18:00", 
    obsEquipe: "Verificar equipamentos", 
    retorno: "19:30", 
    cliente: "Empresa XYZ", 
    origem: "São Paulo", 
    destino: "Campinas", 
    atualizacao: "19/05/2023", 
    mct: "MCT-123", 
    radioTel: "(11) 98765-4321" 
  },
  { 
    id: 2, 
    prefixo: "QO-002", 
    rodizio: "B", 
    operacao: "Segurança Patrimonial", 
    equipe: "Bravo", 
    entrada: "09:00", 
    saida: "19:00", 
    obsEquipe: "Ronda a cada 30min", 
    retorno: "20:15", 
    cliente: "Empresa ABC", 
    origem: "Guarulhos", 
    destino: "São Paulo", 
    atualizacao: "19/05/2023", 
    mct: "MCT-456", 
    radioTel: "(11) 91234-5678" 
  },
  { 
    id: 3, 
    prefixo: "QO-003", 
    rodizio: "C", 
    operacao: "Transporte de Valores", 
    equipe: "Charlie", 
    entrada: "07:30", 
    saida: "17:30", 
    obsEquipe: "Blindagem verificada", 
    retorno: "18:45", 
    cliente: "Banco XYZ", 
    origem: "São Paulo", 
    destino: "Santos", 
    atualizacao: "19/05/2023", 
    mct: "MCT-789", 
    radioTel: "(11) 94567-8912" 
  },
  { 
    id: 4, 
    prefixo: "QO-004", 
    rodizio: "D", 
    operacao: "Escolta Executiva", 
    equipe: "Delta", 
    entrada: "10:00", 
    saida: "20:00", 
    obsEquipe: "Equipamentos calibrados", 
    retorno: "21:15", 
    cliente: "Multinacional ABC", 
    origem: "Campinas", 
    destino: "São Paulo", 
    atualizacao: "19/05/2023", 
    mct: "MCT-321", 
    radioTel: "(11) 97890-1234" 
  }
];

const QuadroOperacional = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuadro, setFilteredQuadro] = useState(quadroData);
  const [activeTab, setActiveTab] = useState("aba1");

  // Function to filter quadro based on search term
  const filterQuadro = () => {
    const filtered = quadroData.filter(
      (item) =>
        item.prefixo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuadro(filtered);
  };

  // Function to clear the filter
  const clearFilter = () => {
    setSearchTerm("");
    setFilteredQuadro(quadroData);
  };

  // Function to refresh the data
  const refreshData = () => {
    setFilteredQuadro([...quadroData]);
    // Here you would typically fetch fresh data from an API
    console.log("Recarregando dados...");
    toast("Dados atualizados com sucesso!");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <LayoutGrid className="h-6 w-6" /> Quadro Operacional
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

      <Tabs defaultValue="aba1" className="w-full" 
        onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-4">
          <TabsTrigger value="aba1">Aba 1</TabsTrigger>
          <TabsTrigger value="aba2">Aba 2</TabsTrigger>
        </TabsList>

        <TabsContent value="aba1" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filtro
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="p-4 bg-muted/50 rounded-md mb-4 mt-2">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Buscar por prefixo, equipe ou cliente"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-2"
                      />
                    </div>
                    <Button onClick={filterQuadro}>Aplicar Filtro</Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
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
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prefixo</TableHead>
                      <TableHead>Rodízio</TableHead>
                      <TableHead>Operação</TableHead>
                      <TableHead>Equipe</TableHead>
                      <TableHead>Entrada</TableHead>
                      <TableHead>Saída</TableHead>
                      <TableHead>OBS.Equipe</TableHead>
                      <TableHead>Retorno</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Atualização</TableHead>
                      <TableHead>MCT</TableHead>
                      <TableHead>Radio/Tel</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuadro.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.prefixo}</TableCell>
                        <TableCell>{item.rodizio}</TableCell>
                        <TableCell>{item.operacao}</TableCell>
                        <TableCell>{item.equipe}</TableCell>
                        <TableCell>{item.entrada}</TableCell>
                        <TableCell>{item.saida}</TableCell>
                        <TableCell>{item.obsEquipe}</TableCell>
                        <TableCell>{item.retorno}</TableCell>
                        <TableCell>{item.cliente}</TableCell>
                        <TableCell>{item.origem}</TableCell>
                        <TableCell>{item.destino}</TableCell>
                        <TableCell>{item.atualizacao}</TableCell>
                        <TableCell>{item.mct}</TableCell>
                        <TableCell>{item.radioTel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
            <div>
              Mostrando {filteredQuadro.length} de {quadroData.length} registros
            </div>
            <div>Última atualização: {new Date().toLocaleDateString()}</div>
          </div>
        </TabsContent>

        <TabsContent value="aba2">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted">
                <div className="flex flex-col items-center gap-3">
                  <Calendar className="h-12 w-12 text-muted-foreground" />
                  <p className="text-center text-muted-foreground">
                    Visualização de calendário será implementada em breve.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuadroOperacional;
