
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'investigating';
  timestamp: string;
  location: string;
}

interface AlertCardProps {
  alert: Alert;
}

const severityConfig = {
  low: { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' },
  high: { color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' },
  critical: { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' },
};

const statusConfig = {
  active: { icon: AlertTriangle, color: 'text-red-600', text: 'Ativo' },
  investigating: { icon: Clock, color: 'text-yellow-600', text: 'Investigando' },
  resolved: { icon: CheckCircle, color: 'text-green-600', text: 'Resolvido' },
};

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const severityStyle = severityConfig[alert.severity];
  const statusStyle = statusConfig[alert.status];
  const StatusIcon = statusStyle.icon;

  return (
    <div className={cn(
      "bg-card rounded-lg p-4 border-l-4 shadow-sm hover:shadow-md transition-shadow",
      severityStyle.border
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "px-2 py-1 text-xs font-medium rounded-full",
              severityStyle.bg,
              severityStyle.color
            )}>
              {alert.severity.toUpperCase()}
            </span>
            <div className="flex items-center gap-1">
              <StatusIcon className={cn("h-4 w-4", statusStyle.color)} />
              <span className={cn("text-sm font-medium", statusStyle.color)}>
                {statusStyle.text}
              </span>
            </div>
          </div>
          
          <h3 className="font-semibold text-foreground mb-1">{alert.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{alert.location}</span>
            <span>{alert.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
