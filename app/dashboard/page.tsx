'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { Card } from '@/components/ui/card'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, TrendingUp, Users, Zap } from 'lucide-react'
import { useReadContract } from 'wagmi'
import { ADPOOL_ADDRESS, USDC_ADDRESS } from '@/lib/contracts/addresses'
import { AdPoolABI, ERC20_ABI } from '@/lib/contracts/abis'
import { getTelemetryMetrics } from '@/app/actions/telemetry'
import { formatUnits } from 'viem'

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false)
    const [impressionData, setImpressionData] = useState<any[]>([])
    const [aiCalls, setAiCalls] = useState(0)
    const [revenueData, setRevenueData] = useState<any[]>([])

    // Read contract data
    const { data: totalImpressions } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: 'totalImpressions',
    })

    const { data: poolBalance } = useReadContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [ADPOOL_ADDRESS]
    })

    const { data: activeAdvertiserCount } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: 'activeAdvertiserCount',
    })

    const { data: impressionCost } = useReadContract({
        address: ADPOOL_ADDRESS,
        abi: AdPoolABI,
        functionName: 'impressionCost',
    })

    useEffect(() => {
        setMounted(true)

        async function loadMetrics() {
            const data = await getTelemetryMetrics()
            if (data.success && data.impressionData) {
                setAiCalls(data.aiCalls)
                setImpressionData(data.impressionData)
                if (data.revenueData) {
                    setRevenueData(data.revenueData)
                }
            }
        }

        loadMetrics()
    }, [])

    if (!mounted) return null

    // Format USDC values (6 decimals)
    const formatUSDC = (value: bigint | undefined): string => {
        if (!value) return '0.00'
        return formatUnits(value, 6)
    }

    // Format plain integer values (no division needed)
    const formatCount = (value: bigint | number | undefined): string => {
        if (!value) return '0'
        return Number(value).toLocaleString()
    }

    // Calculate pool health
    const poolBalanceNum = poolBalance ? Number(formatUnits(poolBalance, 6)) : 0
    const costPerImpression = impressionCost ? Number(formatUnits(impressionCost, 6)) : 0.001
    const estimatedRemaining = costPerImpression > 0 ? Math.floor(poolBalanceNum / costPerImpression) : 0

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">Real-time metrics from the zerokey pool & Supabase Telemetry</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        icon={Zap}
                        label="Total Impressions"
                        value={formatCount(totalImpressions)}
                        subtext="Lifetime served"
                        trend="up"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Pool Balance"
                        value={`$${formatUSDC(poolBalance)}`}
                        subtext="USDC available"
                        trend="up"
                    />
                    <MetricCard
                        icon={Users}
                        label="Active Advertisers"
                        value={formatCount(activeAdvertiserCount)}
                        subtext="Currently funded"
                        trend="neutral"
                    />
                    <MetricCard
                        icon={Activity}
                        label="AI Calls"
                        value={aiCalls.toString()}
                        subtext="Last 24 hours"
                        trend="up"
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Impressions Chart */}
                    <Card className="p-6 border border-border bg-card">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-card-foreground">Impressions Per Hour</h2>
                            <p className="text-sm text-muted-foreground">Last 24 hours</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={impressionData}>
                                <defs>
                                    <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1a2a', border: '1px solid #2a2a3a' }}
                                    labelStyle={{ color: '#e0e0e7' }}
                                />
                                <Area type="monotone" dataKey="impressions" stroke="#10b981" fill="url(#colorImpressions)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>

                    {/* Revenue Chart */}
                    <Card className="p-6 border border-border bg-card">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-card-foreground">USDC Flow</h2>
                            <p className="text-sm text-muted-foreground">Distributed vs Collected (7 days)</p>
                        </div>
                        {revenueData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                                    <YAxis stroke="rgba(255,255,255,0.5)" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1a2a', border: '1px solid #2a2a3a' }}
                                        labelStyle={{ color: '#e0e0e7' }}
                                    />
                                    <Bar dataKey="distributed" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="collected" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                                <p>No revenue data yet — impressions will appear here</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Balance Gauge */}
                <Card className="p-6 border border-border bg-card">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-card-foreground">Pool Health</h2>
                        <p className="text-sm text-muted-foreground">Current balance & remaining capacity</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-card-foreground">Estimated Impressions Remaining</span>
                                <span className="text-sm font-semibold text-accent">{estimatedRemaining.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-accent h-full rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(100, poolBalanceNum > 0 ? Math.max(5, (poolBalanceNum / Math.max(poolBalanceNum, 1)) * 100) : 0)}%` }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Pool Balance</p>
                                <p className="text-lg font-bold text-accent">${formatUSDC(poolBalance)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Cost Per Impression</p>
                                <p className="text-lg font-bold text-card-foreground">${costPerImpression}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Total Impressions</p>
                                <p className="text-lg font-bold text-card-foreground">{formatCount(totalImpressions)}</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}
