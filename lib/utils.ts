import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function shortAddr(addr: string) {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function shortHash(hash: string) {
    if (!hash || hash.length < 14) return hash;
    return `${hash.slice(0, 10)}…${hash.slice(-4)}`;
}

export function formatUSDC(raw: bigint): string {
    const num = Number(raw) / 1e6;
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

export function timeAgo(ts: number): string {
    const diff = Math.floor(Date.now() / 1000 - ts);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
}
