import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached
  const config = useRuntimeConfig()
  if (!config.supabaseUrl || !config.supabaseServiceKey) return null
  cached = createClient(config.supabaseUrl, config.supabaseServiceKey, {
    auth: { persistSession: false }
  })
  return cached
}
