'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AdvertiserTable } from '@/components/advertisers/AdvertiserTable'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'

export default function AdvertisersPage() {
  const [mounted, setMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [walletInput, setWalletInput] = useState('')
  const [budgetInput, setBudgetInput] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddAdvertiser = () => {
    if (!walletInput.trim() || !budgetInput.trim()) {
      alert('Please fill in all fields')
      return
    }
    // Handle advertiser addition
    console.log('Adding advertiser:', walletInput, budgetInput)
    setWalletInput('')
    setBudgetInput('')
    setShowModal(false)
  }

  if (!mounted) return null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Advertisers</h1>
            <p className="text-muted-foreground">Manage advertiser accounts and campaign budgets</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Advertiser
          </Button>
        </div>

        {/* Add Advertiser Modal */}
        {showModal && (
          <Card className="p-6 border border-border bg-card">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Add New Advertiser</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="wallet" className="text-sm text-card-foreground mb-2 block">
                  Wallet Address
                </Label>
                <Input
                  id="wallet"
                  placeholder="0x..."
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div>
                <Label htmlFor="budget" className="text-sm text-card-foreground mb-2 block">
                  Initial Budget (USDC)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="0.00"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false)
                    setWalletInput('')
                    setBudgetInput('')
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddAdvertiser}>
                  Add Advertiser
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Total Advertisers</p>
            <p className="text-2xl font-bold text-accent">4</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Active Campaigns</p>
            <p className="text-2xl font-bold text-blue-400">2</p>
          </Card>
          <Card className="p-4 border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Total Deposited</p>
            <p className="text-2xl font-bold text-cyan-400">$250.75</p>
          </Card>
        </div>

        {/* Table */}
        <AdvertiserTable />
      </div>
    </DashboardLayout>
  )
}
