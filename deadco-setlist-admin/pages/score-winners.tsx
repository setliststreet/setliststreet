// pages/admin/score-winners.tsx
import { useState } from 'react';import { createClient } from '@supabase/supabase-js';



const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);


export default function ScoreWinnersAdmin() {
  const [showId, setShowId] = useState('');
  const [message, setMessage] = useState('');

  const handleScore = async () => {
    if (!showId) {
      alert('Enter a valid show ID');
      return;
    }

    setMessage('Scoring...');
    try {
      const { data: setlist, error } = await supabase
        .from('fantasy_actual_setlists')
        .select('*')
        .eq('show_id', showId)
        .single();

      if (error || !setlist) {
        throw new Error('Could not fetch actual setlist.');
      }

      await decideFantasyWinners(
        showId,
        setlist.set1,
        setlist.set2_pre_drums,
        setlist.set2_post_drums,
        setlist.encore
      );

      setMessage('Winners scored successfully!');
    } catch (err: any) {
      console.error(err);
      setMessage('Error scoring winners: ' + err.message);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Admin: Score Fantasy Setlist Winners</h1>
      <input
        type="text"
        placeholder="Enter Show ID"
        value={showId}
        onChange={(e) => setShowId(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleScore}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Score Winners
      </button>
      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  );
}
