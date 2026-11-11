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
    <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
        <Link className="link-ember" to="/">Home</Link> / Team
      </p>
      <h1 className="text-display mt-6">Team</h1>
      <p className="text-subheading mt-5 max-w-2xl" style={{ color: 'var(--muted)' }}>
        {s.about_body}
      </p>

      <section className="mt-14">
        <h2 className="text-heading-lg">Principles we work by.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title}>
              <article className="card card-lift h-full p-10">
                <p className="font-display text-heading-lg" style={{ color: 'var(--ember)' }}>0{i + 1}</p>
                <h3 className="text-subheading font-display mt-3">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-heading-lg">Divisions as teams.</h2>
        <p className="mt-3 max-w-2xl text-sm" style={{ color: 'var(--muted)' }}>
          The company is organised around its two divisions. No individual profiles are listed
          here yet — they&rsquo;ll be added from the Control Room when the team is ready to be
          introduced.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {divisions.map((d) => (
            <Reveal key={d.id}>
              <article className="card card-lift h-full p-10">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {d.label} · {d.status}
                </p>
                <h3 className="text-heading mt-3">{d.name}</h3>
                <p className="text-subheading font-display mt-1" style={{ color: 'var(--muted)' }}>{d.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{d.description}</p>
                <Link to={`/${d.slug}`} className="link-ember mt-5 inline-block text-sm">
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
