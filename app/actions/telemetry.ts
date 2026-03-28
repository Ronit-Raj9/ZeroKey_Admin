'use server'

import { prisma } from '@/lib/prisma'

export async function getTelemetryMetrics() {
    try {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

        // Count total events in the last 24h
        const aiCalls = await prisma.adEvent.count({
            where: {
                createdAt: {
                    gte: yesterday
                }
            }
        })

        // Fetch events for the impressions chart (last 24h)
        const events = await prisma.adEvent.findMany({
            where: {
                createdAt: {
                    gte: yesterday
                }
            },
            select: {
                createdAt: true
            }
        })

        // Group by hour for impressions chart
        const grouped = Array.from({ length: 24 }, (_, i) => {
            const d = new Date()
            d.setHours(d.getHours() - (23 - i), 0, 0, 0)
            return {
                time: d.getHours().toString().padStart(2, '0') + ':00',
                impressions: 0
            }
        })

        events.forEach(event => {
            const d = new Date(event.createdAt)
            const hourLabel = d.getHours().toString().padStart(2, '0') + ':00'
            const bucket = grouped.find(g => g.time === hourLabel)
            if (bucket) bucket.impressions++
        })

        // Revenue data: group events by day for the last 7 days
        const weekEvents = await prisma.adEvent.findMany({
            where: {
                createdAt: {
                    gte: weekAgo
                }
            },
            select: {
                createdAt: true,
                eventType: true
            }
        })

        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const revenueByDay = Array.from({ length: 7 }, (_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - (6 - i))
            return {
                date: dayNames[d.getDay()],
                distributed: 0,
                collected: 0,
            }
        })

        weekEvents.forEach(event => {
            const d = new Date(event.createdAt)
            const daysSinceStart = Math.floor((Date.now() - weekAgo.getTime()) / (24 * 60 * 60 * 1000))
            const eventDayIndex = Math.floor((d.getTime() - weekAgo.getTime()) / (24 * 60 * 60 * 1000))
            const bucketIndex = eventDayIndex - (daysSinceStart - 6)
            if (bucketIndex >= 0 && bucketIndex < 7) {
                // Each impression = 0.001 USDC distributed, same amount collected via x402
                revenueByDay[bucketIndex].distributed += 0.001
                revenueByDay[bucketIndex].collected += 0.001
            }
        })

        // Get total unique users
        const totalUsers = await prisma.opencodeInstallation.count()

        // Get unique active users (last 24h)
        const activeUsers = await prisma.adEvent.groupBy({
            by: ['installationId'],
            where: {
                createdAt: {
                    gte: yesterday
                }
            }
        })

        return {
            success: true,
            aiCalls,
            impressionData: grouped,
            revenueData: revenueByDay.some(d => d.distributed > 0) ? revenueByDay : [],
            totalUsers,
            activeUsers: activeUsers.length,
        }
    } catch (error) {
        console.error("Failed to fetch Prisma telemetry:", error)
        return {
            success: false,
            aiCalls: 0,
            impressionData: [],
            revenueData: [],
            totalUsers: 0,
            activeUsers: 0,
        }
    }
}

export async function getUsers() {
    try {
        const installations = await prisma.opencodeInstallation.findMany({
            include: {
                _count: {
                    select: { events: true }
                },
                events: {
                    orderBy: { createdAt: 'desc' },
                    take: 1,
                    select: { createdAt: true }
                }
            }
        })

        return installations.map(inst => ({
            id: inst.id,
            wallet: inst.walletAddress || 'Unknown',
            impressions: inst._count.events,
            lastActive: inst.events[0]?.createdAt
                ? getTimeAgo(inst.events[0].createdAt)
                : getTimeAgo(inst.updatedAt),
        }))
    } catch (error) {
        console.error("Failed to fetch users:", error)
        return []
    }
}

export async function getTransactionFeed() {
    try {
        const events = await prisma.adEvent.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50,
            include: {
                installation: {
                    select: { walletAddress: true }
                }
            }
        })

        return events.map(event => ({
            id: event.id,
            type: event.eventType as 'impression' | 'deposit' | 'withdraw' | 'payment',
            wallet: event.installation.walletAddress || 'Unknown',
            amount: '0.001',
            timestamp: event.createdAt,
            description: `${event.eventType === 'impression' ? 'Earned' : 'Event'} — ${event.advertiser}`,
            campaignId: event.campaignId,
        }))
    } catch (error) {
        console.error("Failed to fetch transaction feed:", error)
        return []
    }
}

function getTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
}
