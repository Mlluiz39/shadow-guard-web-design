
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PERFIS_SISTEMA } from '@/types/perfil'
import { toast } from 'react-toastify'
import { supabase } from '@/integrations/supabase/client'

interface Empresa {
  id: string
  nome: string
}

interface NovoUsuarioDialogProps {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  onUsuarioAdded: (usuario: any) => void
  empresas: Empresa[]
  cargos: string[]
  departamentos: string[]
}

export const NovoUsuarioDialog = ({
  dialogOpen,
  setDialogOpen,
  onUsuarioAdded,
  empresas,
  cargos,
  departamentos,
}: NovoUsuarioDialogProps) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    empresa: '',
    cargo: '',
    departamento: '',
    perfil: 'operacional',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.nome || !formData.email || !formData.password) {
      toast.error('Por favor, preencha pelo menos nome, email e senha.')
      return
    }

    if (formData.password.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.')
      return
    }

    setLoading(true)

    try {
      // Criar usuário na auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nome: formData.nome
          }
        }
      })

      if (authError) {
        toast.error('Erro ao criar usuário: ' + authError.message)
        return
      }

      if (authData.user) {
        // Atualizar perfil com dados adicionais
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            empresa: formData.empresa,
            cargo: formData.cargo,
            departamento: formData.departamento,
            perfil: formData.perfil
          })
          .eq('id', authData.user.id)

        if (profileError) {
          console.error('Erro ao atualizar perfil:', profileError)
        }
      }

      onUsuarioAdded(formData)
      toast.success('Usuário criado com sucesso!')
      
      // Reset form
      setFormData({
        nome: '',
        email: '',
        password: '',
        empresa: '',
        cargo: '',
        departamento: '',
        perfil: 'operacional',
      })
      
      setDialogOpen(false)
    } catch (error) {
      console.error('Erro:', error)
      toast.error('Erro inesperado ao criar usuário')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome</label>
            <Input
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              placeholder="Nome completo"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Senha</label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Empresa</label>
            <Select
              value={formData.empresa}
              onValueChange={(value) => setFormData({ ...formData, empresa: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma empresa" />
              </SelectTrigger>
              <SelectContent>
                {empresas.map((empresa) => (
                  <SelectItem key={empresa.id} value={empresa.nome}>
                    {empresa.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Cargo</label>
            <Select
              value={formData.cargo}
              onValueChange={(value) => setFormData({ ...formData, cargo: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                {cargos.map((cargo) => (
                  <SelectItem key={cargo} value={cargo}>
                    {cargo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Departamento</label>
            <Select
              value={formData.departamento}
              onValueChange={(value) => setFormData({ ...formData, departamento: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um departamento" />
              </SelectTrigger>
              <SelectContent>
                {departamentos.map((depto) => (
                  <SelectItem key={depto} value={depto}>
                    {depto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Perfil de Acesso</label>
            <Select
              value={formData.perfil}
              onValueChange={(value) => setFormData({ ...formData, perfil: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERFIS_SISTEMA.map((perfil) => (
                  <SelectItem key={perfil.id} value={perfil.id}>
                    <div>
                      <div className="font-medium">{perfil.nome}</div>
                      <div className="text-xs text-gray-500">{perfil.descricao}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando...' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
