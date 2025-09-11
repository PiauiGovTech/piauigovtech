import { Link, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";
import hero from "../assets/img/hero.jpg";
import imgHero1 from "../assets/img/imgHero1.jpg";
import imgHero2 from "../assets/img/imgHero2.jpg";
import imgHero3 from "../assets/img/imgHero3.jpg";
import imgHero4 from "../assets/img/imgHero4.jpg";
import imgHero5 from "../assets/img/imgHero5.jpg";
import group2 from "../assets/img/Group-2.png";
import { scrollToSection } from "../utils/scrollToSection";
import NoticiasSection from "./NoticiasSection";
import Ecossistema from "./Ecossistema";
import ParaQuem from "./ParaQuem";
import Projetos from "./Projetos";
import Parceiros from "./Parceiros";
import Logo from "../components/Logo";
import NavLink from "../components/NavLink";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default function Home() {

  const location = useLocation();
  const navigationType = useNavigationType();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    // Só rola para a âncora quando a navegação for via clique (PUSH)
    if (navigationType !== "PUSH") return;
    const id = hash.replace("#", "");
    // timeout to ensure sections are rendered
    setTimeout(() => scrollToSection(id), 0);
  }, [location.hash, navigationType]);

  return (
    <div className="relative">
      {/* Hero - layout novo com conteúdo antigo */}
      <div className="bg-[#0B1636]">
        {/* Header do modelo com conteúdo antigo */}
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
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                <div className="flex items-center justify-between">
                  <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMenuOpen(false)}>
                    <span className="sr-only">Piauí Gov Tech</span>
                    <Logo className="h-8 w-auto text-white/90" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-200"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 space-y-2">
                  <NavLink targetId="inicio" onNavigate={() => setMenuOpen(false)}>Início</NavLink>
                  <NavLink targetId="noticias" to="/noticias" onNavigate={() => setMenuOpen(false)}>Notícias</NavLink>
                  <NavLink targetId="quem-somos" to="/quemsomos" onNavigate={() => setMenuOpen(false)}>Quem somos</NavLink>
                  <NavLink targetId="ecossistema" onNavigate={() => setMenuOpen(false)}>Ecossistema</NavLink>
                  <NavLink targetId="para-quem" onNavigate={() => setMenuOpen(false)}>Para Quem</NavLink>
                </div>
              </div>
            </div>
          )}
        </header>
        <section id="inicio" className="relative isolate overflow-hidden pt-24 sm:pt-28 pb-12 lg:h-screen lg:flex lg:items-center">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-white to-white opacity-15 sm:left-[calc(50%-30rem)] sm:w-288.75"
            />
          </div>
          {/* Imagem decorativa ao fundo (direita) */}
          <img
            src={group2}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden lg:block h-full w-auto object-contain opacity-60"
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full relative z-[1]">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center w-full">
              {/* Texto à esquerda */}
              <div className="relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                  Inovação, Tecnologia e Inclusão
                </h1>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:max-w-md sm:text-xl/8 lg:max-w-none">
                  Somos uma Instituição Científica, Tecnológica e de Inovação - ICT com a missão de promover pesquisa,
                  desenvolvimento tecnológico e inovação para o setor público.
                </p>
              </div>
              {/* Imagens à direita - mobile (4 fotos em diagonal) */}
              <div className="mt-8 flex justify-evenly sm:hidden">
                <div className="w-36 space-y-4">
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero1}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero3}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                </div>
                <div className="w-36 space-y-4 pt-8">
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero2}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero4}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                </div>
              </div>

              {/* Imagens à direita - tablets/desktop (layout completo) */}
              <div className="mt-8 hidden sm:flex justify-center gap-8 sm:gap-10 sm:mt-12 lg:justify-start lg:gap-14 lg:mt-0">
                <div className="ml-auto w-28 sm:w-32 lg:w-36 flex-none space-y-8 sm:space-y-10 pt-2 sm:pt-10 lg:order-last lg:pt-24 xl:order-0 xl:pt-36">
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero1}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover object-[80%_center] shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                </div>
                <div className="mr-auto w-28 sm:w-32 lg:w-36 flex-none space-y-8 sm:space-y-10 sm:mr-0 sm:pt-12 lg:pt-16">
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero2}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover object-[40%_center] shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero3}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                </div>
                <div className="w-28 sm:w-32 lg:w-36 flex-none space-y-8 sm:space-y-10 pt-2 sm:pt-6 lg:pt-8">
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero4}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover object-[25%_center] shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                  <div className="relative">
                    <img
                      alt=""
                      src={imgHero5}
                      loading="lazy"
                      decoding="async"
                      className="aspect-2/3 w-full rounded-xl bg-gray-700/5 object-cover shadow-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-white to-white opacity-10 sm:left-[calc(50%+36rem)] sm:w-288.75"
            />
          </div>
          {/* Marca d'água responsiva no canto inferior direito */}
          {/* <div className="pointer-events-none absolute bottom-4 right-2 select-none hidden lg:block lg:bottom-6 lg:right-4">
            <div className="text-5xl xl:text-7xl 2xl:text-8xl font-bold text-white/90 drop-shadow-md">
              piauí<span className="text-gray-300 font-light">gov</span>
              tech
            </div>
          </div> */}
        </section>
      </div>

      <NoticiasSection />
      


      <div id="ecossistema">
        <Ecossistema />
      </div>

      <div id="para-quem">
        <ParaQuem />
      </div>

      <div id="parceiros">
        <Parceiros />
      </div>

      {/* <div id="projetos">
        <Projetos />
      </div> */}
    </div>
  );
}
