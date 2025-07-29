import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getSetlistDetails(showId: string) {
  const { data, error } = await supabase
    .from('setlists')
    .select('opener, show_opens_at, winner_decision_time')
    .eq('show_id', showId)
    .single();

  if (error) {
    console.error('❌ Supabase error:', error.message);
    return null;
  }

  return {
    opener: data.opener,
    showOpensAt: data.show_opens_at,
    winnerDecisionTime: data.winner_decision_time,
  };
}
