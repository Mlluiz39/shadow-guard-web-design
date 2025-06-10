
-- Criar tabela de setores
CREATE TABLE public.setores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir setores padrão
INSERT INTO public.setores (nome, descricao) VALUES
('Operacional', 'Setor responsável pelas operações de campo'),
('Financeiro', 'Setor responsável pela gestão financeira'),
('Comercial', 'Setor responsável pelas vendas e atendimento'),
('Administrativo', 'Setor responsável pela administração geral'),
('Logística', 'Setor responsável pela logística e transporte');

-- Criar tabela de mensagens entre setores
CREATE TABLE public.mensagens_setores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  remetente_id UUID REFERENCES auth.users NOT NULL,
  setor_origem_id UUID REFERENCES public.setores NOT NULL,
  setor_destino_id UUID REFERENCES public.setores NOT NULL,
  assunto VARCHAR(255),
  mensagem TEXT NOT NULL,
  lida BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS para setores
ALTER TABLE public.setores ENABLE ROW LEVEL SECURITY;

-- Política para visualizar todos os setores (público)
CREATE POLICY "Todos podem visualizar setores" 
  ON public.setores 
  FOR SELECT 
  USING (true);

-- Adicionar RLS para mensagens
ALTER TABLE public.mensagens_setores ENABLE ROW LEVEL SECURITY;

-- Política para visualizar mensagens do seu setor
CREATE POLICY "Usuários podem ver mensagens do seu setor" 
  ON public.mensagens_setores 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      JOIN public.setores s ON s.nome = p.departamento 
      WHERE p.id = auth.uid() 
      AND (s.id = setor_origem_id OR s.id = setor_destino_id)
    )
  );

-- Política para inserir mensagens
CREATE POLICY "Usuários podem enviar mensagens" 
  ON public.mensagens_setores 
  FOR INSERT 
  WITH CHECK (auth.uid() = remetente_id);

-- Política para atualizar mensagens (marcar como lida)
CREATE POLICY "Usuários podem marcar mensagens como lidas" 
  ON public.mensagens_setores 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      JOIN public.setores s ON s.nome = p.departamento 
      WHERE p.id = auth.uid() 
      AND s.id = setor_destino_id
    )
  );

-- Trigger para atualizar updated_at em setores
CREATE TRIGGER handle_updated_at_setores
  BEFORE UPDATE ON public.setores
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Trigger para atualizar updated_at em mensagens
CREATE TRIGGER handle_updated_at_mensagens_setores
  BEFORE UPDATE ON public.mensagens_setores
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
