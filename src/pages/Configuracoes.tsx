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
import {
  Settings,
  Building,
  Users,
  Truck,
  FileText,
  UserCheck,
} from 'lucide-react'

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
            Gerencie empresas, usuários e configurações operacionais do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="empresas" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="empresas"
              >
                <Building className="h-4 w-4 mr-2" />
                Empresas
              </TabsTrigger>
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="usuarios"
              >
                <Settings className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="funcionarios"
              >
                <Users className="h-4 w-4 mr-2" />
                Funcionários
              </TabsTrigger>
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="operacional"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Operacional
              </TabsTrigger>
              <TabsTrigger
                className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                value="frota"
              >
                <Truck className="h-4 w-4 mr-2" />
                Frota
              </TabsTrigger>
            </TabsList>
            <TabsContent value="empresas">
              <EmpresasTab />
            </TabsContent>
            <TabsContent value="usuarios">
              <UsuariosTab />
            </TabsContent>
            <TabsContent value="funcionarios">
              <DadosCadastraisTab />
            </TabsContent>
            <TabsContent value="operacional">
              <CadastroOperacionalTab />
            </TabsContent>
            <TabsContent value="frota">
              <CadastroFrotaTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Nova aba para Dados Cadastrais de Funcionários
const DadosCadastraisTab = () => {
  return (
    <div className="space-y-4">
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="text-5xl text-blue-600">
            <Users className="h-16 w-16" />
          </div>
          <CardTitle className="text-xl text-blue-700">
            Dados Cadastrais de Funcionários
          </CardTitle>
          <p className="text-gray-600 text-center max-w-md">
            Gerencie as informações cadastrais dos funcionários, incluindo dados
            pessoais, documentos e histórico profissional.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Nova aba para Cadastro Operacional
const CadastroOperacionalTab = () => {
  return (
    <div className="space-y-4">
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="text-5xl text-blue-600">
            <UserCheck className="h-16 w-16" />
          </div>
          <CardTitle className="text-xl text-blue-700">
            Cadastro Operacional
          </CardTitle>
          <p className="text-gray-600 text-center max-w-md">
            Configure dados operacionais, permissões de acesso, escalas de
            trabalho e configurações específicas para operações de segurança.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

// Nova aba para Cadastro de Frota
const CadastroFrotaTab = () => {
  return (
    <div className="space-y-4">
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="text-5xl text-blue-600">
            <Truck className="h-16 w-16" />
          </div>
          <CardTitle className="text-xl text-blue-700">
            Cadastro de Frota
          </CardTitle>
          <p className="text-gray-600 text-center max-w-md">
            Gerencie informações sobre veículos da frota, incluindo
            documentação, manutenção, rastreamento e atribuição de motoristas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Configuracoes
