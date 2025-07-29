import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Gift, Users, DollarSign, Heart, Sparkles } from 'lucide-react';

const supabase = createClient(
  'https://cxfyeuwosrplubgaluwv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZnlldXdvc3JwbHViZ2FsdXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTczNDUsImV4cCI6MjA2ODM5MzM0NX0.vvmhblExlhQu8QAd8NwAGxbu-eJzjsaRA6912XuQgTM'
);

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
  showDate?: string;
  onPrizeInfoClick?: () => void;
  table: string; // ✅ Accept just one table name from outside
}

const PoolSizeDisplay: React.FC<PoolSizeDisplayProps> = ({
  gameId,
  showId,
  showDate,
  onPrizeInfoClick,
  table
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
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    if (!showId || !table) return;

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('play_mode')
          .eq('show_id', showId);

        if (error) {
          console.error(`Error fetching from ${table}:`, error.message);
          return;
        }

        const modeCounts: Record<string, number> = {
          fun: 0,
          cash: 0,
          charity: 0,
          prize: 0
        };

        data.forEach((row: any) => {
          const mode = row.play_mode;
          if (mode && modeCounts.hasOwnProperty(mode)) {
            modeCounts[mode]++;
          }
        });

        const newPoolData: PoolData = {
          funPlayers: modeCounts.fun,
          cashPlayers: modeCounts.cash,
          cashPool: modeCounts.cash * 20,
          charityPlayers: modeCounts.charity,
          charityPool: modeCounts.charity * 15,
          uniqueCharities: Math.floor(modeCounts.charity / 2),
          prizePlayers: modeCounts.prize
        };

        setPoolData(newPoolData);
        setTotalPlayers(Object.values(modeCounts).reduce((a, b) => a + b, 0));
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [showId, table]);

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
    <div className="w-full flex justify-center mt-10">
      <div className="green-game-card bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl rounded-2xl p-6 border border-green-200 w-full max-w-screen-xl">
        <h3 className="text-xl font-extrabold text-green-800 mb-6 text-center drop-shadow tracking-wider">
          🎮 Live Player Pool
          {showDate ? ` - ${formatShowDate(showDate)}` : showId ? ` - Show ${showId}` : ''}
        </h3>

        <div className="flex flex-row justify-center items-stretch gap-6 overflow-x-auto px-2 pb-2">
          {[
            {
              icon: <Users className="mx-auto text-gray-500 mb-2" size={24} />,
              value: totalPlayers,
              label: 'Total Players',
              subLabel: 'Live',
              textColor: 'text-gray-800',
              subColor: 'text-green-600',
              bg: 'from-gray-50 via-white to-gray-100 border-gray-200',
            },
            {
              icon: <Sparkles className="mx-auto text-blue-500 mb-2" size={24} />,
              value: poolData.funPlayers,
              label: 'Fun Players',
              subLabel: 'Free Play',
              textColor: 'text-blue-900',
              subColor: 'text-blue-500',
              bg: 'from-blue-100 via-white to-blue-200 border-blue-100',
            },
            {
              icon: <DollarSign className="mx-auto text-green-600 mb-2" size={24} />,
              value: poolData.cashPlayers,
              label: 'Cash Players',
              subLabel: `Pool: $${poolData.cashPool.toLocaleString()}`,
              textColor: 'text-green-800',
              subColor: 'text-green-700',
              bg: 'from-green-100 via-white to-green-200 border-green-100',
            },
            {
              icon: <Heart className="mx-auto text-purple-500 mb-2" size={24} />,
              value: poolData.charityPlayers,
              label: 'Charity Players',
              subLabel: `$${poolData.charityPool.toLocaleString()} • ${poolData.uniqueCharities} charities`,
              textColor: 'text-purple-900',
              subColor: 'text-purple-700',
              bg: 'from-purple-100 via-white to-purple-200 border-purple-100',
            },
            {
              icon: <Gift className="mx-auto text-yellow-600 animate-pulse mb-2" size={24} />,
              value: poolData.prizePlayers,
              label: 'Prize Players',
              subLabel: '',
              textColor: 'text-yellow-900',
              subColor: 'text-yellow-700',
              bg: 'from-yellow-100 via-white to-yellow-200 border-yellow-100',
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${card.bg} rounded-xl px-5 py-5 text-center min-w-[130px] shadow-[0_8px_30px_rgba(0,0,0,0.05)] border transform transition-transform duration-300 hover:scale-[1.05] hover:rotate-x-[4deg] hover:rotate-y-[2deg]`}
            >
              {card.icon}
              <div className={`text-xl font-bold ${card.textColor}`}>{card.value}</div>
              <div className={`text-xs font-semibold ${card.subColor}`}>{card.label}</div>
              {card.subLabel && (
                <div className={`text-xs font-bold mt-1 ${card.subColor}`}>{card.subLabel}</div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onPrizeInfoClick}
          className="px-3 py-2 rounded-md text-xs font-bold bg-white text-yellow-800 border border-yellow-400 shadow-md mt-4 hover:bg-yellow-50 hover:scale-105 transition-all duration-150 active:translate-y-[1px]"
          style={{ boxShadow: '0 4px 0 #f7e07c, 0 4px 12px rgba(255, 221, 51, 0.18)' }}
        >
          View Prizes →
        </button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 font-semibold drop-shadow-sm">
            🔄 Pool updates every 5 seconds • Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoolSizeDisplay;
