import { useState, type FormEvent } from 'react'
import { loadSubmissions, saveSubmissions, type Submission } from '../content'

export function EarlyAccessForm({ division, id }: { division: string; id?: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    const entry: Submission = {
      id: `${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      division,
      message: message.trim(),
      created_at: new Date().toISOString(),
      handled: false,
    }
    saveSubmissions([entry, ...loadSubmissions()])
    setDone(true)
  }

  if (done) {
    return (
      <div className="card p-10" id={id}>
        <p className="font-display text-subheading">You&rsquo;re on the list.</p>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          Thanks — we&rsquo;ll be in touch when a seat opens for {division}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} id={id} className="card p-10">
      <p className="font-display text-subheading">Tell us what you can&rsquo;t afford to miss</p>
      <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
        Early access for {division}. No spam — one message when there&rsquo;s a seat.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm">
          Name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
            placeholder="Ada Lovelace"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 text-sm outline-none"
            style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
            placeholder="ada@example.com"
          />
        </label>
      </div>
      <label className="mt-3 grid gap-1 text-sm">
        What would you want watched?
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="border px-3 py-2 text-sm outline-none"
          style={{ background: 'var(--bg)', borderColor: 'var(--line)', color: 'var(--ink)' }}
          placeholder="The signals my team can't afford to miss…"
        />
      </label>
      <button type="submit" className="btn btn-primary mt-5">
        Request early access →
      </button>
      <p className="mt-3 text-xs" style={{ color: 'var(--muted)' }}>
        Saved locally in this standalone site — see the Control Room inbox.
      </p>
    </form>
  )
}
