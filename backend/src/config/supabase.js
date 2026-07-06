// config/supabase.js
// Supabase client initialization
// Uses service role key for server-side operations (bypasses RLS)

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

// Admin client — full access, used in controllers for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Public client — respects Row Level Security, used for auth operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabaseAdmin;
