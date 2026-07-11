// This file uses .js extension to avoid TypeScript compilation analysis
let client = null;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  try {
    const { createClient } = require('@supabase/supabase-js');
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.warn('[DB] Supabase credentials missing');
      return null;
    }

    client = createClient(url, key);
    return client;
  } catch (err) {
    console.warn('[DB] Supabase not available:', err.message);
    return null;
  }
}

module.exports = { getSupabaseClient };
