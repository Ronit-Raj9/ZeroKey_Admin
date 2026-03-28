import { defineChain } from "viem";

export const monadTestnet = defineChain({
    id: 10143,
    name: "Monad Testnet",
    nativeCurrency: { decimals: 18, name: "Monad", symbol: "MON" },
    rpcUrls: {
        default: {
            http: [process.env.NEXT_PUBLIC_MONAD_RPC || "https://testnet-rpc.monad.xyz"],
        },
    },
    blockExplorers: {
        default: {
            name: "Monad Explorer",
            url: "https://testnet.monadexplorer.com",
        },
    },
});

export const EXPLORER_URL = "https://testnet.monadexplorer.com";
export const explorerTx = (hash: string) => `${EXPLORER_URL}/tx/${hash}`;
export const explorerAddr = (addr: string) => `${EXPLORER_URL}/address/${addr}`;
