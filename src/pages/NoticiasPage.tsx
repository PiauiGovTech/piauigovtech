import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import newsHero from "../assets/img/Frame-1410125704-1.png";

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

      const { data, error, count } = await q as any;
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
    if (q) next.set("q", q); else next.delete("q");
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
    <section className="relative bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff3f8_50%,_#e9edf3_100%),radial-gradient(80%_60%_at_20%_25%,_rgba(255,255,255,0.95)_0%,_rgba(248,250,252,0.9)_35%,_transparent_70%),radial-gradient(70%_55%_at_80%_20%,_rgba(255,255,255,0.9)_0%,_rgba(240,243,248,0.85)_40%,_transparent_70%)] min-h-[calc(100dvh-4rem)] pt-6 md:pt-10">
      {/* Banner superior com imagem completa (sem zoom e sem overlay) */}
      <div className="relative mx-auto w-[92%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-5xl">
        <img src={newsHero} alt="Banner de notícias" className="block w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Notícias</h1>
            {/* <p className="mt-2 text-white/90">Acompanhe todas as publicações e atualizações</p> */}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_50%,_transparent_62%,_rgba(0,0,0,0.03)_100%)]" />
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
                <article key={n.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  {n.images?.[0] && (
                    <Link to={`/noticias/${n.id}`} className="relative block aspect-[16/9] w-full overflow-hidden">
                      <img src={n.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </Link>
                  )}
                  <div className="p-4">
                    <Link to={`/noticias/${n.id}`} className="group inline-block">
                      <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:underline decoration-[#5dd0df] decoration-1 underline-offset-4">{n.title}</h3>
                    </Link>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-600">{excerpt(n.content, 240)}</p>
                    <div className="mt-3 text-xs text-gray-500">{new Date(n.created_at).toLocaleDateString()}</div>
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
                className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm ${canPrev ? 'cursor-pointer border-gray-300 bg-white text-gray-700 hover:bg-gray-50' : 'border-gray-200 bg-gray-100 text-gray-400'}`}
              >
                Anterior
              </button>
              {pageWindow.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm ${p === page ? 'bg-[#5dd0df] text-[#0c2235] font-semibold' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer'}`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={!canNext}
                onClick={() => goToPage(page + 1)}
                className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm ${canNext ? 'cursor-pointer border-gray-300 bg-white text-gray-700 hover:bg-gray-50' : 'border-gray-200 bg-gray-100 text-gray-400'}`}
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


