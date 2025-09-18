import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import NavLink from './NavLink'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Piauí Gov Tech</span>
            <div className="flex items-center gap-3 text-brand-400">
              <Logo className="h-8 w-auto" />
              <div className="leading-tight">
                <div className="text-lg font-bold text-white">
                  piauí<span className="text-gray-300 font-light">gov</span>
                  tech
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"/>
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-2">
          <NavLink targetId="inicio">Início</NavLink>
          <NavLink targetId="noticias" to="/noticias">Notícias</NavLink>
          <NavLink targetId="quem-somos" to="/quemsomos">Quem somos</NavLink>
          <NavLink targetId="ecossistema">Ecossistema</NavLink>
          <NavLink targetId="cursos" to="/cursos">Cursos</NavLink>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="fixed inset-x-0 top-0 z-50 w-full max-h-[80vh] overflow-y-auto rounded-b-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 ring-1 ring-inset ring-white/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMenuOpen(false)}>
                <span className="sr-only">Piauí Gov Tech</span>
                <div className="flex items-center gap-3 text-brand-400">
                  <Logo className="h-8 w-auto" />
                  <div className="leading-tight">
                    <div className="text-lg font-bold text-white">
                      piauí<span className="text-gray-300 font-light">gov</span>
                      tech
                    </div>
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Close menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-3">
              <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="inicio" onNavigate={() => setMenuOpen(false)}>Início</NavLink>
              <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="noticias" to="/noticias" onNavigate={() => setMenuOpen(false)}>Notícias</NavLink>
              <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="quem-somos" to="/quemsomos" onNavigate={() => setMenuOpen(false)}>Quem somos</NavLink>
              <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="cursos" to="/cursos" onNavigate={() => setMenuOpen(false)}>Cursos</NavLink>
              <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="ecossistema" onNavigate={() => setMenuOpen(false)}>Ecossistema</NavLink>
              <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="para-quem" onNavigate={() => setMenuOpen(false)}>Para Quem</NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
