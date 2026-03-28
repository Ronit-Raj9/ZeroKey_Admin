'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Flag } from 'lucide-react'

interface User {
  id: string
  wallet: string
  impressions: number
  aiCalls: number
  usdcEarned: string
  usdcSpent: string
  lastActive: string
  reputation: number
}

interface UserTableProps {
  users?: User[]
}

export function UserTable({ users: initialUsers }: UserTableProps) {
  const [search, setSearch] = useState('')
  const [users] = useState<User[]>(initialUsers || [
    {
      id: '1',
      wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f1bEb0',
      impressions: 8500,
      aiCalls: 125,
      usdcEarned: '8.50',
      usdcSpent: '0.12',
      lastActive: '1 minute ago',
      reputation: 98,
    },
    {
      id: '2',
      wallet: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      impressions: 15200,
      aiCalls: 250,
      usdcEarned: '15.20',
      usdcSpent: '0.25',
      lastActive: '5 minutes ago',
      reputation: 85,
    },
    {
      id: '3',
      wallet: '0x9f3d7b4e2c1a9d8f7e6c5b4a3d2e1f0g',
      impressions: 450,
      aiCalls: 5,
      usdcEarned: '0.45',
      usdcSpent: '0.01',
      lastActive: '3 hours ago',
      reputation: 72,
    },
    {
      id: '4',
      wallet: '0x1234567890abcdef1234567890abcdef12345678',
      impressions: 22000,
      aiCalls: 380,
      usdcEarned: '22.00',
      usdcSpent: '0.38',
      lastActive: '30 seconds ago',
      reputation: 92,
    },
  ])

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyToClipboard = (addr: string) => {
    navigator.clipboard.writeText(addr)
  }

  const filteredUsers = users.filter(user =>
    user.wallet.toLowerCase().includes(search.toLowerCase())
  )

  const getReputationColor = (score: number) => {
    if (score >= 90) return 'text-accent'
    if (score >= 70) return 'text-blue-400'
    if (score >= 50) return 'text-amber-400'
    return 'text-destructive'
  }

  return (
    <div className="space-y-4">
      {/* Search and Export */}
      <div className="flex gap-2">
        <Input
          placeholder="Search by wallet address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-input border-border"
        />
        <Button variant="outline">Export CSV</Button>
      </div>

      {/* Table */}
      <Card className="overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Wallet</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Impressions</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">AI Calls</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">USDC Earned</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">USDC Spent</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Last Active</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Reputation</th>
                <th className="px-6 py-3 text-right font-semibold text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{truncateAddress(user.wallet)}</span>
                        <button
                          onClick={() => copyToClipboard(user.wallet)}
                          className="p-1 hover:bg-muted rounded"
                          title="Copy address"
                        >
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-card-foreground">
                      {user.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-card-foreground">{user.aiCalls}</td>
                    <td className="px-6 py-4 font-semibold text-accent">${user.usdcEarned}</td>
                    <td className="px-6 py-4 text-card-foreground">${user.usdcSpent}</td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{user.lastActive}</td>
                    <td className="px-6 py-4">
                      <span className={`font-bold ${getReputationColor(user.reputation)}`}>
                        {user.reputation}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 h-8 px-2 text-destructive hover:bg-destructive/10"
                        title="Report suspicious activity"
                      >
                        <Flag className="w-3 h-3" />
                        <span className="hidden sm:inline text-xs">Flag</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  )
}
