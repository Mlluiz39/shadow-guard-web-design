
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Setor } from '@/types/mensagem'

export const useSetores = () => {
  const [setores, setSetores] = useState<Setor[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSetores = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('setores')
        .select('*')
        .order('nome')

      if (error) {
        console.error('Erro ao buscar setores:', error)
        toast.error('Erro ao carregar setores')
        return
      }

      setSetores(data || [])
    } catch (error) {
      console.error('Erro ao buscar setores:', error)
      toast.error('Erro ao carregar setores')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSetores()
  }, [])

  return {
    setores,
    loading,
    refetch: fetchSetores
  }
}
