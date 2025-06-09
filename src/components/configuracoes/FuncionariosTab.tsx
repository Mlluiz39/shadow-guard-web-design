
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
import { Plus, Search, Loader2, Edit, Trash } from 'lucide-react'
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
import { useFuncionarios } from '@/hooks/useFuncionarios'
import { usePermissions } from '@/hooks/usePermissions'
import type { Funcionario } from '@/types/funcionario'

const funcionarioSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: z.string().min(11, 'CPF inválido'),
  rg: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  endereco: z.string().optional(),
  cargo: z.string().optional(),
  departamento: z.string().optional(),
  salario: z.string().optional(),
  data_admissao: z.string().optional(),
  status: z.enum(['Ativo', 'Inativo', 'Afastado']),
  empresa: z.string().optional(),
})

export const FuncionariosTab = () => {
  const { isMaster, userProfile } = usePermissions()
  const { funcionarios, loading, createFuncionario, updateFuncionario, deleteFuncionario } = useFuncionarios()
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null)

  const form = useForm<z.infer<typeof funcionarioSchema>>({
    resolver: zodResolver(funcionarioSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      rg: '',
      telefone: '',
      email: '',
      endereco: '',
      cargo: '',
      departamento: '',
      salario: '',
      data_admissao: '',
      status: 'Ativo',
      empresa: '',
    },
  })

  const canManageFuncionarios = isMaster() || userProfile === 'operacional'

  const onSubmit = async (data: z.infer<typeof funcionarioSchema>) => {
    const funcionarioData = {
      ...data,
      salario: data.salario ? parseFloat(data.salario) : undefined,
      email: data.email || undefined,
    }

    if (editingFuncionario) {
      await updateFuncionario(editingFuncionario.id, funcionarioData)
    } else {
      await createFuncionario(funcionarioData)
    }
    
    setDialogOpen(false)
    setEditingFuncionario(null)
    form.reset()
  }

  const handleEdit = (funcionario: Funcionario) => {
    setEditingFuncionario(funcionario)
    form.reset({
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      rg: funcionario.rg || '',
      telefone: funcionario.telefone || '',
      email: funcionario.email || '',
      endereco: funcionario.endereco || '',
      cargo: funcionario.cargo || '',
      departamento: funcionario.departamento || '',
      salario: funcionario.salario?.toString() || '',
      data_admissao: funcionario.data_admissao || '',
      status: funcionario.status,
      empresa: funcionario.empresa || '',
    })
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      await deleteFuncionario(id)
    }
  }

  const filteredFuncionarios = funcionarios.filter(
    funcionario =>
      funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funcionario.cpf.includes(searchTerm) ||
      funcionario.cargo?.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Buscar funcionários..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        {canManageFuncionarios && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Novo Funcionário
          </Button>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingFuncionario ? 'Editar Funcionário' : 'Adicionar Novo Funcionário'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="000.000.000-00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="RG" {...field} />
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
                        <Input placeholder="(11) 99999-9999" {...field} />
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

                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Cargo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="departamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Departamento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="empresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setDialogOpen(false)
                    setEditingFuncionario(null)
                    form.reset()
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingFuncionario ? 'Atualizando...' : 'Adicionando...'}
                    </>
                  ) : (
                    editingFuncionario ? 'Atualizar' : 'Adicionar'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFuncionarios.length > 0 ? (
              filteredFuncionarios.map(funcionario => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.cpf}</TableCell>
                  <TableCell>{funcionario.cargo || '-'}</TableCell>
                  <TableCell>{funcionario.departamento || '-'}</TableCell>
                  <TableCell>{funcionario.status}</TableCell>
                  <TableCell>
                    {canManageFuncionarios && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(funcionario)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(funcionario.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Nenhum funcionário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
