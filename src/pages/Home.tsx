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
      {/* Hero — two-column split: headline + dual CTA left, three overlapping
          data dashboard cards right (Ventriloc hero layout). */}
      <section className="mx-auto max-w-[1200px] px-4 pb-20 pt-14 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-5 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>
              <span className="ember-dot inline-block h-2 w-2" /> {s.hero_eyebrow}
            </p>
            <h1 className="text-display mt-6 max-w-3xl">
              <WordHeadline text={s.hero_title} />
            </h1>
            <p className="text-subheading mt-6 max-w-2xl" style={{ color: 'var(--muted)' }}>
              {s.hero_subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <button onClick={() => scrollToId('early-access')} className="btn btn-primary">
                {s.hero_primary_cta} →
              </button>
              <button onClick={() => scrollToId('how-it-works')} className="btn btn-ghost">
                {s.hero_secondary_cta}
              </button>
            </div>
          </div>
          {/* Three overlapping data dashboard cards: the charts ARE the imagery. */}
          <div className="relative mt-10 lg:mt-0" aria-hidden="true">
            <div className="card-data p-10">
              <p className="font-display text-subheading">Signals weighed</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Confidence, ranked before anything interrupts</p>
              <svg viewBox="0 0 320 120" className="mt-6 w-full" role="img" aria-label="Signal confidence chart">
                <polyline points="0,90 40,70 80,78 120,45 160,55 200,28 240,38 280,15 320,22" fill="none" stroke="var(--ember)" strokeWidth="2" />
                <polyline points="0,100 40,88 80,92 120,80 160,84 200,70 240,74 280,62 320,66" fill="none" stroke="var(--brass)" strokeWidth="2" />
              </svg>
              <p className="mt-4 text-xs" style={{ color: 'var(--brass)' }}>Ember — urgent, verified · Brass — routine, digested</p>
            </div>
            <div className="card-data -mt-6 ml-10 p-10 sm:ml-16">
              <p className="font-display text-heading-lg">98%</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Confidence on the latest verified signal — checked against a second source before it could interrupt anyone.</p>
            </div>
            <div className="card-data -mt-6 mr-10 p-10 sm:mr-16">
              <div className="flex items-center gap-5">
                <svg viewBox="0 0 80 80" className="h-20 w-20 shrink-0" role="img" aria-label="Calm by default, 92 percent">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--line)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--ember)" strokeWidth="6" strokeLinecap="round" strokeDasharray="196 214" transform="rotate(-90 40 40)" />
                  <text x="40" y="45" textAnchor="middle" fill="var(--ink)" fontSize="16">92%</text>
                </svg>
                <div>
                  <p className="font-display text-subheading">Calm by default</p>
                  <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Routine signals arrive as a digest, not a siren.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 grid gap-5 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Observatory />
          </div>
          <div className="grid grid-cols-3 gap-5 lg:col-span-2">
            {[
              { value: divisions.length, label: 'Divisions' },
              { value: updates.length, label: 'Updates published' },
              { value: tickerItems(s).length, label: 'Signal rules live' },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="font-display text-heading-lg">
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
      <section className="band-ash">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>About</p>
          <h2 className="text-heading-lg mt-4 max-w-2xl">{s.about_title}</h2>
          <p className="text-subheading mt-5 max-w-2xl" style={{ color: 'var(--muted)' }}>
            {s.about_body}
          </p>
        </Reveal>
      </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>How it works</p>
          <h2 className="text-heading-lg mt-4">Three steps. One clear alert.</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} className="h-full">
              <article className="card card-lift h-full p-10">
                <p className="font-display text-heading-lg" style={{ color: 'var(--ember)' }}>
                  0{i + 1}
                </p>
                <h3 className="text-subheading font-display mt-4">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Divisions */}
      <section className="band-ash">
        <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>Divisions</p>
          <h2 className="text-heading-lg mt-4">Two parts, one promise.</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {divisions.map((d) => (
            <Reveal key={d.id} className="h-full">
              <article className="card card-lift flex h-full flex-col p-10">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {d.label} · {d.status}
                </p>
                <h3 className="text-heading mt-3">{d.name}</h3>
                <p className="text-subheading font-display mt-1" style={{ color: 'var(--muted)' }}>{d.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {d.description}
                </p>
                <Link to={`/${d.slug}`} className="link-ember mt-6 text-sm">
                  Visit {d.name} →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      </section>

      {/* Updates */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'var(--muted)' }}>Updates</p>
          <h2 className="text-heading-lg mt-4">Latest from the Lab and the company.</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {updates.map((u) => (
            <Reveal key={u.id} className="h-full">
              <article className="card h-full p-10">
                <p className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--ember)' }}>
                  {u.tag} · {u.division}
                </p>
                <h3 className="text-subheading font-display mt-3">{u.title}</h3>
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
      <section id="early-access" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
        <Reveal>
          <EarlyAccessForm division="Omnilert" />
        </Reveal>
      </section>
    </div>
  )
}
