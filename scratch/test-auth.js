const { createClient } = require('@supabase/supabase-js');

const url = 'https://wgkqgaiviybihkimnlvr.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indna3FnYWl2aXliaWhraW1ubHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTExNTYsImV4cCI6MjEwMzQ4NzE1Nn0.6twm--yRHRWakJC6DBKMR6qfTF8BDCF7gp-Rg5hLY0g';

const supabase = createClient(url, anonKey);

async function checkAuth() {
  console.log('Testing sign-in with dummy credentials to check Supabase Auth endpoint...');
  const res = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'wrongpassword',
  });
  console.log('Auth endpoint status:', res.error ? res.error.message : 'Success');
}

checkAuth();
