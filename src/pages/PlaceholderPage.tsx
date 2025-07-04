import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PlaceholderPageProps {
  title: string
  description?: string
  icon: React.ReactNode
}

const PlaceholderPage = ({
  title,
  description,
  icon,
}: PlaceholderPageProps) => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-security flex items-center gap-2">
          {icon} {title}
          {description && (
            <span className="text-sm text-security-muted">{description}</span>
          )}
        </h1>
        <div className="text-sm text-security-muted">
          Última atualização: {new Date().toLocaleDateString()}
        </div>
      </div>

      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
          <div className="text-5xl text-security-muted">{icon}</div>
          <CardTitle className="text-xl text-security">
            Módulo {title}
          </CardTitle>
          <p className="text-security-muted text-center max-w-md">
            Esta seção está em desenvolvimento. Em breve você poderá gerenciar
            todas as funcionalidades do módulo {title}.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default PlaceholderPage
