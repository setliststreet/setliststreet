import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import FourWaysToPlay from '../components/FourWaysToPlay';

const GuessSetBreakLengthPage = () => {
  const [selectedShow, setSelectedShow] = useState(1);
  const [breakLength, setBreakLength] = useState('');
  const [timeToDeadline, setTimeToDeadline] = useState('');

  useEffect(() => {
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
    <Layout>
      <Head>
        <title>Guess the Set Break Length - Setlist Street</title>
        <meta name="description" content="Predict the length of set break between sets" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
          Guess the Set Break Length
        </h1>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">Time Until Deadline</h2>
          <div className="text-2xl font-bold text-purple-600">{timeToDeadline}</div>
          <p className="text-sm text-gray-600 mt-2">Submissions close at 7:00 PM PT before each show</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">Sponsored by: [PLACEHOLDER SPONSOR NAME]</p>
          <div className="bg-gray-200 rounded-lg p-8 text-gray-500">[SPONSOR LOGO PLACEHOLDER]</div>
        </div>

        {/* Padding above ShowSelector */}
        <div className="mt-4"></div>
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
                  selectedShow === show.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {show.label}
              </button>
            ))}
          </div>
        </div>
        {/* Padding below ShowSelector */}
        <div className="mb-4"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Predicted Break Length</h3>
              <label className="block text-sm font-medium mb-2">Duration (minutes:seconds):</label>
              <input
                type="text"
                placeholder="25:00"
                value={breakLength}
                onChange={(e) => setBreakLength(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg"
              />
              <p className="text-sm text-gray-600 mt-2">
                Typical range: 15-45 minutes
              </p>
            </div>
          </div>

          <div className="lg:col-span-1"></div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Hints</h3>
              <div className="text-gray-600">
                <p className="mb-2">[PLACEHOLDER - Last 10 set break lengths to be added later]</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Historical break durations</li>
                  <li>Venue logistics factors</li>
                  <li>Band break patterns</li>
                  <li>Weather considerations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Four Ways to Play */}
        <div className="mt-4 mb-4">
          <FourWaysToPlay />
        </div>
      </div>
    </Layout>
  );
};

export default GuessSetBreakLengthPage; 