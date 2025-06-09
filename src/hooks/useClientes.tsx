
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Database } from '@/integrations/supabase/types'

type Cliente = Database['public']['Tables']['clientes']['Row']
type NovoCliente = Database['public']['Tables']['clientes']['Insert']

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)

  const fetchClientes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar clientes:', error)
        toast.error('Erro ao carregar clientes')
        return
      }

      setClientes(data || [])
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
      toast.error('Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }

  const createCliente = async (cliente: NovoCliente) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert([cliente])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar cliente:', error)
        toast.error('Erro ao criar cliente')
        return null
      }

      setClientes(prev => [data, ...prev])
      toast.success('Cliente criado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao criar cliente:', error)
      toast.error('Erro ao criar cliente')
      return null
    }
  }

  const updateCliente = async (id: string, updates: Partial<NovoCliente>) => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar cliente:', error)
        toast.error('Erro ao atualizar cliente')
        return null
      }

      setClientes(prev => prev.map(c => c.id === id ? data : c))
      toast.success('Cliente atualizado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      toast.error('Erro ao atualizar cliente')
      return null
    }
  }

  const deleteCliente = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar cliente:', error)
        toast.error('Erro ao deletar cliente')
        return false
      }

      setClientes(prev => prev.filter(c => c.id !== id))
      toast.success('Cliente deletado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao deletar cliente:', error)
      toast.error('Erro ao deletar cliente')
      return false
    }
  }

  useEffect(() => {
    fetchClientes()
  }, [])

  return {
    clientes,
    loading,
    createCliente,
    updateCliente,
    deleteCliente,
    refetch: fetchClientes
  }
}
