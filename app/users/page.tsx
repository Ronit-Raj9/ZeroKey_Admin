'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { UserTable } from '@/components/users/UserTable'
import { Card } from '@/components/ui/card'
import { getTelemetryMetrics } from '@/app/actions/telemetry'

export default function UsersPage() {
  const [mounted, setMounted] = useState(false)
  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalImpressions, setTotalImpressions] = useState(0)

  useEffect(() => {
    setMounted(true)

    async function loadStats() {
      const data = await getTelemetryMetrics()
      if (data.success) {
        setTotalUsers(data.totalUsers || 0)
        setActiveUsers(data.activeUsers || 0)
        setTotalImpressions(data.aiCalls || 0)
      }
    }
    loadStats()
  }, [])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
          <p className="text-muted-foreground">View and manage user accounts and activity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Total Users</p>
            <p className="text-2xl font-bold text-accent">{totalUsers}</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Active Users (24h)</p>
            <p className="text-2xl font-bold text-blue-400">{activeUsers}</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Impressions (24h)</p>
            <p className="text-2xl font-bold text-cyan-400">{totalImpressions.toLocaleString()}</p>
          </Card>
        </div>

        {/* Table */}
        <UserTable />
      </div>
    </DashboardLayout>
  )
}
