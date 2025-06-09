
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { EmpresasTab } from '@/components/configuracoes/EmpresasTab'
import { UsuariosTab } from '@/components/configuracoes/UsuariosTab'
import { FuncionariosTab } from '@/components/configuracoes/FuncionariosTab'
import { usePermissions } from '@/hooks/usePermissions'
import { useAuth } from '@/hooks/useAuth'
import {
  Settings,
  Building,
  Users,
  Truck,
  UserCheck,
  DollarSign,
  AlertCircle,
} from 'lucide-react'

const OperacionalTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <UserCheck className="h-16 w-16 text-blue-600" />
        <CardTitle className="text-xl text-blue-700">
          Configurações Operacionais
        </CardTitle>
        <p className="text-gray-600 text-center max-w-md">
          Configure dados operacionais, turnos, postos, procedimentos e
          configurações específicas para operações de segurança.
        </p>
      </CardContent>
    </Card>
  </div>
)

const FinanceiroTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <DollarSign className="h-16 w-16 text-blue-600" />
        <CardTitle className="text-xl text-blue-700">
          Configurações Financeiras
        </CardTitle>
        <p className="text-gray-600 text-center max-w-md">
          Configure dados financeiros, contas, centros de custo, categorias e
          outras configurações relacionadas ao módulo financeiro.
        </p>
      </CardContent>
    </Card>
  </div>
)

const FrotaTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <Truck className="h-16 w-16 text-blue-600" />
        <CardTitle className="text-xl text-blue-700">
          Gerenciamento de Frota
        </CardTitle>
        <p className="text-gray-600 text-center max-w-md">
          Gerencie informações sobre veículos da frota, incluindo documentação,
          manutenção, quilometragem e atribuição de motoristas.
        </p>
      </CardContent>
    </Card>
  </div>
)

const Configuracoes = () => {
  const { hasPermission, isMaster, userProfile } = usePermissions()
  const { profile } = useAuth()

  if (!hasPermission('configuracoes')) {
    return (
      <div className="container mx-auto p-4">
        <Card className="p-12">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <CardTitle className="text-xl text-red-600">
              Acesso Negado
            </CardTitle>
            <p className="text-gray-600 text-center max-w-md">
              Você não tem permissão para acessar as configurações do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tabs dinâmicas com base no perfil
  const getAvailableTabs = () => {
    const tabs = []

    if (isMaster()) {
      tabs.push({ id: 'empresas', label: 'Empresas', icon: Building })
      tabs.push({ id: 'usuarios', label: 'Usuários', icon: Settings })
    }

    if (userProfile === 'operacional' || isMaster()) {
      tabs.push({ id: 'funcionarios', label: 'Funcionários', icon: Users })
      tabs.push({ id: 'operacional', label: 'Operacional', icon: UserCheck })
    }

    if (userProfile === 'financeiro' || isMaster()) {
      tabs.push({ id: 'financeiro', label: 'Financeiro', icon: DollarSign })
    }

    if (
      userProfile === 'logistica' ||
      userProfile === 'supervisor' ||
      isMaster()
    ) {
      tabs.push({ id: 'frota', label: 'Frota', icon: Truck })
    }

    return tabs
  }

  const availableTabs = getAvailableTabs()
  const defaultTab = availableTabs[0]?.id || 'funcionarios'

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Settings className="h-6 w-6" /> Configurações
        </h1>
        <div className="text-sm text-security-muted">
          Perfil: {profile?.perfil} | Última atualização:{' '}
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <Card>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              {availableTabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            <TabsContent value="empresas">
              <EmpresasTab />
            </TabsContent>

            <TabsContent value="usuarios">
              <UsuariosTab />
            </TabsContent>

            <TabsContent value="funcionarios">
              <FuncionariosTab />
            </TabsContent>

            <TabsContent value="operacional">
              <OperacionalTab />
            </TabsContent>

            <TabsContent value="financeiro">
              <FinanceiroTab />
            </TabsContent>

            <TabsContent value="frota">
              <FrotaTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Configuracoes
