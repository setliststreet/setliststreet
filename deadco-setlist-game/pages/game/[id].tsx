import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/MainLayout';
import SongPicker from '../../components/SongPicker';
import PaymentButton from '../../components/PaymentButton';
import SetlistDragDropPicker from '../../components/SetlistDragDropPicker';
import { supabase } from '../../utils/supabaseClient';

interface Game {
  id: number;
  type: string;
  show_date: string;
  is_open: boolean;
  entry_fee: number;
}

interface Song {
  id: number;
  name: string;
}

export default function GamePage() {
  const router = useRouter();
  const { id } = router.query;
  const [songs, setSongs] = useState<Song[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<number, number>>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [slotStats, setSlotStats] = useState<Record<number, Record<number, number>>>({});
  const numSlots = 10; // For full setlist, allow 10 picks
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([
      supabase.from('songs').select('id, name'),
      supabase.from('games').select('id, type, show_date, is_open, entry_fee').eq('id', id).single(),
      supabase.from('entries').select('guesses').eq('game_id', id)
    ]).then(([songsRes, gameRes, entriesRes]) => {
      if (songsRes.error) setError(songsRes.error.message);
      else setSongs(songsRes.data || []);
      if (gameRes.error) setError(gameRes.error.message);
      else setGame(gameRes.data || null);
      // Voting stats
      if (entriesRes.error) setError(entriesRes.error.message);
      else {
        const counts: Record<number, number> = {};
        let total = 0;
        const slotCounts: Record<number, Record<number, number>> = {};
        (entriesRes.data || []).forEach((entry: { guesses: string }) => {
          try {
            const guesses = JSON.parse(entry.guesses);
            if (Array.isArray(guesses) && guesses.length > 0) {
              // For single-pick games, just count first slot
              const songId = guesses[0];
              counts[songId] = (counts[songId] || 0) + 1;
              total++;
              // For full setlist, count each slot
              guesses.forEach((sid: number, slot: number) => {
                if (!slotCounts[slot]) slotCounts[slot] = {};
                slotCounts[slot][sid] = (slotCounts[slot][sid] || 0) + 1;
              });
            }
          } catch {}
        });
        setVoteCounts(counts);
        setTotalVotes(total);
        setSlotStats(slotCounts);
      }
      setLoading(false);
    });
  }, [id, submitted]);

  const handleSingleSubmit = async (songId: number) => {
    setSubmitError(null);
    const user_id = 'mock-user';
    const { error } = await supabase.from('entries').insert([
      { user_id, game_id: id, guesses: JSON.stringify([songId]), score: null }
    ]);
    if (error) setSubmitError(error.message);
    else setSubmitted(true);
  };

  const handleFullSetlistSubmit = async (songIds: number[]) => {
    setSubmitError(null);
    const user_id = 'mock-user';
    const { error } = await supabase.from('entries').insert([
      { user_id, game_id: id, guesses: JSON.stringify(songIds), score: null }
    ]);
    if (error) setSubmitError(error.message);
    else setSubmitted(true);
  };

  if (loading) return <main className="flex flex-col items-center justify-center min-h-screen"><p>Loading game...</p></main>;
  if (error) return <main className="flex flex-col items-center justify-center min-h-screen"><p className="text-red-500">Error: {error}</p></main>;
  if (submitted) return <main className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-2xl font-bold mb-4">Guess Submitted!</h1><p>Thank you for your entry.</p></main>;

  const isFullSetlist = game?.type === 'Full Setlist';
  const isPaid = (game?.entry_fee ?? 0) > 0;

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <h1 className="text-3xl font-bold mb-2">Game #{id}</h1>
        {game && (
          <div className="mb-6 text-center">
            <div className="text-lg font-semibold">{game.type} &mdash; {new Date(game.show_date).toLocaleDateString()}</div>
            <div className="text-sm text-gray-600">Entry Fee: {game.entry_fee === 0 ? 'Free' : `$${game.entry_fee}`}</div>
          </div>
        )}
        {isPaid && !hasPaid ? (
          <div className="mb-8">
            <PaymentButton amount={game?.entry_fee ?? 0} onSuccess={() => setHasPaid(true)} />
            <p className="text-gray-600 mt-2">You must pay to enter this game.</p>
          </div>
        ) : (
          isFullSetlist ? (
            <SetlistDragDropPicker availableSongs={songs} numSlots={numSlots} onSubmit={handleFullSetlistSubmit} />
          ) : (
            <SongPicker songs={songs} onSubmit={handleSingleSubmit} />
          )
        )}
        {submitError && <p className="text-red-500 mt-4">{submitError}</p>}

        {/* Voting Stats */}
        {Object.keys(voteCounts).length > 0 && (
          <div className="mt-8 bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Community Predictions ({totalVotes} votes)</h2>
            <div className="space-y-2">
              {Object.entries(voteCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([songId, count]) => {
                  const song = songs.find(s => s.id === parseInt(songId));
                  const percentage = Math.round((count / totalVotes) * 100);
                  return (
                    <div key={songId} className="flex justify-between items-center">
                      <span className="text-white">{song?.name || 'Unknown Song'}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-white/80 text-sm w-12">{percentage}%</span>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 