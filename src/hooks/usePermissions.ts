
import { useState, useEffect } from 'react'
import { getPerfilById } from '@/types/perfil'

export const usePermissions = () => {
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [userProfile, setUserProfile] = useState<string>('')

  useEffect(() => {
    // Carregar perfil do usuário do localStorage
    const storedUser = localStorage.getItem('proteqrvUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      const perfil = getPerfilById(user.perfil || 'operacional')
      
      setUserProfile(user.perfil || 'operacional')
      setUserPermissions(perfil?.permissoes || ['dashboard'])
    }
  }, [])

  const hasPermission = (permission: string): boolean => {
    return userPermissions.includes(permission)
  }

  const isMaster = (): boolean => {
    return userProfile === 'master'
  }

  return {
    hasPermission,
    isMaster,
    userPermissions,
    userProfile
  }
}
