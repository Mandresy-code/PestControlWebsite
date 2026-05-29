-- ════════════════════════════════════════════════════════════════════════════
-- ESEIS Pest Control — Supabase schema
-- À coller dans : Supabase Dashboard → SQL Editor → New query
-- ════════════════════════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── services ────────────────────────────────────────────────────────────────
create table if not exists services (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  index        text not null,
  title        text not null,
  short_title  text,
  icon         text,
  description  text,
  long_description text,
  chips        text[] default '{}',
  methods      text[] default '{}',
  urgent       boolean default false,
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- ─── sectors ─────────────────────────────────────────────────────────────────
create table if not exists sectors (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  badge        text check (badge in ('Professionnels', 'Particuliers')),
  icon         text,
  description  text,
  services     text[] default '{}',
  challenges   text[] default '{}',
  sort_order   int default 0,
  created_at   timestamptz default now()
);

-- ─── pests ───────────────────────────────────────────────────────────────────
create table if not exists pests (
  id           uuid primary key default gen_random_uuid(),
  pest_id      text unique not null,
  name         text not null,
  icon         text,
  service_slug text,
  urgent       boolean default false,
  signs        jsonb default '{}',
  sort_order   int default 0
);

-- ─── articles ─────────────────────────────────────────────────────────────────
create table if not exists articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  category     text,
  read_time    text,
  date         date,
  body         text,
  published    boolean default true,
  created_at   timestamptz default now()
);

-- ─── method_steps ─────────────────────────────────────────────────────────────
create table if not exists method_steps (
  id           uuid primary key default gen_random_uuid(),
  index        text not null,
  title        text not null,
  description  text,
  icon         text,
  sort_order   int default 0
);

-- ─── stats ────────────────────────────────────────────────────────────────────
create table if not exists stats (
  id           uuid primary key default gen_random_uuid(),
  value        text not null,
  label        text not null,
  mono         boolean default true,
  sort_order   int default 0
);

-- ─── proofs ───────────────────────────────────────────────────────────────────
create table if not exists proofs (
  id           uuid primary key default gen_random_uuid(),
  icon         text,
  title        text not null,
  description  text,
  sort_order   int default 0
);

-- ─── diagnostic_requests ──────────────────────────────────────────────────────
create table if not exists diagnostic_requests (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz default now(),
  place        text,
  pest         text,
  situation    text,
  nom          text,
  etablissement text,
  email        text,
  tel          text,
  cp           text,
  dispo        text,
  precisions   text,
  status       text default 'pending',
  urgent       boolean default false
);

-- ─── Storage buckets ──────────────────────────────────────────────────────────
-- Crée le bucket "media" (public) dans Storage → Buckets → New bucket
-- Nom : media | Public : oui
-- Puis upload : hero/forest.mp4 et hero/forest.webm

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Lecture publique sur toutes les tables de contenu
alter table services           enable row level security;
alter table sectors            enable row level security;
alter table pests              enable row level security;
alter table articles           enable row level security;
alter table method_steps       enable row level security;
alter table stats              enable row level security;
alter table proofs             enable row level security;
alter table diagnostic_requests enable row level security;

-- Policies lecture publique (anon)
create policy "public read services"     on services          for select using (true);
create policy "public read sectors"      on sectors           for select using (true);
create policy "public read pests"        on pests             for select using (true);
create policy "public read articles"     on articles          for select using (published = true);
create policy "public read method_steps" on method_steps      for select using (true);
create policy "public read stats"        on stats             for select using (true);
create policy "public read proofs"       on proofs            for select using (true);

-- Insertion diagnostic : service role uniquement (pas de policy anon)
-- L'API route utilise SUPABASE_SERVICE_ROLE_KEY qui bypasse RLS
