import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { stripMarkdown } from "../utils/stripMarkdown";
import Logo from "../components/Logo";
import NavLink from "../components/NavLink";

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
  const [menuOpen, setMenuOpen] = useState(false);

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
    <section className="relative min-h-screen bg-[#0B1636]">
      <div className="mx-auto w-full max-w-7xl border-t border-white/10 px-6" />
      {/* Subtle white glows to match hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[38rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-white to-white opacity-10" />
      </div>

      {/* Header igual ao da Home */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Piauí Gov Tech</span>
              <div className="flex items-center gap-3 text-brand-400">
                <Logo className="h-8 w-auto" />
                <div className="leading-tight">
                  <div className="text-lg font-bold text-white">
                    piauí<span className="text-gray-300 font-light">gov</span>
                    tech
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zm0 6a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"/>
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-2">
            <NavLink targetId="inicio">Início</NavLink>
            <NavLink targetId="noticias" to="/noticias">Notícias</NavLink>
            <NavLink targetId="quem-somos" to="/quemsomos">Quem somos</NavLink>
            <NavLink targetId="ecossistema">Ecossistema</NavLink>
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMenuOpen(false)}>
                  <span className="sr-only">Piauí Gov Tech</span>
                  <Logo className="h-8 w-auto text-white/90" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-200"
                >
                  <span className="sr-only">Close menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 space-y-2">
                <NavLink targetId="inicio" onNavigate={() => setMenuOpen(false)}>Início</NavLink>
                <NavLink targetId="noticias" to="/noticias" onNavigate={() => setMenuOpen(false)}>Notícias</NavLink>
                <NavLink targetId="quem-somos" to="/quemsomos" onNavigate={() => setMenuOpen(false)}>Quem somos</NavLink>
                <NavLink targetId="ecossistema" onNavigate={() => setMenuOpen(false)}>Ecossistema</NavLink>
                <NavLink targetId="para-quem" onNavigate={() => setMenuOpen(false)}>Para Quem</NavLink>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Espaço para o header absoluto */}
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
