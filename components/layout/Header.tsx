'use client'

import { Zap } from 'lucide-react'
import { WalletConnect } from '@/components/WalletConnect'

export function Header() {
  return (
    <header className="border-b border-sidebar-border bg-sidebar sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-sidebar-foreground">zerokey</h1>
        </div>
        <WalletConnect />
      </div>
    </header>
  )
}
