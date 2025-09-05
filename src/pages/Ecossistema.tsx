import Container from '../components/Container'

const OBJETIVOS = [
  { title: 'Articulação', desc: 'Conectar entidades públicas e privadas que apoiam empreendimentos inovadores.' },
  { title: 'Cultura e P&D', desc: 'Incentivar empreendedorismo, inovação tecnológica e pesquisa aplicada no Piauí.' },
  { title: 'Financiamento', desc: 'Financiar PD&I (incluindo fase pré‑competitiva), compartilhando riscos.' },
  { title: 'Representação', desc: 'Representar o ecossistema em fóruns regionais, nacionais e internacionais.' },
  { title: 'NITs e Governo Aberto', desc: 'Estruturar NITs, programas de Governo Aberto e fortalecer a Rede.' },
  { title: 'Conexões', desc: 'Conectar ensino, governo, setor produtivo e sociedade.' },
  { title: 'Políticas Públicas', desc: 'Propor políticas, programas e ações de CT&I e inovação.' },
  { title: 'Capacitação', desc: 'Treinar recursos humanos para o ecossistema piauiense.' },
]

const ATIVIDADES = [
  'Apoio institucional e cooperação nacional/internacional.',
  'Atuação junto a autoridades por políticas de incentivo.',
  'Captação de recursos em instituições de fomento.',
  'Intercâmbio entre associados e redes congêneres.',
  'Participação em fóruns, conselhos e GTs.',
  'Convênios e parcerias público‑privadas.',
  'Evento Estadual do Ecossistema.',
  'Cursos, oficinas e seminários (presencial e online).',
  'Coordenação de redes locais, regionais e estadual.',
  'Mobilidade e internacionalização de projetos.',
]

export default function Ecossistema() {
  return (
    <section className="relative py-20">
      {/* Gradiente: topo branco -> leve ciano no miolo -> base branca (borda inferior branca para unir com Para Quem) + brilho radial */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, #ffffff 0%, rgba(0,219,255,0.08) 70%, rgba(0,219,255,0.06) 85%, #ffffff 100%), radial-gradient(120% 70% at 50% -20%, rgba(0,0,0,0.04), transparent)'
        }}
      />
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs uppercase tracking-widest text-gray-500">Ecossistema</div>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Objetivos e formas de atuação
          </h1>
          <p className="mt-5 text-pretty text-gray-600">
            Uma visão clara, com foco em impacto público e parcerias estratégicas.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="grid divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {OBJETIVOS.map((o) => (
              <div key={o.title} className="p-6">
                <h3 className="text-base font-semibold text-gray-900">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Como atuamos</h2>
          <ul className="mt-4 space-y-3">
            {ATIVIDADES.map((a) => (
              <li key={a} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-1 inline-block size-1.5 rounded-full bg-gray-900" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
