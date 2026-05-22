-- Schema for tryaimatch.com analytics tables.
-- Works on plain Postgres (Railway Postgres, RDS, Supabase, local docker).
--
-- Apply once after the database is provisioned:
--   psql "$DATABASE_URL" -f supabase/schema.sql
--
-- Or paste into Railway's data view → "Query" tab → run.
--
-- Required Railway env var on the Nuxt service:
--   NUXT_DATABASE_URL = postgresql://user:pass@host:port/dbname
--   (Use the "Postgres Connection URL" from the database's Variables tab.)

-- pgcrypto is needed for gen_random_uuid(). Available by default on
-- Railway Postgres but harmless to re-run.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS ratings (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  rating       smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      text,
  category_id  text,
  top_tool_id  text,
  user_agent   text
);

CREATE TABLE IF NOT EXISTS quiz_completions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  category_id  text NOT NULL,
  answers      jsonb NOT NULL,
  top_tools    jsonb NOT NULL,
  duration_ms  integer,
  user_agent   text,
  referer      text
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  name         text NOT NULL,
  email        text NOT NULL,
  product_name text NOT NULL,
  product_url  text,
  category     text,
  message      text NOT NULL,
  user_agent   text
);

CREATE INDEX IF NOT EXISTS ratings_created_at_idx          ON ratings (created_at DESC);
CREATE INDEX IF NOT EXISTS quiz_completions_created_at_idx ON quiz_completions (created_at DESC);
CREATE INDEX IF NOT EXISTS quiz_completions_category_idx   ON quiz_completions (category_id);
CREATE INDEX IF NOT EXISTS contact_submissions_created_idx ON contact_submissions (created_at DESC);
