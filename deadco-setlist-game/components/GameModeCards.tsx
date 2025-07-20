import React from 'react';
import Link from 'next/link';

export default function GameModeCards() {
  const gameModes = [
    {
      title: 'Setlist Bingo',
      description: 'Fill your card as songs are played',
      href: '/setlist-bingo',
      icon: '🎯'
    },
    {
      title: 'Guess the Opener',
      description: 'Predict the opening song',
      href: '/guess-opener',
      icon: '🎵'
    },
    {
      title: 'Setlist Builder',
      description: 'Build the complete setlist',
      href: '/setlist-builder',
      icon: '🎸'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {gameModes.map((game) => (
        <Link key={game.title} href={game.href} className="block">
          <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="text-center">
              <div className="text-3xl mb-4">{game.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {game.title}
              </h3>
              <p className="text-gray-600">
                {game.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
