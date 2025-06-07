
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
        return ['configuracoes', 'financeiro', 'operacoes', 'logistica', 'dashboard', 'empresas', 'usuarios', 'funcionarios', 'frota']
      case 'supervisor':
        return ['operacoes', 'logistica', 'dashboard', 'funcionarios', 'frota']
      case 'financeiro':
        return ['financeiro', 'dashboard']
      case 'operacional':
        return ['operacoes', 'dashboard', 'funcionarios']
      case 'logistica':
        return ['logistica', 'dashboard', 'frota']
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

  const canAccessEmpresas = (): boolean => {
    return isMaster()
  }

  const canAccessUsuarios = (): boolean => {
    return isMaster()
  }

  const canAccessFuncionarios = (): boolean => {
    return userProfile === 'operacional' || isMaster()
  }

  const canAccessOperacional = (): boolean => {
    return userProfile === 'operacional' || isMaster()
  }

  const canAccessFinanceiro = (): boolean => {
    return userProfile === 'financeiro' || isMaster()
  }

  const canAccessFrota = (): boolean => {
    return userProfile === 'logistica' || userProfile === 'supervisor' || isMaster()
  }

  return {
    hasPermission,
    isMaster,
    userPermissions,
    userProfile,
    canAccessEmpresas,
    canAccessUsuarios,
    canAccessFuncionarios,
    canAccessOperacional,
    canAccessFinanceiro,
    canAccessFrota
  }
}
