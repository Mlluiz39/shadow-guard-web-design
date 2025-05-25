
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { GridOperacionalItem } from './types'

interface EditGridOperacionalModalProps {
  item: GridOperacionalItem | null
  isOpen: boolean
  onClose: () => void
  onSave: (item: GridOperacionalItem) => void
}

export const EditGridOperacionalModal = ({ item, isOpen, onClose, onSave }: EditGridOperacionalModalProps) => {
  const form = useForm({
    defaultValues: {
      agente1: '',
      agente2: '',
      vtr: '',
      horaEquipe: '',
      horaInicioReal: '',
      kmInicio: 0,
      dataFimMissao: '',
      kmFinal: 0,
      horaFinal: '',
      status: '',
      totalHoraMissao: '',
      kmTotal: 0,
    },
  })

  // Atualiza os valores do formulário quando o item muda
  useEffect(() => {
    if (item) {
      form.reset({
        agente1: item.agente1 || '',
        agente2: item.agente2 || '',
        vtr: item.vtr || '',
        horaEquipe: item.horaEquipe || '',
        horaInicioReal: item.horaInicioReal || '',
        kmInicio: item.kmInicio || 0,
        dataFimMissao: item.dataFimMissao || '',
        kmFinal: item.kmFinal || 0,
        horaFinal: item.horaFinal || '',
        status: item.status || '',
        totalHoraMissao: item.totalHoraMissao || '',
        kmTotal: item.kmTotal || 0,
      })
    }
  }, [item, form])

  const handleSave = (data: any) => {
    if (!item) return
    
    const updatedItem = {
      ...item,
      ...data,
    }
    
    onSave(updatedItem)
    toast.success("Registro atualizado com sucesso!")
    onClose()
  }

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Operação - {item.cod}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="agente1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agente 1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agente2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agente 2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vtr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VTR</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Aguardando">Aguardando</SelectItem>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="horaEquipe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora Equipe</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="horaInicioReal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora Início Real</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="kmInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KM Início</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dataFimMissao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Fim Missão</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="kmFinal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KM Final</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="horaFinal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora Final</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalHoraMissao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Hora Missão</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="kmTotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KM Total</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
