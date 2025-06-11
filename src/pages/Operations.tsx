
import {
  FileText,
  Users,
  LayoutGrid,
  Shield,
  Truck,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Bell,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AgentesDisponiveis from './AgentesDisponiveis'
import SolicitacoesEscolta from './SolicitacoesEscolta'
import GridOperacional from './GridOperacional'
import Clientes from './Clientes'
import ChatOperacional from './ChatOperacional'
import LivroOcorrencias from './LivroOcorrencias'
import DashboardChamados from './DashboardChamados'

const Operations = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" /> Operações
        </h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            Grid
          </TabsTrigger>
          <TabsTrigger value="quadro" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Funcionários
          </TabsTrigger>
          <TabsTrigger value="avisos" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Avisos
          </TabsTrigger>
          <TabsTrigger value="clientes" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="ocorrencias" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Ocorrências
          </TabsTrigger>
          <TabsTrigger value="chamados" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Chamados
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <GridOperacional />
        </TabsContent>
        
        <TabsContent value="quadro">
          <AgentesDisponiveis />
        </TabsContent>
        
        <TabsContent value="avisos">
          <SolicitacoesEscolta />
        </TabsContent>
        
        <TabsContent value="clientes">
          <Clientes />
        </TabsContent>
        
        <TabsContent value="ocorrencias">
          <LivroOcorrencias />
        </TabsContent>
        
        <TabsContent value="chamados">
          <DashboardChamados />
        </TabsContent>
        
        <TabsContent value="chat">
          <ChatOperacional />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Operations
