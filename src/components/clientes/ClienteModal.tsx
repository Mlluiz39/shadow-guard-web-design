import { Cliente } from '@/types/cliente'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ClienteModalProps {
  open: boolean
  onClose: () => void
  onSave: (cliente: Cliente) => void
  cliente?: Cliente | null
}

function formatRazaoSocial(value: string) {
  return value.replace(/[^a-zA-Z0-9\s&.\-/,]/g, '')
}

function formatTelefone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
      .replace(/-$/, '')
  } else {
    return digits
      .replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
      .replace(/-$/, '')
  }
}

export const ClienteModal = ({
  open,
  onClose,
  onSave,
  cliente,
}: ClienteModalProps) => {
  const [formData, setFormData] = useState<Cliente>({
    id: crypto.randomUUID(),
    nome: '',
    razaoSocial: '',
    documento: '',
    telefone: '',
    contrato: '',
    pastaN: '',
    dataImportacao: new Date().toLocaleDateString(),
    status: 'Ativo',
  })

  useEffect(() => {
    if (cliente) {
      setFormData(cliente)
    } else {
      setFormData({
        id: crypto.randomUUID(),
        nome: '',
        razaoSocial: '',
        documento: '',
        telefone: '',
        contrato: '',
        pastaN: '',
        dataImportacao: new Date().toLocaleDateString(),
        status: 'Ativo',
      })
    }
  }, [cliente])

  if (!open) return null

  // Função para validar campos obrigatórios
  const validarCampos = () => {
    // Ajuste aqui quais campos são obrigatórios
    const camposObrigatorios = [
      'nome',
      'razaoSocial',
      'documento',
      'telefone',
      'contrato',
      'pastaN',
      'dataImportacao',
      'status',
    ] as const

    for (const campo of camposObrigatorios) {
      const valor = formData[campo]
      if (!valor || valor.trim() === '') {
        toast.error(`Por favor, preencha o campo "${campo}"`)
        return false
      }
    }
    return true
  }

  const handleSalvar = () => {
    if (!validarCampos()) return

    onSave(formData)
    onClose()
    toast.success('Cliente salvo com sucesso!')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {cliente ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>

        <div className="space-y-3">
          <input
            className="w-full rounded border p-2"
            value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome"
          />
          <input
            className="w-full rounded border p-2"
            value={formData.razaoSocial}
            onChange={e => {
              const formatted = formatRazaoSocial(e.target.value)
              setFormData({ ...formData, razaoSocial: formatted })
            }}
            placeholder="Razão Social"
          />
          <input
            className="w-full rounded border p-2"
            value={formData.documento}
            onChange={e =>
              setFormData({ ...formData, documento: e.target.value })
            }
            placeholder="Documento"
          />
          <input
            className="w-full rounded border p-2"
            value={formData.telefone}
            onChange={e => {
              const formatted = formatTelefone(e.target.value)
              setFormData({ ...formData, telefone: formatted })
            }}
            placeholder="Telefone"
          />
          <input
            className="w-full rounded border p-2"
            value={formData.contrato}
            onChange={e =>
              setFormData({ ...formData, contrato: e.target.value })
            }
            placeholder="Contrato"
          />
          <input
            className="w-full rounded border p-2"
            value={formData.pastaN}
            onChange={e => setFormData({ ...formData, pastaN: e.target.value })}
            placeholder="Pasta Nº"
          />
          <input
            className="w-full rounded border p-2"
            type="date"
            value={
              formData.dataImportacao
                ? formData.dataImportacao
                : new Date().toISOString().split('T')[0]
            }
            onChange={e =>
              setFormData({ ...formData, dataImportacao: e.target.value })
            }
            placeholder="Data de Importação"
          />
          <select
            className="w-full rounded border p-2"
            value={formData.status}
            onChange={e =>
              setFormData({
                ...formData,
                status: e.target.value as 'Ativo' | 'Inativo' | 'Suspenso',
              })
            }
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Suspenso">Suspenso</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            className="bg-security text-white hover:bg-security/90"
            onClick={handleSalvar}
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
