import Container from "../components/Container";
import aboutVideo from "../assets/video/animacaoLogoPGT.mp4";
import Logo from "../components/Logo";
import NavLink from "../components/NavLink";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function QuemSomos() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      {/* Header igual ao da Home */}
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
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 space-y-3">
                <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="inicio" onNavigate={() => setMenuOpen(false)}>Início</NavLink>
                <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="noticias" to="/noticias" onNavigate={() => setMenuOpen(false)}>Notícias</NavLink>
                <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="quem-somos" to="/quemsomos" onNavigate={() => setMenuOpen(false)}>Quem somos</NavLink>
                <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="ecossistema" onNavigate={() => setMenuOpen(false)}>Ecossistema</NavLink>
                <NavLink className="flex w-full items-center rounded-xl px-4 py-3 bg-white/10 border border-white/15 text-white hover:bg-white/15" targetId="para-quem" onNavigate={() => setMenuOpen(false)}>Para Quem</NavLink>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer para header absoluto */}
      <div className="pt-24 sm:pt-28" />

      <Container className="h-full">
        <div className="mt-2 md:mt-6 grid items-start gap-8 lg:grid-cols-2">
          {/* Imagem à esquerda */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
              <video
                src={aboutVideo}
                className="block w-full h-auto"
                autoPlay
                muted
                playsInline
                controls={false}
              />
            </div>
          </div>
          {/* Texto à direita */}
          <div className="lg:pl-6">
            <p className="text-pretty text-white/90">
              A Piauí Gov Tech é uma associação civil sem fins lucrativos, caracterizada como Instituição
              Científica, Tecnológica e de Inovação (ICT) privada, criada para promover e gerir o ecossistema
              de inovação piauiense voltado aos setores governamentais. Regida por Estatuto próprio, sua missão é
              impulsionar pesquisa, desenvolvimento tecnológico e inovação para melhorar políticas e serviços
              públicos, conectando governo, ICTs e NITs, universidades, empresas e sociedade. Atua por meio de
              cooperação com instituições de pesquisa, financiamento e execução de projetos de PD&I (inclusive
              pré-competitivos), estruturação de NITs, programas de Governo Aberto e fortalecimento da Rede
              Piauiense de Inovação em Governo, além de capacitações, missões técnicas e difusão de conhecimento.
              Para viabilizar impacto em escala, a Piauí Gov Tech, como Organização Social, está apta a celebrar
              contratos de gestão, convênios e acordos de cooperação para executar programas e projetos de
              inovação de interesse público.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
