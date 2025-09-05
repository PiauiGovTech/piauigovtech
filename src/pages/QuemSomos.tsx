import Container from '../components/Container'

export default function QuemSomos() {
  return (
    <section className="relative bg-brand-50 py-20 h-[calc(50vh)] flex flex-col">
      {/* Gradiente: topo cinza claro -> base branco + brilho radial sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(238,241,246,0.20) 0%, #ffffff 100%), radial-gradient(60% 50% at 8% 8%, rgba(93,208,223,0.12), transparent), radial-gradient(55% 45% at 92% 12%, rgba(93,208,223,0.10), transparent), radial-gradient(90% 60% at 50% -10%, rgba(0,0,0,0.04), transparent)'
        }}
      />
      <Container className="h-full flex flex-col">
        <div className="mx-auto max-w-3xl text-center">
          {/* <div className="text-xs uppercase tracking-widest text-gray-500">Instituição Científica, Tecnológica e de Inovação</div> */}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Quem somos
            </h1>
            <p className="mt-5 text-pretty text-gray-600">
              Somos uma ICT (Instituição de Ciência, Tecnologia e Inovação) com Núcleo de Inovação Tecnológica (NIT). Transformamos pesquisa em soluções que simplificam serviços públicos.
              Reunimos especialistas para diagnosticar problemas, desenhar e testar tecnologias (provas de conceito, protótipos e pilotos) e escalar o que funciona com nossos parceiros.
            </p>
          </div>
        </div>
{/* 
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{
            title: 'Natureza Jurídica',
            desc: 'Associação civil, sem fins lucrativos e de direito privado (Código Civil). ICT privada (Lei 10.973/2004).',
          },{
            title: 'Missão',
            desc: 'Gerar valor público por meio de pesquisa, desenvolvimento tecnológico e inovação.',
          },{
            title: 'Duração',
            desc: 'Prazo indeterminado.',
          },{
            title: 'Sede e Foro',
            desc: 'Rua Clodoaldo Freitas, 729, Centro, Teresina/PI – CEP 64000‑360.',
          },{
            title: 'Princípios',
            desc: 'Legalidade, impessoalidade, moralidade, economicidade, eficiência e publicidade.',
          },{
            title: 'Atuação',
            desc: 'Fomento ao ecossistema, financiamento de PD&amp;I, capacitação e cooperação multissetorial.',
          }].map((f) => (
            <article key={f.title} className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300">
              <h2 className="text-base font-semibold text-gray-900">{f.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </article>
          ))}
        </div> */}
      </Container>
    </section>
  )
}
