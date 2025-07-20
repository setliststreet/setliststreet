import React, { useState, useEffect } from 'react';

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

export default function PoolSizeDisplay({ gameId, showId, onPrizeInfoClick, showDate }: PoolSizeDisplayProps) {
  const [poolData, setPoolData] = useState<PoolData>({
    funPlayers: 0,
    cashPlayers: 0,
    cashPool: 0,
    charityPlayers: 0,
    charityPool: 0,
    uniqueCharities: 0,
    prizePlayers: 0,
  });

  // Mock data - would come from real-time API/WebSocket
  useEffect(() => {
    const mockData: PoolData = {
      funPlayers: Math.floor(Math.random() * 150) + 50,
      cashPlayers: Math.floor(Math.random() * 75) + 25,
      cashPool: Math.floor(Math.random() * 2000) + 500,
      charityPlayers: Math.floor(Math.random() * 40) + 15,
      charityPool: Math.floor(Math.random() * 800) + 200,
      uniqueCharities: Math.floor(Math.random() * 8) + 3,
      prizePlayers: Math.floor(Math.random() * 30) + 10,
    };
    
    setPoolData(mockData);

    // Simulate live updates every 5 seconds
    const interval = setInterval(() => {
      setPoolData(prev => ({
        funPlayers: prev.funPlayers + Math.floor(Math.random() * 3),
        cashPlayers: prev.cashPlayers + Math.floor(Math.random() * 2),
        cashPool: prev.cashPool + Math.floor(Math.random() * 50),
        charityPlayers: prev.charityPlayers + Math.floor(Math.random() * 2),
        charityPool: prev.charityPool + Math.floor(Math.random() * 25),
        uniqueCharities: Math.min(prev.uniqueCharities + (Math.random() > 0.9 ? 1 : 0), 15),
        prizePlayers: prev.prizePlayers + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [gameId, showId]);

  const totalPlayers = poolData.funPlayers + poolData.cashPlayers + poolData.charityPlayers + poolData.prizePlayers;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        Live Player Pool{showDate ? ` - ${formatShowDate(showDate)}` : showId ? ` - Show ${showId}` : ''}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center items-stretch w-full overflow-x-auto">
        {/* Total Players */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-center min-w-[110px] flex flex-col justify-center">
          <div className="text-xl font-bold text-gray-800 leading-none">{totalPlayers}</div>
          <div className="text-xs text-gray-600 leading-none">Total Players</div>
          <div className="text-xs text-green-600 leading-none">Live</div>
        </div>
        {/* Fun Players */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-center min-w-[110px] flex flex-col justify-center">
          <div className="text-xl font-bold text-blue-800 leading-none">{poolData.funPlayers}</div>
          <div className="text-xs text-blue-700 leading-none">Fun Players</div>
          <div className="text-xs text-blue-600 leading-none">Free Play</div>
        </div>
        {/* Cash Players */}
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-center min-w-[110px] flex flex-col justify-center">
          <div className="text-xl font-bold text-green-800 leading-none">{poolData.cashPlayers}</div>
          <div className="text-xs text-green-700 leading-none">Cash Players</div>
          <div className="text-xs text-green-600 leading-none">Pool: ${poolData.cashPool.toLocaleString()}</div>
        </div>
        {/* Charity Players */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-center min-w-[110px] flex flex-col justify-center">
          <div className="text-xl font-bold text-purple-800 leading-none">{poolData.charityPlayers}</div>
          <div className="text-xs text-purple-700 leading-none">Charity Players</div>
          <div className="text-xs text-purple-600 leading-none">${poolData.charityPool.toLocaleString()} • {poolData.uniqueCharities} charities</div>
        </div>
        {/* Prize Players */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 text-center min-w-[110px] flex flex-col justify-center">
          <div className="text-xl font-bold text-yellow-800 leading-none">{poolData.prizePlayers}</div>
          <div className="text-xs text-yellow-700 leading-none">Prize Players</div>
          <button
            onClick={onPrizeInfoClick}
            className="text-xs text-yellow-600 hover:text-yellow-800 underline leading-none mt-1"
          >
            View Available Prizes →
          </button>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">
          Pool sizes update every 5 seconds • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
} 

// Add a helper to format the show date as 'Friday, August 1, 2025'
function formatShowDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
} 