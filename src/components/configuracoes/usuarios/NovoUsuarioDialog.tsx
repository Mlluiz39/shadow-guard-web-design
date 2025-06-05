
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
import { Usuario } from '@/types/usuario'
import { PERFIS_SISTEMA } from '@/types/perfil'
import { toast } from 'react-toastify'

interface Empresa {
  id: string
  nome: string
}

interface NovoUsuarioDialogProps {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  onUsuarioAdded: (usuario: Usuario) => void
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
    empresa: '',
    cargo: '',
    departamento: '',
    perfil: 'operacional',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validações básicas
    if (!formData.nome || !formData.email || !formData.empresa || !formData.cargo || !formData.departamento) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    const novoUsuario: Usuario = {
      id: Date.now().toString(),
      nome: formData.nome,
      email: formData.email,
      empresa: formData.empresa,
      cargo: formData.cargo,
      departamento: formData.departamento,
      perfil: formData.perfil,
      ativo: true,
    }

    // Salvar no localStorage para o sistema de login
    const existingUsers = JSON.parse(localStorage.getItem('sistemaUsuarios') || '[]')
    const updatedUsers = [...existingUsers, novoUsuario]
    localStorage.setItem('sistemaUsuarios', JSON.stringify(updatedUsers))

    onUsuarioAdded(novoUsuario)
    toast.success('Usuário criado com sucesso! Senha padrão: 123456')
    
    // Reset form
    setFormData({
      nome: '',
      email: '',
      empresa: '',
      cargo: '',
      departamento: '',
      perfil: 'operacional',
    })
    
    setDialogOpen(false)
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
            <Button type="submit">Criar Usuário</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
