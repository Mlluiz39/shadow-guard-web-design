import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Plus, Search } from 'lucide-react'
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

interface Empresa {
  id: string
  nome: string
  cnpj: string
  proprietario: string
  email: string
}

const empresasSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  proprietario: z.string().min(1, 'Proprietário é obrigatório'),
  email: z.string().email('Email inválido'),
})

export const EmpresasTab = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([
    {
      id: '1',
      nome: 'Proteção Segurança Ltda',
      cnpj: '12.345.678/0001-90',
      proprietario: 'João Silva',
      email: 'joao@protecao.com',
    },
    {
      id: '2',
      nome: 'Escolta Expressa S.A.',
      cnpj: '98.765.432/0001-10',
      proprietario: 'Maria Souza',
      email: 'maria@escolta.com',
    },
    {
      id: '3',
      nome: 'Segurança Total',
      cnpj: '45.678.901/0001-23',
      proprietario: 'Pedro Santos',
      email: 'pedro@total.com',
    },
  ])

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

  const onSubmit = (data: z.infer<typeof empresasSchema>) => {
    // Fix by explicitly creating a new object that matches the Empresa interface
    const newEmpresa: Empresa = {
      id: Date.now().toString(),
      nome: data.nome,
      cnpj: data.cnpj,
      proprietario: data.proprietario,
      email: data.email,
    }

    setEmpresas([...empresas, newEmpresa])
    setDialogOpen(false)
    form.reset()
    toast.success('Empresa adicionada com sucesso!')
  }

  const filteredEmpresas = empresas.filter(
    empresa =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm) ||
      empresa.proprietario.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Nova Empresa
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                <Button type="submit">Adicionar</Button>
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
                  <TableCell className="font-medium">{empresa.nome}</TableCell>
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
  )
}
