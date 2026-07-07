// config/supabase.js
// Supabase client initialization
// Uses service role key for server-side operations (bypasses RLS)

import { createClient } from '@supabase/supabase-js';
import { createMockSupabase } from './mockSupabase.js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const isPlaceholder = 
  !supabaseUrl || 
  supabaseUrl.includes('placeholder-url') || 
  supabaseUrl.includes('your_supabase_project_url');

export let supabaseAdmin;
export let supabase;

if (isPlaceholder) {
  console.log('⚠️  [DB CONFIG] Using Local JSON Database Fallback (Mock Supabase)');
  supabaseAdmin = createMockSupabase();
  supabase = supabaseAdmin;
} else {
  console.log('✅ [DB CONFIG] Connecting to remote Supabase database');
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export default supabaseAdmin;
