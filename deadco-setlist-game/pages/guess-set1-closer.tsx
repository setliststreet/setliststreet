import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';

const GuessSet1CloserPage = () => {
  const [selectedShow, setSelectedShow] = useState(1);
  const [selectedSong, setSelectedSong] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');

  // Mock song database - would come from Supabase
  const songs = [
    'Sugar Magnolia', 'Truckin\'', 'Casey Jones', 'Friend of the Devil',
    'Uncle John\'s Band', 'Touch of Grey', 'Ripple', 'One More Saturday Night',
    'Not Fade Away', 'Shakedown Street', 'Good Lovin\'', 'Fire on the Mountain'
  ];

  // Calculate time to deadline
  useEffect(() => {
    const calculateTimeToDeadline = () => {
      const now = new Date();
      const deadlines = [
        new Date('2025-08-01T19:00:00-07:00'),
        new Date('2025-08-02T19:00:00-07:00'),
        new Date('2025-08-03T19:00:00-07:00')
      ];

      const nextDeadline = deadlines.find(date => date > now);
      if (!nextDeadline) {
        setTimeToDeadline('All deadlines passed');
        return;
      }

      const timeDiff = nextDeadline.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeToDeadline(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeToDeadline();
    const interval = setInterval(calculateTimeToDeadline, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!selectedSong) {
      alert('Please select a song!');
      return;
    }
    console.log('Submitted:', { show: selectedShow, song: selectedSong });
    alert('Prediction submitted successfully!');
  };

  return (
    <MainLayout>
      <Head>
        <title>Guess Set 1 Closer - Setlist Street</title>
        <meta name="description" content="Predict which song will close the first set" />
      </Head>

      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Guess the Set 1 Closer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Predict which song will close the first set for Dead & Company
            </p>
          </div>

          {/* Countdown */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Next Submission Deadline
            </h2>
            <div className="text-3xl font-bold text-purple-600">
              {timeToDeadline}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Submissions close at 7:00 PM PT before each show
            </p>
          </div>

          {/* Show Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Show</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((show) => (
                <button
                  key={show}
                  onClick={() => setSelectedShow(show)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    selectedShow === show
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Show {show}</div>
                  <div className="text-sm">August {show}, 2025</div>
                </button>
              ))}
            </div>
          </div>

          {/* Song Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Song</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {songs.map((song) => (
                <button
                  key={song}
                  onClick={() => setSelectedSong(song)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedSong === song
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {song}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
            >
              Submit Prediction
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GuessSet1CloserPage; 