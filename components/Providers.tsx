'use client'

import 'client-only'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { monadTestnet } from '@/lib/monad'
import { ReactNode } from 'react'

import { createStorage } from '@wagmi/core'
import { useState, useEffect } from 'react'

const config = getDefaultConfig({
  appName: 'AdShell Admin',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'demo',
  chains: [monadTestnet],
  ssr: true,
  storage: createStorage({
    storage: typeof window !== 'undefined' ? window.localStorage : {
      getItem: () => null,
      setItem: () => { },
      removeItem: () => { },
    } as any,
  }),
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {mounted ? (
          <RainbowKitProvider theme={darkTheme()}>
            {children}
          </RainbowKitProvider>
        ) : null}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
