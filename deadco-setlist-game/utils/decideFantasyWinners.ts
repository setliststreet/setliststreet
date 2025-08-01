import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);


type FantasySet = {
  set1: string[];
  set2_pre_drums: string[];
  set2_post_drums: string[];
  encore: string[];
};

type FantasyGuess = {
  id: string;
  user_id: string | null;
  guest_user_id: string | null;
  set1: string[];
  set2_pre_drums: string[];
  set2_post_drums: string[];
  encore: string[];
  mode: string;
};

export async function decideFantasyWinners(showId: string) {
  const { data: setlist, error: setlistError } = await supabase
    .from('setlists')
    .select('fantasy_set1, fantasy_set2_pre_drums, fantasy_set2_post_drums, fantasy_encore')
    .eq('show_id', showId)
    .single();

  if (setlistError || !setlist) {
    throw new Error(`Setlist not found for showId: ${showId}`);
  }

  const officialFantasySet: FantasySet = {
    set1: setlist.fantasy_set1 || [],
    set2_pre_drums: setlist.fantasy_set2_pre_drums || [],
    set2_post_drums: setlist.fantasy_set2_post_drums || [],
    encore: setlist.fantasy_encore || [],
  };

  const { data: guesses, error: guessesError } = await supabase
    .from('fantasy_setlist_guesses')
    .select('id, user_id, guest_user_id, set1, set2_pre_drums, set2_post_drums, encore, play_mode')
    .eq('show_id', showId);

  if (guessesError || !guesses) throw new Error('Error fetching guesses');

  const allSongs = [
    ...officialFantasySet.set1,
    ...officialFantasySet.set2_pre_drums,
    ...officialFantasySet.set2_post_drums,
    ...officialFantasySet.encore,
  ];

  const { data: historyData } = await supabase
    .from('song_history')
    .select('song_name, play_count')
    .in('song_name', allSongs);

  const rareSongs = new Set<string>();
  historyData?.forEach((s) => {
    if (s.play_count < 3) rareSongs.add(s.song_name);
  });

  const scoreGuess = (guessArr: string[], officialArr: string[]) => {
    let score = 0;
    let isPerfect = true;

    for (let i = 0; i < officialArr.length; i++) {
      const guessed = guessArr[i];
      const actual = officialArr[i];

      if (!guessed) {
        isPerfect = false;
        continue;
      }

      if (guessed === actual) {
        score += 20;
      } else if (officialArr.includes(guessed)) {
        score += 10;
        isPerfect = false;
      } else {
        isPerfect = false;
      }

      if (rareSongs.has(guessed)) {
        score += 5;
      }
    }

    if (isPerfect && guessArr.length === officialArr.length) {
      score += 10;
    }

    return score;
  };

  // Group by mode
  const guessesByMode: Record<string, FantasyGuess[]> = {};
  for (const guess of guesses) {
    const mode = guess.mode || 'fun';
    if (!guessesByMode[mode]) guessesByMode[mode] = [];
    guessesByMode[mode].push(guess);
  }

  for (const mode in guessesByMode) {
    const updates = [];

    for (const guess of guessesByMode[mode]) {
      const scoreSet1 = scoreGuess(guess.set1, officialFantasySet.set1);
      const scorePre = scoreGuess(guess.set2_pre_drums, officialFantasySet.set2_pre_drums);
      const scorePost = scoreGuess(guess.set2_post_drums, officialFantasySet.set2_post_drums);
      const scoreEncore = scoreGuess(guess.encore, officialFantasySet.encore);
      const totalScore = scoreSet1 + scorePre + scorePost + scoreEncore;

      updates.push({
        id: guess.id,
        total_score: totalScore,
      });
    }

    // Sort and assign prize rank
    updates.sort((a, b) => b.total_score - a.total_score);

    const topScore = updates[0]?.total_score || 0;
    const winnerIds = updates.filter((u) => u.total_score === topScore).map((u) => u.id);

    let rank = 1;
    let previousScore = null;
    let currentPrizeRank = 1;
    const idToPrizeRank: Record<string, string> = {};

    for (const update of updates) {
      if (previousScore !== null && update.total_score < previousScore) {
        currentPrizeRank = rank;
      }
      if (currentPrizeRank <= 3) {
        idToPrizeRank[update.id] = currentPrizeRank.toString();
      }
      previousScore = update.total_score;
      rank++;
    }

    // Update in DB
    for (const update of updates) {
      await supabase
        .from('fantasy_setlist_guesses')
        .update({
          total_score: update.total_score,
          is_winner: winnerIds.includes(update.id),
          prize_rank: idToPrizeRank[update.id] || null,
        })
        .eq('id', update.id);
    }

    // Update setlists with mode-based winners
    await supabase
      .from('setlists')
      .update({
        [`fantasy_total_winners_${mode}`]: winnerIds.length,
        [`fantasy_winner_ids_${mode}`]: winnerIds,
      })
      .eq('show_id', showId);
  }
}
