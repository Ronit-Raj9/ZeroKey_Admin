'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { TransactionFeed } from '@/components/feed/TransactionFeed'
import { Card } from '@/components/ui/card'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getTelemetryMetrics } from '@/app/actions/telemetry'

export default function FeedPage() {
  const [mounted, setMounted] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [totalEvents, setTotalEvents] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    setMounted(true)

    async function loadStats() {
      const data = await getTelemetryMetrics()
      if (data.success) {
        setTotalEvents(data.aiCalls || 0)
      }
    }
    loadStats()
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    const data = await getTelemetryMetrics()
    if (data.success) {
      setTotalEvents(data.aiCalls || 0)
    }
    setKey(prev => prev + 1) // Force TransactionFeed to re-mount and re-fetch
    setIsRefreshing(false)
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Live Feed</h1>
            <p className="text-muted-foreground">Real-time transaction stream from the zerokey pool</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Info Card */}
        <Card className="p-4 border border-primary/30 bg-primary/5 backdrop-blur">
          <p className="text-sm text-card-foreground">
            Events are fetched from the database. The feed auto-refreshes every 10 seconds.
          </p>
        </Card>

        {/* Feed */}
        <TransactionFeed key={key} />

        {/* Stats Footer */}
        <Card className="p-4 border border-border bg-card">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Events (24h)</p>
              <p className="text-2xl font-bold text-accent">{totalEvents.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Est. USDC Distributed (24h)</p>
              <p className="text-2xl font-bold text-blue-400">${(totalEvents * 0.001).toFixed(3)}</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
