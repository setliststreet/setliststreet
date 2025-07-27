// lib/registerGuestUser.ts
import { createClient } from '@supabase/supabase-js';
import { storeGuestEmail } from './guestHelpers';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function registerGuestUser(email: string): Promise<'already_exists' | 'success' | null> {
  const { data: existingUser, error: fetchError } = await supabase
    .from('guest_users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    storeGuestEmail(email);
    return 'already_exists';
  }

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Fetch error:', fetchError);
    return null;
  }

  const { error: insertError } = await supabase
    .from('guest_users')
    .insert([{ email }]);

  if (insertError) {
    console.error('Insert error:', insertError);
    return null;
  }

  storeGuestEmail(email);
  return 'success';
}
