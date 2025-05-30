import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Usuario } from '@/types/usuario'
import { UsuariosSearch } from './usuarios/UsuariosSearch'
import { UsuariosTable } from './usuarios/UsuariosTable'
import { NovoUsuarioDialog } from './usuarios/NovoUsuarioDialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Mockup data
const empresas = [
  { id: '1', nome: 'Proteção Segurança Ltda' },
  { id: '2', nome: 'Escolta Expressa S.A.' },
  { id: '3', nome: 'Segurança Total' },
]

const cargos = ['Administrador', 'Supervisor', 'Operador', 'Agente', 'Analista']
const departamentos = [
  'TI',
  'Operações',
  'Financeiro',
  'Comercial',
  'Logística',
  'RH',
]

import { useForm } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

export const UsuariosTab = () => {
  const form = useForm()
  interface FormData {
    nome: string
    email: string
    empresa: string
    cargo: string
    departamento: string
  }

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'Carlos Mendes',
      email: 'carlos@proteqrv.com',
      empresa: 'Proteção Segurança Ltda',
      cargo: 'Administrador',
      departamento: 'TI',
    },
    {
      id: '2',
      nome: 'Ana Oliveira',
      email: 'ana@escolta.com',
      empresa: 'Escolta Expressa S.A.',
      cargo: 'Supervisor',
      departamento: 'Operações',
    },
    {
      id: '3',
      nome: 'Roberto Alves',
      email: 'roberto@total.com',
      empresa: 'Segurança Total',
      cargo: 'Operador',
      departamento: 'Logística',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddUsuario = (newUsuario: Usuario) => {
    setUsuarios([...usuarios, newUsuario])
  }

  const filteredUsuarios = usuarios.filter(
    usuario =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <UsuariosSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Usuário
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma empresa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {empresas.map(empresa => (
                          <SelectItem key={empresa.id} value={empresa.nome}>
                            {empresa.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cargo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cargos.map(cargo => (
                          <SelectItem key={cargo} value={cargo}>
                            {cargo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um departamento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departamentos.map(departamento => (
                          <SelectItem key={departamento} value={departamento}>
                            {departamento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
              <TableHead>Email</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.length > 0 ? (
              filteredUsuarios.map(usuario => (
                <TableRow
                  key={usuario.id}
                  className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition-colors duration-300"
                >
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.empresa}</TableCell>
                  <TableCell>{usuario.cargo}</TableCell>
                  <TableCell>{usuario.departamento}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
