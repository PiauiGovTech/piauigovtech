import { Link, useLocation } from "react-router-dom";
import Container from "./Container";
import NavLink from "./NavLink";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useScrollSpy } from "../hooks/useScrollSpy";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isLogin = location.pathname.startsWith('/login');
  const scrollSpyActiveId = useScrollSpy([
    'inicio',
    'ecossistema',
    // 'para-quem',
    // 'projetos',
  ]);
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onResize = () => setMenuOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="w-full bg-[#010720]">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="shrink-0">
          <div className="flex items-center gap-3 text-brand-400">
            <Logo className="h-10 w-auto" />
            <div className="leading-tight">
              <div className="text-xl font-bold text-white">
                piauí<span className="text-gray-300 font-light">gov</span>
                tech
              </div>
            </div>
          </div>
        </Link>
        {!isLogin && (
          <nav className="hidden items-center gap-1 md:flex">
            <NavLink targetId="inicio" activeId={isHome ? scrollSpyActiveId : undefined}>Início</NavLink>
            <NavLink targetId="noticias" to="/noticias">Notícias</NavLink>
            <NavLink targetId="quem-somos" to="/quemsomos">Quem somos</NavLink>
            <NavLink targetId="ecossistema" activeId={isHome ? scrollSpyActiveId : undefined}>Ecossistema</NavLink>
            {/* <NavLink targetId="para-quem" activeId={isHome ? scrollSpyActiveId : undefined}>Para Quem</NavLink> */}
            {/* <NavLink targetId="projetos" activeId={activeId}>Projetos</NavLink> */}
          </nav>
        )}
        {isLogin && (
          <Link
            to="/"
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-brand-300 text-white/80 cursor-pointer"
          >
            Início
          </Link>
        )}
        {!isLogin && (
          <button
            aria-label="Abrir menu"
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white hover:bg-white/15"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 text-white"
            >
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
                />
              )}
            </svg>
          </button>
        )}
      </Container>

      {!isLogin && menuOpen && (
        <div className="border-t border-white/10 bg-[#010720] md:hidden">
          <Container className="py-3">
            <div className="grid gap-1">
              <NavLink targetId="inicio" onNavigate={() => setMenuOpen(false)}>Início</NavLink>
              <NavLink targetId="noticias" to="/noticias" onNavigate={() => setMenuOpen(false)}>Notícias</NavLink>
              <NavLink targetId="quem-somos" to="/quemsomos" onNavigate={() => setMenuOpen(false)}>Quem somos</NavLink>
              <NavLink targetId="ecossistema" onNavigate={() => setMenuOpen(false)}>Ecossistema</NavLink>
              <NavLink targetId="para-quem" onNavigate={() => setMenuOpen(false)}>Para Quem</NavLink>
              {/* <NavLink targetId="projetos" onNavigate={() => setMenuOpen(false)}>Projetos</NavLink> */}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
