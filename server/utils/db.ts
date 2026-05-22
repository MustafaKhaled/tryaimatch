// Lazy-initialized Postgres connection pool.
// Reads DATABASE_URL from runtime config (NUXT_DATABASE_URL on Railway).
// Returns null when unconfigured so endpoints can degrade gracefully in dev.

import { Pool, type PoolClient, type QueryResult, type QueryResultRow } from 'pg'

let cached: Pool | null = null

export function getPool(): Pool | null {
  if (cached) return cached
  const config = useRuntimeConfig() as any
  const url = (config.databaseUrl as string | undefined) || ''
  if (!url) return null
  cached = new Pool({
    connectionString: url,
    // Railway internal hostnames use TLS but with their own cert chain;
    // for the public proxy URL, SSL is required. Setting rejectUnauthorized:
    // false is the standard pattern for managed PG providers.
    ssl: url.includes('localhost') ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000
  })
  cached.on('error', (err) => {
    console.error('[db] pool error', err)
  })
  return cached
}

// Convenience: run a parameterized query, return rows typed by caller.
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: any[] = []
): Promise<QueryResult<T> | null> {
  const pool = getPool()
  if (!pool) return null
  return pool.query<T>(text, params)
}

export type { PoolClient, QueryResult }
