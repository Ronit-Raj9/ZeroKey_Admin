"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { monadTestnet } from "@/lib/monad";
import { injected } from "wagmi/connectors";
import { ReactNode, useState } from "react";

export const wagmiConfig = createConfig({
    chains: [monadTestnet],
    connectors: [injected()],
    transports: {
        [monadTestnet.id]: http(process.env.NEXT_PUBLIC_MONAD_RPC || "https://testnet-rpc.monad.xyz"),
    },
});

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false } },
    }));

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
