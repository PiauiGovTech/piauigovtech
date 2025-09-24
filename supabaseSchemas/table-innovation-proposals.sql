-- Extensões úteis para geração de UUID
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Tabela para armazenar propostas enviadas pelo formulário "Para quem é"
create table if not exists public.innovation_proposals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  stage text not null check (stage in ('conceito-inicial', 'em-desenvolvimento', 'solucao-aplicada')),
  proposer_name text not null,
  contact_email text not null,
  support_materials_url text,
  submitted_at timestamptz not null default now()
);

-- Índice para ordenação por data de envio
create index if not exists idx_innovation_proposals_submitted_at
on public.innovation_proposals (submitted_at desc);

-- Restrições de segurança
alter table public.innovation_proposals enable row level security;

drop policy if exists "insert innovation proposals (public)" on public.innovation_proposals;
create policy "insert innovation proposals (public)"
on public.innovation_proposals
for insert
to anon, authenticated
with check (true);

drop policy if exists "select innovation proposals (admins)" on public.innovation_proposals;
create policy "select innovation proposals (admins)"
on public.innovation_proposals
for select
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and coalesce(profiles.is_adm, false)
  )
);

drop policy if exists "update innovation proposals (admins)" on public.innovation_proposals;
create policy "update innovation proposals (admins)"
on public.innovation_proposals
for update
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and coalesce(profiles.is_adm, false)
  )
)
with check (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and coalesce(profiles.is_adm, false)
  )
);

drop policy if exists "delete innovation proposals (admins)" on public.innovation_proposals;
create policy "delete innovation proposals (admins)"
on public.innovation_proposals
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
      and coalesce(profiles.is_adm, false)
  )
);
