
import { useState } from "react";
import { 
  Shield, 
  Plus, 
  Filter, 
  HelpCircle, 
  Printer,
  Calendar,
  MapPin,
  User,
  FileText,
  Phone,
  RefreshCw,
  Info
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

// Sample data for solicitações de escolta
const escoltasData = [
  {
    id: 1,
    cliente: "Empresa ABC",
    solicitacao: "Escolta de executivo",
    dataInicioPrevisto: "2023-06-01",
    origem: "São Paulo, SP",
    destino: "Campinas, SP",
    tratativas: "Em análise",
    operador: "João Silva",
    numeroEO: "EO-12345",
    espelhamento: "Sim"
  },
  {
    id: 2,
    cliente: "Corporação XYZ",
    solicitacao: "Transporte de valores",
    dataInicioPrevisto: "2023-06-02",
    origem: "Rio de Janeiro, RJ",
    destino: "Niterói, RJ",
    tratativas: "Aprovado",
    operador: "Maria Santos",
    numeroEO: "EO-67890",
    espelhamento: "Não"
  },
  {
    id: 3,
    cliente: "Indústrias LMN",
    solicitacao: "Escolta de carga",
    dataInicioPrevisto: "2023-06-03",
    origem: "Belo Horizonte, MG",
    destino: "Juiz de Fora, MG",
    tratativas: "Pendente",
    operador: "Carlos Oliveira",
    numeroEO: "EO-24680",
    espelhamento: "Sim"
  }
];

const SolicitacoesEscolta = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEscoltas, setFilteredEscoltas] = useState(escoltasData);
  const [activeTab, setActiveTab] = useState("solicitacoes");

  // Function to filter escoltas based on search term
  const filterEscoltas = () => {
    const filtered = escoltasData.filter(
      (item) =>
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.solicitacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.operador.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEscoltas(filtered);
    toast({
      title: "Filtro aplicado",
      description: `Mostrando ${filtered.length} resultados para "${searchTerm}"`,
    });
  };

  // Function to clear the filter
  const clearFilter = () => {
    setSearchTerm("");
    setFilteredEscoltas(escoltasData);
    toast({
      title: "Filtro removido",
      description: "Mostrando todos os registros",
    });
  };

  // Function to refresh the data
  const refreshData = () => {
    setFilteredEscoltas([...escoltasData]);
    toast({
      title: "Dados atualizados",
      description: "As informações foram atualizadas com sucesso",
    });
  };

  // Function to print data
  const printData = () => {
    toast({
      title: "Imprimindo...",
      description: "Enviando os dados para impressão",
    });
    window.print();
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Shield className="h-6 w-6" /> Solicitações de escolta
        </h1>
      </div>

      <Tabs defaultValue="solicitacoes" className="w-full" 
        onValueChange={(value) => setActiveTab(value)}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
            <TabsTrigger value="espelhamento">Espelhamento</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => console.log("Adicionar nova solicitação")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Adicionar nova solicitação</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filtrar resultados</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Collapsible>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={() => console.log("Mostrar legendas")}>
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Legenda</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={printData}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Imprimir relatório</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={refreshData}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Atualizar dados</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <CollapsibleContent className="p-4 bg-muted/50 rounded-md mb-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                placeholder="Buscar por cliente, solicitação ou operador"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-0"
              />
            </div>
            <Button onClick={filterEscoltas}>Aplicar Filtro</Button>
            <Button variant="outline" onClick={clearFilter}>
              Limpar
            </Button>
          </div>
        </CollapsibleContent>

        <TabsContent value="solicitacoes" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">
                        Cliente
                      </TableHead>
                      <TableHead className="font-semibold">
                        Solicitação
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> Data Início Previsto
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> Origem
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> Destino
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" /> Tratativas
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" /> Operador
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" /> Número E.O
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold">
                        Espelhamento
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEscoltas.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.cliente}</TableCell>
                        <TableCell>{item.solicitacao}</TableCell>
                        <TableCell>{item.dataInicioPrevisto}</TableCell>
                        <TableCell>{item.origem}</TableCell>
                        <TableCell>{item.destino}</TableCell>
                        <TableCell>{item.tratativas}</TableCell>
                        <TableCell>{item.operador}</TableCell>
                        <TableCell>{item.numeroEO}</TableCell>
                        <TableCell>{item.espelhamento}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div>
              Mostrando {filteredEscoltas.length} de {escoltasData.length} registros
            </div>
            <div>Última atualização: {new Date().toLocaleDateString()}</div>
          </div>
        </TabsContent>

        <TabsContent value="espelhamento">
          <Card>
            <CardHeader>
              <CardTitle>Espelhamento de Solicitações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex flex-col items-center justify-center bg-muted">
                <Info className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  Visualização de espelhamento será implementada em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolicitacoesEscolta;
