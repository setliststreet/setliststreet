
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { getGuestEmail } from '@/lib/guestHelpers';
import { decideFantasyWinners } from '@/utils/decideFantasyWinners';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);



export const handleFantasySetlistSubmission = async ({
  showId,
  set1,
  set2_pre_drums,
  set2_post_drums,
  encore,
  playMode,
  amount = null,
  guestEmail = null,
  guestUserId = null,
}: {
  showId: string;
  set1: string[];
  set2_pre_drums: string[];
  set2_post_drums: string[];
  encore: string[];
  playMode: 'fun' | 'cash' | 'charity' | 'prize';
  amount?: number | null;
  guestEmail?: string | null;
  guestUserId?: string | null;
}) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session?.user?.id || null;

  if (!userId) {
    guestEmail = getGuestEmail();
    if (!guestEmail) {
      alert('Please log in or enter your email to continue.');
      return;
    }

    const { data: guestData, error: guestError } = await supabase
      .from('guest_users')
      .select('id')
      .eq('email', guestEmail)
      .single();

    if (guestError || !guestData) {
      console.error('❌ Guest user not found:', guestError);
      alert('❌ No guest account found with that email.');
      return;
    }

    guestUserId = guestData.id;
  }

  if (
    !showId ||
    !Array.isArray(set1) || set1.length === 0 ||
    !Array.isArray(set2_pre_drums) || set2_pre_drums.length === 0 ||
    !Array.isArray(set2_post_drums) || set2_post_drums.length === 0 ||
    !Array.isArray(encore) || encore.length === 0
  ) {
    alert('Please complete all fantasy setlist sections.');
    return;
  }

  if (!guestUserId && !userId) {
    alert('User not logged in or guest ID missing.');
    return;
  }

  // ✅ Check for existing submission
  const checkQuery = supabase
    .from('fantasy_setlist_guesses')
    .select('id')
    .eq('show_id', showId)
    .eq('play_mode', playMode)
    .limit(1);

  if (userId) {
    checkQuery.eq('user_id', userId);
  } else {
    checkQuery.eq('guest_user_id', guestUserId);
  }

  const { data: existingGuess, error: checkError } = await checkQuery.maybeSingle();

  if (checkError) {
    console.error('Error checking for existing guess:', checkError);
    alert('Error checking existing submissions. Please try again.');
    return;
  }

  if (existingGuess) {
    alert(`You’ve already submitted a guess for this show in "${playMode}" mode.`);
    return;
  }

  
  // ✅ Payment step for 'cash' or 'charity' mode

  alert(`Redirecting to payment... ${amount ? `$${(amount / 100).toFixed(2)}` : '$45.00'}.`);



  // ✅ Submit fantasy guess
  const guessPayload = {
    show_id: showId,
    play_mode: playMode,
    amount,
    submitted_at: new Date().toISOString(),
    set1,
    set2_pre_drums,
    set2_post_drums,
    encore,
    user_id: userId,
    guest_user_id: userId ? null : guestUserId,
  };

  const { error: insertError } = await supabase
    .from('fantasy_setlist_guesses')
    .insert(guessPayload);

  if (insertError) {
    console.error('Fantasy guess submission error:', insertError);
    alert('There was an error submitting your guess.');
    return;
  }

  // ✅ Update song history counts
  const allSongs = [...set1, ...set2_pre_drums, ...set2_post_drums, ...encore];
  const songCounts: Record<string, number> = {};

  allSongs.forEach((song) => {
    songCounts[song] = (songCounts[song] || 0) + 1;
  });

  await Promise.all(
    Object.entries(songCounts).map(async ([songName, count]) => {
      const { data: existing } = await supabase
        .from('song_history')
        .select('id, play_count')
        .eq('song_name', songName)
        .maybeSingle();

      if (existing) {
        await supabase
          .from('song_history')
          .update({ play_count: (existing.play_count ?? 0) + count })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('song_history')
          .insert({ song_name: songName, play_count: count });
      }
    })
  );

  // ✅ Trigger fantasy winner logic
  try {
    await decideFantasyWinners(showId);
    console.log('✅ Winner calculation complete.');
  } catch (err) {
    console.error('❌ Error running winner logic:', err);
  }
};


// export const handleFantasySetlistSubmission = async ({
//   showId,
//   set1,
//   set2_pre_drums,
//   set2_post_drums,
//   encore,
//   playMode,
//   amount = null,
//   guestEmail = null,
//   guestUserId = null,
// }: {
//   showId: string;
//   set1: string[];
//   set2_pre_drums: string[];
//   set2_post_drums: string[];
//   encore: string[];
//   playMode: 'fun' | 'cash' | 'charity' | 'prize';
//   amount?: number | null;
//   guestEmail?: string | null;
//   guestUserId?: string | null;
// }) => {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   const userId = session?.user?.id || null;

//   if (!userId) {
//     guestEmail = getGuestEmail();
//     if (!guestEmail) {
//       alert('Please log in or enter your email to continue.');
//       return;
//     }

//     const { data: guestData, error: guestError } = await supabase
//       .from('guest_users')
//       .select('id')
//       .eq('email', guestEmail)
//       .single();

//     if (guestError || !guestData) {
//       console.error('❌ Guest user not found:', guestError);
//       alert('❌ No guest account found with that email.');
//       return;
//     }

//     guestUserId = guestData.id;
//   }

//   if (
//     !showId ||
//     !Array.isArray(set1) || set1.length === 0 ||
//     !Array.isArray(set2_pre_drums) || set2_pre_drums.length === 0 ||
//     !Array.isArray(set2_post_drums) || set2_post_drums.length === 0 ||
//     !Array.isArray(encore) || encore.length === 0
//   ) {
//     alert('Please complete all fantasy setlist sections.');
//     return;
//   }

//   if (!guestUserId) {
//     alert('User not logged in or guest ID missing.');
//     return;
//   }

//   const guessPayload = {
//     show_id: showId,
//     play_mode: playMode,
//     amount,
//     submitted_at: new Date().toISOString(),
//     set1,
//     set2_pre_drums,
//     set2_post_drums,
//     encore,
//     user_id: userId,
//     guest_user_id: userId ? null : guestUserId,
//   };

//   const { error } = await supabase
//     .from('fantasy_setlist_guesses')
//     .insert(guessPayload);

//   if (error) {
//     console.error('Fantasy guess submission error:', error);
//     alert('There was an error submitting your guess.');
//     return;
//   }

//   // ✅ Update song history counts
//   const allSongs = [...set1, ...set2_pre_drums, ...set2_post_drums, ...encore];
//   const songCounts: Record<string, number> = {};

//   allSongs.forEach((song) => {
//     songCounts[song] = (songCounts[song] || 0) + 1;
//   });

//   await Promise.all(
//     Object.entries(songCounts).map(async ([songName, count]) => {
//       const { data: existing } = await supabase
//         .from('song_history')
//         .select('id, play_count')
//         .eq('song_name', songName)
//         .single();

//       if (existing) {
//         await supabase
//           .from('song_history')
//           .update({ play_count: existing.play_count + count })
//           .eq('id', existing.id);
//       } else {
//         await supabase
//           .from('song_history')
//           .insert({ song_name: songName, play_count: count });
//       }
//     })
//   );


//   // ✅ Trigger fantasy winner calculation
//   try {
//     await decideFantasyWinners(showId);
//     console.log('✅ Winner calculation complete.');
//   } catch (err) {
//     console.error('❌ Error running winner logic:', err);
//   }
// };



