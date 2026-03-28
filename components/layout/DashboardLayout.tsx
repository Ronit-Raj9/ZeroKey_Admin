'use client'

import { useAccount } from 'wagmi'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md mx-4 p-8 border border-border bg-card">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-lg font-semibold text-card-foreground mb-2">
                  Wallet Connection Required
                </h2>
                <p className="text-sm text-muted-foreground">
                  Please connect your wallet using the button in the top right to access the admin dashboard.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
