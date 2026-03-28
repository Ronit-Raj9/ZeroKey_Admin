'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Flag } from 'lucide-react'
import { getUsers } from '@/app/actions/telemetry'

interface User {
  id: string
  wallet: string
  impressions: number
  lastActive: string
}

interface UserTableProps {
  users?: User[]
}

export function UserTable({ users: initialUsers }: UserTableProps) {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<User[]>(initialUsers || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers()
        if (data.length > 0) {
          setUsers(data)
        }
      } catch (err) {
        console.error('Failed to load users:', err)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyToClipboard = (addr: string) => {
    navigator.clipboard.writeText(addr)
  }

  const filteredUsers = users.filter(user =>
    user.wallet.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <Card className="p-8 text-center border border-border bg-card">
        <p className="text-muted-foreground">Loading users...</p>
      </Card>
    )
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
      </div>

      {/* Table */}
      <Card className="overflow-hidden border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Wallet</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Impressions</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">USDC Earned</th>
                <th className="px-6 py-3 text-left font-semibold text-card-foreground">Last Active</th>
                <th className="px-6 py-3 text-right font-semibold text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    {users.length === 0 ? 'No users registered yet' : 'No users found matching search'}
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
                    <td className="px-6 py-4 font-semibold text-accent">
                      ${(user.impressions * 0.001).toFixed(3)}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{user.lastActive}</td>
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
      </div>
    </div>
  )
}
