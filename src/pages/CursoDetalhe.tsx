import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { courses } from "../data/courses";

export default function CursoDetalhe() {
  const { slug = "" } = useParams();
  const course = useMemo(() => courses.find((c) => c.slug === slug), [slug]);

  if (!course) {
    return (
      <section className="relative min-h-screen bg-[#0B1636]">
        <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
        <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
        </div>
        <div className="pt-24 sm:pt-28" />
        <Container className="py-12">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-white/80">
            Curso não encontrado.
          </div>
        </Container>
      </section>
    );
  }

  const d = course.details;

  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      {/* Offset for absolute header */}
      <div className="pt-24 sm:pt-28" />

      <Container className="py-8 md:py-12">
        {/* Hero + Image side by side */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="max-w-3xl lg:max-w-none text-center lg:text-left">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl text-center">
              {course.title}
            </h1>
            {course.description && (
              <p className="mt-4 text-white/80 text-center">{course.description}</p>
            )}
          </div>

          {course.image && (
            <div className="mt-0 lg:mt-0">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <img src={course.image} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          )}
        </div>


        {/* Apple-like layout below hero (paired rows with equal-height cards) */}
        {(d && (d.presentation?.length || d.content?.length || d.objectives?.length || d.hours || d.modality || d.investment || d.includes?.length || d.contact)) ? (
          <div className="mt-12 lg:mt-16">
            <div className="grid gap-10 lg:gap-12 lg:grid-cols-12 items-stretch">
              {/* Row 1: Sobre o curso + Detalhes */}
              {d.presentation?.length ? (
                <div className="lg:col-span-7 flex flex-col">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">Sobre o curso</h2>
                  <div className="mt-4 flex-1">
                    <div className="h-full rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                      <div className="space-y-4">
                        {d.presentation.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {(d.hours || d.modality) ? (
                <div className="lg:col-span-5 flex flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Detalhes do curso</h3>
                  <div className="mt-4 flex-1">
                    <div className="h-full rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                      <div className="space-y-3">
                        {d.hours && (
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-white/80">Carga horária</span>
                            <span className="font-medium text-white">{d.hours}</span>
                          </div>
                        )}
                        {d.modality && (
                          <div className="flex items-start justify-between gap-4">
                            <span className="text-white/80">Modalidade</span>
                            <span className="font-medium text-white">{d.modality}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Row 2: Conteúdo + Investimento */}
              {d.content?.length ? (
                <div className="lg:col-span-7 flex flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Conteúdo Programático</h3>
                  <div className="mt-4 flex-1">
                    <div className="h-full rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                      <ul className="list-disc pl-5 space-y-2">
                        {d.content.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {d.investment ? (
                <div className="lg:col-span-5 flex flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Investimento</h3>
                  <div className="mt-4 flex-1">
                    <div className="h-full rounded-3xl bg-gradient-to-b from-white/10 to-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white backdrop-blur">
                      <div className="text-3xl font-bold leading-tight">{d.investment}</div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Row 3: Objetivos + Inclui */}
              {d.objectives?.length ? (
                <div className="lg:col-span-7 flex flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Objetivos</h3>
                  <div className="mt-4 flex-1">
                    <div className="h-full rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                      <ul className="list-disc pl-5 space-y-2">
                        {d.objectives.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {d.includes?.length ? (
                <div className="lg:col-span-5 flex flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Inclui</h3>
                  <div className="mt-4 flex-1">
                    <div className="h-full rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                      <ul className="list-disc pl-5 space-y-2">
                        {d.includes.map((inc, i) => (
                          <li key={i}>{inc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Row 4: Instrutores (full width, single card, side by side) */}
              {d.instructors?.length ? (
                <div className="lg:col-span-12">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-white/70">Instrutores</h2>
                  <div className="mt-4 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                    <div className="grid gap-6 md:grid-cols-2 items-start">
                      {d.instructors.map((inst) => (
                        <div key={inst.name}>
                          <h3 className="text-base font-semibold text-white">{inst.name}</h3>
                          <ul className="mt-3 list-disc pl-5 space-y-1">
                            {inst.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Row 5: Contato (align right) */}
              {/* {d.contact ? (
                <div className="lg:col-span-5 lg:col-start-8 flex flex-col">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Contato</h3>
                  <div className="mt-4 rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8 text-white/90 backdrop-blur">
                    <div className="space-y-2">
                      {d.contact.name && (
                        <div className="text-white">{d.contact.name}</div>
                      )}
                      {d.contact.email && (
                        <div>
                          📧 E-mail: <a className="text-brand-300 hover:underline" href={`mailto:${d.contact.email}`}>{d.contact.email}</a>
                        </div>
                      )}
                      {d.contact.whatsapp && (
                        <div>
                          📱 WhatsApp: <a className="text-brand-300 hover:underline" href={`https://wa.me/${d.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">{d.contact.whatsapp}</a>
                        </div>
                      )}
                      {d.contact.instagram && (
                        <div>
                          📷 Instagram: <a className="text-brand-300 hover:underline" href={`https://instagram.com/${d.contact.instagram}`} target="_blank" rel="noopener noreferrer">@{d.contact.instagram}</a>
                        </div>
                      )}
                    </div>
                    {d.contact.whatsapp && (
                      <div className="mt-4">
                        <a
                          href={`https://wa.me/${d.contact.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-[#0c2235] hover:bg-brand-600 transition-colors cursor-pointer w-full"
                        >
                          Contratar por WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
        ) : null}

        <div className="mt-10 text-center text-white/70">
          {slug === "in-company"
            ? (
              <>Transforme o futuro do seu escritório com a inteligência artificial e prepare-se para as demandas do mercado jurídico moderno. Participe do curso e esteja à frente na inovação!</>
            ) : (
              <>Conteúdo completo em breve.</>
            )}
        </div>
      </Container>
    </section>
  );
}
