import Container from "../components/Container";
import { Link, useLocation, useNavigationType } from "react-router-dom";
import hero from "../assets/img/hero.jpg";
import { useEffect } from "react";
import { scrollToSection } from "../utils/scrollToSection";
import NoticiasSection from "./NoticiasSection";
import Ecossistema from "./Ecossistema";
import ParaQuem from "./ParaQuem";
import Projetos from "./Projetos";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 text-xs text-gray-500">{label}</div>
    </div>
  );
}

export default function Home() {
  // Carrega somente arquivos SVG da pasta assets/img
  const svgModules = import.meta.glob("../assets/img/*.svg", {
    eager: true,
    as: "url",
  }) as Record<string, string>;
  const svgImages = Object.entries(svgModules)
    .map(([path, url]) => ({
      path,
      url,
      name: path.split("/").pop()!.replace(".svg", ""),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const location = useLocation();
  const navigationType = useNavigationType();

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
      {/* BG global da Home: topo transparente → cinza claro */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,rgba(238,241,246,.10)_15%,rgba(238,241,246,.20)_100%)]" />
      {/* Hero */}
      <section
        id="inicio"
        className="relative flex items-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-4rem)] overflow-hidden bg-[#010720] bg-cover bg-center bg-no-repeat bg-[url('../assets/img/hero.jpg')]"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <Container className="py-16 md:py-24 text-white">
          <div className="grid items-center gap-6 md:gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Inovação, Tecnologia e Inclusão
              </h1>
              <p className="mt-4 max-w-prose text-pretty text-white/80">
                Somos uma Instituição Científica, Tecnológica e de Inovação -
                ICT com a missão de promover pesquisa, desenvolvimento
                tecnológico e inovação para o setor público.
              </p>
              {/* <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/programas"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2c97ab] bg-[#5dd0df] px-6 py-3 text-base font-semibold text-[#0c2235]  hover:translate-y-[1px] hover:shadow-[0_3px_0_0_rgba(44,151,171,0.7)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(44,151,171,0.7)]"
                >
                  Conheça os Programas
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L17.94 11H4.5a.75.75 0 010-1.5h13.44l-4.47-4.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div> */}
              {/* <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-xl">
                <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-center shadow-sm">
                  <div className="text-2xl font-semibold text-white">+40</div>
                  <div className="mt-1 text-xs text-white/70">Startups Conectadas</div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-center shadow-sm">
                  <div className="text-2xl font-semibold text-white">+25</div>
                  <div className="mt-1 text-xs text-white/70">Projetos Ativos</div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-center shadow-sm">
                  <div className="text-2xl font-semibold text-white">+30</div>
                  <div className="mt-1 text-xs text-white/70">Municípios Atendidos</div>
                </div>
              </div> */}
            </div>
          </div>
        </Container>
        {/* Marca d'água responsiva no canto inferior direito */}
        <div className="pointer-events-none absolute bottom-4 right-2 select-none hidden lg:block lg:bottom-6 lg:right-4">
          <div className="text-5xl xl:text-7xl 2xl:text-8xl font-bold text-white/90 drop-shadow-md">
            piauí<span className="text-gray-300 font-light">gov</span>
            tech
          </div>
        </div>
      </section>

      <NoticiasSection />
      


      <div id="ecossistema">
        <Ecossistema />
      </div>

      <div id="para-quem">
        <ParaQuem />
      </div>

      {/* <div id="projetos">
        <Projetos />
      </div> */}
    </div>
  );
}
