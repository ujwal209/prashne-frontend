import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Log error but don't crash the app hard
  console.error('CRITICAL: Supabase environment variables missing. Check .env file.');
}

// Fallback to empty strings to prevent crash, but Auth will fail gracefully in the UI
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);