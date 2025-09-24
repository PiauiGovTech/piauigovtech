import { useMemo } from "react";
import type { ReactNode } from "react";
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
  const quickInfo = (d?.quickInfo ?? []).filter((item) => item.label && item.value);

  const parseInstagram = (value: string) => {
    const trimmed = value.trim();
    const normalized = trimmed
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
      .replace(/^instagram\.com\//i, "")
      .replace(/^@/, "")
      .replace(/\/$/, "");

    const hasScheme = /^https?:\/\//i.test(trimmed);
    const hasDomain = /^https?:\/\//i.test(trimmed) || /^instagram\.com\//i.test(trimmed);

    const href = hasScheme
      ? trimmed
      : hasDomain
        ? `https://${trimmed.replace(/^https?:\/\//i, "")}`
        : `https://instagram.com/${normalized}`;

    return {
      href,
      label: `@${normalized}`,
    };
  };

  type InfoSection = {
    key: string;
    eyebrow?: string;
    title: string;
    content: ReactNode;
    accent?: "tinted" | "default";
  };

  const sections: InfoSection[] = [];

  if (d?.presentation?.length) {
    sections.push({
      key: "presentation",
      eyebrow: "Sobre o curso",
      title: "Descrição do curso",
      content: (
        <div className="space-y-4 text-base leading-relaxed text-white/85">
          {d.presentation.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ),
    });
  }

  if (d?.objectives?.length) {
    sections.push({
      key: "objectives",
      eyebrow: "Objetivos",
      title: "Ao final você será capaz de",
      content: (
        <ul className="space-y-3 text-base leading-relaxed text-white/85">
          {d.objectives.map((objective, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-300" />
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      ),
      accent: "tinted",
    });
  }

  if (d?.content?.length) {
    sections.push({
      key: "content",
      eyebrow: "Conteúdo",
      title: "O que você vai aprender",
      content: (
        <ul className="space-y-3 text-base leading-relaxed text-white/85">
          {d.content.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (d?.methodology?.length) {
    sections.push({
      key: "methodology",
      eyebrow: "Metodologia",
      title: "Como o curso acontece",
      content: (
        <ul className="space-y-3 text-base leading-relaxed text-white/85">
          {d.methodology.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
      accent: "tinted",
    });
  }

  if (d?.audience?.length) {
    sections.push({
      key: "audience",
      eyebrow: "Para quem",
      title: "Público ideal",
      content: (
        <ul className="space-y-3 text-base leading-relaxed text-white/85">
          {d.audience.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (d?.includes?.length) {
    sections.push({
      key: "includes",
      eyebrow: "Inclui",
      title: "Você leva",
      content: (
        <ul className="space-y-3 text-base leading-relaxed text-white/85">
          {d.includes.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
      accent: "tinted",
    });
  }

  if (d?.instructors?.length) {
    sections.push({
      key: "instructors",
      eyebrow: "Instrutores",
      title: "Quem conduz o curso",
      content: (
        <div className="grid gap-6 sm:grid-cols-2">
          {d.instructors.map((instructor) => (
            <div key={instructor.name} className="rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white">{instructor.name}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-white/80">
                {instructor.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-brand-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
      accent: "tinted",
    });
  }

  if (d?.contact && (d.contact.name || d.contact.email || d.contact.whatsapp || d.contact.instagram)) {
    sections.push({
      key: "contact",
      eyebrow: "Contato",
      title: "Fale com a equipe",
      content: (
        <div className="space-y-3 text-base leading-relaxed text-white/85">
          {d.contact.name ? <p>Responsável: <span className="text-white">{d.contact.name}</span></p> : null}
          {d.contact.email ? (
            <p>
              E-mail: {" "}
              <a className="font-medium text-brand-200 hover:text-brand-100" href={`mailto:${d.contact.email}`}>
                {d.contact.email}
              </a>
            </p>
          ) : null}
          {d.contact.whatsapp ? (
            <p>
              WhatsApp: {" "}
              <a
                className="font-medium text-brand-200 hover:text-brand-100"
                href={`https://wa.me/${d.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {d.contact.whatsapp}
              </a>
            </p>
          ) : null}
          {d.contact.instagram
            ? (() => {
                const { href, label } = parseInstagram(d.contact.instagram ?? "");
                return (
                  <p>
                    Instagram: {" "}
                    <a className="font-medium text-brand-200 hover:text-brand-100" href={href} target="_blank" rel="noreferrer">
                      {label}
                    </a>
                  </p>
                );
              })()
            : null}
        </div>
      ),
    });
  }

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
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {course.title}
          </h1>
          {course.description ? (
            <p className="mx-auto max-w-3xl text-lg text-white/80 sm:text-xl">
              {course.description}
            </p>
          ) : null}
        </div>

        {(quickInfo.length || course.image) ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center max-w-6xl mx-auto">
            <div className="flex w-full items-center justify-center">
              {quickInfo.length ? (
                <div className="flex h-full w-full max-w-3xl flex-col justify-center text-left text-white">
                  <ul className="flex flex-col gap-4 text-base sm:text-lg">
                    {quickInfo.map((info, index) => (
                      <li key={`${info.label}-${index}`} className="flex items-center gap-3">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.22 4.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L11.44 10 7.22 5.28a.75.75 0 010-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="leading-relaxed">
                          <span className="font-semibold text-white">{info.label}:</span>{" "}
                          <span className="text-white/85">{info.value}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {course.image ? (
              <div className="flex w-full items-center justify-center">
                <div className="relative aspect-[16/9] w-full max-h-[240px] max-w-3xl overflow-hidden rounded-2xl">
                  <img src={course.image} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
        {sections.length ? (
          <div className="mt-12 space-y-12 lg:mt-16 lg:space-y-14">
            {sections.map((section) => {
              return (
                <div key={section.key} className="flex flex-col items-center gap-4 lg:gap-5">
                  {section.eyebrow ? (
                    <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
                      {section.eyebrow}
                    </span>
                  ) : null}
                  <div
                    className="grid w-full max-w-6xl gap-6 rounded-3xl border border-white/10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.65fr)] lg:items-stretch"
                  >
                    <div className="flex h-full flex-col justify-center p-6 text-center sm:p-8 lg:p-10 lg:text-left">
                      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        {section.title}
                      </h2>
                    </div>
                    <div className="flex h-full flex-col justify-center p-6 sm:p-8 lg:p-10">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-10 text-center text-white/70">
          {slug === "in-company"
            ? (
              <>Transforme o futuro do seu escritório com a inteligência artificial e prepare-se para as demandas do mercado jurídico moderno. Participe do curso e esteja à frente na inovação!</>
            ) : (
              <></>
            )}
        </div>
      </Container>
    </section>
  );
}
