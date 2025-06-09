
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Database } from '@/integrations/supabase/types'

type Empresa = Database['public']['Tables']['empresas']['Row']
type NovaEmpresa = Database['public']['Tables']['empresas']['Insert']

export const useEmpresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEmpresas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('empresas')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar empresas:', error)
        toast.error('Erro ao carregar empresas')
        return
      }

      setEmpresas(data || [])
    } catch (error) {
      console.error('Erro ao buscar empresas:', error)
      toast.error('Erro ao carregar empresas')
    } finally {
      setLoading(false)
    }
  }

  const createEmpresa = async (empresa: NovaEmpresa) => {
    try {
      const { data, error } = await supabase
        .from('empresas')
        .insert([empresa])
        .select()
        .single()

      if (error) {
        console.error('Erro ao criar empresa:', error)
        toast.error('Erro ao criar empresa')
        return null
      }

      setEmpresas(prev => [data, ...prev])
      toast.success('Empresa criada com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao criar empresa:', error)
      toast.error('Erro ao criar empresa')
      return null
    }
  }

  useEffect(() => {
    fetchEmpresas()
  }, [])

  return {
    empresas,
    loading,
    createEmpresa,
    refetch: fetchEmpresas
  }
}
