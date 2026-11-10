import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { SiteContent } from '../content'
import { Reveal } from '../components/anim'

export default function Archive({ content }: { content: SiteContent }) {
  const [filter, setFilter] = useState('All')
  const updates = content.updates.filter((u) => u.published)
  const divisions = ['All', ...Array.from(new Set(updates.map((u) => u.division)))]
  const shown = filter === 'All' ? updates : updates.filter((u) => u.division === filter)
  const byYear = new Map<string, typeof shown>()
  for (const u of shown) {
    const year = new Date(u.created_at).getFullYear().toString()
    byYear.set(year, [...(byYear.get(year) ?? []), u])
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
        <Link className="link-ember" to="/">Home</Link> / Archive
      </p>
      <h1 className="mt-6 text-5xl leading-[0.95] sm:text-7xl">Archive</h1>
      <p className="mt-5 max-w-2xl text-lg" style={{ color: 'var(--muted)' }}>
        Every published update, grouped by year. Lab notes, announcements, and field notes as
        they happened.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {divisions.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className="rounded-full border px-4 py-2 text-sm"
            style={{
              borderColor: 'var(--line)',
              background: filter === d ? 'var(--ash)' : 'transparent',
            }}
          >
            {d}
          </button>
        ))}
      </div>

      {[...byYear.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([year, items]) => (
        <section key={year} className="mt-12">
          <h2 className="font-display text-3xl">{year}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {items.map((u) => (
              <Reveal key={u.id}>
                <article className="card h-full p-6">
                  <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                    {u.tag} · {u.division}
                  </p>
                  <h3 className="mt-3 text-2xl">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{u.body}</p>
                  <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>
                    {new Date(u.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {shown.length === 0 && (
        <p className="mt-10" style={{ color: 'var(--muted)' }}>Nothing in this filter yet.</p>
      )}
    </div>
  )
}
