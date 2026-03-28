import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Export the singleton client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export type helpers for the database structures we created
export type OpencodeInstallation = {
    id: string
    wallet_address?: string
    machine_id: string
    metadata: Record<string, any>
    created_at: string
    updated_at: string
}

export type AdEvent = {
    id: string
    installation_id: string
    campaign_id: string
    advertiser: string
    event_type: 'impression' | 'click' | 'time_spent'
    metadata: Record<string, any>
    created_at: string
}
