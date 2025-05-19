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

    const userNameDefault = 'admin'
    const passwordDefault = 'admin123'

    // Simulating authentication
    setTimeout(() => {
      if (username === userNameDefault && password === passwordDefault) {
        toast.success('Login realizado com sucesso!')
        localStorage.setItem('proteqrvLoggedIn', 'true')
        navigate('/dashboard')
      } else {
        toast.error('Usuário ou senha inválidos.')
      }
      setIsLoading(false)
      toast.success('Login realizado com sucesso.')
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-black">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center text-white">
        <div className="w-full max-w-md p-8 bg-[#111] rounded-2xl shadow-lg">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/logo-maximus.png"
              alt="Logo Maximus"
              className="h-16 mb-2"
            />
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-yellow-400">Usuário</label>
              <div className="relative">
              <User className="absolute left-3 top-1/2 translate-y-1/2 text-maximus-muted h-5 w-5" />
              </div>
              <Input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-10 px-10 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Nome de usuário"
              />
            </div>

            <div className="mb-4">
              <label className="block text-yellow-400">Senha</label>
              <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-maximus-muted h-5 w-5" />
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 px-10 py-2 bg-gray-800 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Senha"
                />
              </div>
            </div>
            <div className="mt-8">
              <Button
                type="submit"
                disabled={isLoading}
                variant="default"
                className="w-full px-4 py-2 hover:bg-[#c99c00] text-white font-medium rounded-xl bg-yellow-500 transition duration-200 ease-in-out flex items-center justify-center gap-2"
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
            </div>
          </form>
          <div className="text-center text-sm text-maximus-muted mb-4 mt-6">
            <p>© {new Date().getFullYear()} Maximus Tecnologia</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>

      {/* Right side - Informative Panel */}
      <div className="hidden md:block md:w-1/2 text-white relative overflow-hidden bg-slate-950">
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

        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-maximus/90 to-transparent"></div>
      </div>
    </div>
  )
}

export default LoginPage
