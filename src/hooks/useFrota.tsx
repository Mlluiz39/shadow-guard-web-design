
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Frota } from '@/types/frota'

export const useFrota = () => {
  const [frota, setFrota] = useState<Frota[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFrota = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('frota')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar frota:', error)
        toast.error('Erro ao carregar frota')
        return
      }

      setFrota((data || []) as Frota[])
    } catch (error) {
      console.error('Erro ao buscar frota:', error)
      toast.error('Erro ao carregar frota')
    } finally {
      setLoading(false)
    }
  }

  const createVeiculo = async (veiculo: Omit<Frota, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('frota')
        .insert([veiculo])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar veículo:', error)
        toast.error('Erro ao criar veículo')
        return null
      }

      setFrota(prev => [data as Frota, ...prev])
      toast.success('Veículo criado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao criar veículo:', error)
      toast.error('Erro ao criar veículo')
      return null
    }
  }

  const updateVeiculo = async (id: string, veiculo: Partial<Frota>) => {
    try {
      const { data, error } = await supabase
        .from('frota')
        .update(veiculo)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar veículo:', error)
        toast.error('Erro ao atualizar veículo')
        return null
      }

      setFrota(prev => prev.map(v => v.id === id ? data as Frota : v))
      toast.success('Veículo atualizado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error)
      toast.error('Erro ao atualizar veículo')
      return null
    }
  }

  const deleteVeiculo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('frota')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar veículo:', error)
        toast.error('Erro ao deletar veículo')
        return false
      }

      setFrota(prev => prev.filter(v => v.id !== id))
      toast.success('Veículo deletado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao deletar veículo:', error)
      toast.error('Erro ao deletar veículo')
      return false
    }
  }

  useEffect(() => {
    fetchFrota()
  }, [])

  return {
    frota,
    loading,
    createVeiculo,
    updateVeiculo,
    deleteVeiculo,
    refetch: fetchFrota
  }
}
