
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Lock, Mail, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Logo } from './Logo'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    setIsLoading(true)
    const { error } = await signIn(email, password)
    
    if (error) {
      toast.error('Erro ao fazer login: ' + error.message)
    } else {
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    }
    setIsLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password || !nome) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setIsLoading(true)
    const { error } = await signUp(email, password, { nome })
    
    if (error) {
      toast.error('Erro ao criar conta: ' + error.message)
    } else {
      toast.success('Conta criada com sucesso! Verifique seu email.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-security">Sistema de Gestão</h1>
          </div>

          <Card className="p-6 shadow-md border border-security-border-light">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-6 bg-security-light border-security-border-light focus:border-security-accent"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                      <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 py-6 bg-security-light border-security-border-light focus:border-security-accent"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 font-medium rounded"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 border-2 border-white border-opacity-50 border-t-white rounded-full animate-spin"></span>
                        Entrando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <LogIn className="h-5 w-5" />
                        Entrar
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="pl-10 py-6 bg-security-light border-security-border-light focus:border-security-accent"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-6 bg-security-light border-security-border-light focus:border-security-accent"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                      <Input
                        type="password"
                        placeholder="Senha (mín. 6 caracteres)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 py-6 bg-security-light border-security-border-light focus:border-security-accent"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-6 font-medium rounded"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 border-2 border-white border-opacity-50 border-t-white rounded-full animate-spin"></span>
                        Criando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <UserPlus className="h-5 w-5" />
                        Criar Conta
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="text-center text-sm text-security-muted">
            <p>© {new Date().getFullYear()} Sistema Integrado de Segurança</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-security bg-gradient-to-br from-security-secondary to-security relative overflow-hidden">
        <div className="absolute inset-0 bg-security-pattern opacity-10"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg text-white space-y-6">
            <h2 className="text-3xl font-bold">Sistema Integrado de Segurança</h2>
            <p className="text-lg opacity-90">
              Acesse o sistema de gestão completo para operações de segurança privada.
              Gerencie usuários, empresas, clientes e operações com total controle e segurança.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">Gestão</div>
                <div className="text-sm opacity-75">Completa</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">Segurança</div>
                <div className="text-sm opacity-75">Avançada</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">Suporte</div>
                <div className="text-sm opacity-75">24/7</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
