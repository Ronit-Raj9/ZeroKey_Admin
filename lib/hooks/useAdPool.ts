"use client";
import { useReadContract, useReadContracts } from "wagmi";
import { AdPoolABI } from "../contracts/abis";
import { ADPOOL_ADDRESS, USDC_ADDRESS } from "../contracts/addresses";
import { erc20Abi } from "viem";

export function useAdPool() {
    const { data: totalImpressions } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "totalImpressions",
        query: { refetchInterval: 5000 },
    });

    const { data: activeCount } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "activeAdvertiserCount",
        query: { refetchInterval: 5000 },
    });

    const { data: impressionCost } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "impressionCost",
    });

    const { data: currentAdvertiser } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "currentAdvertiser",
        query: { refetchInterval: 5000 },
    });

    const { data: isPaused } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "paused",
        query: { refetchInterval: 5000 },
    });

    const { data: owner } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "owner",
    });

    const { data: authorizedClaimer } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "authorizedClaimer",
    });

    const { data: minimumDeposit } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "minimumDeposit",
    });

    const { data: poolBalance } = useReadContract({
        address: USDC_ADDRESS,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [ADPOOL_ADDRESS],
        query: { refetchInterval: 5000 },
    });

    return {
        totalImpressions: totalImpressions ?? 0n,
        activeCount: activeCount ?? 0n,
        impressionCost: impressionCost ?? 0n,
        currentAdvertiser: currentAdvertiser ?? "0x0",
        isPaused: isPaused ?? false,
        owner: owner ?? "0x0",
        authorizedClaimer: authorizedClaimer ?? "0x0",
        minimumDeposit: minimumDeposit ?? 0n,
        poolBalance: poolBalance ?? 0n,
    };
}

export function useAdvertiserBalance(address: `0x${string}`) {
    const { data } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: "balances",
        args: [address],
        query: { refetchInterval: 5000 },
    });
    return data ?? 0n;
}
