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
  showId: number;
  onPrizeInfoClick?: () => void;
}

export default function PoolSizeDisplay({ gameId, showId, onPrizeInfoClick }: PoolSizeDisplayProps) {
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
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Player Pool - Show {showId}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Players */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">{totalPlayers}</div>
          <div className="text-sm text-gray-600">Total Players</div>
          <div className="text-xs text-green-600 mt-1">Live</div>
        </div>

        {/* Fun Players */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">{poolData.funPlayers}</div>
          <div className="text-sm text-blue-700">Fun Players</div>
          <div className="text-xs text-blue-600 mt-1">Free Play</div>
        </div>

        {/* Cash Players */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-800">{poolData.cashPlayers}</div>
          <div className="text-sm text-green-700">Cash Players</div>
          <div className="text-xs text-green-600 mt-1">
            Pool: ${poolData.cashPool.toLocaleString()}
          </div>
        </div>

        {/* Charity Players */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-800">{poolData.charityPlayers}</div>
          <div className="text-sm text-purple-700">Charity Players</div>
          <div className="text-xs text-purple-600 mt-1">
            ${poolData.charityPool.toLocaleString()} • {poolData.uniqueCharities} charities
          </div>
        </div>
      </div>

      {/* Prize Players Row */}
      <div className="mt-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-800">{poolData.prizePlayers}</div>
          <div className="text-sm text-yellow-700">Prize Players</div>
          <button
            onClick={onPrizeInfoClick}
            className="text-xs text-yellow-600 hover:text-yellow-800 underline mt-1"
          >
            View Available Prizes →
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Pool sizes update every 5 seconds • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
} 