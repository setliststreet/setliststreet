import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';

const supabase = createClient(supabaseUrl, supabaseKey);


// Type definition
type FantasyGuess = {
  id: string;
  user_id: string | null;
  guest_user_id: string | null;
  total_score: number;
  prize_rank: number | null;
  play_mode: string | null;
};

const modeLabels: Record<string, string> = {
  fun: '🎮 Fun Mode',
  cash: '💸 Cash Mode',
  charity: '❤️ Charity Mode',
  prize: '🏆 Prize Mode',
};

const FantasyWinners = () => {
  const [winners, setWinners] = useState<FantasyGuess[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

useEffect(() => {
  const fetchWinners = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    const userId = session?.user?.id || null;

    let guestEmail: string | null = null;
    let guestUserId: string | null = null;

    if (!userId) {
      guestEmail = localStorage.getItem('guest_email'); // or your getGuestEmail() function
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

    setCurrentUserId(userId || guestUserId);

    const { data, error } = await supabase
      .from('fantasy_setlist_guesses')
      .select('*')
      .order('total_score', { ascending: false });

    if (error) {
      console.error('Error fetching winners:', error.message);
    } else {
      const filtered = (data as FantasyGuess[]).filter(
        (w) => w.user_id === userId || w.guest_user_id === guestUserId
      );
      setWinners(filtered);
    }
  };

  fetchWinners();
}, []);


  const getBackground = (rank: number | null, mode: string) => {
    if (mode === 'prize') {
      if (rank === 1) return 'bg-yellow-300';
      if (rank === 2) return 'bg-gray-300';
      if (rank === 3) return 'bg-orange-300';
    }
    return 'bg-white';
  };

  const isCurrentUser = (w: FantasyGuess) => {
    return w.user_id === currentUserId;
  };

  const groupedWinners = winners.reduce<Record<string, FantasyGuess[]>>((acc, w) => {
    const mode = w.play_mode ?? 'unknown';
    if (!acc[mode]) acc[mode] = [];
    acc[mode].push(w);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Fantasy Winners</h2>

      {Object.entries(groupedWinners).map(([modeKey, list]) => {
        const mode = modeKey || 'unknown';
        return (
          <div key={mode} className="mb-6">
            <h3 className="text-lg font-bold mb-2 text-center">
              {modeLabels[mode] ?? '🎲 Unknown Mode'}
            </h3>

          {(() => {
  // Find the current user's rank and score across all modes combined
  let userRank = null;
  let userScore = null;
  let userMode = null;

  // Flatten all winners with their ranks
  const allWinners: { guess: FantasyGuess; rank: number }[] = [];

  Object.entries(groupedWinners).forEach(([mode, list]) => {
    list.forEach((w, idx) => {
      if (isCurrentUser(w)) {
        userRank = idx + 1;
        userScore = w.total_score ?? 0;
        userMode = mode;
      }
      allWinners.push({ guess: w, rank: idx + 1 });
    });
  });

  if (userRank === null) {
    // User not found
    return (
      <p className="text-center text-red-600 text-lg font-semibold">
        Sorry, you did not rank in the game this time. Better luck next time!
      </p>
    );
  }

  // Ordinal suffix helper
  const getOrdinal = (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) return `${n}st`;
    if (n % 10 === 2 && n % 100 !== 12) return `${n}nd`;
    if (n % 10 === 3 && n % 100 !== 13) return `${n}rd`;
    return `${n}th`;
  };

  return (
    <div className="bg-green-100 p-6 rounded-md text-center max-w-md mx-auto shadow-md">
      <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
      <p className="text-lg mb-2">
        You ranked <span className="font-extrabold">{getOrdinal(userRank)}</span> in{' '}
        <span className="font-semibold">{modeLabels[mode] ?? mode}</span>!
      </p>
      <p className="text-lg">
        Your score is <span className="font-bold">{userScore}</span>.
      </p>
    </div>
  );
})()}

          </div>
        );
      })}
    </div>
  );
};

export default FantasyWinners;


