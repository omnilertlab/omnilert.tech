import { useEffect, useRef, useState } from 'react'

const FEED = [
  { label: 'Source check', detail: 'Duplicate suppressed', conf: 98 },
  { label: 'Confidence rank', detail: 'Urgent — verified twice', conf: 96 },
  { label: 'Digest queued', detail: 'Routine blip, no interrupt', conf: 91 },
  { label: 'Escalation', detail: 'No response — moving on', conf: 94 },
  { label: 'Signal weighed', detail: 'One clear alert drafted', conf: 99 },
]

/**
 * Signal Observatory: a scanning panel with a live-feeling feed.
 * The timer and scan animation only run while the panel is on screen.
 */
export function Observatory() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [items, setItems] = useState(FEED.slice(0, 3))
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const id = window.setInterval(() => {
      setTick((t) => t + 1)
      setItems((prev) => {
        const next = FEED[(tick + 3) % FEED.length]
        return [next, ...prev].slice(0, 3)
      })
    }, 2600)
    return () => window.clearInterval(id)
  }, [inView, tick])

  return (
    <div ref={ref} className="card-data overflow-hidden" aria-label="Signal Observatory">
      <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: 'var(--line)' }}>
        <span className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>
          Signal Observatory — live
        </span>
        <span className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
          <span className="ember-dot inline-block h-2 w-2" />
          {inView ? 'watching' : 'paused'}
        </span>
      </div>
      <div className="relative overflow-hidden px-5 py-4">
        <div
          className="scan-line pointer-events-none absolute inset-x-0 h-10 opacity-20"
          style={{ background: 'linear-gradient(180deg, transparent, var(--ember), transparent)', animationPlayState: inView ? 'running' : 'paused' }}
        />
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex items-center justify-between gap-5 text-sm">
              <span className="font-display">{item.label}</span>
              <span className="truncate" style={{ color: 'var(--muted)' }}>
                {item.detail}
              </span>
              <span className="shrink-0 text-xs" style={{ color: 'var(--ember)' }}>
                {item.conf}% confidence
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-1.5" aria-hidden="true">
          {[42, 68, 30, 84, 55, 92, 38, 74, 60, 88, 46, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h * 0.7}px`, background: i === 5 ? 'var(--ember)' : 'var(--ink)', opacity: i === 5 ? 1 : 0.25 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Ticker({ items }: { items: string[] }) {
  if (items.length === 0) return null
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor: 'var(--line)' }} aria-hidden="true">
      <div className="ticker-track flex w-max gap-8 whitespace-nowrap text-sm" style={{ color: 'var(--muted)' }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span style={{ color: 'var(--ember)' }}>●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
