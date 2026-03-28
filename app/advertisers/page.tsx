'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AdvertiserTable } from '@/components/advertisers/AdvertiserTable'
import { Card } from '@/components/ui/card'
import { useReadContract } from 'wagmi'
import { ADPOOL_ADDRESS, USDC_ADDRESS } from '@/lib/contracts/addresses'
import { AdPoolABI, ERC20_ABI } from '@/lib/contracts/abis'
import { formatUnits } from 'viem'

export default function AdvertisersPage() {
  const [mounted, setMounted] = useState(false)

  const { data: activeCount } = useReadContract({
    address: ADPOOL_ADDRESS,
    abi: AdPoolABI,
    functionName: 'activeAdvertiserCount',
  })

  const { data: totalImpressions } = useReadContract({
    address: ADPOOL_ADDRESS,
    abi: AdPoolABI,
    functionName: 'totalImpressions',
  })

  const { data: poolBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [ADPOOL_ADDRESS],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Advertisers</h1>
          <p className="text-muted-foreground">Manage advertiser accounts and campaign budgets</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Active Advertisers</p>
            <p className="text-2xl font-bold text-accent">{activeCount ? Number(activeCount) : 0}</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Total Impressions</p>
            <p className="text-2xl font-bold text-blue-400">{totalImpressions ? Number(totalImpressions).toLocaleString() : 0}</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Pool Balance</p>
            <p className="text-2xl font-bold text-cyan-400">${poolBalance ? formatUnits(poolBalance, 6) : '0.00'}</p>
          </Card>
        </div>

        {/* Table */}
        <AdvertiserTable />
      </div>
    </DashboardLayout>
  )
}
