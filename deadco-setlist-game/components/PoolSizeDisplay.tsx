import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxfyeuwosrplubgaluwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM';
const supabase = createClient(supabaseUrl, supabaseKey);

interface PoolData {
  funPlayers: number;
  cashPlayers: number;
  cashPool: number;
  charityPlayers: number;
  charityPool: number;
  uniqueCharities: number;
  prizePlayers: number;
}

interface PoolSizeDisplayProps {
  gameId: string;
  showId?: string;
  onPrizeInfoClick?: () => void;
  showDate?: string;
}

const PoolSizeDisplay: React.FC<PoolSizeDisplayProps> = ({
  gameId,
  showId,
  onPrizeInfoClick,
  showDate
}) => {
  const [poolData, setPoolData] = useState<PoolData>({
    funPlayers: 0,
    cashPlayers: 0,
    cashPool: 0,
    charityPlayers: 0,
    charityPool: 0,
    uniqueCharities: 0,
    prizePlayers: 0
  });

  const [totalPlayers, setTotalPlayers] = useState(0);

  useEffect(() => {
const fetchData = async () => {
  try {
    let query = supabase
      .from('opener_guesses')
      .select('user_id, guest_user_id, play_mode, amount');

    if (showId) {
      query = query.eq('show_id', showId);
    }

    const { data: guesses, error } = await query;

    if (error) {
      console.error('Error fetching opener_guesses:', error);
      return;
    }

    const uniquePlayers = new Map<string, { mode: string; amount: number }>();

    guesses.forEach(({ user_id, guest_user_id, play_mode, amount }) => {
      const playerId = user_id || guest_user_id;
      if (!playerId) return;

      // Only store the first entry for each player
      if (!uniquePlayers.has(playerId)) {
        uniquePlayers.set(playerId, {
          mode: play_mode,
          amount: Number(amount) || 0
        });
      }
    });

    const all = [...uniquePlayers.values()];

    const funPlayers = all.filter(p => p.mode === 'fun').length;
    const cashPlayers = all.filter(p => p.mode === 'cash').length;
    const cashPool = all.filter(p => p.mode === 'cash').reduce((sum, p) => sum + p.amount, 0);

    const charityPlayers = all.filter(p => p.mode === 'charity').length;
    const charityPool = all.filter(p => p.mode === 'charity').reduce((sum, p) => sum + p.amount, 0);

    const prizePlayers = all.filter(p => p.mode === 'prize').length;
    const uniqueCharities = Math.floor(charityPlayers / 2); // Or update with real data if needed

    const newPoolData: PoolData = {
      funPlayers,
      cashPlayers,
      cashPool,
      charityPlayers,
      charityPool,
      uniqueCharities,
      prizePlayers
    };

    alert(
      `🎮 Current Game Pools:\n\n` +
      `👾 Fun Players: ${newPoolData.funPlayers}\n` +
      `💰 Cash Players: ${newPoolData.cashPlayers} | Pool: $${newPoolData.cashPool}\n` +
      `🎗 Charity Players: ${newPoolData.charityPlayers} | Pool: $${newPoolData.charityPool} | Unique Charities: ${newPoolData.uniqueCharities}\n` +
      `🏆 Prize Players: ${newPoolData.prizePlayers}`
    );

    setPoolData(newPoolData);
    setTotalPlayers(uniquePlayers.size);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};


  fetchData();
  const interval = setInterval(fetchData, 5000);
  return () => clearInterval(interval);
}, [gameId, showId]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // ✅ Total Players from guest_users
  //       const { count: totalGuestUsers, error: guestError } = await supabase
  //         .from('guest_users')
  //         .select('*', { count: 'exact', head: true });

  //       if (guestError) console.error('guest_users error:', guestError);
  //       setTotalPlayers(totalGuestUsers || 0);

  //       // ✅ Get opener_guesses data
  //       let query = supabase
  //         .from('opener_guesses')
  //         .select('user_id, song');

  //       if (showId) {
  //         query = query.eq('show_id', showId);
  //       }

  //       const { data: guesses, error: guessError } = await query;

  //       if (guessError) {
  //         console.error('opener_guesses error:', guessError);
  //         return;
  //       }

  //       const uniqueUsers = [...new Set(guesses.map(g => g.user_id))];
  //       const total = uniqueUsers.length;

  //       // alert(`Total unique players: ${total}`);

  //       const fun = Math.floor(total * 0.5);
  //       const cash = Math.floor(total * 0.25);
  //       const charity = Math.floor(total * 0.15);
  //       const prize = total - fun - cash - charity;

  //       const newPoolData: PoolData = {
  //         funPlayers: fun,
  //         cashPlayers: cash,
  //         cashPool: cash * 20,
  //         charityPlayers: charity,
  //         charityPool: charity * 15,
  //         uniqueCharities: Math.floor(charity / 2),
  //         prizePlayers: prize
  //       };

  //       setPoolData(newPoolData);
  //     } catch (err) {
  //       console.error('Unexpected error:', err);
  //     }
  //   };

  //   fetchData();
  //   const interval = setInterval(fetchData, 5000);
  //   return () => clearInterval(interval);
  // }, [gameId, showId]);

  const formatShowDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="green-game-card bg-gradient-to-br from-green-100 via-white to-green-200 shadow-xl rounded-xl p-4 mb-6 border-0">
      <h3 className="text-lg font-bold text-green-900 mb-3 text-center drop-shadow tracking-wide">
        Live Player Pool{showDate ? ` - ${formatShowDate(showDate)}` : showId ? ` - Show ${showId}` : ''}
      </h3>

      <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center items-stretch w-full overflow-x-auto">
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-200 shadow-md rounded-lg px-3 py-3 text-center min-w-[90px] flex flex-col justify-center border-0">
          <div className="text-lg font-bold text-gray-900 leading-none drop-shadow">{totalPlayers}</div>
          <div className="text-xs text-gray-600 leading-none font-semibold mt-1">Total Players</div>
          <div className="text-xs text-green-600 leading-none mt-1 font-bold">Live</div>
        </div>

        <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 shadow-md rounded-lg px-3 py-3 text-center min-w-[90px] flex flex-col justify-center border-0">
          <div className="text-lg font-bold text-blue-900 leading-none drop-shadow">{poolData.funPlayers}</div>
          <div className="text-xs text-blue-700 leading-none font-semibold mt-1">Fun Players</div>
          <div className="text-xs text-blue-600 leading-none mt-1 font-bold">Free Play</div>
        </div>

        <div className="bg-gradient-to-br from-green-200 via-white to-green-300 shadow-md rounded-lg px-3 py-3 text-center min-w-[90px] flex flex-col justify-center border-0">
          <div className="text-lg font-bold text-green-900 leading-none drop-shadow">{poolData.cashPlayers}</div>
          <div className="text-xs text-green-700 leading-none font-semibold mt-1">Cash Players</div>
          <div className="text-xs text-green-700 leading-none mt-1 font-bold">
            Pool: ${poolData.cashPool.toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 via-white to-purple-200 shadow-md rounded-lg px-3 py-3 text-center min-w-[90px] flex flex-col justify-center border-0">
          <div className="text-lg font-bold text-purple-900 leading-none drop-shadow">{poolData.charityPlayers}</div>
          <div className="text-xs text-purple-700 leading-none font-semibold mt-1">Charity Players</div>
          <div className="text-xs text-purple-700 leading-none mt-1 font-bold">
            ${poolData.charityPool.toLocaleString()} • {poolData.uniqueCharities} charities
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 via-white to-yellow-200 shadow-md rounded-lg px-3 py-3 text-center min-w-[90px] flex flex-col justify-center border-0">
          <div className="text-lg font-bold text-yellow-900 leading-none drop-shadow">{poolData.prizePlayers}</div>
          <div className="text-xs text-yellow-700 leading-none font-semibold mt-1">Prize Players</div>
          <button
            onClick={onPrizeInfoClick}
            className="px-4 py-2 rounded-lg font-cartoon text-xs bg-white border-2 border-yellow-400 shadow hover:scale-105 hover:bg-yellow-50 hover:text-yellow-700 transition-transform duration-150 active:translate-y-1 active:shadow-sm mt-2 font-bold tracking-wide"
            style={{ boxShadow: '0 4px 0 #f7e07c, 0 4px 12px rgba(255, 221, 51, 0.18)' }}
          >
            View Available Prizes →
          </button>
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500 font-semibold drop-shadow">
          Pool sizes update every 5 seconds • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default PoolSizeDisplay;
