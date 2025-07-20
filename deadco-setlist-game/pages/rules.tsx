import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';

const RulesPage = () => {
  const gameRules = [
    {
      title: 'Guess the Opener',
      description: 'Predict which song will open the first set',
      rules: [
        'Choose one song from the available list',
        'Submission deadline: 7:00 PM PT before show',
        'Exact match = 100 points',
        'No partial credit for this game'
      ]
    },
    {
      title: 'Guess the Encore',
      description: 'Predict the encore song(s)',
      rules: [
        'Choose one song for single encore prediction',
        'Choose multiple songs for complete encore prediction',
        'Exact match = 100 points',
        'Partial credit for multi-song encores: 50 points per correct song'
      ]
    },
    {
      title: 'Setlist Bingo',
      description: 'Create a 5x5 bingo card and get lines/corners',
      rules: [
        'Fill 24 squares (center is FREE)',
        'Win with any line, column, diagonal, or four corners',
        'Multiple winners possible',
        'First to complete wins bonus points'
      ]
    },
    {
      title: 'Setlist Builder',
      description: 'Build the complete setlist in order',
      rules: [
        'Predict Set 1, Set 2 (before & after Drums/Space), and Encore',
        'Exact song in exact position = 20 points',
        'Correct song in wrong position = 10 points',
        'Bonus points for predicting rare songs or perfect sequences'
      ]
    },
    {
      title: 'Timing Games',
      description: 'Predict show start time, end time, and set break length',
      rules: [
        'Start/End time: Exact time = 100 points, within 15 minutes = 50 points',
        'Set break: Exact length = 100 points, within 5 minutes = 50 points',
        'Times are measured from first song to last song'
      ]
    }
  ];

  const scoringRules = [
    {
      title: 'General Scoring',
      rules: [
        'All games use a 100-point scale for perfect predictions',
        'Partial credit varies by game type',
        'Rare song bonuses: Songs played <10% of shows get 2x points',
        'Tiebreakers determined by submission timestamp (earlier wins)'
      ]
    },
    {
      title: 'Prize Distribution',
      rules: [
        'Cash Pools: Based on paid entries per game',
        'First place: 50% of pool, Second: 30%, Third: 20%',
        'Prize Pools: Sponsored prizes (guitars, merch, experiences)',
        'Charity Pools: Donated to winners\' chosen charities',
        'Sponsor Seeding: Additional funds from sponsors'
      ]
    }
  ];

  const fairPlay = [
    'One account per person',
    'All predictions must be submitted before deadline',
    'No use of insider information or early setlist access',
    'Respect other players and community guidelines',
    'Report any technical issues or suspected cheating'
  ];

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              How to Play
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete rules and scoring information for all Setlist Street prediction games
            </p>
          </div>

          {/* Quick Start */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800">Sign Up</h3>
                <p className="text-sm text-gray-600">Create your free account</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800">Choose Games</h3>
                <p className="text-sm text-gray-600">Pick your prediction games</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800">Make Predictions</h3>
                <p className="text-sm text-gray-600">Submit before 7PM PT</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold text-gray-800">Watch & Win</h3>
                <p className="text-sm text-gray-600">Follow live results</p>
              </div>
            </div>
          </div>

          {/* Game Rules */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Game Rules</h2>
            <div className="grid gap-6">
              {gameRules.map((game, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <ul className="space-y-2">
                    {game.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start">
                        <span className="text-purple-600 mr-3 font-bold">•</span>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scoring Rules */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Scoring & Prizes</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {scoringRules.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.rules.map((rule, ruleIndex) => (
                      <li key={ruleIndex} className="flex items-start">
                        <span className="text-purple-600 mr-3 font-bold">•</span>
                        <span className="text-gray-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fair Play */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Fair Play Guidelines</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-3xl mx-auto">
              <ul className="space-y-3">
                {fairPlay.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-3 font-bold">•</span>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Questions About the Rules?</h2>
            <p className="text-gray-600 mb-4">
              Need clarification on scoring or game mechanics?
            </p>
            <p className="text-gray-600">
              Contact us at <a href="mailto:setliststreet@proton.me" className="text-purple-600 hover:text-purple-800 font-semibold">setliststreet@proton.me</a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RulesPage; 