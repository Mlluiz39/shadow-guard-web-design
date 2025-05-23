import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { EmpresasTab } from '@/components/configuracoes/EmpresasTab'
import { UsuariosTab } from '@/components/configuracoes/UsuariosTab'
import { Settings } from 'lucide-react'

const Configuracoes = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Settings className="h-6 w-6" /> Configurações
        </h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Painel Administrativo</CardTitle>
          <CardDescription>
            Gerencie empresas e usuários do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empresas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="empresas"
              >
                Empresas
              </TabsTrigger>
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="usuarios"
              >
                Usuários
              </TabsTrigger>
            </TabsList>
            <TabsContent value="empresas">
              <EmpresasTab />
            </TabsContent>
            <TabsContent value="usuarios">
              <UsuariosTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Configuracoes
