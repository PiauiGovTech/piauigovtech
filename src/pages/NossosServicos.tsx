import Container from '../components/Container'

const services = [
  {
    title: 'Desenvolvemos soluções tecnológicas para serviços públicos',
    description:
      'Sistemas digitais, plataformas integradas e ferramentas inovadoras que facilitam a vida do cidadão e aumentam a eficiência da gestão.',
  },
  {
    title: 'Criamos e aplicamos inteligência em dados',
    description:
      'Organizamos, analisamos e transformamos informações em conhecimento para orientar políticas públicas e melhorar decisões.',
  },
  {
    title: 'Projetamos produtos inovadores em áreas estratégicas como: saúde, segurança e educação.',
    description: 'Sempre com foco no impacto social.',
  },
  {
    title: 'Promovemos a inovação aberta',
    description:
      'Organizamos desafios, editais, testes de tecnologia e ambientes de experimentação para que novas ideias possam ser validadas junto ao setor público.',
  },
  {
    title: 'Gestão do ecossistema de inovação',
    description:
      'Fortalecemos redes, conectamos atores, apoiamos Núcleos de Inovação Tecnológica, capacitamos pessoas e articulamos parcerias locais, nacionais e internacionais.',
  },
  {
    title: 'Apoiamos governos em políticas e projetos estratégicos',
    description:
      'Desde o desenho de programas até a execução de soluções tecnológicas, atuando como parceiro técnico confiável.',
  },
]

export default function NossosServicos() {
  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      <div className="pt-24 sm:pt-28" />

      <Container className="pb-24">
        <div className="max-w-full text-center">
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl text-center">Impacto em escala para o setor público</h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
            Atuamos em toda a jornada de inovação governamental, combinando tecnologia, dados e colaboração com
            equipes do setor público para gerar resultados concretos para a sociedade.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-md"
            >
              <h2 className="flex items-start gap-2 text-lg font-semibold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 h-5 w-5 text-brand-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0l-3.25-3.25a.75.75 0 111.06-1.06L8.75 11.69l6.72-6.72a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{service.title}</span>
              </h2>
              <p className="text-sm text-white/80">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
