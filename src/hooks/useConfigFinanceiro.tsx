
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { ConfigFinanceiro } from '@/types/config-financeiro'

export const useConfigFinanceiro = () => {
  const [configs, setConfigs] = useState<ConfigFinanceiro[]>([])
  const [loading, setLoading] = useState(true)

  const fetchConfigs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('config_financeiro')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar configurações financeiras:', error)
        toast.error('Erro ao carregar configurações financeiras')
        return
      }

      setConfigs(data || [])
    } catch (error) {
      console.error('Erro ao buscar configurações financeiras:', error)
      toast.error('Erro ao carregar configurações financeiras')
    } finally {
      setLoading(false)
    }
  }

  const createConfig = async (config: Omit<ConfigFinanceiro, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('config_financeiro')
        .insert([config])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar configuração:', error)
        toast.error('Erro ao criar configuração')
        return null
      }

      setConfigs(prev => [data, ...prev])
      toast.success('Configuração criada com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao criar configuração:', error)
      toast.error('Erro ao criar configuração')
      return null
    }
  }

  const updateConfig = async (id: string, config: Partial<ConfigFinanceiro>) => {
    try {
      const { data, error } = await supabase
        .from('config_financeiro')
        .update(config)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar configuração:', error)
        toast.error('Erro ao atualizar configuração')
        return null
      }

      setConfigs(prev => prev.map(c => c.id === id ? data : c))
      toast.success('Configuração atualizada com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error)
      toast.error('Erro ao atualizar configuração')
      return null
    }
  }

  const deleteConfig = async (id: string) => {
    try {
      const { error } = await supabase
        .from('config_financeiro')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar configuração:', error)
        toast.error('Erro ao deletar configuração')
        return false
      }

      setConfigs(prev => prev.filter(c => c.id !== id))
      toast.success('Configuração deletada com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao deletar configuração:', error)
      toast.error('Erro ao deletar configuração')
      return false
    }
  }

  useEffect(() => {
    fetchConfigs()
  }, [])

  return {
    configs,
    loading,
    createConfig,
    updateConfig,
    deleteConfig,
    refetch: fetchConfigs
  }
}
