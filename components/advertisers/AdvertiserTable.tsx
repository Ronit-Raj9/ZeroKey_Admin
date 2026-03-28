'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Copy, ChevronDown, ChevronUp } from 'lucide-react'

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
  const [advertisers] = useState<Advertiser[]>(initialAdvertisers || [
    {
      id: '1',
      wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f1bEb0',
      deposited: '25.50',
      balance: '12.30',
      impressions: 45200,
      dailyBudget: '1.00',
      status: 'active',
      lastActive: '2 minutes ago',
    },
    {
      id: '2',
      wallet: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      deposited: '100.00',
      balance: '0.00',
      impressions: 125000,
      dailyBudget: '5.00',
      status: 'depleted',
      lastActive: '30 minutes ago',
    },
    {
      id: '3',
      wallet: '0x9f3d7b4e2c1a9d8f7e6c5b4a3d2e1f0g',
      deposited: '50.00',
      balance: '50.00',
      impressions: 0,
      dailyBudget: '2.00',
      status: 'paused',
      lastActive: '5 days ago',
    },
    {
      id: '4',
      wallet: '0x1234567890abcdef1234567890abcdef12345678',
      deposited: '75.25',
      balance: '45.50',
      impressions: 89300,
      dailyBudget: '3.00',
      status: 'active',
      lastActive: '1 minute ago',
    },
  ])

  const truncateAddress = (addr: string) => {
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
      {/* Search */}
      <div className="flex gap-2">
        <Input
          placeholder="Search by wallet address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-input border-border"
        />
        <Button variant="outline">Filter</Button>
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
                    No advertisers found
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
                            <div className="flex gap-2 pt-2 border-t border-border">
                              <Button size="sm" variant="outline">Pause</Button>
                              <Button size="sm" variant="outline">Resume</Button>
                              <Button size="sm" variant="outline">Remove</Button>
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
