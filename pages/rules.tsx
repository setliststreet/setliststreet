import React from 'react';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function Rules() {
  return (
    <Layout title="Game Rules - Setlist Street" description="Learn how to play Setlist Street prediction games">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              color: SetlistStreetTheme.colors.neutrals.black,
              fontFamily: SetlistStreetTheme.fonts.display,
            }}
          >
            Game Rules
          </h1>
          <p 
            className="text-xl"
            style={{ color: SetlistStreetTheme.colors.neutrals.gray }}
          >
            Pick songs. Score points. Win cash, prizes, or donate to charity.
          </p>
        </div>

        {/* Rules Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Bingo Rules */}
          <div 
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: SetlistStreetTheme.backgrounds.card,
              boxShadow: SetlistStreetTheme.components.card.shadow,
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{
                color: SetlistStreetTheme.colors.primary.pink,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              Bingo Game
            </h2>
            <ul className="space-y-3">
              {[
                'Fill out a 5x5 bingo card with Dead & Company songs',
                'Songs are called as they\'re played during the show',
                'Get 5 in a row (horizontal, vertical, or diagonal) to win',
                'Multiple winners split the prize pool',
                'Free space in the center counts automatically'
              ].map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: SetlistStreetTheme.colors.pastels.lightPink,
                      color: SetlistStreetTheme.colors.primary.pink,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ color: SetlistStreetTheme.colors.neutrals.darkGray }}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Setlist Prediction Rules */}
          <div 
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: SetlistStreetTheme.backgrounds.card,
              boxShadow: SetlistStreetTheme.components.card.shadow,
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{
                color: SetlistStreetTheme.colors.primary.blue,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              Setlist Prediction
            </h2>
            <ul className="space-y-3">
              {[
                'Predict the exact order of songs in the setlist',
                'Points awarded for correct song placement',
                'Bonus points for consecutive correct predictions',
                'Encore predictions worth double points',
                'Highest score wins the round'
              ].map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: SetlistStreetTheme.colors.pastels.lightBlue,
                      color: SetlistStreetTheme.colors.primary.blue,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ color: SetlistStreetTheme.colors.neutrals.darkGray }}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trivia Rules */}
          <div 
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: SetlistStreetTheme.backgrounds.card,
              boxShadow: SetlistStreetTheme.components.card.shadow,
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{
                color: SetlistStreetTheme.colors.primary.purple,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              Trivia Challenge
            </h2>
            <ul className="space-y-3">
              {[
                'Answer questions about Dead & Company history',
                'Questions cover songs, tours, band members, and rarities',
                'Multiple difficulty levels available',
                'Faster answers earn bonus points',
                'Weekly trivia tournaments with prizes'
              ].map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: SetlistStreetTheme.colors.pastels.lightPurple,
                      color: SetlistStreetTheme.colors.primary.purple,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ color: SetlistStreetTheme.colors.neutrals.darkGray }}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* General Rules */}
          <div 
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: SetlistStreetTheme.backgrounds.card,
              boxShadow: SetlistStreetTheme.components.card.shadow,
            }}
          >
            <h2 
              className="text-2xl font-bold mb-6"
              style={{
                color: SetlistStreetTheme.colors.primary.green,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              General Rules
            </h2>
            <ul className="space-y-3">
              {[
                'All games are for entertainment purposes only',
                'Winners can choose cash, prizes, or charity donation',
                'Fair play is enforced - no cheating tolerated',
                'Results are final once the show ends',
                'Must be 18+ to participate in cash games'
              ].map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: SetlistStreetTheme.colors.pastels.lightGreen,
                      color: SetlistStreetTheme.colors.primary.green,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span style={{ color: SetlistStreetTheme.colors.neutrals.darkGray }}>
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div 
          className="mt-16 p-8 rounded-3xl text-center"
          style={{
            backgroundColor: SetlistStreetTheme.colors.pastels.cream,
          }}
        >
          <h3 
            className="text-2xl font-bold mb-4"
            style={{
              color: SetlistStreetTheme.colors.neutrals.black,
              fontFamily: SetlistStreetTheme.fonts.display,
            }}
          >
            Ready to Play?
          </h3>
          <p 
            className="text-lg mb-6"
            style={{ color: SetlistStreetTheme.colors.neutrals.gray }}
          >
            Join thousands of Deadheads testing their setlist knowledge
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/test-bingo"
              className="px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: SetlistStreetTheme.colors.primary.pink,
                color: SetlistStreetTheme.colors.neutrals.white,
              }}
            >
              Play Bingo
            </a>
            <a 
              href="/test-dragdrop"
              className="px-8 py-3 rounded-full font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: SetlistStreetTheme.colors.primary.blue,
                color: SetlistStreetTheme.colors.neutrals.white,
              }}
            >
              Predict Setlist
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
} 