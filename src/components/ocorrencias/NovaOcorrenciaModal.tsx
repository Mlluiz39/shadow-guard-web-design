
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useOcorrencias } from '@/hooks/useOcorrencias'
import { toast } from 'sonner'

interface NovaOcorrenciaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NovaOcorrenciaModal = ({ open, onOpenChange }: NovaOcorrenciaModalProps) => {
  const { createOcorrencia } = useOcorrencias()
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    descricao: '',
    local: '',
    responsavel: '',
    gravidade: '',
    data_hora: new Date().toISOString().slice(0, 16)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.titulo || !formData.tipo || !formData.descricao || !formData.local || !formData.responsavel || !formData.gravidade) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    try {
      createOcorrencia({
        titulo: formData.titulo,
        tipo: formData.tipo as any,
        descricao: formData.descricao,
        local: formData.local,
        responsavel: formData.responsavel,
        gravidade: formData.gravidade as any,
        data_hora: formData.data_hora,
        status: 'Aberta'
      })

      toast.success('Ocorrência registrada com sucesso!')
      onOpenChange(false)
      
      // Reset form
      setFormData({
        titulo: '',
        tipo: '',
        descricao: '',
        local: '',
        responsavel: '',
        gravidade: '',
        data_hora: new Date().toISOString().slice(0, 16)
      })
    } catch (error) {
      toast.error('Erro ao registrar ocorrência')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Nova Ocorrência</DialogTitle>
          <DialogDescription>
            Registre uma nova ocorrência no sistema. Todos os campos marcados com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Segurança">🛡️ Segurança</SelectItem>
                  <SelectItem value="Emergência">🚨 Emergência</SelectItem>
                  <SelectItem value="Manutenção">🔧 Manutenção</SelectItem>
                  <SelectItem value="Administrativa">📋 Administrativa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gravidade">Gravidade *</Label>
              <Select value={formData.gravidade} onValueChange={(value) => setFormData(prev => ({ ...prev, gravidade: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a gravidade" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Baixa">🟢 Baixa</SelectItem>
                  <SelectItem value="Média">🟡 Média</SelectItem>
                  <SelectItem value="Alta">🟠 Alta</SelectItem>
                  <SelectItem value="Crítica">🔴 Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              placeholder="Título resumido da ocorrência"
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              placeholder="Descrição detalhada da ocorrência"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="local">Local *</Label>
              <Input
                id="local"
                placeholder="Local onde ocorreu"
                value={formData.local}
                onChange={(e) => setFormData(prev => ({ ...prev, local: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável *</Label>
              <Input
                id="responsavel"
                placeholder="Nome do responsável"
                value={formData.responsavel}
                onChange={(e) => setFormData(prev => ({ ...prev, responsavel: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data_hora">Data e Hora *</Label>
            <Input
              id="data_hora"
              type="datetime-local"
              value={formData.data_hora}
              onChange={(e) => setFormData(prev => ({ ...prev, data_hora: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Registrar Ocorrência
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NovaOcorrenciaModal
