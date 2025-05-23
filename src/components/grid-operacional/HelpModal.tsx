import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function HelpModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className='text-center text-slate-700'>Ajuda no Grid Operacional</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <p>
                  <strong className='text-blue-700'>Buscar registros:</strong> Digite o nome do cliente,
                  código ou agente no campo de busca e pressione{' '}
                  <kbd>Enter</kbd> ou clique em "Aplicar filtro".
                </p>
              </li>
              <li>
                <p>
                  <strong className='text-blue-700'>Limpar filtro:</strong> Clique no botão "Limpar" ou
                  apague todo o texto da busca para mostrar todos os registros.
                </p>
              </li>
              <li>
                <p>
                  <strong className='text-blue-700'>Imprimir registro:</strong> Clique no ícone da
                  impressora, selecione o registro que deseja imprimir e
                  confirme.
                </p>
              </li>
              <li>
                <p>
                  <strong className='text-blue-700'>Atualizar dados:</strong> Clique no botão de atualizar
                  para carregar os dados mais recentes.
                </p>
              </li>
            </ul>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
