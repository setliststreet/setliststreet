import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';

const supabase = createClient(supabaseUrl, supabaseKey);



// Bonus: Rare song bonus if song was played less than 3 times
const getRareSongs = async () => {
  const { data, error } = await supabase
    .from('song_history')
    .select('song_name, play_count');

  if (error) {
    console.error('Error fetching song history:', error);
    return [];
  }

  return data.filter((s) => s.play_count < 3).map((s) => s.song_name);
};

export async function decideFantasyWinners(showId: string) {
  const { data: show, error: showError } = await supabase
    .from('setlists')
    .select('*')
    .eq('show_id', showId)
    .single();

  if (showError || !show) {
    console.error('Error fetching show data:', showError);
    return;
  }

  const { data: guesses, error: guessError } = await supabase
    .from('fantasy_setlist_guesses')
    .select('*')
    .eq('show_id', showId);

  if (guessError || !guesses) {
    console.error('Error fetching guesses:', guessError);
    return;
  }

  const rareSongs = await getRareSongs();
  const scores: { id: string; totalScore: number }[] = [];

  for (const guess of guesses) {
    let score = 0;

    const sections: Array<{
      actual: string[];
      guessed: string[];
    }> = [
      { actual: show.fantasy_set1 ?? [], guessed: guess.set1 },
      { actual: show.fantasy_set2_pre_drums ?? [], guessed: guess.set2_pre_drums },
      { actual: show.fantasy_set2_post_drums ?? [], guessed: guess.set2_post_drums },
      { actual: show.fantasy_encore ?? [], guessed: guess.encore },
    ];

    for (const { actual, guessed } of sections) {
      const matchedIndices = new Set<number>();
      for (let i = 0; i < guessed.length; i++) {
        const g = guessed[i];
        if (actual[i] && g === actual[i]) {
          score += 20;
          matchedIndices.add(i);
        } else if (actual.includes(g)) {
          score += 10;
        }

        if (rareSongs.includes(g)) {
          score += 5;
        }
      }

      // Perfect sequence bonus
      if (
        guessed.length === actual.length &&
        guessed.every((song, i) => song === actual[i])
      ) {
        score += 10;
      }
    }

    scores.push({ id: guess.id, totalScore: score });

    // Update song_history table
    for (const song of [...guess.set1, ...guess.set2_pre_drums, ...guess.set2_post_drums, ...guess.encore]) {
      const { data: existing } = await supabase
        .from('song_history')
        .select('id, play_count')
        .eq('song_name', song)
        .single();

      if (existing) {
        await supabase
          .from('song_history')
          .update({ play_count: existing.play_count + 1 })
          .eq('id', existing.id);
      } else {
        await supabase.from('song_history').insert({ song_name: song, play_count: 1 });
      }
    }
  }

  // Sort and assign winner info
  scores.sort((a, b) => b.totalScore - a.totalScore);
  const topScore = scores[0]?.totalScore ?? 0;

  const winnerIds = scores
    .filter((s) => s.totalScore === topScore)
    .map((s) => s.id);

  for (const { id, totalScore } of scores) {
    await supabase
      .from('fantasy_setlist_guesses')
      .update({
        total_score: totalScore,
        is_winner: winnerIds.includes(id),
      })
      .eq('id', id);
  }

  // Update setlist table with summary
  await supabase
    .from('setlists')
    .update({
      fantasy_total_players: scores.length,
      fantasy_total_winners: winnerIds.length,
      fantasy_winner_ids: winnerIds,
      winner_decision_time: new Date().toISOString(),
    })
    .eq('show_id', showId);
}


