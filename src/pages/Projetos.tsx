import Container from '../components/Container'

const PROJETOS = [
  { name: 'Portal de Serviços', tag: 'Canais Digitais', desc: 'Catálogo unificado e atendimento 100% online.' },
  { name: 'Identidade Gov', tag: 'Acesso e Identidade', desc: 'Login único e autorizações seguras.' },
  { name: 'Painel Analytics', tag: 'Dados e Decisão', desc: 'Métricas para gestão baseada em evidências.' },
  { name: 'Sala do Empreendedor', tag: 'Desburocratização', desc: 'Apoio e formalização facilitada.' },
]

export default function Projetos() {
  return (
    <section className="relative py-20 h-[calc(100vh)]">
      {/* Gradiente: topo branco (limpo) -> base cinza claro + brilho radial sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #ffffff 0%, rgba(238,241,246,0.40) 100%), radial-gradient(60% 50% at 10% 15%, rgba(93,208,223,0.10), transparent), radial-gradient(55% 45% at 90% 20%, rgba(93,208,223,0.08), transparent), radial-gradient(100% 60% at 50% -25%, rgba(0,0,0,0.02), transparent)'
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs uppercase tracking-widest text-gray-500">Portfólio</div>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Projetos e iniciativas
          </h1>
          <p className="mt-5 text-pretty text-gray-600">
            Resultados gerados e frentes em andamento no ecossistema govtech piauiense.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJETOS.map((p) => (
            <article
              key={p.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition will-change-transform hover:-translate-y-0.5 hover:border-gray-300"
            >
              <div className="text-sm text-brand-700">{p.tag}</div>
              <h2 className="mt-1 text-base font-semibold text-gray-900">{p.name}</h2>
              <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
