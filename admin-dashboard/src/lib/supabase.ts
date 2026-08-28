import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://wgkqgaiviybihkimnlvr.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indna3FnYWl2aXliaWhraW1ubHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTExNTYsImV4cCI6MjEwMzQ4NzE1Nn0.6twm--yRHRWakJC6DBKMR6qfTF8BDCF7gp-Rg5hLY0g";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
