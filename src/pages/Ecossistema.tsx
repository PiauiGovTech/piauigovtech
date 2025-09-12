import Container from "../components/Container";
import { useEffect, useRef, useState } from "react";
import frame0 from "../assets/img/Frame-2147234200.svg";
import frame1 from "../assets/img/Frame-2147234201.svg";
import frame2 from "../assets/img/Frame-2147234202.svg";
import banner from "../assets/img/ecossistemaPGT.png";

type Stakeholder = {
  label: string;
  icon: JSX.Element;
};

const STAKEHOLDERS: Stakeholder[] = [
  {
    label: "Governo",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M6 20h12M18 20V7a2 2 0 00-2-2H8a2 2 0 00-2 2v13M3 20v-6a2 2 0 012-2h3M21 20v-6a2 2 0 00-2-2h-3" />
      </svg>
    ),
  },
  {
    label: "ICTs/NITs & Universidades",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4-8 4-8-4 8-4z" />
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M4 10v4c0 2.8 8 2.8 8 2.8s8 0 8-2.8v-4" />
      </svg>
    ),
  },
  {
    label: "Empresas & Startups",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 20h18M6 20V8a2 2 0 012-2h3v14M18 20V6a2 2 0 00-2-2h-3v16" />
      </svg>
    ),
  },
  {
    label: "Fundações de Apoio",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 21s8-4.5 8-10a5 5 0 00-9-3 5 5 0 00-9 3c0 5.5 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: "Órgãos de Controle",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 22c4.418 0 8-3.582 8-8V7l-8-4-8 4v7c0 4.418 3.582 8 8 8z" />
      </svg>
    ),
  },
  {
    label: "Agências de Fomento",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M4 7h16M6 13h12M8 19h8" />
      </svg>
    ),
  },
  {
    label: "Sociedade",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
        <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M6 22v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
];

const STEPS: string[] = [
  "Demanda",
  "Triagem",
  "Dados",
  "Hipóteses",
  "Co-criação",
  "Protótipo",
  "Teste & Implementação",
];

const STEP_MESSAGES: string[] = [
  "A jornada parte de uma demanda concreta.",
  "Avança pela triagem.",
  "Levantamento de dados.",
  "Formulação de hipóteses.",
  "Co-criação de soluções.",
  "Prototipagem em ambiente real.",
  "Teste e implementação com mensuração de resultados.",
];

export default function Ecossistema() {
  const [activeStep, setActiveStep] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const stepsRef = useRef<HTMLDivElement | null>(null);

  // Detecta quando a área dos steps entra na viewport
  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        setInView(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-ciclo quando visível e sem hover
  useEffect(() => {
    if (!inView || hovering) return;
    const id = setInterval(() => {
      setActiveStep((p) => (p + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(id);
  }, [inView, hovering]);
  return (
    <section className="relative min-h-screen flex flex-col">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      <Container>
        {/* Cabeçalho no topo (estilo similar ao "Para quem") */}
        <div className="text-center mt-6 sm:mt-8">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/70">Ecossistema</div>
        </div>

        {/* Texto à esquerda + Hero à direita */}
        <div className="mt-8 md:mt-12 grid gap-10 lg:grid-cols-2 items-center min-h-[28rem] md:min-h-[32rem]">
          {/* Coluna esquerda: texto */}
          <div className="max-w-2xl">
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl text-center">
              O Piauí que {" "}
              <span className="bg-gradient-to-r from-[#5dd0df] to-cyan-600 bg-clip-text text-transparent">inova</span>
              {" "}no setor público.
            </h2>
            <p className="mt-4 text-pretty text-white/80">
              Mobilizamos governos, ICTs/NITs, universidades, empresas,
              fundações de apoio, órgãos de controle, agências de fomento e sociedade para o desenvolvimento de soluções tecnológicas
              que tornem a gestão pública mais eficiente e próxima da sociedade.
            </p>
          </div>

          {/* Coluna direita: hero visual */}
          <div className="relative mx-auto w-full max-full">
            <div className="relative h-96 sm:h-[30rem] lg:h-[30rem]">
              {/* banner de fundo */}
              <img
                src={banner}
                alt="Inovação em governo"
                className="absolute inset-0 h-full w-full rounded-2xl object-contain sm:object-cover"
              />

            </div>
          </div>

        </div>

        {/* Fluxo de etapas */}
        {/* <div className="mt-14">
          <h3 className="text-center text-xl font-semibold text-gray-900">Como funciona</h3>
          <div ref={stepsRef} className="mt-6 overflow-x-auto md:overflow-visible px-6 py-6">
            <ol className="min-w-[720px] sm:min-w-[900px] md:min-w-0 grid grid-cols-7 gap-6 pt-16 pb-2">
              {STEPS.map((step, idx) => (
                <li
                  key={step}
                  className="relative"
                  onMouseEnter={() => {
                    setHovering(true);
                    setActiveStep(idx);
                  }}
                  onMouseLeave={() => setHovering(false)}
                >
                  {idx < STEPS.length - 1 && (
                    <div className="pointer-events-none absolute left-[calc(50%+36px)] right-[calc(-50%+36px)] top-6 h-[2px] bg-gradient-to-r from-brand-400/90 via-brand-300/50 to-brand-300/0 z-0" />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div
                      className={`absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-20 min-w-[180px] max-w-[240px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px] text-center text-pretty leading-snug rounded-xl p-[1.5px] bg-[linear-gradient(180deg,rgba(45,220,255,0.85)_0%,rgba(0,219,255,0.25)_100%)] shadow-[0_2px_12px_rgba(0,219,255,0.25)] backdrop-blur-sm transition-all duration-200 ${
                        activeStep === idx ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
                      }`}
                    >
                      <span className="block rounded-[10px] bg-white/95 px-3 py-2 text-[12px] font-semibold tracking-wide bg-gradient-to-r from-[rgb(22,28,50)] to-brand-700 bg-clip-text text-transparent">
                        {STEP_MESSAGES[idx]}
                      </span>
                      <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-white border-l border-t border-brand-300/70 shadow-sm" />
                    </div>
       
                    <div className="relative shrink-0 p-[2px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(45,220,255,0.95)_0%,_rgba(0,219,255,0.45)_55%,_rgba(0,219,255,0.12)_100%)] shadow-[0_2px_10px_rgba(0,219,255,0.25)] transition-transform duration-150 hover:-translate-y-0.5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-800 text-base font-semibold">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="mt-3 text-sm font-semibold max-w-[140px] bg-gradient-to-r from-[rgb(22,28,50)] to-brand-700 bg-clip-text text-transparent">
                      {step}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div> */}
      </Container>
    </section>
  );
}
