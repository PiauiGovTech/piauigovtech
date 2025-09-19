import { useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import videoHeroSection from "../assets/video/videoherosection.mp4";
import heroPoster from "../assets/img/hero.jpg";
import group2 from "../assets/img/Group-2.png";
import { scrollToSection } from "../utils/scrollToSection";
import NoticiasSection from "./NoticiasSection";
import Ecossistema from "./Ecossistema";
import ParaQuem from "./ParaQuem";
import Parceiros from "./Parceiros";
import ChatLoginPopover from "../components/ChatLoginPopover";
import ChatWidget from "../components/ChatWidget";
import { supabase } from "../lib/supabaseClient";
 


export default function Home() {

  const location = useLocation();
  const navigationType = useNavigationType();
  const [showLogin, setShowLogin] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [canShowChatButton, setCanShowChatButton] = useState(false);
  

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    // Só rola para a âncora quando a navegação for via clique (PUSH)
    if (navigationType !== "PUSH") return;
    const id = hash.replace("#", "");
    // timeout to ensure sections are rendered
    setTimeout(() => scrollToSection(id), 0);
  }, [location.hash, navigationType]);

  useEffect(() => {
    if (showLogin) {
      const t = setTimeout(() => setPopoverOpen(true), 10);
      return () => clearTimeout(t);
    } else {
      setPopoverOpen(false);
    }
  }, [showLogin]);

  // Mostra o botão apenas no domínio permitido
  useEffect(() => {
    try {
      const allowed = (import.meta.env.VITE_CHAT_BUTTON_ORIGIN as string) || 'https://piauigovtech-kkk.vercel.app';
      const norm = (u: string) => (u || '').replace(/\/$/, '');
      const current = norm(window.location.origin);
      const host = window.location.hostname;
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1';
      setCanShowChatButton(isLocal || current === norm(allowed));
    } catch {
      setCanShowChatButton(false);
    }
  }, []);

  return (
    <div className="relative">
      {/* Hero - layout novo com conteúdo antigo */}
      <div className="bg-[#0B1636]">
        
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
              {/* Vídeo à direita (substitui as 5 imagens) */}
              <div className="mt-8 sm:mt-12 lg:mt-0 w-full lg:flex-1">
                <div className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
                  <video
                    src={videoHeroSection}
                    poster={heroPoster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full object-cover object-[center_30%]"
                    style={{ aspectRatio: '16 / 8' }}
                  >
                    Seu navegador não suporta vídeo HTML5.
                  </video>
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 ring-inset" />
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
      <Ecossistema />
      <ParaQuem />

      <div id="parceiros">
        <Parceiros />
      </div>

      {/* <div id="projetos">
        <Projetos />
      </div> */}

      {/* Botão flutuante de acesso ao chat + tooltip */}
      {canShowChatButton && !showLogin && !showChat && (
        <button
          type="button"
          onClick={async () => {
            try {
              const { data } = await supabase.auth.getSession();
              if (data.session) {
                setShowChat(true);
                return;
              }
            } catch {}
            setShowLogin(true)
          }}
          aria-label="Abrir chat"
          className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center h-14 w-14 rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-md shadow-lg shadow-black/30 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/20 cursor-pointer"
        >
          {/* Ícone de balão de chat */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path fillRule="evenodd" d="M4.5 5.25A2.25 2.25 0 016.75 3h10.5A2.25 2.25 0 0119.5 5.25v8.25A2.25 2.25 0 0117.25 15.75H9.31l-3.23 2.585A1.125 1.125 0 014.5 17.4V5.25zm3 3a.75.75 0 100 1.5h9a.75.75 0 000-1.5h-9zm0 3a.75.75 0 100 1.5h6a.75.75 0 000-1.5h-6z"/>
          </svg>
        </button>
      )}

      {showLogin && (
        <ChatLoginPopover
          open={popoverOpen}
          onClose={() => {
            setPopoverOpen(false)
            setTimeout(() => setShowLogin(false), 200)
          }}
          onSuccess={() => {
            setShowChat(true)
          }}
        />
      )}

      {/* Widget de chat flutuante */}
      <ChatWidget open={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
}
