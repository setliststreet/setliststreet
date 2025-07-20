import React from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  game: string;
}

interface LeaderboardProps {
  entries?: LeaderboardEntry[];
  title?: string;
}

export default function Leaderboard({ 
  entries = [
    { rank: 1, name: 'Sarah M.', score: 950, game: 'Setlist Bingo' },
    { rank: 2, name: 'Mike D.', score: 875, game: 'Guess the Opener' },
    { rank: 3, name: 'Jessica K.', score: 820, game: 'Setlist Builder' },
    { rank: 4, name: 'Tom R.', score: 780, game: 'Setlist Bingo' },
    { rank: 5, name: 'Alex P.', score: 750, game: 'Guess the Encore' }
  ],
  title = "Leaderboard"
}: LeaderboardProps) {
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      <div className="space-y-3">
        {entries.map((entry) => (
          <div 
            key={entry.rank}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  entry.rank === 2 ? 'bg-gray-400 text-gray-900' :
                  entry.rank === 3 ? 'bg-orange-400 text-orange-900' :
                  'bg-blue-400 text-blue-900'}
              `}>
                {entry.rank}
              </div>
              <div>
                <div className="font-medium text-gray-900">{entry.name}</div>
                <div className="text-sm text-gray-600">{entry.game}</div>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {entry.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
