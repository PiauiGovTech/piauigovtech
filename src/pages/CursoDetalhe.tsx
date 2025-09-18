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
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-sm font-semibold uppercase tracking-widest text-white/70">Curso</div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {course.title}
          </h1>
          {course.description && (
            <p className="mt-4 text-white/80">{course.description}</p>
          )}
        </div>

        {/* Image if available */}
        {course.image && (
          <div className="mt-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <img src={course.image} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        )}

        {/* Presentation and details */}
        {(d?.presentation?.length || d?.hours || d?.modality) && (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
              <h2 className="text-xl font-semibold text-white">Apresentação</h2>
              {d?.presentation?.map((p, i) => (
                <p key={i} className="mt-3">{p}</p>
              ))}
            </div>
            {(d?.hours || d?.modality) && (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Detalhes do curso</h3>
                <ul className="mt-3 space-y-2">
                  {d?.hours && (
                    <li><span className="text-white">Carga horária total:</span> {d.hours}</li>
                  )}
                  {d?.modality && (
                    <li><span className="text-white">Modalidade:</span> {d.modality}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Instructors */}
        {d?.instructors?.length ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">Instrutores</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {d.instructors.map((inst) => (
                <div key={inst.name} className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                  <h3 className="text-lg font-semibold text-white">{inst.name}</h3>
                  <ul className="mt-3 list-disc pl-5 space-y-1">
                    {inst.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Objectives and Content */}
        {(d?.objectives?.length || d?.content?.length) && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {d?.objectives?.length ? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Objetivos</h3>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  {d.objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {d?.content?.length ? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Conteúdo Programático</h3>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  {d.content.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {/* Methodology and Audience */}
        {(d?.methodology?.length || d?.audience?.length) && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {d?.methodology?.length ? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Metodologia</h3>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  {d.methodology.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {d?.audience?.length ? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Público-alvo</h3>
                <ul className="mt-3 list-disc pl-5 space-y-1">
                  {d.audience.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}

        {/* Investment and Contact */}
        {(d?.investment || d?.includes?.length || d?.contact) && (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {(d?.investment || d?.includes?.length) ? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Investimento</h3>
                {d?.investment && (
                  <p className="mt-3"><span className="text-white">Valor Total:</span> {d.investment}</p>
                )}
                {d?.includes?.length ? (
                  <div className="mt-3">
                    <div className="text-white/80">Inclui:</div>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      {d.includes.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
            {d?.contact ? (
              <div className="lg:col-span-2 rounded-2xl border border-white/15 bg-white/5 p-6 text-white/90 backdrop-blur-md">
                <h3 className="text-lg font-semibold text-white">Contato para contratação</h3>
                <div className="mt-3 space-y-2">
                  {d.contact.name && (
                    <div><span className="text-white">{d.contact.name}</span></div>
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
                      className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-[#0c2235] hover:bg-brand-600 transition-colors cursor-pointer"
                    >
                      Contratar por WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

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

