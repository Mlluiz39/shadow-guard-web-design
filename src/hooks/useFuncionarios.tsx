
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Funcionario } from '@/types/funcionario'

export const useFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFuncionarios = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('funcionarios')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar funcionários:', error)
        toast.error('Erro ao carregar funcionários')
        return
      }

      setFuncionarios(data || [])
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error)
      toast.error('Erro ao carregar funcionários')
    } finally {
      setLoading(false)
    }
  }

  const createFuncionario = async (funcionario: Omit<Funcionario, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('funcionarios')
        .insert([funcionario])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar funcionário:', error)
        toast.error('Erro ao criar funcionário')
        return null
      }

      setFuncionarios(prev => [data, ...prev])
      toast.success('Funcionário criado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao criar funcionário:', error)
      toast.error('Erro ao criar funcionário')
      return null
    }
  }

  const updateFuncionario = async (id: string, funcionario: Partial<Funcionario>) => {
    try {
      const { data, error } = await supabase
        .from('funcionarios')
        .update(funcionario)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar funcionário:', error)
        toast.error('Erro ao atualizar funcionário')
        return null
      }

      setFuncionarios(prev => prev.map(f => f.id === id ? data : f))
      toast.success('Funcionário atualizado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error)
      toast.error('Erro ao atualizar funcionário')
      return null
    }
  }

  const deleteFuncionario = async (id: string) => {
    try {
      const { error } = await supabase
        .from('funcionarios')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar funcionário:', error)
        toast.error('Erro ao deletar funcionário')
        return false
      }

      setFuncionarios(prev => prev.filter(f => f.id !== id))
      toast.success('Funcionário deletado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao deletar funcionário:', error)
      toast.error('Erro ao deletar funcionário')
      return false
    }
  }

  useEffect(() => {
    fetchFuncionarios()
  }, [])

  return {
    funcionarios,
    loading,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario,
    refetch: fetchFuncionarios
  }
}
