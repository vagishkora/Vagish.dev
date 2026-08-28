const { createClient } = require('@supabase/supabase-js');

const url = 'https://wgkqgaiviybihkimnlvr.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indna3FnYWl2aXliaWhraW1ubHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTExNTYsImV4cCI6MjEwMzQ4NzE1Nn0.6twm--yRHRWakJC6DBKMR6qfTF8BDCF7gp-Rg5hLY0g';

const supabase = createClient(url, anonKey);

async function test() {
  console.log('Testing Supabase connection...');
  try {
    const res = await supabase.from('projects').select('*').limit(1);
    console.log('Projects table response:', res);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
