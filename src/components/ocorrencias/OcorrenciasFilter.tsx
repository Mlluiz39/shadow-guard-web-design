
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Ocorrencia } from '@/types/ocorrencia'

interface OcorrenciasFilterProps {
  ocorrencias: Ocorrencia[]
  onFilter: (filtered: Ocorrencia[]) => void
}

const OcorrenciasFilter = ({ ocorrencias, onFilter }: OcorrenciasFilterProps) => {
  const [filters, setFilters] = useState({
    tipo: '',
    status: '',
    gravidade: '',
    responsavel: '',
    dataInicio: '',
    dataFim: ''
  })

  const applyFilters = () => {
    let filtered = [...ocorrencias]

    if (filters.tipo) {
      filtered = filtered.filter(o => o.tipo === filters.tipo)
    }

    if (filters.status) {
      filtered = filtered.filter(o => o.status === filters.status)
    }

    if (filters.gravidade) {
      filtered = filtered.filter(o => o.gravidade === filters.gravidade)
    }

    if (filters.responsavel) {
      filtered = filtered.filter(o => 
        o.responsavel.toLowerCase().includes(filters.responsavel.toLowerCase())
      )
    }

    if (filters.dataInicio) {
      filtered = filtered.filter(o => 
        new Date(o.data_hora) >= new Date(filters.dataInicio)
      )
    }

    if (filters.dataFim) {
      filtered = filtered.filter(o => 
        new Date(o.data_hora) <= new Date(filters.dataFim + 'T23:59:59')
      )
    }

    onFilter(filtered)
  }

  const clearFilters = () => {
    setFilters({
      tipo: '',
      status: '',
      gravidade: '',
      responsavel: '',
      dataInicio: '',
      dataFim: ''
    })
    onFilter([])
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo</Label>
        <Select value={filters.tipo} onValueChange={(value) => setFilters(prev => ({ ...prev, tipo: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="">Todos os tipos</SelectItem>
            <SelectItem value="Segurança">Segurança</SelectItem>
            <SelectItem value="Emergência">Emergência</SelectItem>
            <SelectItem value="Manutenção">Manutenção</SelectItem>
            <SelectItem value="Administrativa">Administrativa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="Aberta">Aberta</SelectItem>
            <SelectItem value="Em Andamento">Em Andamento</SelectItem>
            <SelectItem value="Resolvida">Resolvida</SelectItem>
            <SelectItem value="Cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gravidade">Gravidade</Label>
        <Select value={filters.gravidade} onValueChange={(value) => setFilters(prev => ({ ...prev, gravidade: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Todas as gravidades" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="">Todas as gravidades</SelectItem>
            <SelectItem value="Baixa">Baixa</SelectItem>
            <SelectItem value="Média">Média</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Crítica">Crítica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="responsavel">Responsável</Label>
        <Input
          id="responsavel"
          placeholder="Nome do responsável"
          value={filters.responsavel}
          onChange={(e) => setFilters(prev => ({ ...prev, responsavel: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataInicio">Data Início</Label>
        <Input
          id="dataInicio"
          type="date"
          value={filters.dataInicio}
          onChange={(e) => setFilters(prev => ({ ...prev, dataInicio: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataFim">Data Fim</Label>
        <Input
          id="dataFim"
          type="date"
          value={filters.dataFim}
          onChange={(e) => setFilters(prev => ({ ...prev, dataFim: e.target.value }))}
        />
      </div>

      <div className="md:col-span-2 lg:col-span-3 flex gap-2 pt-4">
        <Button onClick={applyFilters}>Aplicar Filtros</Button>
        <Button variant="outline" onClick={clearFilters}>Limpar Filtros</Button>
      </div>
    </div>
  )
}

export default OcorrenciasFilter
