'use client'

import { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2, Lock, Unlock } from 'lucide-react'
import { ADPOOL_ADDRESS } from '@/lib/contracts/addresses'
import { AdPoolABI } from '@/lib/contracts/abis'

export function ContractControls() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [txHash, setTxHash] = useState<string | null>(null)

  // Read contract state
  const { data: impressionCost } = useReadContract({
    address: ADPOOL_ADDRESS,
    abi: AdPoolABI,
    functionName: 'impressionCost',
  })

  const { data: authorizedClaimer } = useReadContract({
    address: ADPOOL_ADDRESS,
    abi: AdPoolABI,
    functionName: 'authorizedClaimer',
  })

  const { data: activeAdvertiser } = useReadContract({
    address: ADPOOL_ADDRESS,
    abi: AdPoolABI,
    functionName: 'activeAdvertiser',
  })

  const { data: paused } = useReadContract({
    address: ADPOOL_ADDRESS,
    abi: AdPoolABI,
    functionName: 'paused',
  })

  const { writeContract, isPending } = useWriteContract()

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return 'Not set'
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleAction = async (action: string) => {
    if (!inputValue.trim() && action !== 'pause' && action !== 'unpause') {
      alert('Please enter a value')
      return
    }

    try {
      if (action === 'impressionCost') {
        writeContract(
          {
            address: ADPOOL_ADDRESS,
            abi: AdPoolABI,
            functionName: 'setImpressionCost',
            args: [BigInt(inputValue)],
          },
          {
            onSuccess: (hash: string) => {
              setTxHash(hash)
              setInputValue('')
              setSelectedAction(null)
            },
          }
        )
      } else if (action === 'claimer') {
        writeContract(
          {
            address: ADPOOL_ADDRESS,
            abi: AdPoolABI,
            functionName: 'setAuthorizedClaimer',
            args: [inputValue as `0x${string}`],
          },
          {
            onSuccess: (hash: string) => {
              setTxHash(hash)
              setInputValue('')
              setSelectedAction(null)
            },
          }
        )
      } else if (action === 'advertiser') {
        writeContract(
          {
            address: ADPOOL_ADDRESS,
            abi: AdPoolABI,
            functionName: 'setActiveAdvertiser',
            args: [inputValue as `0x${string}`],
          },
          {
            onSuccess: (hash: string) => {
              setTxHash(hash)
              setInputValue('')
              setSelectedAction(null)
            },
          }
        )
      } else if (action === 'pause') {
        writeContract(
          {
            address: ADPOOL_ADDRESS,
            abi: AdPoolABI,
            functionName: 'pause',
          },
          {
            onSuccess: (hash: string) => {
              setTxHash(hash)
              setSelectedAction(null)
            },
          }
        )
      } else if (action === 'unpause') {
        writeContract(
          {
            address: ADPOOL_ADDRESS,
            abi: AdPoolABI,
            functionName: 'unpause',
          },
          {
            onSuccess: (hash: string) => {
              setTxHash(hash)
              setSelectedAction(null)
            },
          }
        )
      }
    } catch (error) {
      console.error('Error executing action:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Current State Panel */}
      <Card className="p-6 border border-border bg-card">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Current Contract State</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Impression Cost</Label>
            <p className="text-xl font-bold text-accent">{impressionCost ? Number(impressionCost) / 1e18 : '0'} USDC</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Authorized Claimer</Label>
            <p className="text-sm font-mono text-card-foreground">{formatAddress(authorizedClaimer as any)}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Active Advertiser</Label>
            <p className="text-sm font-mono text-card-foreground">{formatAddress(activeAdvertiser as any)}</p>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Contract Status</Label>
            <div className="flex items-center gap-2">
              {paused ? (
                <>
                  <Lock className="w-4 h-4 text-destructive" />
                  <p className="text-sm font-semibold text-destructive">Paused</p>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-accent" />
                  <p className="text-sm font-semibold text-accent">Active</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Set Impression Cost */}
        <Card className="p-4 border border-border bg-card">
          <h4 className="font-semibold text-card-foreground mb-3">Set Impression Cost</h4>
          {selectedAction === 'impressionCost' ? (
            <div className="space-y-3">
              <Input
                placeholder="Cost in wei"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-input border-border"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAction('impressionCost')}
                  disabled={isPending}
                  className="flex-1"
                >
                  {isPending ? 'Confirming...' : 'Confirm'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedAction(null)
                    setInputValue('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setSelectedAction('impressionCost')}
            >
              Update Cost
            </Button>
          )}
        </Card>

        {/* Set Authorized Claimer */}
        <Card className="p-4 border border-border bg-card">
          <h4 className="font-semibold text-card-foreground mb-3">Set Authorized Claimer</h4>
          {selectedAction === 'claimer' ? (
            <div className="space-y-3">
              <Input
                placeholder="0x... address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-input border-border"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAction('claimer')}
                  disabled={isPending}
                  className="flex-1"
                >
                  {isPending ? 'Confirming...' : 'Confirm'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedAction(null)
                    setInputValue('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setSelectedAction('claimer')}
            >
              Update Claimer
            </Button>
          )}
        </Card>

        {/* Set Active Advertiser */}
        <Card className="p-4 border border-border bg-card">
          <h4 className="font-semibold text-card-foreground mb-3">Set Active Advertiser</h4>
          {selectedAction === 'advertiser' ? (
            <div className="space-y-3">
              <Input
                placeholder="0x... address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-input border-border"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleAction('advertiser')}
                  disabled={isPending}
                  className="flex-1"
                >
                  {isPending ? 'Confirming...' : 'Confirm'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedAction(null)
                    setInputValue('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setSelectedAction('advertiser')}
            >
              Update Advertiser
            </Button>
          )}
        </Card>

        {/* Pause Contract */}
        <Card className="p-4 border border-destructive/30 bg-destructive/5">
          <h4 className="font-semibold text-card-foreground mb-3">Pause Contract</h4>
          <Button
            size="sm"
            variant="destructive"
            className="w-full"
            onClick={() => handleAction('pause')}
            disabled={isPending || paused}
          >
            {isPending ? 'Pausing...' : paused ? 'Already Paused' : 'Pause'}
          </Button>
        </Card>

        {/* Unpause Contract */}
        <Card className="p-4 border border-accent/30 bg-accent/5">
          <h4 className="font-semibold text-card-foreground mb-3">Unpause Contract</h4>
          <Button
            size="sm"
            className="w-full bg-accent hover:bg-accent/80"
            onClick={() => handleAction('unpause')}
            disabled={isPending || !paused}
          >
            {isPending ? 'Unpausing...' : !paused ? 'Already Active' : 'Unpause'}
          </Button>
        </Card>
      </div>

      {/* Transaction Feedback */}
      {txHash && (
        <Card className="p-4 border border-accent/30 bg-accent/10 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-accent mb-1">Transaction Submitted</p>
            <a
              href={`https://testnet.monadexplorer.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:text-primary/80 break-all"
            >
              {txHash}
            </a>
          </div>
        </Card>
      )}
    </div>
  )
}
