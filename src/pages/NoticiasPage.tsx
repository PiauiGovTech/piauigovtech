import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { stripMarkdown } from "../utils/stripMarkdown";

type NewsCard = {
  id: string;
  title: string;
  content: string;
  images: string[] | null;
  created_at: string;
};

function excerpt(text: string, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1) + "…";
}

const PAGE_SIZE = 10;

export default function NoticiasPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<NewsCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const query = (searchParams.get("q") || "").trim();

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let q = supabase
        .from("news")
        .select("id,title,content,images,created_at", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (query) {
        q = q.ilike("title", `%${query}%`);
      }

      const { data, error, count } = (await q) as any;
      if (error) {
        setError(error.message);
        setItems([]);
        setTotal(0);
      } else {
        setItems((data as NewsCard[]) || []);
        setTotal(count ?? 0);
      }
      setLoading(false);
    })();
  }, [page, query]);

  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = String(fd.get("q") || "").trim();
    const next = new URLSearchParams(searchParams);
    if (q) next.set("q", q);
    else next.delete("q");
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  const handleClearSearch = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    next.delete("page");
    setSearchParams(next, { replace: true });
  };

  function goToPage(target: number) {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(target));
    setSearchParams(next, { replace: true });
  }

  const pageWindow = useMemo(() => {
    const MAX = 5;
    const start = Math.max(1, page - Math.floor(MAX / 2));
    const end = Math.min(totalPages, start + MAX - 1);
    const s = Math.max(1, end - MAX + 1);
    const result: number[] = [];
    for (let i = s; i <= end; i++) result.push(i);
    return result;
  }, [page, totalPages]);

  return (
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      {/* Espaço para o header absoluto global */}
      <div className="pt-24 sm:pt-28" />

      <Container className="py-8 md:py-12">
        <div className="flex flex-col gap-6">

          {/* <form onSubmit={handleSearchSubmit} className="mx-auto grid w-full max-w-2xl grid-cols-[1fr_auto] gap-2">
            <input
              name="q"
              defaultValue={query}
              placeholder="Buscar por título"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-500 focus:border-brand focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl bg-[#5dd0df] px-4 py-2 text-sm font-semibold text-[#0c2235] hover:translate-y-[1px] hover:shadow-[0_3px_0_0_rgba(44,151,171,0.7)] active:translate-y-[2px] active:shadow-[0_2px_0_0_rgba(44,151,171,0.7)] cursor-pointer"
              >
                Buscar
              </button>
              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </form> */}

          {error && <p className="text-center text-red-600">{error}</p>}
          {/* {loading && (
            <div className="py-16 text-center text-gray-600">Carregando…</div>
          )} */}

          {!loading && !error && items.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((n) => (
                <article key={n.id} className="overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                  {n.images?.[0] && (
                    <Link to={`/noticias/${n.id}`} className="relative block aspect-[16/9] w-full overflow-hidden">
                      <img src={n.images[0]} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </Link>
                  )}
                  <div className="p-4">
                    <Link to={`/noticias/${n.id}`} className="group inline-block">
                      <h3 className="line-clamp-2 text-lg font-semibold text-white transition-colors duration-200 group-hover:text-brand-300">{n.title}</h3>
                    </Link>
                    <p className="mt-2 line-clamp-3 text-sm text-white/80">{excerpt(stripMarkdown(n.content), 240)}</p>
                    <div className="mt-3 text-xs text-white/60">{new Date(n.created_at).toLocaleDateString()}</div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="py-16 text-center text-gray-600">Nenhuma notícia encontrada.</div>
          )}

          {/* Paginação */}
          {!loading && totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={!canPrev}
                onClick={() => goToPage(page - 1)}
                className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm ${canPrev ? 'cursor-pointer border-white/15 bg-white/5 text-white hover:bg-white/10' : 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'}`}
              >
                Anterior
              </button>
              {pageWindow.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm ${p === page ? 'bg-brand-500 text-[#0c2235] font-semibold' : 'border border-white/15 bg-white/5 text-white hover:bg-white/10 cursor-pointer'}`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={!canNext}
                onClick={() => goToPage(page + 1)}
                className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm ${canNext ? 'cursor-pointer border-white/15 bg-white/5 text-white hover:bg-white/10' : 'border-white/10 bg-white/5 text-white/40 cursor-not-allowed'}`}
              >
                Próximo
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

