-- Extensão para uuid/crypto (se ainda não)
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Tabela
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  images text[] default array[]::text[],
  created_at timestamptz not null default now(),
  author_id uuid references auth.users(id) on delete set null
);

-- RLS
alter table public.news enable row level security;

-- Inserir: qualquer user autenticado pode inserir
create policy "insert news (authenticated)"
on public.news
for insert
to authenticated
with check ( auth.uid() = author_id or author_id is null );

-- Select: leitura pública (se quiser exibir notícias sem login)
create policy "select news (public)"
on public.news
for select
to anon, authenticated
using ( true );

-- Update/Delete: apenas autor
create policy "update own news"
on public.news
for update
to authenticated
using ( author_id = auth.uid() )
with check ( author_id = auth.uid() );

create policy "delete own news"
on public.news
for delete
to authenticated
using ( author_id = auth.uid() );

-- Trigger para preencher author_id automaticamente
create or replace function public.fill_news_author_id()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.author_id is null then
    new.author_id := auth.uid();
  end if;
  return new;
end; $$;

drop trigger if exists trg_fill_news_author_id on public.news;
create trigger trg_fill_news_author_id
before insert on public.news
for each row
execute function public.fill_news_author_id();