import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import FourWaysToPlay from '../components/FourWaysToPlay';

const GuessStartTimePage = () => {
  const [selectedShow, setSelectedShow] = useState(1);
  const [selectedTime, setSelectedTime] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');

  useEffect(() => {
    // Countdown timer logic (same as homepage)
    const calculateTimeToDeadline = () => {
      const now = new Date();
      const showDates = [
        new Date('2025-08-01T19:00:00-07:00'),
        new Date('2025-08-02T19:00:00-07:00'),
        new Date('2025-08-03T19:00:00-07:00'),
      ];
      
      const nextDeadline = showDates.find(date => date > now);
      if (!nextDeadline) {
        setTimeToDeadline('All shows completed');
        return;
      }

      const timeDiff = nextDeadline.getTime() - now.getTime();
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeToDeadline(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeToDeadline();
    const interval = setInterval(calculateTimeToDeadline, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <Head>
        <title>Guess the Start Time - Setlist Street</title>
        <meta name="description" content="Predict when Dead & Company will start each show" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Guess the Start Time
        </h1>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">
            Time Until Deadline
          </h2>
          <div className="text-2xl font-bold text-purple-600">
            {timeToDeadline}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Submissions close at 7:00 PM PT before each show
          </p>
        </div>

        {/* Sponsor Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Sponsored by: [PLACEHOLDER SPONSOR NAME]
          </p>
          <div className="bg-gray-200 rounded-lg p-8 text-gray-500">
            [SPONSOR LOGO PLACEHOLDER]
          </div>
        </div>

        {/* Show Selector */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Choose your show:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 1, label: 'Show 1: Friday, August 1' },
              { id: 2, label: 'Show 2: Saturday, August 2' },
              { id: 3, label: 'Show 3: Sunday, August 3' },
            ].map((show) => (
              <button
                key={show.id}
                onClick={() => setSelectedShow(show.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedShow === show.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {show.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Time Input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Predicted Start Time</h3>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
              <p className="text-sm text-gray-600 mt-2">
                Enter your prediction in 24-hour format
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="lg:col-span-1"></div>

          {/* Hints */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Hints</h3>
              <div className="text-gray-600">
                <p className="mb-2">[PLACEHOLDER - Last 10 start times to be added later]</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Show data will be populated here</li>
                  <li>Historical start times</li>
                  <li>Venue-specific trends</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Four Ways to Play */}
        <FourWaysToPlay />
      </div>
    </MainLayout>
  );
};

export default GuessStartTimePage; 