'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { TransactionFeed } from '@/components/feed/TransactionFeed'
import { Card } from '@/components/ui/card'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FeedPage() {
  const [mounted, setMounted] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 500))
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
            <p className="text-muted-foreground">Real-time transaction stream from AdPool contract</p>
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
            All events are displayed in real-time. The feed auto-refreshes every 3 seconds.
          </p>
        </Card>

        {/* Feed */}
        <TransactionFeed />

        {/* Stats Footer */}
        <Card className="p-4 border border-border bg-card">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Events</p>
              <p className="text-2xl font-bold text-accent">1,234</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Events/Hour</p>
              <p className="text-2xl font-bold text-blue-400">84</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Avg Volume</p>
              <p className="text-2xl font-bold text-cyan-400">$0.82</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
