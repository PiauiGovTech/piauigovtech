import Container from "../components/Container";
import newsHero from "../assets/img/Frame-1410125704-1.png";
import aboutVideo from "../assets/video/animacaoLogoPGT.mp4";

export default function QuemSomos() {
  return (
    <section className="relative bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff3f8_50%,_#e9edf3_100%),radial-gradient(80%_60%_at_20%_25%,_rgba(255,255,255,0.95)_0%,_rgba(248,250,252,0.9)_35%,_transparent_70%),radial-gradient(70%_55%_at_80%_20%,_rgba(255,255,255,0.9)_0%,_rgba(240,243,248,0.85)_40%,_transparent_70%)] min-h-[calc(100dvh-4rem)] pt-6 md:pt-10 pb-20 flex flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_50%,_transparent_62%,_rgba(0,0,0,0.03)_100%)]" />

      {/* Banner superior com imagem e título sobreposto */}
      <div className="relative mx-auto w-[92%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl">
        <img src={newsHero} alt="Banner" className="block w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Quem somos</h1>
          </div>
        </div>
      </div>
      <Container className="h-full">
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Imagem à esquerda */}
          <div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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
            <p className="text-pretty text-gray-700">
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
