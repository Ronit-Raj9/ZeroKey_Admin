'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { useReadContract } from 'wagmi'
import { ADPOOL_ADDRESS } from '@/lib/contracts/addresses'
import { AdPoolABI } from '@/lib/contracts/abis'
import { formatUnits } from 'viem'

interface Advertiser {
  id: string
  wallet: string
  deposited: string
  balance: string
  impressions: number
  dailyBudget: string
  status: 'active' | 'depleted' | 'paused'
  lastActive: string
}

interface AdvertiserTableProps {
  advertisers?: Advertiser[]
}

export function AdvertiserTable({ advertisers: initialAdvertisers }: AdvertiserTableProps) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [advertisers] = useState<Advertiser[]>(initialAdvertisers || [])

  // Read on-chain data
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

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyToClipboard = (addr: string) => {
    navigator.clipboard.writeText(addr)
  }

  const filteredAdvertisers = advertisers.filter(adv =>
    adv.wallet.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-accent/20 text-accent'
      case 'depleted':
        return 'bg-destructive/20 text-destructive'
      case 'paused':
        return 'bg-amber-500/20 text-amber-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-4">
      {/* On-chain Summary */}
      <Card className="p-4 border border-primary/30 bg-primary/5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Active Advertisers (On-Chain)</p>
            <p className="text-xl font-bold text-accent">{activeCount ? Number(activeCount) : 0}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total Impressions Served</p>
            <p className="text-xl font-bold text-card-foreground">{totalImpressions ? Number(totalImpressions).toLocaleString() : 0}</p>
          </div>
        </div>
      </Card>

      {/* Search */}
      <div className="flex gap-2">
        <Input
          placeholder="Search by wallet address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-input border-border"
        />
      </div>

      {/* Table */}
      <Card className="overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Wallet</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Deposited</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Balance</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Impressions</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Daily Budget</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Status</th>
                <th className="px-6 py-3 text-right font-semibold text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdvertisers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    {advertisers.length === 0
                      ? 'No advertisers registered yet — deposit USDC to the zerokey pool to get started'
                      : 'No advertisers found matching search'}
                  </td>
                </tr>
              ) : (
                <>
                  {filteredAdvertisers.map((adv) => (
                    <tr
                      key={adv.id}
                      className="border-b border-border hover:bg-muted/10 transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === adv.id ? null : adv.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">{truncateAddress(adv.wallet)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(adv.wallet)
                            }}
                            className="p-1 hover:bg-muted rounded"
                            title="Copy address"
                          >
                            <Copy className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-accent">${adv.deposited}</td>
                      <td className="px-6 py-4 text-card-foreground">${adv.balance}</td>
                      <td className="px-6 py-4 text-card-foreground">
                        {adv.impressions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-card-foreground">${adv.dailyBudget}</td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(adv.status)}>
                          {adv.status.charAt(0).toUpperCase() + adv.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end">
                          {expanded === adv.id ? (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Expanded Rows */}
                  {filteredAdvertisers.map((adv) =>
                    expanded === adv.id ? (
                      <tr key={`${adv.id}-expanded`} className="border-b border-border bg-muted/5">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-2">Full Wallet Address</p>
                              <p className="font-mono text-sm text-card-foreground break-all">{adv.wallet}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Last Active</p>
                                <p className="text-sm text-card-foreground">{adv.lastActive}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
                                <p className="text-sm text-card-foreground">
                                  ${(Number(adv.deposited) - Number(adv.balance)).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : null
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
