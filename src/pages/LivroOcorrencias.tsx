
import { useState } from 'react'
import { BookOpen, Plus, Search, Filter, FileText, Clock, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useOcorrencias } from '@/hooks/useOcorrencias'
import { Ocorrencia } from '@/types/ocorrencia'
import OcorrenciasTable from '@/components/ocorrencias/OcorrenciasTable'
import OcorrenciasFilter from '@/components/ocorrencias/OcorrenciasFilter'
import NovaOcorrenciaModal from '@/components/ocorrencias/NovaOcorrenciaModal'

const LivroOcorrencias = () => {
  const { ocorrencias, loading } = useOcorrencias()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredOcorrencias, setFilteredOcorrencias] = useState<Ocorrencia[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showNovaOcorrencia, setShowNovaOcorrencia] = useState(false)

  // Estatísticas básicas
  const stats = {
    total: ocorrencias.length,
    abertas: ocorrencias.filter(o => o.status === 'Aberta').length,
    emAndamento: ocorrencias.filter(o => o.status === 'Em Andamento').length,
    criticas: ocorrencias.filter(o => o.gravidade === 'Crítica').length
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term) {
      const filtered = ocorrencias.filter(ocorrencia =>
        ocorrencia.titulo.toLowerCase().includes(term.toLowerCase()) ||
        ocorrencia.local.toLowerCase().includes(term.toLowerCase()) ||
        ocorrencia.responsavel.toLowerCase().includes(term.toLowerCase())
      )
      setFilteredOcorrencias(filtered)
    } else {
      setFilteredOcorrencias([])
    }
  }

  const displayOcorrencias = searchTerm ? filteredOcorrencias : ocorrencias

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Carregando ocorrências...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8" />
            Livro de Ocorrências
          </h1>
          <p className="text-muted-foreground mt-2">
            Registro e acompanhamento de ocorrências operacionais
          </p>
        </div>
        <Button onClick={() => setShowNovaOcorrencia(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Ocorrência
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">ocorrências registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertas</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.abertas}</div>
            <p className="text-xs text-muted-foreground">aguardando atendimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.emAndamento}</div>
            <p className="text-xs text-muted-foreground">sendo processadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Críticas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.criticas}</div>
            <p className="text-xs text-muted-foreground">alta prioridade</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título, local ou responsável..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Filtros Avançados */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros Avançados</CardTitle>
            <CardDescription>
              Refine sua busca usando os filtros abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OcorrenciasFilter onFilter={setFilteredOcorrencias} ocorrencias={ocorrencias} />
          </CardContent>
        </Card>
      )}

      {/* Tabela de Ocorrências */}
      <Card>
        <CardHeader>
          <CardTitle>Ocorrências Registradas</CardTitle>
          <CardDescription>
            {displayOcorrencias.length} ocorrência(s) {searchTerm && 'encontrada(s)'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OcorrenciasTable ocorrencias={displayOcorrencias} />
        </CardContent>
      </Card>

      {/* Modal Nova Ocorrência */}
      <NovaOcorrenciaModal
        open={showNovaOcorrencia}
        onOpenChange={setShowNovaOcorrencia}
      />
    </div>
  )
}

export default LivroOcorrencias
