import Container from "../components/Container";

export default function Ecossistema() {
  return (
    <section className="relative bg-brand-100 py-20 h-[calc(100vh)] flex flex-col">
      {/* Gradiente: topo branco -> leve cinza no miolo -> base branca (borda inferior branca para unir com Para Quem) + brilho radial */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #ffffff 0%, rgba(238,241,246,0.20) 70%, rgba(238,241,246,0.16) 85%, #ffffff 100%), radial-gradient(60% 50% at 6% 10%, rgba(93,208,223,0.10), transparent), radial-gradient(55% 45% at 94% 16%, rgba(93,208,223,0.08), transparent), radial-gradient(120% 70% at 50% -20%, rgba(0,0,0,0.04), transparent)",
        }}
      />
      <Container className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Ecossistema
            </h1>
            <p className="mt-5 text-pretty text-gray-600">
              Nosso ecossistema conecta governos em diferentes níveis,
              instituições de pesquisa e inovação, empresas e startups e a
              sociedade civil para transformar problemas públicos em desafios
              claros e soluções aplicadas. Promovemos parcerias, lançamos
              chamadas e programas, e mantemos ambientes de teste que reduzem
              riscos e aceleram a passagem da ideia para a implementação.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
