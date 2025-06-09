
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
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
import { toast } from 'sonner'
import { usePermissions } from '@/hooks/usePermissions'
import { useEmpresas } from '@/hooks/useEmpresas'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

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
      toast.error('Apenas usuários master podem cadastrar empresas!')
      return
    }

    const result = await createEmpresa(data)
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Painel Administrativo</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Gerencie configurações do sistema baseado em suas permissões
        </p>

        <div className="flex flex-wrap items-center gap-2 border-b pb-2">
          <Button
            variant="outline"
            className="rounded-none border-b-2 border-blue-600 text-blue-600"
          >
            Empresas
          </Button>
          <Button variant="ghost">Usuários</Button>
          <Button variant="ghost">Funcionários</Button>
          <Button variant="ghost">Operacional</Button>
          <Button variant="ghost">Financeiro</Button>
          <Button variant="ghost">Frota</Button>
        </div>
      </div>

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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpresas.length > 0 ? (
                filteredEmpresas.map(empresa => (
                  <TableRow
                    key={empresa.id}
                    className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300"
                  >
                    <TableCell className="font-medium">
                      {empresa.nome}
                    </TableCell>
                    <TableCell>{empresa.cnpj}</TableCell>
                    <TableCell>{empresa.proprietario}</TableCell>
                    <TableCell>{empresa.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    Nenhuma empresa encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
