
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Database } from '@/integrations/supabase/types'

type Agente = Database['public']['Tables']['agentes']['Row']
type NovoAgente = Database['public']['Tables']['agentes']['Insert']

export const useAgentes = () => {
  const [agentes, setAgentes] = useState<Agente[]>([])
  const [loading, setLoading] = useState(true)

  const fetchAgentes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('agentes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar agentes:', error)
        toast.error('Erro ao carregar agentes')
        return
      }

      setAgentes(data || [])
    } catch (error) {
      console.error('Erro ao buscar agentes:', error)
      toast.error('Erro ao carregar agentes')
    } finally {
      setLoading(false)
    }
  }

  const createAgente = async (agente: NovoAgente) => {
    try {
      const { data, error } = await supabase
        .from('agentes')
        .insert([agente])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar agente:', error)
        toast.error('Erro ao criar agente')
        return null
      }

      setAgentes(prev => [data, ...prev])
      toast.success('Agente criado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao criar agente:', error)
      toast.error('Erro ao criar agente')
      return null
    }
  }

  const updateAgente = async (id: string, updates: Partial<NovoAgente>) => {
    try {
      const { data, error } = await supabase
        .from('agentes')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar agente:', error)
        toast.error('Erro ao atualizar agente')
        return null
      }

      setAgentes(prev => prev.map(a => a.id === id ? data : a))
      toast.success('Agente atualizado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao atualizar agente:', error)
      toast.error('Erro ao atualizar agente')
      return null
    }
  }

  useEffect(() => {
    fetchAgentes()
  }, [])

  return {
    agentes,
    loading,
    createAgente,
    updateAgente,
    refetch: fetchAgentes
  }
}
