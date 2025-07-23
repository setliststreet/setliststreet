import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

const RulesPage = () => {
  const [timeToDeadline, setTimeToDeadline] = useState('');

  // Calculate time to next 7PM PT deadline
  useEffect(() => {
    const calculateTimeToDeadline = () => {
      try {
        const now = new Date();
        const showDates = [
          new Date('2025-08-01T19:00:00-07:00'), // Friday 8/1 7PM PT
          new Date('2025-08-02T19:00:00-07:00'), // Saturday 8/2 7PM PT
          new Date('2025-08-03T19:00:00-07:00'), // Sunday 8/3 7PM PT
        ];
        const nextDeadline = showDates.find(date => date > now);
        if (!nextDeadline) {
          setTimeToDeadline('All shows completed');
          return;
        }
        const timeDiff = nextDeadline.getTime() - now.getTime();
        if (timeDiff < 0) {
          setTimeToDeadline('Invalid date');
          return;
        }
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeToDeadline(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } catch (error) {
        setTimeToDeadline('Error calculating deadline');
        console.error(error);
      }
    };
    calculateTimeToDeadline();
    const interval = setInterval(calculateTimeToDeadline, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <Head>
        <title>Setlist Street - Game Rules</title>
        <meta
          name="description"
          content="Rules and scoring for Setlist Street prediction games for Dead & Company at Golden Gate Park, Aug 1-3, 2025."
        />
      </Head>





{/* Header */}
<div className="text-center mb-16">
  <div className="countdown-outer">
    <h1 className="logo-small-text">How to Play</h1>
    <p className="subtitle-font max-w-4xl mx-auto">
      Complete rules and scoring information for all Setlist Street prediction games
    </p>
  </div>
</div>


      {/* Quick Start */}
      <div className="mb-12">
        <div className="countdown-outer">
          <div className="w-full max-w-4xl mx-auto px-4">

            <div className="countdown-outer">
              <div className="w-full max-w-4xl mx-auto px-4">
                <div className="flex justify-center mb-8">
                  <div className="game-card">Quick Start Guide</div>
                </div>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {[
                    { step: '1', title: 'Sign Up', desc: 'Create your free account' },
                    { step: '2', title: 'Choose Games', desc: 'Pick your prediction games' },
                    { step: '3', title: 'Make Predictions', desc: 'Submit before 7PM PT' },
                    { step: '4', title: 'Watch & Win', desc: 'Follow live results' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`game-card game-card--color${(index % 4) + 1} text-center`}
                      style={{
                        background: SetlistStreetTheme.backgrounds.card,
                        border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                        boxShadow: SetlistStreetTheme.components.card.shadow,
                        padding: SetlistStreetTheme.layout.containerPadding,
                      }}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 animate-float-skull game-card--color${(index % 4) + 1}`}>
                        <span className="text-black font-bold">{item.step}</span>
                      </div>
                      <h3 className="font-semibold text-black">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Rules */}
      <div className="mb-12">
        <div className="countdown-outer">
          <div className="flex justify-center mb-8">
            <div className="game-card">Game Rules</div>
          </div>
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="grid gap-6">
              {gameRules.map((game, index) => (
                <motion.div
                  key={index}
                  className="game-card game-card--color1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    background: SetlistStreetTheme.backgrounds.card,
                    border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                    boxShadow: SetlistStreetTheme.components.card.shadow,
                  }}
                >
                  <h3 className="text-xl font-bold mb-2 text-black">{game.title}</h3>
                  <p className="text-base mb-4 text-gray-600">{game.description}</p>
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
        </div>
      </div>

      {/* Scoring Rules */}
      <div className="mb-12">
        <div className="countdown-outer">
          <div className="flex justify-center mb-8">
            <div className="game-card">Scoring & Prizes</div>
          </div>
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {scoringRules.map((section, index) => (
                <motion.div
                  key={index}
                  className="game-card game-card--color2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{
                    background: SetlistStreetTheme.backgrounds.card,
                    border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                    boxShadow: SetlistStreetTheme.components.card.shadow,
                  }}
                >
                  <h3 className="text-xl font-bold mb-4 text-black">{section.title}</h3>
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
        </div>
      </div>

      {/* Fair Play */}
      <div className="mb-12">
        <div className="countdown-outer">
          <div className="flex justify-center mb-8">
            <div className="game-card">Fair Play Guidelines</div>
          </div>
          <div className="w-full max-w-4xl mx-auto px-4">
            <motion.div
              className="game-card game-card--color3 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                background: SetlistStreetTheme.backgrounds.card,
                border: `1px solid ${SetlistStreetTheme.components.card.border}`,
                boxShadow: SetlistStreetTheme.components.card.shadow,
              }}
            >
              <ul className="space-y-3">
                {fairPlay.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-3 font-bold">•</span>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center mb-12">
        <div className="countdown.outer">
          <div className="game-card max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-black mb-4">Questions About the Rules?</h2>
            <p className="text-gray-600 mb-4">
              Need clarification on scoring or game mechanics?
            </p>
            <Link
              href="mailto:setliststreet@proton.me"
              className="link-button"
              role="link"
              tabIndex={0}
            >
              Contact us at setliststreet@proton.me
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RulesPage;
