'use client'

import 'client-only'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { monadTestnet } from '@/lib/monad'
import { ReactNode } from 'react'
import { useState, useEffect, useMemo } from 'react'

// Storage that works during SSR (no indexedDB)
const ssrStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Ignore storage errors
    }
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch {
      // Ignore storage errors
    }
  },
}

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  const config = useMemo(() => {
    if (!mounted) return null

    return getDefaultConfig({
      appName: 'zerokey',
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
      chains: [monadTestnet],
      ssr: false,
    })
  }, [mounted])

  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => setMounted(true), [])

  if (!mounted || !config) {
    return null
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
