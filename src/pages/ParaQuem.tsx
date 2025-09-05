import Container from "../components/Container";
import smartphone from "../assets/img/smartphone.jpg";
import groupIcon from "../assets/img/Group.png";
import { useState } from "react";

type TabKey = "academicos" | "empresas" | "governo";

function IconAcademicos(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M22.6667 11.334V14.0007"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M19.556 12.8887V16.562C19.556 16.9993 19.348 17.4073 18.988 17.6567C18.3853 18.0727 17.3386 18.622 16.008 18.622C14.6773 18.622 13.624 18.0713 13.0173 17.6567C12.6546 17.4087 12.4453 16.9993 12.4453 16.5593V12.8887"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.572 22.6667H7.428C5.53467 22.6667 4 21.132 4 19.2387V7.428C4 5.53467 5.53467 4 7.428 4H24.5707C26.4653 4 28 5.53467 28 7.428V19.2373C28 21.132 26.4653 22.6667 24.572 22.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18.6667 22.666L19.3334 27.9993"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13.3334 22.666L12.6667 27.9993"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M10.8534 28.0007H21.1467"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.33337 11.3333L16 14.6667L22.6667 11.3333L16 8L9.33337 11.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function IconGoverno(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M22.6666 28V5.33333C22.6666 4.59733 22.0693 4 21.3333 4H10.6666C9.93065 4 9.33331 4.59733 9.33331 5.33333V28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M9.33329 12H3.99996C3.26396 12 2.66663 12.5973 2.66663 13.3333V28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M29.3333 28V13.3333C29.3333 12.5973 28.736 12 28 12H22.6666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12.6666 22.6667H19.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M18 22.6667V28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14 28V22.6667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13.3333 14H18.6666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13.3333 18H18.6666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13.3333 10H18.6666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6.66663 18H9.33329"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6.66663 22.6667H9.33329"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M22.6666 18H25.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M22.6666 22.6667H25.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M30.6666 28H1.33331"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function IconEmpresas(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M5.08936 21.0007H7.11202C7.58402 21.0007 8.03602 20.814 8.36936 20.4807V20.4807C8.70269 20.1473 8.88935 19.6953 8.88935 19.2233V12.1113C8.88935 11.6393 8.70269 11.1873 8.36936 10.854V10.854C8.03602 10.5207 7.58402 10.334 7.11202 10.334H5.42002"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M26.5801 10.334H24.8894C24.4174 10.334 23.9654 10.5207 23.6321 10.854V10.854C23.2987 11.1873 23.1121 11.6393 23.1121 12.1113V19.2233C23.1121 19.6953 23.2987 20.1473 23.6321 20.4807V20.4807C23.9654 20.814 24.4174 21.0007 24.8894 21.0007H26.9121"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M23.1387 19.5293H21.992C21.6107 19.5293 21.2333 19.6106 20.8867 19.7693L15.2773 22.324"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M14.1933 11.5572C13.5213 11.1666 12.7093 11.0692 11.9599 11.3386L8.88928 12.4439"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M23.3254 11.2477L19.4907 9.55971C18.6694 9.19838 17.7201 9.27438 16.9667 9.76238L13.4867 12.017C12.3801 12.733 12.2534 14.3037 13.2294 15.189V15.189C13.8281 15.7317 14.6947 15.8624 15.4267 15.521L17.5014 14.553"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M17.5013 14.5527L18.5546 15.5087C19.7186 16.5634 19.7226 18.3901 18.5653 19.4514L15.876 21.9127C14.8613 22.8434 13.304 22.8461 12.2853 21.9221L10.4373 20.2461C9.99997 19.8501 9.44263 19.6274 8.8573 19.5794"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

const CONTENT: Record<
  TabKey,
  { heading: string; description: string; benefits: string[] }
> = {
  academicos: {
    heading: "Estudantes",
    description:
      "Pesquisa com propósito. Conecte seu conhecimento a problemas reais.",
    benefits: [
      "Desenvolva soluções para desafios públicos",
      "Acesse infraestrutura de supercomputação para desenvolvimento de soluções",
      "Acesse capacitações voltadas para inovação aplicada",
    ],
  },
  empresas: {
    heading: "Empresas e Startups",
    description:
      "Conecte sua empresa ao ecossistema que está transformando a gestão pública com tecnologia e colaboração aberta",
    benefits: [
      "Participe de programas de mentoria e aceleração voltados para desafios públicos reais",
      "Conecte-se com parceiros para co-criar soluções escaláveis e de impacto social",
      "Acesse capacitações voltadas para inovação aplicada",
    ],
  },
  governo: {
    heading: "Governo",
    description:
      "Modernize seus serviços e promova impacto social ao propor desafios que conectam governo, academia e setor privado",
    benefits: [
      "Proponha desafios públicos para que pesquisadores, startups e empresas.",
      "Implemente soluções desenvolvidas pelo ecossistema PI GOV TECH",
      "Participe de capacitações para fortalecer a cultura de inovação e a governança digital",
    ],
  },
};

export default function ParaQuem() {
  const [active, setActive] = useState<TabKey>("academicos");
  return (
    <section
      className="relative h-[calc(100vh)] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${smartphone})` }}
    >
      {/* Escurecimento geral da cena para legibilidade */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#06122b]/80" />
      {/* Fade branco nas bordas superior/inferior + brilhos ciano sutis */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 6%, rgba(255,255,255,0) 94%, rgba(255,255,255,1) 100%), radial-gradient(60% 50% at 8% 12%, rgba(79,208,223,0.2), transparent), radial-gradient(55% 45% at 92% 18%, rgba(79,208,223,0.16), transparent)",
        }}
      />

      <Container className="h-full py-8 md:py-10 flex flex-col">
        {/* Cabeçalho */}
        <div className="text-center text-white shrink-0">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Para quem
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
            Integre o ecossistema
          </h1>
          <p className="mt-3 text-white/80">
            Descubra como você pode integrar a iniciativa de acordo seu perfil
          </p>
        </div>

        {/* Painéis */}
        <div className="flex-1 flex items-center">
          <div className="mt-8 md:mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] w-full">
            {/* Menu à esquerda */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 p-2 text-white backdrop-blur">
              <ul
                className="grid"
                role="tablist"
                aria-label="Perfis do ecossistema"
              >
                {(
                  [
                    { key: "academicos", label: "Acadêmicos" },
                    { key: "empresas", label: "Empresas e Startups" },
                    { key: "governo", label: "Governo" },
                  ] as { key: TabKey; label: string }[]
                ).map((t, idx) => {
                  const selected = active === t.key;
                  return (
                    <li
                      key={t.key}
                      className={`relative overflow-hidden rounded-xl ${
                        idx !== 0 ? "mt-1" : ""
                      }`}
                    >
                      {/* marcador lateral ciano */}
                      <span
                        className={`absolute left-0 top-3 bottom-3 w-1.5 rounded-full bg-brand-400 transition-opacity ${
                          selected ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <button
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActive(t.key)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left transition ${
                          selected ? "bg-white/5" : "hover:bg-white/5"
                        }`}
                      >
                        {/* ícones por item */}
                        {t.key === "academicos" && (
                          <IconAcademicos
                            className={`size-6 ${
                              selected ? "text-brand-300" : "text-white/70"
                            }`}
                          />
                        )}
                        {t.key === "empresas" && (
                          <IconEmpresas
                            className={`size-6 ${
                              selected ? "text-brand-300" : "text-white/70"
                            }`}
                          />
                        )}
                        {t.key === "governo" && (
                          <IconGoverno
                            className={`size-6 ${
                              selected ? "text-brand-300" : "text-white/70"
                            }`}
                          />
                        )}
                        <span
                          className={
                            selected ? "text-base font-medium" : "text-white/85"
                          }
                        >
                          {t.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Detalhes à direita */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white backdrop-blur md:p-8">
              <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1.6fr]">
                {/* Coluna principal */}
                <div className="flex flex-col items-center text-center">
                  {/* Ícone Group.png deve aparecer em todas as abas */}
                  <img
                    src={groupIcon}
                    alt=""
                    className="h-14 w-14 object-contain"
                  />
                  <div className="mt-3 text-xl font-semibold">
                    {CONTENT[active].heading}
                  </div>
                  <p className="mt-2 max-w-sm text-white/80">
                    {CONTENT[active].description}
                  </p>
                </div>
                {/* Divisor vertical */}
                <div className="hidden md:block h-full w-px bg-white/10" />

                {/* Lista de benefícios */}
                <ul className="space-y-5">
                  {CONTENT[active].benefits.map((t) => (
                    <li
                      key={t}
                      className="flex items-center justify-between gap-4 text-white"
                    >
                      <span className="text-white/90">{t}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 text-white/70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.97 3.97a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06L17.94 11H4.5a.75.75 0 010-1.5h13.44l-4.47-4.47a.75.75 0 010-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
