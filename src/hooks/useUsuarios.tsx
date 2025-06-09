
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import type { Database } from '@/integrations/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']
type NovoProfile = Database['public']['Tables']['profiles']['Insert']

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar usuários:', error)
        toast.error('Erro ao carregar usuários')
        return
      }

      setUsuarios(data || [])
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  const createUsuario = async (email: string, password: string, metadata: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })

      if (error) {
        console.error('Erro ao criar usuário:', error)
        toast.error('Erro ao criar usuário: ' + error.message)
        return null
      }

      toast.success('Usuário criado com sucesso!')
      await fetchUsuarios() // Refresh the list
      return data.user
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      toast.error('Erro ao criar usuário')
      return null
    }
  }

  const updateUsuario = async (id: string, usuario: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(usuario)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Erro ao atualizar usuário:', error)
        toast.error('Erro ao atualizar usuário')
        return null
      }

      setUsuarios(prev => prev.map(u => u.id === id ? data : u))
      toast.success('Usuário atualizado com sucesso!')
      return data
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      toast.error('Erro ao atualizar usuário')
      return null
    }
  }

  const deleteUsuario = async (id: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar usuário:', error)
        toast.error('Erro ao deletar usuário')
        return false
      }

      setUsuarios(prev => prev.filter(u => u.id !== id))
      toast.success('Usuário deletado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
      toast.error('Erro ao deletar usuário')
      return false
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  return {
    usuarios,
    loading,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    refetch: fetchUsuarios
  }
}
