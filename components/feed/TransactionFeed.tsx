'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface Transaction {
  id: string
  type: 'impression' | 'deposit' | 'withdraw' | 'payment'
  wallet: string
  amount: string
  timestamp: Date
  txHash: string
  description: string
}

interface TransactionFeedProps {
  transactions?: Transaction[]
}

export function TransactionFeed({ transactions: initialTransactions }: TransactionFeedProps) {
  const [filter, setFilter] = useState<'all' | 'impression' | 'deposit' | 'withdraw' | 'payment'>('all')
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions || [])

  useEffect(() => {
    // Generate mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'impression',
        wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f1bEb0',
        amount: '0.0012',
        timestamp: new Date(Date.now() - 2 * 60000),
        txHash: '0xabcd...ef12',
        description: 'Earned 0.0012 USDC from claim',
      },
      {
        id: '2',
        type: 'deposit',
        wallet: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        amount: '5.5',
        timestamp: new Date(Date.now() - 5 * 60000),
        txHash: '0x1234...5678',
        description: 'Deposited 5.5 USDC',
      },
      {
        id: '3',
        type: 'payment',
        wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f1bEb0',
        amount: '0.001',
        timestamp: new Date(Date.now() - 8 * 60000),
        txHash: '0xpay1...pay2',
        description: 'Paid 0.001 USDC for x402 call',
      },
      {
        id: '4',
        type: 'impression',
        wallet: '0x9f3d7b4e2c1a9d8f7e6c5b4a3d2e1f0g',
        amount: '0.0015',
        timestamp: new Date(Date.now() - 12 * 60000),
        txHash: '0xghij...klmn',
        description: 'Earned 0.0015 USDC from claim',
      },
      {
        id: '5',
        type: 'withdraw',
        wallet: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
        amount: '2.0',
        timestamp: new Date(Date.now() - 15 * 60000),
        txHash: '0xwith...draw',
        description: 'Withdrew 2.0 USDC',
      },
    ]
    setTransactions(mockTransactions)
  }, [])

  const truncateAddress = (addr: string) => {
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
            <p className="text-muted-foreground">No transactions found</p>
          </Card>
        ) : (
          filteredTransactions.map((tx) => {
            const style = typeStyles[tx.type]
            const timeAgo = Math.round((Date.now() - tx.timestamp.getTime()) / 60000)

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
                      <span className="text-xs text-muted-foreground">{timeAgo}m ago</span>
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
                    <a
                      href={`https://testnet.monadexplorer.com/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-2"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </a>
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
