// utils/evaluateWinners.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);


export const evaluateWinners = async (showId: string) => {
  // 1. Get actual opener for this show
  const { data: setlist, error: openerError } = await supabase
    .from('setlists')
    .select('opener')
    .eq('show_id', showId)
    .single();  

  if (openerError || !setlist?.opener) {
    console.error("❌ Opener not found for show:", openerError);
    return;
  }

  const actualOpener = setlist.opener.trim().toLowerCase();

  // 2. Get all guesses for this show
  const { data: guesses, error: guessError } = await supabase
    .from('opener_guesses')
    .select('*')
    .eq('show_id', showId);

  if (guessError || !guesses) {
    console.error("❌ Could not fetch guesses:", guessError);
    return;
  }

  // 3. Categorize guesses
  const winners: any[] = [];
  const losers: any[] = [];

  guesses.forEach((guess) => {
    const guessed = guess.song?.trim().toLowerCase();
    if (guessed === actualOpener) {
      winners.push(guess);
    } else {
      losers.push(guess);
    }
  });

  // 4. Mark winners/losers
  const updates = winners.map((w) => ({
    id: w.id,
    is_winner: true,
    prize_rank: null,
  })).concat(
    losers.map((l) => ({
      id: l.id,
      is_winner: false,
      prize_rank: null,
    }))
  );

  for (const update of updates) {
    await supabase
      .from('opener_guesses')
      .update({
        is_winner: update.is_winner,
        prize_rank: update.prize_rank,
      })
      .eq('id', update.id);
  }

  // 5. Assign Prize Ranks: 1st, 2nd, 3rd (for prize mode only)
  const prizeWinners = winners
    .filter((w) => w.play_mode === 'prize')
    .sort((a, b) => new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime());

  const ranks = ['1st', '2nd', '3rd'];

  for (let i = 0; i < Math.min(3, prizeWinners.length); i++) {
    const winner = prizeWinners[i];
    await supabase
      .from('opener_guesses')
      .update({
        is_winner: true,
        prize_rank: ranks[i],
      })
      .eq('id', winner.id);
  }

  console.log(`✅ Evaluation complete: ${winners.length} winners, ${losers.length} losers.`);
};

