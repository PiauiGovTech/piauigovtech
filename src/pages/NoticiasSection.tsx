import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { stripMarkdown } from "../utils/stripMarkdown";

type NewsCard = {
  id: string;
  title: string;
  content: string;
  images: string[] | null;
  created_at: string;
};

function excerpt(text: string, max = 160) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1) + "…";
}

export default function NoticiasSection() {
  const [items, setItems] = useState<NewsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("news")
        .select("id,title,content,images,created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) setError(error.message);
      setItems((data as any) || []);
      setLoading(false);
    })();
  }, []);

  // Preparos
  const rightSideNews = useMemo(() => items.slice(0, 4), [items]);
  const totalSlides = items.length || 1;

  // Avanço automático desativado: navegação apenas por setas/bolinhas

  function prevSlide() {
    if (items.length === 0) return;
    setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides);
  }

  function nextSlide() {
    if (items.length === 0) return;
    setSlideIndex((i) => (i + 1) % totalSlides);
  }

  return (
    <section className="relative md:flex md:items-center md:h-screen py-10 md:py-0 bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff3f8_50%,_#e9edf3_100%),radial-gradient(80%_60%_at_20%_25%,_rgba(255,255,255,0.95)_0%,_rgba(248,250,252,0.9)_35%,_transparent_70%),radial-gradient(70%_55%_at_80%_20%,_rgba(255,255,255,0.9)_0%,_rgba(240,243,248,0.85)_40%,_transparent_70%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,_transparent_62%,_rgba(0,0,0,0.03)_100%)]" />
      <Container className="md:h-full md:flex md:items-center">
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-5 w-full">
            {/* Carrossel à esquerda (loop infinito) */}
            <article className="w-full lg:col-span-3">
              <div className="relative h-64 sm:h-80 lg:h-[420px] w-full mx-auto overflow-hidden rounded-xl bg-gray-100">
                {items[slideIndex]?.images?.[0] && (
                  <Link to={`/noticias/${items[slideIndex].id}`} className="group">
                    <img
                      src={items[slideIndex].images![0]}
                      alt="Imagem da notícia"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </Link>
                )}
                {/* Botões de navegação */}
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:text-gray-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.53 4.47a.75.75 0 010 1.06L9.06 12l6.47 6.47a.75.75 0 11-1.06 1.06l-7-7a.75.75 0 010-1.06l7-7a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Próximo"
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:text-gray-100 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.47 19.53a.75.75 0 010-1.06L14.94 12 8.47 5.53a.75.75 0 111.06-1.06l7 7a.75.75 0 010 1.06l-7 7a.75.75 0 01-1.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4 space-y-2 min-h-[96px] md:min-h-[110px]">
                <Link to={`/noticias/${items[slideIndex]?.id}`} className="group inline-block">
                  <h3 className="text-2xl font-semibold text-gray-900 line-clamp-2 inline-block transition-colors duration-200 group-hover:underline decoration-[#5dd0df] decoration-1 underline-offset-4">
                    {items[slideIndex]?.title}
                  </h3>
                </Link>
                <p className="text-gray-600 line-clamp-2">
                  {excerpt(stripMarkdown(items[slideIndex]?.content || ""), 220)}
                </p>
              </div>

              {/* Indicadores */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {items.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Ir para slide ${idx + 1}`}
                    onClick={() => setSlideIndex(idx % totalSlides)}
                    className={`size-2.5 rounded-full ${
                      idx === slideIndex ? "bg-[#5dd0df]" : "bg-gray-300"
                    } cursor-pointer`}
                  />
                ))}
              </div>
            </article>

            {/* Notícias à direita (4 itens) */}
            <div className="hidden md:grid content-start gap-5 lg:col-span-2">
              {rightSideNews.map((n) => (
                <article
                  key={n.id}
                  className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4"
                >
                  {n.images?.[0] && (
                    <Link to={`/noticias/${n.id}`} className="relative w-full sm:w-[200px] aspect-[16/9] overflow-hidden rounded-md group">
                      <img src={n.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </Link>
                  )}
                  <div>
                    <Link to={`/noticias/${n.id}`} className="group inline-block">
                      <h4 className="line-clamp-2 text-lg font-semibold text-gray-900 inline-block transition-colors duration-200 group-hover:underline decoration-[#5dd0df] decoration-1 underline-offset-4">{n.title}</h4>
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {excerpt(stripMarkdown(n.content), 120)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-gray-600">Nenhuma notícia encontrada.</p>
        )}
      </Container>
      {items.length > 3 && (
        <button
          type="button"
          onClick={() => navigate('/noticias')}
          className="absolute bottom-6 right-6 mt-8 hidden md:inline-flex items-center gap-2 rounded-xl bg-[#5dd0df] px-6 py-3 text-base font-semibold text-[#0c2235] hover:translate-y-[1px] hover:shadow-[0_3px_0_0_rgba(44,151,171,0.7)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(44,151,171,0.7)] cursor-pointer"
        >
          Mais notícias
        </button>
      )}
    </section>
  );
}
