import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { loadContent, saveContent, type SiteContent } from './content'
import Home from './pages/Home'
import DivisionPage from './pages/DivisionPage'
import Archive from './pages/Archive'
import Team from './pages/Team'
import Admin from './pages/Admin'

function ThemeToggle({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full border px-3 py-1.5 text-xs"
      style={{ borderColor: 'var(--line)' }}
      aria-label="Toggle light and dark mode"
    >
      {theme === 'dark' ? '☀ Light' : '● Dark'}
    </button>
  )
}

function Nav({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/app', label: 'Omnilert App' },
    { to: '/lab', label: 'Omnilert Lab' },
    { to: '/archive', label: 'Archive' },
    { to: '/team', label: 'Team' },
  ]
  return (
    <header className="sticky top-0 z-40 backdrop-blur" style={{ background: 'color-mix(in srgb, var(--bg) 82%, transparent)' }}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="ember-dot inline-block h-3 w-3" />
          <span className="font-display text-xl">Omnilert</span>
        </Link>
        <nav className="pill-nav hidden items-center gap-1 px-2 py-1 md:flex" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1.5 text-sm transition ${isActive ? '' : ''}`
              }
              style={({ isActive }) => (isActive ? { background: 'var(--ash)' } : {})}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <Link to="/admin" className="btn btn-primary">
            Control Room
          </Link>
        </div>
      </div>
      <nav className="flex gap-5 overflow-x-auto px-4 pb-3 text-sm md:hidden" aria-label="Main navigation">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="shrink-0">
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

function Footer({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t py-12" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-display text-subheading">
            <span className="ember-dot inline-block h-2.5 w-2.5" /> Omnilert
          </p>
          <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>
            {content.settings.footer_note}
          </p>
        </div>
        <div className="text-sm">
          <p className="uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>Pages</p>
          <ul className="mt-3 space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/app">Omnilert App</Link></li>
            <li><Link to="/lab">Omnilert Lab</Link></li>
            <li><Link to="/archive">Archive</Link></li>
            <li><Link to="/team">Team</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>Control</p>
          <ul className="mt-3 space-y-2">
            <li><Link to="/admin">Control Room</Link></li>
            <li><span style={{ color: 'var(--muted)' }}>Positioning on this site is a draft.</span></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1200px] px-4 text-xs sm:px-6" style={{ color: 'var(--muted)' }}>
        © {year} Omnilert — independent startup in active development. Not affiliated with any other company
        named Omnilert.
      </p>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('omnilert-theme') ?? 'light')
  const [content, setContentState] = useState<SiteContent>(() => loadContent())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('omnilert-theme', theme)
  }, [theme])

  // GitHub Pages SPA fallback: restore the path saved by public/404.html.
  useEffect(() => {
    const redirect = sessionStorage.getItem('omnilert-redirect')
    if (redirect) {
      sessionStorage.removeItem('omnilert-redirect')
      if (redirect !== '/' && redirect !== window.location.pathname) {
        window.history.replaceState(null, '', redirect)
      }
    }
  }, [])

  function setContent(next: SiteContent) {
    setContentState(next)
    saveContent(next)
  }

  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Nav theme={theme} setTheme={setTheme} />
      <main key={useLocation().pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home content={content} />} />
          <Route path="/app" element={<DivisionPage content={content} slug="app" />} />
          <Route path="/lab" element={<DivisionPage content={content} slug="lab" />} />
          <Route path="/archive" element={<Archive content={content} />} />
          <Route path="/team" element={<Team content={content} />} />
          <Route path="/admin" element={<Admin content={content} setContent={setContent} />} />
          <Route
            path="*"
            element={
              <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
                <p className="font-display text-heading-lg">That page isn&rsquo;t here.</p>
                <p className="mt-3" style={{ color: 'var(--muted)' }}>
                  Try the <Link className="link-ember" to="/">home page</Link>,{' '}
                  <Link to="/app">Omnilert App</Link>, or{' '}
                  <Link to="/lab">Omnilert Lab</Link>.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer content={content} />
    </div>
  )
}
