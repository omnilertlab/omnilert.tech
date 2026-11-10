import raw from './content.json'

export interface Feature {
  title: string
  body: string
}

export interface Division {
  id: number
  name: string
  slug: string
  label: string
  tagline: string
  description: string
  longDescription: string
  features: Feature[]
  status: string
  sortOrder: number
  visible: boolean
}

export interface Update {
  id: number
  title: string
  body: string
  tag: string
  division: string
  published: boolean
  created_at: string
}

export interface Submission {
  id: string
  name: string
  email: string
  division: string
  message: string
  created_at: string
  handled: boolean
}

export interface SiteContent {
  settings: Record<string, string>
  divisions: Division[]
  updates: Update[]
}

const LS_KEY = 'omnilert-content-v1'
const LS_SUBMISSIONS = 'omnilert-submissions-v1'

export function loadContent(): SiteContent {
  const base = raw as unknown as SiteContent
  try {
    const stored = localStorage.getItem(LS_KEY)
    if (!stored) return base
    const parsed = JSON.parse(stored) as Partial<SiteContent>
    return {
      settings: { ...base.settings, ...(parsed.settings ?? {}) },
      divisions: parsed.divisions ?? base.divisions,
      updates: parsed.updates ?? base.updates,
    }
  } catch {
    return base
  }
}

export function saveContent(content: SiteContent) {
  localStorage.setItem(LS_KEY, JSON.stringify(content))
}

export function resetContent() {
  localStorage.removeItem(LS_KEY)
}

export function loadSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(LS_SUBMISSIONS) ?? '[]') as Submission[]
  } catch {
    return []
  }
}

export function saveSubmissions(list: Submission[]) {
  localStorage.setItem(LS_SUBMISSIONS, JSON.stringify(list))
}

export function tickerItems(settings: Record<string, string>): string[] {
  return (settings.ticker_items ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
