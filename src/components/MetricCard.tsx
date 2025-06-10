
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-blue-500',
  className
}) => {
  return (
    <div className={cn(
      "bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow animate-slide-up",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={cn("p-2 rounded-lg bg-opacity-10", iconColor.replace('text-', 'bg-'))}>
            <Icon className={cn("h-6 w-6", iconColor)} />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
      </div>
      
      {change && (
        <div className="mt-4">
          <span className={cn(
            "text-sm font-medium",
            changeType === 'positive' && "text-green-600",
            changeType === 'negative' && "text-red-600",
            changeType === 'neutral' && "text-gray-600"
          )}>
            {change}
          </span>
          <span className="text-sm text-muted-foreground ml-1">vs período anterior</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
