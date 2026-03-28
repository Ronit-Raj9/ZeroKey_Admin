'use client'

import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  icon: LucideIcon
  label: string
  value: string
  subtext?: string
  trend?: 'up' | 'down' | 'neutral'
}

export function MetricCard({ icon: Icon, label, value, subtext, trend }: MetricCardProps) {
  return (
    <Card className="p-6 border border-border bg-card hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
          </div>
          <div className="text-2xl font-bold text-card-foreground mb-1">{value}</div>
          {subtext && (
            <p className="text-xs text-muted-foreground">{subtext}</p>
          )}
        </div>
        {trend && (
          <div className={`text-xs font-semibold px-2 py-1 rounded ${
            trend === 'up' ? 'bg-accent/20 text-accent' :
            trend === 'down' ? 'bg-destructive/20 text-destructive' :
            'bg-muted text-muted-foreground'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trend}
          </div>
        )}
      </div>
    </Card>
  )
}
