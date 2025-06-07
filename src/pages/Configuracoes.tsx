import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { EmpresasTab } from '@/components/configuracoes/EmpresasTab'
import { UsuariosTab } from '@/components/configuracoes/UsuariosTab'
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

const DadosCadastraisTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <Users className="h-16 w-16 text-blue-600" />
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

const CadastroOperacionalTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <UserCheck className="h-16 w-16 text-blue-600" />
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

const CadastroFinanceiroTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <DollarSign className="h-16 w-16 text-blue-600" />
        <CardTitle className="text-xl text-blue-700">
          Cadastro Financeiro
        </CardTitle>
        <p className="text-gray-600 text-center max-w-md">
          Configure dados financeiros, centros de custo, formas de pagamento e
          outras configurações relacionadas ao módulo financeiro.
        </p>
      </CardContent>
    </Card>
  </div>
)

const CadastroFrotaTab = () => (
  <div className="space-y-4">
    <Card className="p-12">
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <Truck className="h-16 w-16 text-blue-600" />
        <CardTitle className="text-xl text-blue-700">
          Cadastro de Frota
        </CardTitle>
        <p className="text-gray-600 text-center max-w-md">
          Gerencie informações sobre veículos da frota, incluindo documentação,
          manutenção, rastreamento e atribuição de motoristas.
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
            <TabsContent value="empresas">
              <EmpresasTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Configuracoes
