import { useState } from 'react'
import { loadSubmissions, resetContent, saveSubmissions, type SiteContent, type Submission } from '../content'

type Tab = 'copy' | 'divisions' | 'updates' | 'inbox'

const SETTING_LABELS: Record<string, string> = {
  hero_eyebrow: 'Hero eyebrow',
  hero_title: 'Hero title',
  hero_subtitle: 'Hero subtitle',
  hero_primary_cta: 'Hero primary button',
  hero_secondary_cta: 'Hero secondary button',
  about_title: 'About title',
  about_body: 'About body',
  how_1_title: 'Step 1 title',
  how_1_body: 'Step 1 body',
  how_2_title: 'Step 2 title',
  how_2_body: 'Step 2 body',
  how_3_title: 'Step 3 title',
  how_3_body: 'Step 3 body',
  div_cta_title: 'Division CTA title',
  div_cta_body: 'Division CTA body',
  div_features_heading: 'Division features heading',
  div_updates_heading: 'Division updates heading',
  ticker_items: 'Ticker items (comma-separated)',
  footer_note: 'Footer note',
  contact_email: 'Contact email',
}

export default function Admin({ content, setContent }: { content: SiteContent; setContent: (c: SiteContent) => void }) {
  const [tab, setTab] = useState<Tab>('copy')
  const [submissions, setSubmissions] = useState<Submission[]>(() => loadSubmissions())
  const [saved, setSaved] = useState('')

  function update(fn: (c: SiteContent) => SiteContent) {
    const next = fn(structuredClone(content))
    setContent(next)
    setSaved('Saved ✓')
    window.setTimeout(() => setSaved(''), 1800)
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function setHandled(id: string, handled: boolean) {
    const next = submissions.map((s) => (s.id === id ? { ...s, handled } : s))
    setSubmissions(next)
    saveSubmissions(next)
  }

  function deleteSubmission(id: string) {
    const next = submissions.filter((s) => s.id !== id)
    setSubmissions(next)
    saveSubmissions(next)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'copy', label: 'Site Copy' },
    { id: 'divisions', label: 'Divisions' },
    { id: 'updates', label: 'Updates' },
    { id: 'inbox', label: `Inbox (${submissions.filter((s) => !s.handled).length} new)` },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>Omnilert</p>
      <h1 className="mt-4 text-5xl leading-[0.95] sm:text-6xl">Control Room</h1>
      <p className="mt-4 max-w-2xl" style={{ color: 'var(--muted)' }}>
        Edit the site&rsquo;s copy, divisions, updates, and early-access inbox. Changes save to
        this browser (localStorage) for preview — use Export to download an updated{' '}
        <code>src/content.json</code> and commit it to make changes permanent for everyone.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={exportJson} className="btn px-4 py-2 text-sm" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
          Export content.json ↓
        </button>
        <button
          onClick={() => {
            resetContent()
            window.location.reload()
          }}
          className="btn border px-4 py-2 text-sm"
          style={{ borderColor: 'var(--line)' }}
        >
          Reset to shipped copy
        </button>
        {saved && <span className="self-center text-sm" style={{ color: 'var(--ember)' }}>{saved}</span>}
      </div>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className="rounded-full border px-4 py-2 text-sm"
            style={{ borderColor: 'var(--line)', background: tab === t.id ? 'var(--ash)' : 'transparent' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'copy' && (
        <div className="mt-8 grid gap-4">
          {Object.entries(SETTING_LABELS).map(([key, label]) => (
            <label key={key} className="grid gap-1 text-sm">
              {label}
              <textarea
                rows={key.endsWith('_body') || key.endsWith('_subtitle') || key === 'footer_note' ? 3 : 1}
                value={content.settings[key] ?? ''}
                onChange={(e) => update((c) => ({ ...c, settings: { ...c.settings, [key]: e.target.value } }))}
                className="border px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--surface)', borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </label>
          ))}
        </div>
      )}

      {tab === 'divisions' && (
        <div className="mt-8 grid gap-6">
          {content.divisions.map((d) => (
            <div key={d.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl">{d.name}</h2>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={d.visible}
                    onChange={(e) => update((c) => ({ ...c, divisions: c.divisions.map((x) => (x.id === d.id ? { ...x, visible: e.target.checked } : x)) }))}
                  />
                  Visible
                </label>
              </div>
              <div className="mt-4 grid gap-3">
                {(['tagline', 'description', 'longDescription'] as const).map((field) => (
                  <label key={field} className="grid gap-1 text-sm">
                    {field}
                    <textarea
                      rows={field === 'tagline' ? 1 : 3}
                      value={d[field]}
                      onChange={(e) => update((c) => ({ ...c, divisions: c.divisions.map((x) => (x.id === d.id ? { ...x, [field]: e.target.value } : x)) }))}
                      className="border px-3 py-2 text-sm outline-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                    />
                  </label>
                ))}
                <p className="text-sm font-medium">Features</p>
                {d.features.map((f, i) => (
                  <div key={i} className="grid gap-2 border p-3" style={{ borderColor: 'var(--line)' }}>
                    <input
                      value={f.title}
                      onChange={(e) => update((c) => ({ ...c, divisions: c.divisions.map((x) => (x.id === d.id ? { ...x, features: x.features.map((y, j) => (j === i ? { ...y, title: e.target.value } : y)) } : x)) }))}
                      className="border px-3 py-2 text-sm outline-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                      placeholder="Feature title"
                    />
                    <textarea
                      rows={2}
                      value={f.body}
                      onChange={(e) => update((c) => ({ ...c, divisions: c.divisions.map((x) => (x.id === d.id ? { ...x, features: x.features.map((y, j) => (j === i ? { ...y, body: e.target.value } : y)) } : x)) }))}
                      className="border px-3 py-2 text-sm outline-none"
                      style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                      placeholder="Feature body"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'updates' && (
        <div className="mt-8 grid gap-4">
          {content.updates.map((u) => (
            <div key={u.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <input
                  value={u.title}
                  onChange={(e) => update((c) => ({ ...c, updates: c.updates.map((x) => (x.id === u.id ? { ...x, title: e.target.value } : x)) }))}
                  className="min-w-0 flex-1 border px-3 py-2 font-display text-xl outline-none"
                  style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={u.published}
                    onChange={(e) => update((c) => ({ ...c, updates: c.updates.map((x) => (x.id === u.id ? { ...x, published: e.target.checked } : x)) }))}
                  />
                  Published
                </label>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <input
                  value={u.tag}
                  onChange={(e) => update((c) => ({ ...c, updates: c.updates.map((x) => (x.id === u.id ? { ...x, tag: e.target.value } : x)) }))}
                  className="border px-3 py-2 text-sm outline-none"
                  style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                  placeholder="Tag"
                />
                <input
                  value={u.division}
                  onChange={(e) => update((c) => ({ ...c, updates: c.updates.map((x) => (x.id === u.id ? { ...x, division: e.target.value } : x)) }))}
                  className="border px-3 py-2 text-sm outline-none"
                  style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
                  placeholder="Division"
                />
                <button
                  onClick={() => update((c) => ({ ...c, updates: c.updates.filter((x) => x.id !== u.id) }))}
                  className="btn border px-3 py-2 text-sm"
                  style={{ borderColor: 'var(--line)' }}
                >
                  Delete update
                </button>
              </div>
              <textarea
                rows={4}
                value={u.body}
                onChange={(e) => update((c) => ({ ...c, updates: c.updates.map((x) => (x.id === u.id ? { ...x, body: e.target.value } : x)) }))}
                className="mt-3 w-full border px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              update((c) => ({
                ...c,
                updates: [
                  {
                    id: Math.max(0, ...c.updates.map((x) => x.id)) + 1,
                    title: 'New update',
                    body: '',
                    tag: 'Announcement',
                    division: 'Company',
                    published: false,
                    created_at: new Date().toISOString(),
                  },
                  ...c.updates,
                ],
              }))
            }
            className="btn justify-center border px-4 py-3 text-sm"
            style={{ borderColor: 'var(--line)' }}
          >
            + Add update
          </button>
        </div>
      )}

      {tab === 'inbox' && (
        <div className="mt-8 grid gap-4">
          {submissions.length === 0 && (
            <p style={{ color: 'var(--muted)' }}>
              No early-access submissions yet. Submissions from the site&rsquo;s forms appear here.
            </p>
          )}
          {submissions.map((s) => (
            <div key={s.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-xl">{s.name} <span className="text-sm" style={{ color: 'var(--muted)' }}>· {s.email}</span></p>
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: s.handled ? 'var(--muted)' : 'var(--ember)' }}>
                  {s.handled ? 'Handled' : 'New'}
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>
                {s.division} · {new Date(s.created_at).toLocaleString()}
              </p>
              {s.message && <p className="mt-3 text-sm">{s.message}</p>}
              <div className="mt-4 flex gap-2">
                <button onClick={() => setHandled(s.id, !s.handled)} className="btn border px-3 py-2 text-sm" style={{ borderColor: 'var(--line)' }}>
                  {s.handled ? 'Mark as new' : 'Mark handled'}
                </button>
                <button onClick={() => deleteSubmission(s.id)} className="btn border px-3 py-2 text-sm" style={{ borderColor: 'var(--line)' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
