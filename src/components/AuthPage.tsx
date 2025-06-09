import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Mail, Lock, LogIn } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Logo } from './Logo'

const AuthPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-black">
        <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-security-light">
              Sistema de Gestão
            </h1>
            <h2 className="text-lg text-security-secondary">Acesso Restrito</h2>
          </div>

          <div className="p-6 bg-slate-500/10 backdrop-blur-md rounded-lg">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10 py-6 bg-security-light border-security-border-light focus:border-security-accent"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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

            <div className="mt-6 text-center text-sm text-security-border">
              <p className='text-red-400'>Apenas usuários autorizados.</p>
              <p>Entre em contato com o administrador para criar sua conta.</p>
            </div>
          </div>

          <div className="text-center text-sm text-security-border mt-6">
            <p>© {new Date().getFullYear()} Sistema Integrado de Segurança</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>

      {/* Right side - Informative Panel */}
      <div className="hidden md:block md:w-1/2 text-white relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg text-white space-y-6">
            <h2 className="text-3xl font-bold">
              Sistema Integrado de Informações
            </h2>
            <p className="text-lg opacity-90">
              Plataforma completa para gestão de operações de segurança privada.
              Acesse todos os módulos do sistema com total segurança e controle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-center mb-3">🤝</div>
                <div className="text-sm opacity-75">
                  Rede de Parcerias Certificadas
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-center mb-3">🛡️</div>
                <div className="text-sm opacity-75">
                  Controle Operacional em Tempo real
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-center mb-3">📡</div>
                <div className="text-sm opacity-75">
                  Gestão de Ativos de segurança
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-center mb-3">🔗</div>
                <div className="text-sm opacity-75">
                  Integração com Centros de Comando
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
