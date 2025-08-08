import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import ShowSelector from '../components/ShowSelector';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

const gamesConfig = [
  { table: 'opener_guesses', title: 'Guess the Opener — Top 5 Winners' },
  { table: 'set1_closer_guesses', title: 'Set 1 Closer — Top 5 Winners' },
  { table: 'set2_opener_guesses', title: 'Set 2 Opener — Top 5 Winners' },
  { table: 'set2_closer_guesses', title: 'Set 2 Closer — Top 5 Winners' },
  { table: 'set2_pre_drums_guesses', title: 'Set 2 Pre-Drums — Top 5 Winners' },
  { table: 'set2_post_drums_guesses', title: 'Set 2 Post-Drums — Top 5 Winners' },
  { table: 'fantasy_setlist_guesses', title: 'Fantasy Setlist — Top 5 Winners' }
];



export default function ViewResults() {
  const [selectedShow, setSelectedShow] = useState(null);
  const [leaderboards, setLeaderboards] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTopFiveWinners = async (showId) => {
    setLoading(true);
    const results = {};
    for (const game of gamesConfig) {
      const { data: guesses, error: guessesError } = await supabase
        .from(game.table)
        .select('id,user_id,guest_user_id,song,play_mode,amount,submitted_at,prize_rank')
        .eq('show_id', String(showId).trim())
        .eq('is_winner', true)
        .order('amount', { ascending: false })
        .limit(5);
      if (!guessesError && guesses.length) {
        const guestIds = Array.from(new Set(guesses.filter(g => g.guest_user_id).map(g => g.guest_user_id)));
        let guestMap = {};
        if (guestIds.length) {
          const { data: guests } = await supabase
            .from('guest_users')
            .select('id,email')
            .in('id', guestIds);
          if (guests) {
            guestMap = guests.reduce((acc, g) => {
              acc[g.id] = g.email || null;
              return acc;
            }, {});
          }
        }
        results[game.table] = guesses.map((row, idx) => {
          const display = row.guest_user_id ? (guestMap[row.guest_user_id] || 'Guest') : (row.user_id ? `user:${String(row.user_id).slice(0,8)}` : 'Guest');
          return {
            position: idx + 1,
            id: row.id,
            display,
            song: row.song,
            amount: row.amount ?? 0,
            play_mode: row.play_mode,
            prize_rank: row.prize_rank ?? null,
            submitted_at: row.submitted_at
          };
        });
      } else {
        results[game.table] = [];
      }
    }
    setLeaderboards(results);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedShow && selectedShow.id) {
      fetchTopFiveWinners(selectedShow.id);
    } else {
      setLeaderboards({});
    }
  }, [selectedShow]);

  const playModeColor = (mode) => {
    if (!mode) return 'black';
    switch (mode.toLowerCase()) {
      case 'cash': return 'green';
      case 'prize': return 'gold';
      case 'charity': return 'blue';
      case 'fun': return 'gray';
      default: return 'black';
    }
  };

  return (
    <MainLayout>
      <div className='countdown-outer'>
        <div className='center-wrapper'>
          <div className="p-6 game-card">
            <h1 className="text-2xl font-bold mb-4">View Game Results</h1>
            <section className="mb-6">
              <ShowSelector selectedShow={selectedShow} onShowSelect={setSelectedShow} />
              <p className="mt-2 text-sm text-gray-600">
                Viewing results for: {selectedShow ? `${selectedShow.date || selectedShow.label || selectedShow.id}` : 'None'}
              </p> 
            </section>
            <div className="space-y-12">

            {gamesConfig.map(game => (
              <section key={game.table} className="mb-8">
                <h2 className="text-xl font-semibold mb-3">{game.title}</h2>
                {loading && <p className="text-sm text-gray-600">Loading top 5 winners…</p>}
                {!loading && (!leaderboards[game.table] || leaderboards[game.table].length === 0) && <p className="text-sm text-gray-600">No winners found.</p>}
                {!loading && leaderboards[game.table] && leaderboards[game.table].length > 0 && (
                  
                  <div className="overflow-x-auto border rounded">
                    <table className="min-w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 border">Rank</th>
                          <th className="px-3 py-2 border">Email / User</th>
                          <th className="px-3 py-2 border">Song</th>
                          <th className="px-3 py-2 border">Amount</th>
                          <th className="px-3 py-2 border">Play Mode</th>
                          <th className="px-3 py-2 border">Prize Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        
                        {leaderboards[game.table].map(p => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 border text-center">{p.position}</td>
                            <td className="px-3 py-2 border">{p.display}</td>
                            <td className="px-3 py-2 border">{p.song}</td>
                            <td className="px-3 py-2 border text-right">{p.amount}</td>
                            <td className="px-3 py-2 border" style={{ color: playModeColor(p.play_mode) }}>{p.play_mode}</td>
                            <td className="px-3 py-2 border">{p.prize_rank || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                )}
                <div className="mt-4">
                  <Link href={`/results/${game.table}`} className="text-blue-500 hover:underline">View Full {game.title}</Link>
                </div>
              </section>
            ))}
          </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
}
