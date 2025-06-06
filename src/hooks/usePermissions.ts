
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export const usePermissions = () => {
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [userProfile, setUserProfile] = useState<string>('')
  const { profile } = useAuth()

  useEffect(() => {
    if (profile) {
      const perfilPermissions = getPermissionsByProfile(profile.perfil)
      setUserProfile(profile.perfil)
      setUserPermissions(perfilPermissions)
    }
  }, [profile])

  const getPermissionsByProfile = (perfil: string): string[] => {
    switch (perfil) {
      case 'master':
        return ['configuracoes', 'financeiro', 'operacoes', 'logistica', 'dashboard']
      case 'supervisor':
        return ['operacoes', 'logistica', 'dashboard']
      case 'financeiro':
        return ['financeiro', 'dashboard']
      case 'operacional':
        return ['operacoes', 'dashboard']
      case 'logistica':
        return ['logistica', 'dashboard']
      default:
        return ['dashboard']
    }
  }

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
