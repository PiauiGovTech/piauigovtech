import Container from "../components/Container";

export default function Noticias() {
  return (
    <section className="py-16 md:py-24 bg-white h-[calc(100vh)]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Notícias
          </h2>
          <p className="mt-3 text-gray-600">
            Acompanhe as últimas novidades, publicações e destaques da piauígovtech.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="text-xs font-medium text-brand-600">Destaque</div>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900">
                Título de exemplo da notícia {item}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                Este é um texto de demonstração para a seção de notícias. Substitua por conteúdo real quando disponível.
              </p>
              <div className="mt-4 text-sm text-gray-500">12 set 2025</div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


