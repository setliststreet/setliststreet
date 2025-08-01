'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { decideFantasyWinners } from '@admin/utils/decideFantasyWinners';

const supabase = createClient(
  'https://cxfyeuwosrplubgaluwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM'
);

type FantasySet = {
  fantasy_set1: string[];
  fantasy_set2_pre_drums: string[];
  fantasy_set2_post_drums: string[];
  fantasy_encore: string[];
};

export default function AdminDecideWinners({ showId }: { showId?: string }) {
  const [status, setStatus] = useState('');
  const [fantasySet, setFantasySet] = useState<FantasySet | null>(null);
  const [fullSetlist, setFullSetlist] = useState<any>(null);

  useEffect(() => {
    const fetchFantasySet = async () => {
      if (!showId) return;

      const { data, error } = await supabase
        .from('setlists')
        .select('*') // fetch everything so we can use for both fantasy and history
        .eq('show_id', showId)
        .single();

      if (error || !data) {
        console.error('❌ Failed to fetch setlist:', error);
        setStatus('❌ Error loading setlist');
        return;
      }

      setFantasySet({
        fantasy_set1: data.fantasy_set1 || [],
        fantasy_set2_pre_drums: data.fantasy_set2_pre_drums || [],
        fantasy_set2_post_drums: data.fantasy_set2_post_drums || [],
        fantasy_encore: data.fantasy_encore || [],
      });

      setFullSetlist({
        set1: data.set1 || [],
        set2_pre_drums: data.set2_pre_drums || [],
        set2_post_drums: data.set2_post_drums || [],
        encore: data.encore || [],
      });
    };

    fetchFantasySet();
  }, [showId]);

  const handleDecideWinners = async () => {
    if (!showId || !fantasySet || !fullSetlist) {
      setStatus('⚠️ Missing required data');
      return;
    }

    setStatus('⏳ Updating history & calculating winners...');
    try {
      await decideFantasyWinners(showId);
      setStatus('✅ Winners calculated and history updated!');
    } catch (error) {
      console.error(error);
      setStatus('❌ Failed during winner scoring.');
    }
  };

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50 space-y-2">
      <h2 className="text-lg font-bold">🏆 Decide Fantasy Winners</h2>
      <button
        onClick={handleDecideWinners}
        disabled={!fantasySet || !fullSetlist}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Calculate Winners
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
}
