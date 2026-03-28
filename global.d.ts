/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "viem" {
    export function createPublicClient(config: any): any;
    export function http(url?: string): any;
    export function parseAbiItem(item: string): any;
    export function formatUnits(value: bigint, decimals: number): string;
    export function parseUnits(value: string, decimals: number): bigint;
    export function defineChain(config: any): any;
    export const erc20Abi: any[];
}

declare module "viem/accounts" {
    export function privateKeyToAccount(key: string): any;
    export type PrivateKeyAccount = any;
}

declare module "wagmi" {
    export function createConfig(config: any): any;
    export function WagmiProvider(props: any): any;
    export function useReadContract(config: any): any;
    export function useReadContracts(config: any): any;
    export function useWriteContract(): any;
    export function useWaitForTransactionReceipt(config: any): any;
    export function useAccount(): any;
    export function http(url?: string): any;
}

declare module "wagmi/connectors" {
    export function injected(): any;
}

declare module "@tanstack/react-query" {
    export class QueryClient {
        constructor(config?: any);
    }
    export function QueryClientProvider(props: any): any;
}
