// ---------------------------------------------------------------------------
// Supabase connection config
// ---------------------------------------------------------------------------
// Paste your project's values below to turn ON accounts (email login, per-user
// progress, admin dashboard). Find them in the Supabase dashboard under:
//   Project Settings -> API  ->  "Project URL" and "anon public" key.
//
// SAFETY: the anon (public) key is DESIGNED to ship in the browser — it is safe
// to commit. Your data is protected by Row Level Security in the database.
// NEVER commit the "service_role" key.
//
// Until real values are filled in, the app runs in anonymous "local mode"
// (per-browser progress, no login) so the live site keeps working.
// ---------------------------------------------------------------------------

export const SUPABASE_URL = 'YOUR_SUPABASE_URL'
export const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'

/** True once real-looking credentials have been provided. */
export const isSupabaseConfigured =
  SUPABASE_URL.startsWith('https://') &&
  !SUPABASE_URL.includes('YOUR_SUPABASE') &&
  SUPABASE_ANON_KEY.length > 20 &&
  !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE')
