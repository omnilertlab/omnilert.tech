import { Link } from 'react-router-dom'
import type { SiteContent } from '../content'
import { Reveal } from '../components/anim'
import { Observatory } from '../components/Observatory'
import { EarlyAccessForm } from '../components/EarlyAccessForm'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function DivisionPage({ content, slug }: { content: SiteContent; slug: string }) {
  const division = content.divisions.find((d) => d.slug === slug)
  const s = content.settings
  if (!division) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
        <p className="font-display text-heading-lg">That division isn&rsquo;t here.</p>
        <p className="mt-3">
          <Link className="link-ember" to="/">Back home →</Link>
        </p>
      </div>
    )
  }
  const isLab = slug === 'lab'
  const updates = content.updates.filter((u) => u.published && u.division === division.name)

  return (
    <div>
      <section className="mx-auto max-w-[1200px] px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
        <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
          <Link className="link-ember" to="/">Home</Link> / {division.label}
        </p>
        <h1 className="text-display mt-6 max-w-3xl">{division.name}</h1>
        <p className="text-subheading font-display mt-4" style={{ color: 'var(--ember)' }}>{division.tagline}</p>
        <p className="text-subheading mt-5 max-w-2xl" style={{ color: 'var(--muted)' }}>
          {division.longDescription}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => scrollToId('division-access')} className="btn btn-primary">
            Request early access →
          </button>
          <button onClick={() => scrollToId('division-features')} className="btn btn-ghost">
            {s.div_features_heading}
          </button>
        </div>
      </section>

      {!isLab && (
        <section className="mx-auto max-w-[1200px] px-4 pb-16 sm:px-6">
          <Observatory />
        </section>
      )}

      <section id="division-features" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>{division.label}</p>
          <h2 className="text-heading-lg mt-4">{s.div_features_heading}</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {division.features.map((f, i) => (
            <Reveal key={f.title} className="h-full">
              <article className="card card-lift h-full p-10">
                <p className="font-display text-heading-lg" style={{ color: 'var(--ember)' }}>0{i + 1}</p>
                <h3 className="text-subheading font-display mt-3">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {isLab && (
        <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <Reveal>
            <div className="card-asym">
              <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>Lab Method</p>
              <h2 className="text-heading mt-3">Prototype in the open. Graduate on merit.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                Lab work is tested in the open, measured honestly, and only promoted when it beats
                what&rsquo;s already live. Field notes are published as experiments happen — the
                hypothesis, the result, and the lesson.
              </p>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-heading-lg">{s.div_updates_heading}</h2>
        </Reveal>
        {updates.length === 0 ? (
          <p className="mt-6 text-sm" style={{ color: 'var(--muted)' }}>
            No updates from this division yet — field notes will appear here as they&rsquo;re published.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {updates.map((u) => (
              <article key={u.id} className="card p-10">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {u.tag} · {u.division}
                </p>
                <h3 className="text-subheading font-display mt-3">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{u.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <div className="card-asym">
            <h2 className="text-heading">{s.div_cta_title}</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{s.div_cta_body}</p>
          </div>
        </Reveal>
      </section>

      <section id="division-access" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
        <Reveal>
          <EarlyAccessForm division={division.name} />
        </Reveal>
      </section>
    </div>
  )
}
