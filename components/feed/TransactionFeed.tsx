'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { getTransactionFeed } from '@/app/actions/telemetry'

interface Transaction {
  id: string
  type: 'impression' | 'deposit' | 'withdraw' | 'payment'
  wallet: string
  amount: string
  timestamp: Date
  description: string
  campaignId?: string
}

interface TransactionFeedProps {
  transactions?: Transaction[]
}

export function TransactionFeed({ transactions: initialTransactions }: TransactionFeedProps) {
  const [filter, setFilter] = useState<'all' | 'impression' | 'deposit' | 'withdraw' | 'payment'>('all')
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeed() {
      try {
        const data = await getTransactionFeed()
        if (data.length > 0) {
          setTransactions(data.map(d => ({
            ...d,
            timestamp: new Date(d.timestamp),
          })))
        }
      } catch (err) {
        console.error('Failed to load transaction feed:', err)
      } finally {
        setLoading(false)
      }
    }
    loadFeed()

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadFeed, 10000)
    return () => clearInterval(interval)
  }, [])

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === filter)

  const typeStyles = {
    impression: { bg: 'bg-accent/10', text: 'text-accent', label: 'Impression' },
    deposit: { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Deposit' },
    withdraw: { bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Withdraw' },
    payment: { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Payment' },
  }

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  if (loading) {
    return (
      <Card className="p-8 text-center border border-border bg-card">
        <p className="text-muted-foreground">Loading transactions...</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'impression', 'deposit', 'withdraw', 'payment'] as const).map((f) => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="whitespace-nowrap"
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <Card className="p-8 text-center border border-border bg-card">
            <p className="text-muted-foreground">No transactions recorded yet</p>
            <p className="text-xs text-muted-foreground mt-1">Transactions will appear here as users interact with AdShell</p>
          </Card>
        ) : (
          filteredTransactions.map((tx) => {
            const style = typeStyles[tx.type] || typeStyles.impression

            return (
              <Card
                key={tx.id}
                className={`p-4 border ${style.bg} border-border bg-card hover:border-primary/50 transition-colors`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${style.bg} ${style.text}`}>
                        {style.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{getTimeAgo(tx.timestamp)}</span>
                    </div>
                    <p className="text-sm font-medium text-card-foreground mb-1">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Wallet: {truncateAddress(tx.wallet)}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={`text-lg font-bold ${style.text}`}>
                      {tx.type === 'withdraw' || tx.type === 'payment' ? '-' : '+'}
                      {tx.amount}
                    </p>
                    <span className="text-xs text-muted-foreground">USDC</span>
                  </div>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
