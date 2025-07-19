import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function Home() {
  return (
    <Layout 
      title="Setlist Street - Dead & Company Prediction Games"
      description="Predict setlists, play bingo, test your knowledge - the ultimate Dead & Company fan experience."
    >
      {/* Hero Section - Clean and Professional */}
      <section className="py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              color: SetlistStreetTheme.components.text.heading.color,
              fontFamily: SetlistStreetTheme.fonts.primary,
              fontWeight: SetlistStreetTheme.fonts.weights.bold,
              lineHeight: SetlistStreetTheme.components.text.heading.lineHeight,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Predict the Music
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12"
            style={{
              color: SetlistStreetTheme.components.text.body.color,
              lineHeight: SetlistStreetTheme.components.text.body.lineHeight,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Play bingo, predict setlists, test your Dead & Company knowledge
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link 
              href="/test-bingo"
              className="px-8 py-3 text-lg font-medium transition-all rounded-md hover:shadow-lg"
              style={{
                backgroundColor: SetlistStreetTheme.components.button.primary.background,
                color: SetlistStreetTheme.components.button.primary.color,
                fontWeight: SetlistStreetTheme.fonts.weights.medium,
              }}
            >
              Start Playing
            </Link>
            <Link 
              href="/rules"
              className="px-8 py-3 text-lg font-medium transition-all rounded-md border hover:bg-gray-50"
              style={{
                backgroundColor: SetlistStreetTheme.components.button.secondary.background,
                color: SetlistStreetTheme.components.button.secondary.color,
                border: SetlistStreetTheme.components.button.secondary.border,
                fontWeight: SetlistStreetTheme.fonts.weights.medium,
              }}
            >
              Learn How to Play
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Game Modes - Clean Grid */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              color: SetlistStreetTheme.components.text.heading.color,
              fontWeight: SetlistStreetTheme.fonts.weights.bold,
            }}
          >
            Choose Your Game
          </h2>
          <p 
            className="text-lg"
            style={{ color: SetlistStreetTheme.components.text.body.color }}
          >
            Multiple ways to test your Dead & Company knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Setlist Bingo',
              description: 'Fill your card as songs are played during the show',
              href: '/test-bingo',
              features: ['5x5 bingo cards', 'Real-time gameplay', 'Multiple winners'],
            },
            {
              title: 'Setlist Prediction',
              description: 'Predict the exact order of songs in upcoming shows',
              href: '/test-dragdrop',
              features: ['Drag & drop interface', 'Scoring system', 'Encore predictions'],
            },
            {
              title: 'Trivia Challenge',
              description: 'Test your knowledge of Dead & Company history',
              href: '/test-trivia',
              features: ['Multiple difficulty levels', 'Timed questions', 'Weekly tournaments'],
            },
          ].map((game, index) => (
            <motion.div
              key={game.title}
              className="p-8 rounded-lg border hover:shadow-lg transition-all"
              style={{
                backgroundColor: SetlistStreetTheme.components.card.background,
                border: SetlistStreetTheme.components.card.border,
                borderRadius: SetlistStreetTheme.components.card.borderRadius,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <h3 
                className="text-xl font-semibold mb-3"
                style={{
                  color: SetlistStreetTheme.components.text.heading.color,
                  fontWeight: SetlistStreetTheme.fonts.weights.semibold,
                }}
              >
                {game.title}
              </h3>
              <p 
                className="mb-6"
                style={{ 
                  color: SetlistStreetTheme.components.text.body.color,
                  lineHeight: SetlistStreetTheme.components.text.body.lineHeight,
                }}
              >
                {game.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {game.features.map((feature) => (
                  <li 
                    key={feature}
                    className="text-sm flex items-center"
                    style={{ color: SetlistStreetTheme.components.text.body.color }}
                  >
                    <span className="w-1.5 h-1.5 bg-current rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link 
                href={game.href}
                className="inline-block px-6 py-2 text-sm font-medium transition-all rounded-md"
                style={{
                  backgroundColor: SetlistStreetTheme.components.button.primary.background,
                  color: SetlistStreetTheme.components.button.primary.color,
                  fontWeight: SetlistStreetTheme.fonts.weights.medium,
                }}
              >
            Play Now
        </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-16 rounded-lg"
        style={{ backgroundColor: SetlistStreetTheme.backgrounds.secondary }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{
              color: SetlistStreetTheme.components.text.heading.color,
              fontWeight: SetlistStreetTheme.fonts.weights.bold,
            }}
          >
            Join the Community
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '2,500+', label: 'Active Players' },
              { number: '150+', label: 'Games Played' },
              { number: '45+', label: 'Shows Predicted' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    color: SetlistStreetTheme.colors.primary.charcoal,
                    fontWeight: SetlistStreetTheme.fonts.weights.bold,
                  }}
                >
                  {stat.number}
                </div>
                <div 
                  className="text-sm uppercase tracking-wide"
                  style={{
                    color: SetlistStreetTheme.components.text.caption.color,
                    fontWeight: SetlistStreetTheme.fonts.weights.medium,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
                      </div>
      </section>

      {/* Recent Winners - Simple List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            style={{
              color: SetlistStreetTheme.components.text.heading.color,
              fontWeight: SetlistStreetTheme.fonts.weights.bold,
            }}
          >
            Recent Winners
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Sarah M.', game: 'Setlist Bingo', venue: 'Sphere Las Vegas', date: 'Dec 30, 2024' },
              { name: 'Mike D.', game: 'Trivia Champion', venue: 'Weekly Tournament', date: 'Dec 28, 2024' },
              { name: 'Jessica K.', game: 'Setlist Prediction', venue: 'Sphere Las Vegas', date: 'Dec 29, 2024' },
              { name: 'Tom R.', game: 'Perfect Bingo', venue: 'Sphere Las Vegas', date: 'Dec 31, 2024' },
            ].map((winner) => (
              <div 
                key={`${winner.name}-${winner.date}`}
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: SetlistStreetTheme.components.card.background,
                  border: SetlistStreetTheme.components.card.border,
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 
                      className="font-semibold mb-1"
                      style={{
                        color: SetlistStreetTheme.components.text.heading.color,
                        fontWeight: SetlistStreetTheme.fonts.weights.semibold,
                      }}
                    >
                      {winner.name}
                    </h3>
                    <p 
                      className="text-sm mb-1"
                      style={{ color: SetlistStreetTheme.colors.primary.charcoal }}
                    >
                      {winner.game}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: SetlistStreetTheme.components.text.caption.color }}
                    >
                      {winner.venue}
                    </p>
                        </div>
                  <span 
                    className="text-xs"
                    style={{ color: SetlistStreetTheme.components.text.caption.color }}
                  >
                    {winner.date}
                  </span>
                        </div>
                      </div>
            ))}
                    </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/leaderboard"
              className="inline-block px-6 py-2 text-sm font-medium transition-all rounded-md border"
              style={{
                backgroundColor: SetlistStreetTheme.components.button.secondary.background,
                color: SetlistStreetTheme.components.button.secondary.color,
                border: SetlistStreetTheme.components.button.secondary.border,
                fontWeight: SetlistStreetTheme.fonts.weights.medium,
              }}
            >
              View Full Leaderboard
                  </Link>
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{
              color: SetlistStreetTheme.components.text.heading.color,
              fontWeight: SetlistStreetTheme.fonts.weights.bold,
            }}
          >
            Ready to Test Your Knowledge?
          </h2>
          <p 
            className="text-lg mb-8"
            style={{
              color: SetlistStreetTheme.components.text.body.color,
              lineHeight: SetlistStreetTheme.components.text.body.lineHeight,
            }}
          >
            Join thousands of Deadheads predicting setlists and celebrating the music that keeps on giving.
          </p>
          <Link 
            href="/test-bingo"
            className="px-8 py-3 text-lg font-medium transition-all rounded-md hover:shadow-lg"
            style={{
              backgroundColor: SetlistStreetTheme.components.button.primary.background,
              color: SetlistStreetTheme.components.button.primary.color,
              fontWeight: SetlistStreetTheme.fonts.weights.medium,
            }}
          >
            Start Your First Game
          </Link>
      </div>
      </section>
    </Layout>
  );
} 