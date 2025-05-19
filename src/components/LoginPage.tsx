import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Lock, LogIn } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    setIsLoading(true)

    // Simulating authentication
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Login realizado com sucesso.')
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-slate-200">
        <div className="w-full max-w-md space-y-8 mx-auto">
          <div className="flex flex-col items-center gap-6">
            <img
              src="/logo-maximus.png"
              alt="Maximus Tecnologia"
              className="h-12"
            />
            <h1 className="text-3xl font-bold text-maximus">
              Sistema de Gestão
            </h1>
            <h2 className="text-lg text-maximus-muted">Acesso Seguro</h2>
          </div>

          <Card className="p-6 shadow-md border border-maximus-border">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-maximus-muted h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Nome de usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="pl-10 py-6 bg-maximus-light border-maximus-border focus:border-maximus-secondary"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-maximus-muted h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 py-6 bg-maximus-light border-maximus-border focus:border-maximus-secondary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 hover:bg-[#c99c00] text-white font-medium rounded"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 border-2 border-white border-opacity-50 border-t-white rounded-full animate-spin"></span>
                    Autenticando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogIn className="h-5 w-5" />
                    Entrar
                  </span>
                )}
              </Button>
            </form>
          </Card>

          <div className="text-center text-sm text-maximus-muted">
            <p>© {new Date().getFullYear()} Maximus Tecnologia</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>

      {/* Right side - Informative Panel */}
      <div className="hidden md:block md:w-1/2 bg-[#13132a] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-security-pattern.png')] opacity-10"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg text-white space-y-6">
            <h2 className="text-3xl font-bold">
              Sistema Integrado de Informações
            </h2>
            <p className="text-lg opacity-90">
              Plataforma completa para gestão de operações de segurança privada.
              Acesse todos os módulos do sistema com total segurança e controle.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">+500</div>
                <div className="text-sm opacity-75">Clientes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">+1000</div>
                <div className="text-sm opacity-75">Operações</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">+200</div>
                <div className="text-sm opacity-75">Veículos</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-maximus/90 to-transparent"></div>
      </div>
    </div>
  )
}

export default LoginPage
