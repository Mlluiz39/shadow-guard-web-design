
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  MessageSquare, 
  Send, 
  Users, 
  Hash, 
  Circle,
  Phone,
  Video
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

interface Mensagem {
  id: string
  usuario: string
  setor: string
  conteudo: string
  timestamp: Date
  canal: string
  tipo: 'texto' | 'sistema'
}

interface Usuario {
  id: string
  nome: string
  setor: string
  status: 'online' | 'ocupado' | 'ausente' | 'offline'
  avatar?: string
}

const canais = [
  { id: 'geral', nome: 'Geral', descricao: 'Comunicação geral da empresa' },
  { id: 'operacional', nome: 'Operacional', descricao: 'Equipe operacional' },
  { id: 'financeiro', nome: 'Financeiro', descricao: 'Setor financeiro' },
  { id: 'logistica', nome: 'Logística', descricao: 'Setor de logística' },
  { id: 'supervisao', nome: 'Supervisão', descricao: 'Supervisores e gestores' },
  { id: 'emergencia', nome: 'Emergência', descricao: 'Canal para emergências' }
]

const usuariosOnline: Usuario[] = [
  { id: '1', nome: 'Carlos Silva', setor: 'Operacional', status: 'online' },
  { id: '2', nome: 'Ana Santos', setor: 'Financeiro', status: 'online' },
  { id: '3', nome: 'João Pereira', setor: 'Logística', status: 'ocupado' },
  { id: '4', nome: 'Maria Costa', setor: 'Supervisão', status: 'online' },
  { id: '5', nome: 'Pedro Oliveira', setor: 'Operacional', status: 'ausente' },
  { id: '6', nome: 'Lucia Rodrigues', setor: 'Financeiro', status: 'offline' }
]

const ChatOperacional = () => {
  const [canalAtivo, setCanalAtivo] = useState('geral')
  const [mensagem, setMensagem] = useState('')
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { profile } = useAuth()

  // Mensagens iniciais de exemplo
  useEffect(() => {
    const mensagensIniciais: Mensagem[] = [
      {
        id: '1',
        usuario: 'Sistema',
        setor: 'Sistema',
        conteudo: `Canal #${canais.find(c => c.id === canalAtivo)?.nome} iniciado`,
        timestamp: new Date(Date.now() - 3600000),
        canal: canalAtivo,
        tipo: 'sistema'
      },
      {
        id: '2',
        usuario: 'Carlos Silva',
        setor: 'Operacional',
        conteudo: 'Bom dia pessoal! Tudo certo para o turno da manhã.',
        timestamp: new Date(Date.now() - 1800000),
        canal: canalAtivo,
        tipo: 'texto'
      },
      {
        id: '3',
        usuario: 'Ana Santos',
        setor: 'Financeiro',
        conteudo: 'Bom dia! Preciso dos relatórios de ontem para fechamento.',
        timestamp: new Date(Date.now() - 900000),
        canal: canalAtivo,
        tipo: 'texto'
      }
    ]
    setMensagens(mensagensIniciais)
  }, [canalAtivo])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mensagens])

  const enviarMensagem = () => {
    if (!mensagem.trim() || !profile) return

    const novaMensagem: Mensagem = {
      id: Date.now().toString(),
      usuario: profile.nome,
      setor: profile.perfil,
      conteudo: mensagem,
      timestamp: new Date(),
      canal: canalAtivo,
      tipo: 'texto'
    }

    setMensagens(prev => [...prev, novaMensagem])
    setMensagem('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensagem()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'ocupado': return 'bg-red-500'
      case 'ausente': return 'bg-yellow-500'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online'
      case 'ocupado': return 'Ocupado'
      case 'ausente': return 'Ausente'
      default: return 'Offline'
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <MessageSquare className="h-6 w-6" /> Chat Operacional
        </h1>
        <div className="text-sm text-security-muted">
          {usuariosOnline.filter(u => u.status === 'online').length} usuários online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Sidebar com canais e usuários */}
        <div className="lg:col-span-1 space-y-4">
          {/* Canais */}
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Canais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {canais.map(canal => (
                <button
                  key={canal.id}
                  onClick={() => setCanalAtivo(canal.id)}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                    canalAtivo === canal.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent/10'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Hash className="h-3 w-3" />
                    <span className="font-medium">{canal.nome}</span>
                    {canal.id === 'emergencia' && (
                      <Badge variant="destructive" className="text-xs">!</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground pl-5">
                    {canal.descricao}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Usuários Online */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários ({usuariosOnline.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {usuariosOnline.map(usuario => (
                    <div key={usuario.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent/10">
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {usuario.nome.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Circle className={cn('h-3 w-3 absolute -bottom-1 -right-1 rounded-full border-2 border-white', getStatusColor(usuario.status))} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {usuario.nome}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {usuario.setor}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getStatusText(usuario.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Área principal do chat */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {/* Header do canal */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  <CardTitle className="text-lg">
                    {canais.find(c => c.id === canalAtivo)?.nome}
                  </CardTitle>
                  <Badge variant="outline">
                    {mensagens.filter(m => m.canal === canalAtivo && m.tipo === 'texto').length} mensagens
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {canais.find(c => c.id === canalAtivo)?.descricao}
              </div>
            </CardHeader>

            <Separator />

            {/* Área de mensagens */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {mensagens
                    .filter(m => m.canal === canalAtivo)
                    .map(msg => (
                      <div key={msg.id} className={cn(
                        'flex gap-3',
                        msg.tipo === 'sistema' && 'justify-center'
                      )}>
                        {msg.tipo === 'texto' && (
                          <>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {msg.usuario.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{msg.usuario}</span>
                                <Badge variant="outline" className="text-xs">
                                  {msg.setor}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {msg.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <div className="text-sm">{msg.conteudo}</div>
                            </div>
                          </>
                        )}
                        {msg.tipo === 'sistema' && (
                          <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {msg.conteudo}
                          </div>
                        )}
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            <Separator />

            {/* Input de mensagem */}
            <div className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={`Mensagem para #${canais.find(c => c.id === canalAtivo)?.nome}`}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={enviarMensagem} disabled={!mensagem.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Pressione Enter para enviar, Shift + Enter para nova linha
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ChatOperacional
