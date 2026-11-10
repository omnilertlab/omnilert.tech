import { Link } from 'react-router-dom'
import { tickerItems, type SiteContent } from '../content'
import { CountUp, Reveal, WordHeadline } from '../components/anim'
import { Observatory, Ticker } from '../components/Observatory'
import { EarlyAccessForm } from '../components/EarlyAccessForm'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home({ content }: { content: SiteContent }) {
  const s = content.settings
  const divisions = [...content.divisions].sort((a, b) => a.sortOrder - b.sortOrder).filter((d) => d.visible)
  const updates = content.updates.filter((u) => u.published)
  const steps = [
    { title: s.how_1_title, body: s.how_1_body },
    { title: s.how_2_title, body: s.how_2_body },
    { title: s.how_3_title, body: s.how_3_body },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
          <span className="ember-dot inline-block h-2 w-2" /> {s.hero_eyebrow}
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[0.95] sm:text-7xl">
          <WordHeadline text={s.hero_title} />
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: 'var(--muted)' }}>
          {s.hero_subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => scrollToId('early-access')} className="btn px-5 py-3 text-sm" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
            {s.hero_primary_cta} →
          </button>
          <button onClick={() => scrollToId('how-it-works')} className="btn border px-5 py-3 text-sm" style={{ borderColor: 'var(--line)' }}>
            {s.hero_secondary_cta}
          </button>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Observatory />
          </div>
          <div className="grid grid-cols-3 gap-4 lg:col-span-2">
            {[
              { value: divisions.length, label: 'Divisions' },
              { value: updates.length, label: 'Updates published' },
              { value: tickerItems(s).length, label: 'Signal rules live' },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="font-display text-4xl">
                  <CountUp to={stat.value} />
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker items={tickerItems(s)} />

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>About</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">{s.about_title}</h2>
          <p className="mt-5 max-w-2xl text-lg" style={{ color: 'var(--muted)' }}>
            {s.about_body}
          </p>
        </Reveal>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>How it works</p>
          <h2 className="mt-4 text-4xl">Three steps. One clear alert.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} className="h-full">
              <article className="card card-lift h-full p-6">
                <p className="font-display text-5xl" style={{ color: 'var(--ember)' }}>
                  0{i + 1}
                </p>
                <h3 className="mt-4 text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divisions */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>Divisions</p>
          <h2 className="mt-4 text-4xl">Two parts, one promise.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {divisions.map((d) => (
            <Reveal key={d.id} className="h-full">
              <article className="card card-lift flex h-full flex-col p-7">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {d.label} · {d.status}
                </p>
                <h3 className="mt-3 text-3xl">{d.name}</h3>
                <p className="mt-1 font-display text-lg" style={{ color: 'var(--muted)' }}>{d.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {d.description}
                </p>
                <Link to={`/${d.slug}`} className="link-ember mt-6 text-sm font-medium">
                  Visit {d.name} →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Updates */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>Updates</p>
          <h2 className="mt-4 text-4xl">Latest from the Lab and the company.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {updates.map((u) => (
            <Reveal key={u.id} className="h-full">
              <article className="card h-full p-6">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {u.tag} · {u.division}
                </p>
                <h3 className="mt-3 text-2xl">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{u.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link className="link-ember" to="/archive">Browse the full archive →</Link>
        </p>
      </section>

      {/* Early access */}
      <section id="early-access" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <EarlyAccessForm division="Omnilert" />
        </Reveal>
      </section>
    </div>
  )
}
