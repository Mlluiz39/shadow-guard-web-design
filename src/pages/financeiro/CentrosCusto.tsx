
import { Building } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CentrosCusto = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          <Building className="h-6 w-6" /> Centros de Custo
        </h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="text-5xl text-security-muted">
            <Building className="h-16 w-16" />
          </div>
          <CardTitle className="text-xl text-security">Centros de Custo</CardTitle>
          <p className="text-security-muted text-center max-w-md">
            Esta seção está em desenvolvimento. Em breve você poderá gerenciar todos os centros de custo da empresa.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CentrosCusto
