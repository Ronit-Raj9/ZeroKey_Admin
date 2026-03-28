'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ContractControls } from '@/components/contracts/ContractControls'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function ContractsPage() {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Contract Controls</h1>
          <p className="text-muted-foreground">
            Admin interface for managing zerokey pool contract parameters and state
          </p>
        </div>

        {/* Warning */}
        <Card className="p-4 border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-400 mb-1">Owner Wallet Required</p>
            <p className="text-xs text-amber-300">
              You must be connected with the contract owner wallet to execute these actions.
            </p>
          </div>
        </Card>

        {/* Controls */}
        <ContractControls />
      </div>
    </DashboardLayout>
  )
}
