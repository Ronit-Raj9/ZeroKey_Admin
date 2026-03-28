'use server'

import { prisma } from '@/lib/prisma'

export async function getTelemetryMetrics() {
    try {
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)

        // Count total AI calls (impressions) in the last 24h
        const aiCalls = await prisma.adEvent.count({
            where: {
                createdAt: {
                    gte: yesterday
                }
            }
        })

        // Fetch events for the chart
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

        // Group them by hour
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

        return {
            success: true,
            aiCalls,
            impressionData: grouped
        }
    } catch (error) {
        console.error("Failed to fetch Prisma telemetry:", error)
        return {
            success: false,
            aiCalls: 0,
            impressionData: []
        }
    }
}
