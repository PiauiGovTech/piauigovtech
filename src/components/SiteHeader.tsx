import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import NavLink from './NavLink'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const location = useLocation()
  const isServicesActive =
    location.pathname.startsWith('/cursos') || location.pathname.startsWith('/nossos-servicos')
  const servicesRef = useRef<HTMLDivElement | null>(null)

  // Fecha o dropdown de Serviços ao clicar fora ou pressionar ESC
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = servicesRef.current
      if (!el) return
      if (!(e.target instanceof Node)) return
      if (!el.contains(e.target)) setServicesOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])
  useEffect(() => {
    if (!menuOpen) setMobileServicesOpen(false)
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setMobileServicesOpen(false)
  }

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
          {/* <NavLink targetId="ecossistema">Ecossistema</NavLink> */}
          {/* Dropdown Serviços (desktop) */}
          <div
            ref={servicesRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              className={`inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
                isServicesActive ? 'text-brand-300' : 'text-white/80 hover:text-brand-300'
              } cursor-pointer select-none`}
            >
              <span>Serviços</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`ml-1 h-4 w-4 transition-transform duration-150 ${
                  servicesOpen ? 'rotate-180 text-brand-300' : 'text-white/70'
                }`}
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
              </svg>
            </button>
            <div className={`${servicesOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'} transition duration-150 ease-out absolute left-0 top-full mt-0 min-w-48 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-lg p-2`}>
              <NavLink
                className="block w-full rounded-xl px-3 py-2 hover:bg-white/10 cursor-pointer"
                targetId="cursos"
                to="/cursos"
                onNavigate={() => setServicesOpen(false)}
              >
                Cursos
              </NavLink>
              <NavLink
                className="block w-full rounded-xl px-3 py-2 hover:bg-white/10 cursor-pointer"
                targetId="nossos-servicos"
                to="/nossos-servicos"
                onNavigate={() => setServicesOpen(false)}
              >
                Nossas Soluções
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={closeMenu} />
          <div className="fixed inset-x-0 top-0 z-50 w-full max-h-[80vh] overflow-y-auto rounded-b-2xl border border-white/15 bg-white/10 backdrop-blur-md p-6 ring-1 ring-inset ring-white/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={closeMenu}>
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
                onClick={closeMenu}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Close menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-3">
              <NavLink
                className="flex w-full items-center rounded-xl border border-white/15 bg-white/10 px-4 py-3 hover:bg-white/15"
                targetId="inicio"
                onNavigate={closeMenu}
              >
                Início
              </NavLink>
              <NavLink
                className="flex w-full items-center rounded-xl border border-white/15 bg-white/10 px-4 py-3 hover:bg-white/15"
                targetId="noticias"
                to="/noticias"
                onNavigate={closeMenu}
              >
                Notícias
              </NavLink>
              <NavLink
                className="flex w-full items-center rounded-xl border border-white/15 bg-white/10 px-4 py-3 hover:bg-white/15"
                targetId="quem-somos"
                to="/quemsomos"
                onNavigate={closeMenu}
              >
                Quem somos
              </NavLink>
              <div className="rounded-xl border border-white/15 bg-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-white hover:bg-white/10"
                  aria-haspopup="menu"
                  aria-expanded={mobileServicesOpen}
                >
                  <span>Serviços</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 transition-transform duration-150 ${
                      mobileServicesOpen ? 'rotate-180 text-brand-300' : 'text-white/70'
                    }`}
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="mt-2 space-y-2">
                    <NavLink
                      className="flex w-full items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                      targetId="cursos"
                      to="/cursos"
                      onNavigate={closeMenu}
                    >
                      Cursos
                    </NavLink>
                    <NavLink
                      className="flex w-full items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                      targetId="nossos-servicos"
                      to="/nossos-servicos"
                      onNavigate={closeMenu}
                    >
                      Nossas Soluções
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
