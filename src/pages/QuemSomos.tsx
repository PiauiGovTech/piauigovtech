import Container from "../components/Container";
import aboutVideo from "../assets/video/animacaoLogoFundoBranco.mp4";

export default function QuemSomos() {
  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      {/* Espaço para o header absoluto global */}
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
                loop
                muted
                playsInline
                controls={false}
              />
            </div>
          </div>
          {/* Texto à direita */}
          <div className="lg:pl-6 space-y-4">
            <p className="text-pretty text-white/90 italic">
              A Piauí Gov Tech é Instituição Científica, Tecnológica e de
              Inovação (ICT) privada sem fins lucrativos, criada para promover e gerir ecossistemas
              de inovação voltados aos setores governamentais.
            </p>

            <p className="text-pretty text-white/90 italic">
              Regida por Estatuto próprio, sua missão é impulsionar pesquisa,
              desenvolvimento tecnológico e inovação para melhorar políticas e
              serviços públicos, conectando governo, ICTs e NITs, universidades,
              empresas e sociedade.
            </p>

            <p className="text-pretty text-white/90 italic">
              Atua por meio de cooperação com instituições de pesquisa,
              financiamento e execução de projetos de PD&I (inclusive
              pré-competitivos), estruturação de NITs, programas de Governo
              Aberto e fortalecimento da Rede Piauiense de Inovação em Governo,
              além de capacitações, missões técnicas e difusão de conhecimento.
              Para viabilizar impacto em escala, a Piauí Gov Tech, como
              Organização Social, está apta a celebrar contratos de gestão,
              convênios e acordos de cooperação para executar programas e
              projetos de inovação de interesse público.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

