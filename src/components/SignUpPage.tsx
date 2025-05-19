
import { useState } from 'react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Mail, UserPlus, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não conferem.');
      return;
    }

    // Validação de email simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, insira um email válido.');
      return;
    }

    // Validação de senha (mínimo 6 caracteres)
    if (password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulando o cadastro - em um ambiente real, isto seria uma chamada de API
    setTimeout(() => {
      setIsLoading(false);
      
      // Armazenamos os dados do usuário no localStorage como simulação
      // Em um ambiente real, estes dados seriam armazenados no backend
      localStorage.setItem('proteqrvUser', JSON.stringify({ 
        username, 
        email,
        role: 'usuario'
      }));
      
      // Definir o usuário como logado - usando o mesmo nome de chave que o LoginPage
      localStorage.setItem('proteqrvLoggedIn', 'true');
      
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard', { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - SignUp Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <h1 className="text-2xl md:text-3xl font-bold text-security">Sistema de Gestão</h1>
            <h2 className="text-lg text-security-secondary">Criar Nova Conta</h2>
          </div>

          <Card className="p-6 shadow-md border border-security-border-light">
            <form onSubmit={handleSignUp} className="space-y-6">
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

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-security-muted h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Processando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Criar Conta
                  </span>
                )}
              </Button>
            </form>
          </Card>

          <div className="text-center">
            <Link to="/" className="flex items-center justify-center gap-2 text-security hover:text-security-accent transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Link>
          </div>

          <div className="text-center text-sm text-security-muted">
            <p>© {new Date().getFullYear()} Sistema Integrado de Segurança</p>
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
              Crie sua conta para acessar o sistema de gestão completo para operações de segurança privada.
              Tenha acesso a todos os recursos e ferramentas em uma única plataforma.
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
        
        {/* Security element at bottom */}
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-security/90 to-transparent"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
