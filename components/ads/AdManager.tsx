'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'
import {
  createAd,
  deleteAd as deleteAdAction,
  getAdStats,
  listAds,
  updateAd,
} from '@/app/actions/ads'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  BarChart3,
  Loader2,
  X,
  Check,
} from 'lucide-react'

interface Ad {
  id: string
  sponsor: string
  title: string
  lines: string[]
  clickUrl: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  stats?: { impressions: number; claims: number }
}

interface AdStatsResponse {
  impressions: number
  claims: number
  claimRate: string
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong'
}

export function AdManager() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [statsAdId, setStatsAdId] = useState<string | null>(null)
  const [statsData, setStatsData] = useState<{
    impressions: number
    claims: number
    claimRate: string
  } | null>(null)

  // Form state
  const [formSponsor, setFormSponsor] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [formLines, setFormLines] = useState('')
  const [formClickUrl, setFormClickUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true)
      const data = await listAds<Ad[]>()
      setAds(data)
      setError(null)
    } catch (error: unknown) {
      setError(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAds()
  }, [fetchAds])

  const resetForm = () => {
    setFormSponsor('')
    setFormTitle('')
    setFormLines('')
    setFormClickUrl('')
    setEditingAd(null)
    setShowForm(false)
  }

  const openCreateForm = () => {
    resetForm()
    setShowForm(true)
  }

  const openEditForm = (ad: Ad) => {
    setFormSponsor(ad.sponsor)
    setFormTitle(ad.title)
    setFormLines(ad.lines.join('\n'))
    setFormClickUrl(ad.clickUrl || '')
    setEditingAd(ad)
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!formSponsor || !formTitle || !formLines.trim()) return
    setSubmitting(true)
    try {
      const lines = formLines.split('\n')
      if (editingAd) {
        await updateAd(editingAd.id, {
          sponsor: formSponsor,
          title: formTitle,
          lines,
          clickUrl: formClickUrl || null,
        })
      } else {
        await createAd({
          sponsor: formSponsor,
          title: formTitle,
          lines,
          clickUrl: formClickUrl || undefined,
        })
      }
      resetForm()
      await fetchAds()
    } catch (error: unknown) {
      setError(getErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const toggleActive = async (ad: Ad) => {
    try {
      await updateAd(ad.id, { isActive: !ad.isActive })
      await fetchAds()
    } catch (error: unknown) {
      setError(getErrorMessage(error))
    }
  }

  const deleteAd = async (ad: Ad) => {
    try {
      await deleteAdAction(ad.id)
      await fetchAds()
    } catch (error: unknown) {
      setError(getErrorMessage(error))
    }
  }

  const viewStats = async (adId: string) => {
    if (statsAdId === adId) {
      setStatsAdId(null)
      setStatsData(null)
      return
    }
    try {
      const data = await getAdStats<AdStatsResponse>(adId)
      setStatsAdId(adId)
      setStatsData(data)
    } catch (error: unknown) {
      setError(getErrorMessage(error))
    }
  }

  const activeCount = ads.filter((a) => a.isActive).length
  const totalImpressions = ads.reduce((sum, a) => sum + (a.stats?.impressions || 0), 0)
  const totalClaims = ads.reduce((sum, a) => sum + (a.stats?.claims || 0), 0)

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Total Ads</p>
          <p className="text-2xl font-bold text-card-foreground">{ads.length}</p>
        </Card>
        <Card className="p-4 border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Active Ads</p>
          <p className="text-2xl font-bold text-accent">{activeCount}</p>
        </Card>
        <Card className="p-4 border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Total Impressions</p>
          <p className="text-2xl font-bold text-blue-400">{totalImpressions.toLocaleString()}</p>
        </Card>
        <Card className="p-4 border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Total Claims</p>
          <p className="text-2xl font-bold text-cyan-400">{totalClaims.toLocaleString()}</p>
        </Card>
      </div>

      {/* Error */}
      {error && (
        <Card className="p-3 border border-destructive/30 bg-destructive/10">
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      )}

      {/* Create / Edit Form */}
      {showForm && (
        <Card className="p-6 border border-primary/30 bg-primary/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">
              {editingAd ? 'Edit Ad' : 'Create New Ad'}
            </h3>
            <button onClick={resetForm} className="p-1 hover:bg-muted rounded">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Sponsor</label>
              <Input
                value={formSponsor}
                onChange={(e) => setFormSponsor(e.target.value)}
                placeholder="e.g. Monad Labs"
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <Input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Build on Monad"
                className="bg-input border-border"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              ASCII Art Lines (one line per row)
            </label>
            <textarea
              value={formLines}
              onChange={(e) => setFormLines(e.target.value)}
              placeholder={"  ╔══════════════════════╗\n  ║   Your Ad Here       ║\n  ╚══════════════════════╝"}
              rows={6}
              className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm font-mono text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Click URL (optional)</label>
            <Input
              value={formClickUrl}
              onChange={(e) => setFormClickUrl(e.target.value)}
              placeholder="https://example.com"
              className="bg-input border-border"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={resetForm}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={submitting || !formSponsor || !formTitle || !formLines.trim()}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                <Check className="w-4 h-4 mr-1" />
              )}
              {editingAd ? 'Update' : 'Create'}
            </Button>
          </div>
        </Card>
      )}

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {ads.length} ad{ads.length !== 1 ? 's' : ''} total
        </p>
        {!showForm && (
          <Button size="sm" onClick={openCreateForm}>
            <Plus className="w-4 h-4 mr-1" />
            New Ad
          </Button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Ads Table */}
      {!loading && (
        <Card className="overflow-hidden border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-6 py-3 text-left font-semibold text-card-foreground">Sponsor</th>
                  <th className="px-6 py-3 text-left font-semibold text-card-foreground">Title</th>
                  <th className="px-6 py-3 text-left font-semibold text-card-foreground">Impressions</th>
                  <th className="px-6 py-3 text-left font-semibold text-card-foreground">Claims</th>
                  <th className="px-6 py-3 text-left font-semibold text-card-foreground">Status</th>
                  <th className="px-6 py-3 text-right font-semibold text-card-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No ads yet. Click &quot;New Ad&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  ads.map((ad) => (
                    <Fragment key={ad.id}>
                      <tr
                        className="border-b border-border hover:bg-muted/10 transition-colors"
                      >
                        <td className="px-6 py-4 text-card-foreground font-medium">{ad.sponsor}</td>
                        <td className="px-6 py-4 text-card-foreground">{ad.title}</td>
                        <td className="px-6 py-4 text-blue-400">
                          {(ad.stats?.impressions || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-cyan-400">
                          {(ad.stats?.claims || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              ad.isActive
                                ? 'bg-accent/20 text-accent'
                                : 'bg-muted text-muted-foreground'
                            }
                          >
                            {ad.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => viewStats(ad.id)}
                              className="p-1.5 hover:bg-muted rounded"
                              title="View stats"
                            >
                              <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() => toggleActive(ad)}
                              className="p-1.5 hover:bg-muted rounded"
                              title={ad.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {ad.isActive ? (
                                <EyeOff className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              )}
                            </button>
                            <button
                              onClick={() => openEditForm(ad)}
                              className="p-1.5 hover:bg-muted rounded"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() => deleteAd(ad)}
                              className="p-1.5 hover:bg-destructive/20 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Stats expansion row */}
                      {statsAdId === ad.id && statsData && (
                        <tr className="border-b border-border bg-muted/5">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Impressions</p>
                                <p className="text-lg font-bold text-blue-400">
                                  {statsData.impressions.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Claims</p>
                                <p className="text-lg font-bold text-cyan-400">
                                  {statsData.claims.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Claim Rate</p>
                                <p className="text-lg font-bold text-accent">
                                  {statsData.claimRate}
                                </p>
                              </div>
                            </div>
                            {/* ASCII preview */}
                            <div className="mt-4">
                              <p className="text-xs text-muted-foreground mb-2">Ad Preview</p>
                              <pre className="bg-black/40 rounded-md p-3 text-xs font-mono text-green-400 overflow-x-auto">
                                {ad.lines.join('\n')}
                              </pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
