
import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, LogIn, UserPlus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar se o usuário já está logado - corrigido para evitar loops
  useEffect(() => {
    const user = localStorage.getItem('proteqrvLoggedIn');
    if (user === 'true') {
      // Usamos replace para evitar que o usuário volte para a tela de login após fazer logout
      navigate('/dashboard', { replace: true });
    }
  }, []); // Mantemos o array de dependências vazio para executar apenas uma vez

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    
    // Verificar se o usuário existe no localStorage (simulação)
    const storedUser = localStorage.getItem('proteqrvUser');
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        
        // Verificação simplificada - em produção usaria hash de senha e autenticação real
        if (user.username === username && password.length >= 6) {
          localStorage.setItem('proteqrvLoggedIn', 'true');
          toast.success('Login realizado com sucesso.');
          navigate('/dashboard');
        } else {
          toast.error('Credenciais inválidas.');
        }
      } else if (username === 'admin' && password === 'admin123') {
        // Usuário padrão para demonstração
        localStorage.setItem('proteqrvLoggedIn', 'true');
        localStorage.setItem('proteqrvUser', JSON.stringify({
          username: 'admin',
          email: 'admin@proteqrv.com',
          role: 'administrador'
        }));
        toast.success('Login realizado com sucesso.');
        navigate('/dashboard');
      } else {
        toast.error('Credenciais inválidas ou usuário não cadastrado.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-security">Sistema de Gestão</h1>
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
                    onChange={(e) => setUsername(e.target.value)}
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
                className="w-full py-6 bg-security-accent hover:bg-security-accent/90 text-white font-medium rounded"
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
              
              <div className="text-center pt-4">
                <p className="text-sm text-security-muted">Não possui uma conta?</p>
                <Link 
                  to="/cadastro" 
                  className="flex items-center justify-center gap-2 text-security-accent hover:text-security-accent/80 transition-colors mt-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Cadastre-se agora
                </Link>
              </div>
            </form>
          </Card>

          <div className="text-center text-sm text-security-muted">
            <p>© {new Date().getFullYear()} proteqrv Security Systems</p>
            <p>Todos os direitos reservados</p>
          </div>
        </div>
      </div>

      {/* Right side - Security Image */}
      <div className="hidden md:block md:w-1/2 bg-security bg-gradient-to-br from-security-secondary to-security relative overflow-hidden">
        <div className="absolute inset-0 bg-security-pattern opacity-10"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-lg text-white space-y-6">
            <h2 className="text-3xl font-bold">Sistema Integrado de Segurança</h2>
            <p className="text-lg opacity-90">
              Plataforma completa para gestão de operações de segurança privada. Acesse todos os módulos do sistema
              com total segurança e controle.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">+1000</div>
                <div className="text-sm opacity-75">Clientes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">+5000</div>
                <div className="text-sm opacity-75">Operações</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold">+200</div>
                <div className="text-sm opacity-75">Veículos</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security element at bottom */}
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-security/90 to-transparent"></div>
      </div>
    </div>
  );
};

export default LoginPage;
