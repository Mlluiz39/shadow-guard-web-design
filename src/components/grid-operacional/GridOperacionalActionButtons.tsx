import { Plus, Filter, HelpCircle, Printer, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { PrintFieldSelector } from '@/components/PrintFieldSelector'
import { HelpModal } from './HelpModal'
import { gridOperacionalData } from './types'

interface GridOperacionalActionButtonsProps {
  onFilterToggle: (isOpen: boolean) => void
  isFilterOpen: boolean
  onRefresh: () => void
}

export const GridOperacionalActionButtons = ({
  onFilterToggle,
  isFilterOpen,
  onRefresh,
}: GridOperacionalActionButtonsProps) => {
  const [helpOpen, setHelpOpen] = useState(false)
  const [printDialogOpen, setPrintDialogOpen] = useState(false)

  const printData = (specificCode: string) => {
    const record = gridOperacionalData.find(item => item.cod === specificCode)

    if (!record) {
      toast('Código não encontrado!')
      return
    }

    toast(`Imprimindo registro com código: ${specificCode}`)

    const style = document.createElement('style')
    style.id = 'print-style'

    const tempDiv = document.createElement('div')
    tempDiv.id = 'temp-print-container'
    tempDiv.className = 'p-8'

    tempDiv.innerHTML = `
      <h1 class="text-xl font-bold mb-4">Detalhes do Registro - Código: ${record.cod}</h1>
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Cliente:</strong> ${record.cliente}</div>
        <div><strong>Data Solicitação:</strong> ${record.dataSolicitacao}</div>
        <div><strong>MTS/OS:</strong> ${record.mtsOs}</div>
        <div><strong>Placa Auto:</strong> ${record.placaAuto}</div>
        <div><strong>Parceiro:</strong> ${record.parceiro}</div>
        <div><strong>Agente 1:</strong> ${record.agente1}</div>
        <div><strong>Agente 2:</strong> ${record.agente2}</div>
        <div><strong>VTR:</strong> ${record.vtr}</div>
        <div><strong>Origem:</strong> ${record.origem}</div>
        <div><strong>Destino:</strong> ${record.destino}</div>
        <div><strong>Data Missão:</strong> ${record.dataMissao}</div>
        <div><strong>Hora Missão:</strong> ${record.horaMissao}</div>
        <div><strong>Hora Equipe:</strong> ${record.horaEquipe}</div>
        <div><strong>Hora Início Real:</strong> ${record.horaInicioReal}</div>
        <div><strong>KM Início:</strong> ${record.kmInicio}</div>
        <div><strong>Data Fim Missão:</strong> ${record.dataFimMissao}</div>
        <div><strong>KM Final:</strong> ${record.kmFinal}</div>
        <div><strong>Hora Final:</strong> ${record.horaFinal}</div>
        <div><strong>Status:</strong> ${record.status}</div>
        <div><strong>Total Hora Missão:</strong> ${record.totalHoraMissao}</div>
        <div><strong>KM Total:</strong> ${record.kmTotal}</div>
      </div>
    `

    document.body.appendChild(tempDiv)

    style.innerHTML = `
      @media print {
        body > *:not(#temp-print-container) {
          display: none !important;
        }
        #temp-print-container {
          display: block !important;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
      }
    `

    document.head.appendChild(style)
    window.print()

    const styleElement = document.getElementById('print-style')
    if (styleElement) document.head.removeChild(styleElement)

    const tempPrintContainer = document.getElementById('temp-print-container')
    if (tempPrintContainer) document.body.removeChild(tempPrintContainer)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => console.log('Adicionar novo registro')}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Adicionar novo registro</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setHelpOpen(true)}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ajuda sobre a aba</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <HelpModal open={helpOpen} onOpenChange={setHelpOpen} />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onFilterToggle(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filtrar resultados</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPrintDialogOpen(true)}
              >
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Imprimir relatório</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Atualizar dados</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <PrintFieldSelector
        onPrint={specificCode => printData(specificCode)}
        open={printDialogOpen}
        onOpenChange={setPrintDialogOpen}
      />
    </>
  )
}

export default GridOperacionalActionButtons
