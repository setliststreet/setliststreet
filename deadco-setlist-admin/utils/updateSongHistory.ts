import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);



export const updateSongHistory = async (setlist: {
  set1?: string[];
  set2_pre_drums?: string[];
  set2_post_drums?: string[];
  encore?: string[];
}) => {
  const allSongs = [
    ...(setlist.set1 || []),
    ...(setlist.set2_pre_drums || []),
    ...(setlist.set2_post_drums || []),
    ...(setlist.encore || []),
  ];

  const today = new Date().toISOString().split('T')[0];

  for (const song of allSongs) {
    const { data: existing, error } = await supabase
      .from('song_history')
      .select('*')
      .eq('song', song)
      .maybeSingle();

    if (error) {
      console.error(`Error checking song ${song}:`, error.message);
      continue;
    }

    if (existing) {
      await supabase
        .from('song_history')
        .update({
          play_count: existing.play_count + 1,
          last_seen_at: today,
        })
        .eq('song', song);
    } else {
      await supabase.from('song_history').insert({
        song,
        play_count: 1,
        last_seen_at: today,
      });
    }
  }
};

// Types for safety
export const decideFantasyWinners = async (showId: string): Promise<void> => {
  const { data: setlist, error: setlistError } = await supabase
    .from('setlists')
    .select('*')
    .eq('show_id', showId)
    .single();

  if (setlistError || !setlist) {
    console.error('❌ Setlist not found:', setlistError?.message);
    return;
  }

  await updateSongHistory(setlist);

  const { data: guesses, error: guessesError } = await supabase
    .from('fantasy_setlist_guesses')
    .select('*')
    .eq('show_id', showId);

  if (guessesError || !guesses || guesses.length === 0) {
    console.error('❌ No guesses found:', guessesError?.message);
    return;
  }

  for (const guess of guesses) {
    let score = 0;
    const sections = ['set1', 'set2_pre_drums', 'set2_post_drums', 'encore'];

    for (const section of sections) {
      const actual: string[] = setlist[section] || [];
      const user: string[] = guess[section] || [];

      let perfectMatch = actual.length === user.length;

      for (let i = 0; i < actual.length; i++) {
        const song = actual[i];
        if (user[i] === song) {
          score += 20;
        } else if (user.includes(song)) {
          score += 10;
          perfectMatch = false;
        } else {
          perfectMatch = false;
        }
      }

      if (perfectMatch) {
        score += 10;
      }
    }

    const allUserSongs = [
      ...(guess.set1 || []),
      ...(guess.set2_pre_drums || []),
      ...(guess.set2_post_drums || []),
      ...(guess.encore || [])
    ];

    const { data: songMeta, error: songMetaError } = await supabase
      .from('song_history')
      .select('song, play_count')
      .in('song', allUserSongs);

    if (songMeta && !songMetaError) {
      for (const meta of songMeta) {
        if (meta.play_count <= 2) {
          score += 5;
        }
      }
    }

    await supabase
      .from('fantasy_setlist_guesses')
      .update({ score })
      .eq('id', guess.id);
  }

  const { data: scored, error: rankError } = await supabase
    .from('fantasy_setlist_guesses')
    .select('*')
    .eq('show_id', showId)
    .order('score', { ascending: false });

  if (rankError || !scored) {
    console.error('❌ Error ranking players:', rankError?.message);
    return;
  }

  for (let i = 0; i < scored.length; i++) {
    await supabase
      .from('fantasy_setlist_guesses')
      .update({ rank: i + 1 })
      .eq('id', scored[i].id);
  }

  console.log('✅ Fantasy winners scored and ranked!');
};