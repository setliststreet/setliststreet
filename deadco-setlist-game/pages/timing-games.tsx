import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';

const TimingGamesHub = () => {
  const timingGames = [
    {
      title: 'Guess Start Time',
      description: 'Predict when the show will actually begin',
      href: '/guess-start-time',
      avgTime: '8:15 PM PT',
      range: '7:45 - 8:45 PM',
      players: '178 active'
    },
    {
      title: 'Guess End Time', 
      description: 'Predict when the show will end or total show length',
      href: '/guess-end-time',
      avgTime: '11:30 PM PT',
      range: '10:45 PM - 12:15 AM',
      players: '156 active'
    },
    {
      title: 'Set Break Length',
      description: 'Predict how long the set break will last',
      href: '/guess-set-break-length', 
      avgTime: '25 minutes',
      range: '15 - 40 minutes',
      players: '134 active'
    }
  ];

  return (
    <MainLayout>
      <Head>
        <title>Timing Prediction Games - Setlist Street</title>
        <meta name="description" content="Predict show timing, start times, end times, and set break lengths for Dead & Company shows!" />
      </Head>

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Timing Prediction Games
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test your instincts for Dead & Company's timing patterns. Predict start times, end times, and set lengths.
            </p>
          </div>

          {/* Game Instructions */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How Timing Predictions Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Scoring:</h3>
                <ul className="space-y-1">
                  <li>• Exact time = 100 points</li>
                  <li>• Within 5 minutes = 75 points</li>
                  <li>• Within 15 minutes = 50 points</li>
                  <li>• Within 30 minutes = 25 points</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Factors to Consider:</h3>
                <ul className="space-y-1">
                  <li>• Venue policies and curfews</li>
                  <li>• Day of week (weekday vs weekend)</li>
                  <li>• Weather conditions</li>
                  <li>• Special events or holidays</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Historical Data:</h3>
                <ul className="space-y-1">
                  <li>• Average start: 8:15 PM</li>
                  <li>• Average length: 3h 15m</li>
                  <li>• Set break: 20-30 minutes</li>
                  <li>• Weekend shows start later</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {timingGames.map((game, index) => (
              <Link key={index} href={game.href} className="group">
                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-gray-200 hover:border-gray-300 h-full">
                  <div className="text-center h-full flex flex-col">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {game.description}
                    </p>
                    
                    <div className="mt-auto space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Historical Average</div>
                        <div className="font-semibold text-gray-800">{game.avgTime}</div>
                        <div className="text-xs text-gray-500 mt-1">Range: {game.range}</div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        {game.players}
                      </div>
                      
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                        Make Prediction
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Timing Strategy Guide */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Timing Strategy Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Start Time Factors:</h4>
                <ul className="space-y-1">
                  <li>• Venue curfew restrictions</li>
                  <li>• Local parking and transit</li>
                  <li>• Opening act schedules</li>
                  <li>• Sound check completion</li>
                  <li>• Crowd size and entry speed</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Set Break Timing:</h4>
                <ul className="space-y-1">
                  <li>• Band energy and hydration needs</li>
                  <li>• Equipment changes or setup</li>
                  <li>• Merchandise and concession sales</li>
                  <li>• Temperature and weather</li>
                  <li>• Special guest appearances</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TimingGamesHub; 