import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { User, Lock, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Usuario } from '@/types/usuario'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Carregar usuários criados no sistema
    const storedUsers = localStorage.getItem('sistemaUsuarios')
    if (storedUsers) {
      setUsuarios(JSON.parse(storedUsers))
    }
  }, [])

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
        // Login como Master (admin padrão)
        localStorage.setItem('proteqrvLoggedIn', 'true')
        localStorage.setItem(
          'proteqrvUser',
          JSON.stringify({
            id: 'admin',
            username: 'admin',
            role: 'Master',
            perfil: 'master',
            nome: 'Administrador',
            email: 'admin@sistema.com',
          })
        )
        toast.success('Login realizado com sucesso.')
        navigate('/dashboard')
      } else if (selectedUser) {
        // Login com usuário selecionado
        const usuario = usuarios.find(u => u.id === selectedUser)
        if (usuario && password === '123456') {
          // Senha padrão para usuários criados
          localStorage.setItem('proteqrvLoggedIn', 'true')
          localStorage.setItem(
            'proteqrvUser',
            JSON.stringify({
              id: usuario.id,
              username: usuario.nome,
              role: usuario.perfil,
              perfil: usuario.perfil,
              nome: usuario.nome,
              email: usuario.email,
            })
          )
          toast.success('Login realizado com sucesso.')
          navigate('/dashboard')
        } else {
          toast.error('Senha inválida. Use "123456" para usuários criados.')
        }
      } else {
        toast.error('Usuário ou senha inválidos.')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId)
    const usuario = usuarios.find(u => u.id === userId)
    if (usuario) {
      setUsername(usuario.nome)
    }
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
            {/* Seletor de usuários criados */}
            {usuarios.length > 0 && (
              <div className="mb-4">
                <label className="block text-yellow-400 mb-2">
                  Ou selecione um usuário criado
                </label>
                <Select onValueChange={handleUserSelect}>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Selecione um usuário..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {usuarios.map(usuario => (
                      <SelectItem
                        key={usuario.id}
                        value={usuario.id}
                        className="text-white hover:bg-gray-700"
                      >
                        {usuario.nome} - {usuario.perfil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedUser && (
                  <p className="text-sm text-gray-400 mt-1">Senha: 123456</p>
                )}
              </div>
            )}

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

            <div className="text-center text-sm text-gray-400 mb-4">
              <p>
                <strong>Login Master:</strong> admin / admin123
              </p>
              <p>
                <strong>Usuários criados:</strong> senha padrão é 123456
              </p>
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
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
        toastStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
        }}
      />
    </div>
  )
}

export default LoginPage
