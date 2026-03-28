'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { UserTable } from '@/components/users/UserTable'
import { Card } from '@/components/ui/card'

export default function UsersPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Total Users</p>
            <p className="text-2xl font-bold text-accent">4</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Active Users</p>
            <p className="text-2xl font-bold text-blue-400">3</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Total Impressions</p>
            <p className="text-2xl font-bold text-cyan-400">46.2K</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Avg Reputation</p>
            <p className="text-2xl font-bold text-accent">86.75</p>
          </Card>
        </div>

        {/* Table */}
        <UserTable />
      </div>
    </DashboardLayout>
  )
}
