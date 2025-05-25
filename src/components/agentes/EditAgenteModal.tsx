
import { useState } from 'react'
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
import { toast } from '@/components/ui/use-toast'

interface Agente {
  id: number
  nome: string
  nomeGuerra: string
  situacao: string
  re: string
  telefone: string
}

interface EditAgenteModalProps {
  agente: Agente | null
  isOpen: boolean
  onClose: () => void
  onSave: (agente: Agente) => void
}

export const EditAgenteModal = ({ agente, isOpen, onClose, onSave }: EditAgenteModalProps) => {
  const form = useForm({
    defaultValues: {
      nome: agente?.nome || '',
      nomeGuerra: agente?.nomeGuerra || '',
      situacao: agente?.situacao || '',
      re: agente?.re || '',
      telefone: agente?.telefone || '',
    },
  })

  const handleSave = (data: any) => {
    if (!agente) return
    
    const updatedAgente = {
      ...agente,
      ...data,
    }
    
    onSave(updatedAgente)
    toast({
      title: "Agente atualizado",
      description: "Os dados do agente foram salvos com sucesso.",
    })
    onClose()
  }

  if (!agente) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Agente</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nomeGuerra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome de Guerra</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="situacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Situação</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Disponível">Disponível</SelectItem>
                      <SelectItem value="Em serviço">Em serviço</SelectItem>
                      <SelectItem value="Folga">Folga</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="re"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RE</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
