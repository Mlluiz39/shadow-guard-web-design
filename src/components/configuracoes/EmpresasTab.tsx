
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
import { Plus, Search, AlertCircle, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { usePermissions } from '@/hooks/usePermissions'
import { useEmpresas } from '@/hooks/useEmpresas'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { EmpresasTable } from '@/components/configuracoes/empresas/EmpresasTable'

const empresasSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  proprietario: z.string().min(1, 'Proprietário é obrigatório'),
  email: z.string().email('Email inválido'),
})

export const EmpresasTab = () => {
  const { isMaster, canAccessEmpresas } = usePermissions()
  const { empresas, loading, createEmpresa } = useEmpresas()
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof empresasSchema>>({
    resolver: zodResolver(empresasSchema),
    defaultValues: {
      nome: '',
      cnpj: '',
      proprietario: '',
      email: '',
    },
  })

  if (!canAccessEmpresas()) {
    return (
      <div className="space-y-4">
        <Card className="p-12">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
            <CardTitle className="text-xl text-red-600">
              Acesso Restrito
            </CardTitle>
            <p className="text-gray-600 text-center max-w-md">
              Apenas usuários master podem gerenciar empresas do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const onSubmit = async (data: z.infer<typeof empresasSchema>) => {
    if (!isMaster()) {
      return
    }

    const empresaData = {
      nome: data.nome,
      cnpj: data.cnpj,
      proprietario: data.proprietario,
      email: data.email,
    }

    const result = await createEmpresa(empresaData)
    if (result) {
      setDialogOpen(false)
      form.reset()
    }
  }

  const filteredEmpresas = empresas.filter(
    empresa =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm) ||
      empresa.proprietario.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empresas..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        {isMaster() && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Empresa
          </Button>
        )}
      </div>

      {isMaster() && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Empresa</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                        <Input
                          placeholder="Nome do proprietário"
                          {...field}
                        />
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
                        <Input
                          placeholder="email@exemplo.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adicionando...
                      </>
                    ) : (
                      'Adicionar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}

      <EmpresasTable empresas={filteredEmpresas} />
    </div>
  )
}
