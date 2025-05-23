import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'

interface PrintFieldSelectorProps {
  onPrint: (specificCode: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const PrintFieldSelector = ({
  onPrint,
  open,
  onOpenChange,
}: PrintFieldSelectorProps) => {
  const [specificCode, setSpecificCode] = useState<string>('')

  const handlePrint = () => {
    if (!specificCode) {
      toast('Informe um código para imprimir!')
      return
    }

    onPrint(specificCode)
    onOpenChange(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSpecificCode('')
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Impressão por Código</DialogTitle>
          <DialogDescription>
            Digite o código que deseja imprimir. A impressão mostrará todos os
            detalhes do registro.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="specific-code"
            className="mt-2"
            placeholder="Informe o código"
            value={specificCode}
            onChange={e => setSpecificCode(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handlePrint} disabled={!specificCode}>
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PrintFieldSelector
