
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import type { MensagemSetor } from '@/types/mensagem'

export const useMensagensSetores = () => {
  const [mensagens, setMensagens] = useState<MensagemSetor[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchMensagens = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('mensagens_setores')
        .select(`
          *,
          setor_origem:setores!mensagens_setores_setor_origem_id_fkey(nome),
          setor_destino:setores!mensagens_setores_setor_destino_id_fkey(nome)
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar mensagens:', error)
        toast.error('Erro ao carregar mensagens')
        return
      }

      setMensagens(data || [])
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error)
      toast.error('Erro ao carregar mensagens')
    } finally {
      setLoading(false)
    }
  }

  const enviarMensagem = async (
    setorDestinoId: string, 
    setorOrigemId: string, 
    mensagem: string, 
    assunto?: string
  ) => {
    if (!user) {
      toast.error('Usuário não autenticado')
      return false
    }

    try {
      const { error } = await supabase
        .from('mensagens_setores')
        .insert([{
          remetente_id: user.id,
          setor_origem_id: setorOrigemId,
          setor_destino_id: setorDestinoId,
          assunto,
          mensagem
        }])

      if (error) {
        console.error('Erro ao enviar mensagem:', error)
        toast.error('Erro ao enviar mensagem')
        return false
      }

      toast.success('Mensagem enviada com sucesso!')
      fetchMensagens()
      return true
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.error('Erro ao enviar mensagem')
      return false
    }
  }

  const marcarComoLida = async (mensagemId: string) => {
    try {
      const { error } = await supabase
        .from('mensagens_setores')
        .update({ lida: true })
        .eq('id', mensagemId)

      if (error) {
        console.error('Erro ao marcar mensagem como lida:', error)
        return false
      }

      fetchMensagens()
      return true
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error)
      return false
    }
  }

  useEffect(() => {
    fetchMensagens()
  }, [])

  return {
    mensagens,
    loading,
    enviarMensagem,
    marcarComoLida,
    refetch: fetchMensagens
  }
}
