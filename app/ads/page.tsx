import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AdManager } from '@/components/ads/AdManager'

export default function AdsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Ad Manager</h1>
          <p className="text-muted-foreground">
            Create, edit, and track performance of terminal ads served to opencode users
          </p>
        </div>

        {/* Ad Manager */}
        <AdManager />
      </div>
    </DashboardLayout>
  )
}
