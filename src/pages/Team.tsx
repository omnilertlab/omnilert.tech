import { Link } from 'react-router-dom'
import type { SiteContent } from '../content'
import { Reveal } from '../components/anim'

export default function Team({ content }: { content: SiteContent }) {
  const s = content.settings
  const divisions = [...content.divisions].sort((a, b) => a.sortOrder - b.sortOrder)
  const principles = [
    { title: s.how_1_title, body: s.how_1_body },
    { title: s.how_2_title, body: s.how_2_body },
    { title: s.how_3_title, body: s.how_3_body },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
        <Link className="link-ember" to="/">Home</Link> / Team
      </p>
      <h1 className="mt-6 text-5xl leading-[0.95] sm:text-7xl">Team</h1>
      <p className="mt-5 max-w-2xl text-lg" style={{ color: 'var(--muted)' }}>
        {s.about_body}
      </p>

      <section className="mt-14">
        <h2 className="text-4xl">Principles we work by.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title}>
              <article className="card card-lift h-full p-6">
                <p className="font-display text-4xl" style={{ color: 'var(--ember)' }}>0{i + 1}</p>
                <h3 className="mt-3 text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-4xl">Divisions as teams.</h2>
        <p className="mt-3 max-w-2xl text-sm" style={{ color: 'var(--muted)' }}>
          The company is organised around its two divisions. No individual profiles are listed
          here yet — they&rsquo;ll be added from the Control Room when the team is ready to be
          introduced.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {divisions.map((d) => (
            <Reveal key={d.id}>
              <article className="card card-lift h-full p-7">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {d.label} · {d.status}
                </p>
                <h3 className="mt-3 text-3xl">{d.name}</h3>
                <p className="mt-1 font-display text-lg" style={{ color: 'var(--muted)' }}>{d.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{d.description}</p>
                <Link to={`/${d.slug}`} className="link-ember mt-5 inline-block text-sm font-medium">
                  Visit {d.name} →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
