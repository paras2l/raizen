import { createClient } from '@supabase/supabase-js';

// The Singularity OS requires persistent, high-availability memory clusters.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[SUPABASE] Missing production credentials in .env. Falling back to Genesis defaults.');
}

export const supabase = createClient(
  supabaseUrl || 'https://(YOUR_PROJECT).supabase.co', 
  supabaseKey || '(YOUR_ANON_KEY)'
);
