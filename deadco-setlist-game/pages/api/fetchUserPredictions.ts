// lib/api/fetchPredictions.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; 
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchUserPredictions(userId: string) {
  const { data, error } = await supabase
    .from('opener_guesses')
    .select('*')
    .eq('guest_user_id', userId); 

  if (error) {
    console.error('❌ Error fetching predictions:', error);
    return [];
  }

  return data;
}


