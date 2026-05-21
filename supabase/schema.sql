-- Run this once in the Supabase SQL editor.
-- Required env vars on Railway:
--   SUPABASE_URL          = https://<project>.supabase.co
--   SUPABASE_SERVICE_KEY  = service_role key (server-side only — never expose)

create table if not exists ratings (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  rating       smallint not null check (rating between 1 and 5),
  comment      text,
  category_id  text,
  top_tool_id  text,
  user_agent   text
);

create table if not exists quiz_completions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  category_id  text not null,
  answers      jsonb not null,
  top_tools    jsonb not null,
  duration_ms  integer,
  user_agent   text,
  referer      text
);

create table if not exists contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  product_name text not null,
  product_url  text,
  category     text,
  message      text not null,
  user_agent   text
);

create index if not exists ratings_created_at_idx          on ratings (created_at desc);
create index if not exists quiz_completions_created_at_idx on quiz_completions (created_at desc);
create index if not exists quiz_completions_category_idx   on quiz_completions (category_id);
create index if not exists contact_submissions_created_idx on contact_submissions (created_at desc);
