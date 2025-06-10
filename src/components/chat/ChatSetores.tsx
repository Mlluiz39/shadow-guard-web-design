
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Send, MessageSquare, Users, Clock } from 'lucide-react'
import { useSetores } from '@/hooks/useSetores'
import { useMensagensSetores } from '@/hooks/useMensagensSetores'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export const ChatSetores = () => {
  const { setores } = useSetores()
  const { mensagens, loading, enviarMensagem, marcarComoLida } = useMensagensSetores()
  const { profile } = useAuth()
  
  const [novaMensagem, setNovaMensagem] = useState('')
  const [assunto, setAssunto] = useState('')
  const [setorDestino, setSetorDestino] = useState('')
  const [enviando, setEnviando] = useState(false)

  // Encontrar o setor do usuário atual
  const setorUsuario = setores.find(setor => setor.nome === profile?.departamento)

  const handleEnviarMensagem = async () => {
    if (!novaMensagem.trim()) {
      toast.error('Digite uma mensagem')
      return
    }

    if (!setorDestino) {
      toast.error('Selecione um setor de destino')
      return
    }

    if (!setorUsuario) {
      toast.error('Setor do usuário não identificado')
      return
    }

    setEnviando(true)
    const sucesso = await enviarMensagem(
      setorDestino,
      setorUsuario.id,
      novaMensagem,
      assunto || undefined
    )

    if (sucesso) {
      setNovaMensagem('')
      setAssunto('')
      setSetorDestino('')
    }
    setEnviando(false)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR')
  }

  // Filtrar mensagens não lidas
  const mensagensNaoLidas = mensagens.filter(m => !m.lida && m.setor_destino_id === setorUsuario?.id)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Chat entre Setores
        </h1>
        {mensagensNaoLidas.length > 0 && (
          <Badge variant="destructive" className="gap-1">
            {mensagensNaoLidas.length} não lidas
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enviar Nova Mensagem */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Nova Mensagem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Setor de origem:</label>
              <p className="text-sm text-muted-foreground">
                {setorUsuario?.nome || 'Não identificado'}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Setor de destino:</label>
              <Select value={setorDestino} onValueChange={setSetorDestino}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores
                    .filter(setor => setor.id !== setorUsuario?.id)
                    .map(setor => (
                      <SelectItem key={setor.id} value={setor.id}>
                        {setor.nome}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Assunto (opcional):</label>
              <Input
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Digite o assunto da mensagem"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Mensagem:</label>
              <Textarea
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                rows={4}
              />
            </div>

            <Button 
              onClick={handleEnviarMensagem}
              disabled={enviando || !novaMensagem.trim() || !setorDestino}
              className="w-full"
            >
              {enviando ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Mensagens */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Mensagens ({mensagens.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Carregando mensagens...</p>
            ) : mensagens.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma mensagem encontrada</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`p-4 rounded-lg border ${
                      !mensagem.lida && mensagem.setor_destino_id === setorUsuario?.id
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {mensagem.setor_origem?.nome} → {mensagem.setor_destino?.nome}
                        </Badge>
                        {!mensagem.lida && mensagem.setor_destino_id === setorUsuario?.id && (
                          <Badge variant="destructive" className="text-xs">
                            Nova
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatarData(mensagem.created_at)}
                      </div>
                    </div>

                    {mensagem.assunto && (
                      <h4 className="font-medium mb-1">{mensagem.assunto}</h4>
                    )}

                    <p className="text-sm mb-2">{mensagem.mensagem}</p>

                    {!mensagem.lida && mensagem.setor_destino_id === setorUsuario?.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => marcarComoLida(mensagem.id)}
                        className="text-xs"
                      >
                        Marcar como lida
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
