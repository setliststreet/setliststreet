import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';

const GuessNextSongPage = () => {
  const [currentShow, setCurrentShow] = useState(1);
  const [selectedSong, setSelectedSong] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes default
  const [communityPredictions, setCommunityPredictions] = useState<{ song: string; percentage: number; count: number }[]>([]);
  const [userScore, setUserScore] = useState(0);
  const [currentSetlist, setCurrentSetlist] = useState({
    set1: ['Jack Straw', 'Ramble On Rose', 'Cassidy'],
    currentlyPlaying: 'Eyes of the World',
    set2: [],
    encore: []
  });

  // Mock song database - would come from Supabase
  const songs = [
    'Sugar Magnolia', 'Truckin\'', 'Casey Jones', 'Friend of the Devil',
    'Uncle John\'s Band', 'Ripple', 'Touch of Grey', 'Fire on the Mountain',
    'China Cat Sunflower', 'I Know You Rider', 'Playing in the Band',
    'Eyes of the World', 'Scarlet Begonias', 'Franklin\'s Tower', 'Deal',
    'Jack Straw', 'Tennessee Jed', 'Morning Dew', 'Help on the Way',
    'Slipknot!', 'St. Stephen', 'Dark Star', 'Terrapin Station'
  ];

  // Mock community predictions - would come from WebSocket
  useEffect(() => {
    const mockPredictions = [
      { song: 'Sugar Magnolia', percentage: 23, count: 47 },
      { song: 'Truckin\'', percentage: 18, count: 36 },
      { song: 'Fire on the Mountain', percentage: 15, count: 31 },
      { song: 'Uncle John\'s Band', percentage: 12, count: 24 },
      { song: 'Casey Jones', percentage: 8, count: 16 },
      { song: 'Touch of Grey', percentage: 7, count: 14 },
      { song: 'Deal', percentage: 5, count: 10 },
      { song: 'Ripple', percentage: 4, count: 8 },
      { song: 'Franklin\'s Tower', percentage: 3, count: 6 },
      { song: 'Morning Dew', percentage: 2, count: 4 }
    ];
    setCommunityPredictions(mockPredictions);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (isLive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmitPrediction = () => {
    if (!selectedSong) return;
    
    // Mock submission - would send to WebSocket
    console.log('Submitted prediction:', selectedSong);
    
    // Reset for next prediction
    setSelectedSong('');
    
    // Mock score update
    setUserScore(prev => prev + 1);
  };

  const LiveIndicator = () => (
    <div className={`flex items-center gap-2 ${isLive ? 'text-red-600' : 'text-gray-500'}`}>
      <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-red-600 animate-pulse' : 'bg-gray-400'}`}></div>
      <span className="font-semibold">
        {isLive ? '🔴 LIVE' : '⏰ Waiting for Show Start'}
      </span>
    </div>
  );

  return (
    <MainLayout>
      <Head>
        <title>Guess the Next Song (Live) - Setlist Street</title>
        <meta name="description" content="Real-time song prediction game during GD60 shows" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Guess the Next Song (Live)
        </h1>

        {/* Live Status */}
        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-6 mb-8 text-center">
          <LiveIndicator />
          <p className="text-lg mt-2">
            Current Show: Friday, August 1, 2025 • Golden Gate Park
          </p>
        </div>

        {/* Sponsor Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">Sponsored by: [PLACEHOLDER SPONSOR NAME]</p>
          <div className="bg-gray-200 rounded-lg p-8 text-gray-500">[SPONSOR LOGO PLACEHOLDER]</div>
        </div>

        {/* Main Game Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Live Setlist */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🎵 Live Setlist
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Set 1</h4>
                <ul className="space-y-1">
                  {currentSetlist.set1.map((song, index) => (
                    <li key={index} className="text-gray-600 text-sm">
                      {index + 1}. {song}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1">Currently Playing</h4>
                <p className="text-blue-600 font-medium flex items-center gap-2">
                  ⏱️ {currentSetlist.currentlyPlaying}
                </p>
                <p className="text-sm text-blue-500">
                  Time Remaining: {formatTime(timeRemaining)}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Your Score</h4>
                <p className="text-2xl font-bold text-green-600">{userScore} points</p>
              </div>
            </div>
          </div>

          {/* Next Song Prediction */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">
              🔮 What's the Next Song?
            </h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Submit your prediction before the current song ends!
                </p>
                
                {/* Song Selector */}
                <select
                  value={selectedSong}
                  onChange={(e) => setSelectedSong(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  disabled={!isLive}
                >
                  <option value="">Select a song...</option>
                  {songs.map((song) => (
                    <option key={song} value={song}>{song}</option>
                  ))}
                </select>
              </div>
              
              <button
                onClick={handleSubmitPrediction}
                disabled={!selectedSong || !isLive}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLive ? 'Submit Prediction' : 'Game Not Live'}
              </button>
              
              {selectedSong && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Selected:</strong> {selectedSong}
                  </p>
                  <p className="text-green-600 text-xs mt-1">
                    📊 This song has a 12% probability of being next based on historical data
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Community Predictions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              📊 Community Predictions
            </h3>
            
            <div className="space-y-2">
              {communityPredictions.map((prediction, index) => (
                <div key={prediction.song} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="truncate font-medium">{prediction.song}</span>
                    <span className="text-gray-600">{prediction.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${prediction.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {prediction.count} predictions
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Live updates • {communityPredictions.reduce((sum, p) => sum + p.count, 0)} total predictions
            </div>
          </div>
        </div>

        {/* Game Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="mb-2"><strong>Objective:</strong> Predict the next song before it's announced</p>
              <p className="mb-2"><strong>Timing:</strong> Submit before current song ends</p>
              <p><strong>Scoring:</strong> 1 point per correct prediction + bonus for streaks</p>
            </div>
            <div>
              <p className="mb-2"><strong>Live Updates:</strong> See community predictions in real-time</p>
              <p className="mb-2"><strong>Multiple Rounds:</strong> New prediction opportunity with each song</p>
              <p><strong>Social:</strong> Compete against other fans during the show</p>
            </div>
          </div>
        </div>

        {/* Demo Toggle for Development */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsLive(!isLive)}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            {isLive ? 'Stop Demo' : 'Start Demo Mode'}
          </button>
        </div>

        <FourWaysToPlay />
      </div>
    </MainLayout>
  );
};

export default GuessNextSongPage; 