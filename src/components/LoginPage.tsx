import { useState, useEffect } from 'react'
import { Logo } from './Logo'
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

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('proteqrvLoggedIn')
    if (isLoggedIn === 'true') {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    setIsLoading(true)

    const storedUser = localStorage.getItem('proteqrvUser')

    setTimeout(() => {
      setIsLoading(false)

      if (storedUser) {
        const user = JSON.parse(storedUser)

        if (user.username === username && user.password === password) {
          localStorage.setItem('proteqrvLoggedIn', 'true')
          toast.success('Login realizado com sucesso.')
          navigate('/dashboard')
        } else {
          toast.error('Credenciais inválidas.')
        }
      } else if (username === 'admin' && password === 'admin123') {
        const adminUser = {
          username: 'admin',
          email: 'admin@proteqrv.com',
          role: 'administrador',
          password: 'admin123',
        }
        localStorage.setItem('proteqrvUser', JSON.stringify(adminUser))
        localStorage.setItem('proteqrvLoggedIn', 'true')
        toast.success('Login realizado com sucesso.')
        navigate('/dashboard')
      } else {
        toast.error('Credenciais inválidas ou usuário não cadastrado.')
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-6">
          <Logo size="lg" />
          <h1 className="text-2xl md:text-3xl font-bold text-security">
            Sistema de Gestão
          </h1>
          <h2 className="text-lg text-security-secondary">Acesso Seguro</h2>
        </div>

        <Card className="p-6 shadow-md border border-security-border-light">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
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
              className="w-full py-6 bg-security-blueMotion hover:bg-security-accent/90 text-white font-medium rounded"
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

        <div className="text-center text-sm text-security-muted">
          <p>© {new Date().getFullYear()} proteqrv Security Systems</p>
          <p>Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
