import Container from "../components/Container";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";

export default function Cursos() {
  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      <Container className="pt-24 sm:pt-28 pb-8 md:pb-12">
        <div className="text-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Capacitações e conteúdos para transformar o setor público
          </h1>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-white/10">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-white/80">
                {c.description}
              </p>
              <div className="mt-4">
                {c.slug ? (
                  <Link
                    to={`/cursos/${c.slug}`}
                    className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-[#0c2235] hover:bg-brand-600 transition-colors cursor-pointer"
                  >
                    Saiba mais
                  </Link>
                ) : (
                  <button
                    className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-[#0c2235] opacity-60 cursor-not-allowed"
                    disabled
                  >
                    Em breve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
