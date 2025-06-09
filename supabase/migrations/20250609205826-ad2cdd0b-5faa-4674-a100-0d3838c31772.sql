
-- Criar tabela para funcionários
CREATE TABLE public.funcionarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  rg TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  cargo TEXT,
  departamento TEXT,
  salario DECIMAL(10,2),
  data_admissao DATE,
  status TEXT NOT NULL DEFAULT 'Ativo',
  empresa TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para configurações operacionais
CREATE TABLE public.config_operacional (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'turno', 'posto', 'procedimento', etc
  descricao TEXT,
  valor TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para configurações financeiras
CREATE TABLE public.config_financeiro (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'conta', 'centro_custo', 'categoria', etc
  codigo TEXT,
  descricao TEXT,
  valor DECIMAL(15,2),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para frota/veículos
CREATE TABLE public.frota (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  placa TEXT NOT NULL UNIQUE,
  modelo TEXT NOT NULL,
  marca TEXT NOT NULL,
  ano INTEGER,
  cor TEXT,
  combustivel TEXT,
  quilometragem INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Disponível',
  motorista_responsavel TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar triggers para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_funcionarios_updated_at
  BEFORE UPDATE ON public.funcionarios
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_config_operacional_updated_at
  BEFORE UPDATE ON public.config_operacional
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_config_financeiro_updated_at
  BEFORE UPDATE ON public.config_financeiro
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_frota_updated_at
  BEFORE UPDATE ON public.frota
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
