import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef(false);
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

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isSwiping.current = false;
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (!isSwiping.current && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isSwiping.current = true;
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current !== null) {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;

      if (isSwiping.current && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  }

  return (
    <section className="relative md:flex md:items-center md:h-screen py-10 md:py-0 bg-[#0B1636]">
      {/* Subtle hero-like white glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>
      <Container className="md:h-full md:flex md:items-center">
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-5 w-full text-white">
            {/* Carrossel à esquerda (loop infinito) */}
            <article className="w-full lg:col-span-3">
              <div
                className="relative h-64 sm:h-80 lg:h-[420px] w-full mx-auto overflow-hidden rounded-xl bg-white/5"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                      idx === slideIndex
                        ? "opacity-100 z-10 pointer-events-auto"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Link to={`/noticias/${item.id}`} className="group block h-full w-full">
                      {item.images?.[0] ? (
                        <img
                          src={item.images[0]}
                          alt="Imagem da notícia"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#0f1f3c] text-sm text-white/60">
                          Notícia sem imagem
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
                {/* Botões de navegação */}
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white cursor-pointer sm:inline-flex z-30"
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white cursor-pointer sm:inline-flex z-30"
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
              <div className="mt-4">
                <div className="relative min-h-[150px] sm:min-h-[130px] pb-12 sm:pb-10">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                        idx === slideIndex
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      <Link to={`/noticias/${item.id}`} className="group inline-block">
                        <h3 className="text-2xl font-semibold text-white line-clamp-2 inline-block transition-colors duration-200 group-hover:underline decoration-[#5dd0df] decoration-1 underline-offset-4">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-white/80 line-clamp-2 mt-2 md:mt-1">
                        {excerpt(stripMarkdown(item.content || ""), 220)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Indicadores */}
                <div className="mt-8 sm:mt-6 flex items-center justify-center gap-2">
                  {items.slice(0, 5).map((_, idx) => (
                    <button
                      key={idx}
                    aria-label={`Ir para slide ${idx + 1}`}
                    onClick={() => setSlideIndex(idx % totalSlides)}
                    className={`size-2.5 rounded-full ${
                      idx === slideIndex ? "bg-[#5dd0df]" : "bg-white/30"
                    } cursor-pointer`}
                  />
                ))}
                </div>
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
                  <div className="text-white">
                    <Link to={`/noticias/${n.id}`} className="group inline-block">
                      <h4 className="line-clamp-2 text-lg font-semibold text-white inline-block transition-colors duration-200 group-hover:underline decoration-[#5dd0df] decoration-1 underline-offset-4">{n.title}</h4>
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-white/80">
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
