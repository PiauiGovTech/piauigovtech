import Container from "../components/Container";

export default function Ecossistema() {
  return (
    <section className="relative h-[calc(100vh)] flex flex-col bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff3f8_50%,_#e9edf3_100%),radial-gradient(80%_60%_at_20%_25%,_rgba(255,255,255,0.95)_0%,_rgba(248,250,252,0.9)_35%,_transparent_70%),radial-gradient(70%_55%_at_80%_20%,_rgba(255,255,255,0.9)_0%,_rgba(240,243,248,0.85)_40%,_transparent_70%)] py-20">
      {/* Brilho radial sutil igual ao de Notícias */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_50%,_transparent_62%,_rgba(0,0,0,0.03)_100%)]" />
      <Container className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Ecossistema
            </h1>
            <p className="mt-5 text-pretty text-gray-600">
              O ecossistema Piauí Gov Tech é a rede que mobiliza governo,
              ICTs/NITs e universidades, empresas, fundações de apoio, órgãos de
              controle, agências de fomento e sociedade para estudar e resolver
              problemas públicos. Começa com uma demanda concreta: alguém
              apresenta um problema. A rede faz a triagem, levanta dados,
              entende o contexto e formula hipóteses. Pesquisadores e técnicos
              desenham a solução junto de quem usa o serviço. Constrói-se um
              protótipo e testa-se em ambiente real, acompanhando tempo, custo,
              qualidade e satisfação do usuário. O que gera resultado é
              implementado e documentado; o que não funciona é ajustado ou
              descartado.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
