
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Empresa } from "@/types/empresa"

const empresasSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  proprietario: z.string().min(1, "Proprietário é obrigatório"),
  email: z.string().email("Email inválido"),
})

interface NovaEmpresaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEmpresa: (empresa: Empresa) => void
}

export const NovaEmpresaDialog = ({ 
  open, 
  onOpenChange, 
  onAddEmpresa 
}: NovaEmpresaDialogProps) => {
  const form = useForm<z.infer<typeof empresasSchema>>({
    resolver: zodResolver(empresasSchema),
    defaultValues: {
      nome: "",
      cnpj: "",
      proprietario: "",
      email: "",
    },
  })

  const onSubmit = (data: z.infer<typeof empresasSchema>) => {
    const newEmpresa: Empresa = {
      id: Date.now().toString(),
      nome: data.nome,
      cnpj: data.cnpj,
      proprietario: data.proprietario,
      email: data.email
    }
    
    onAddEmpresa(newEmpresa)
    onOpenChange(false)
    form.reset()
    toast.success("Empresa adicionada com sucesso!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Empresa</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="00.000.000/0000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="proprietario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proprietário</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do proprietário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
