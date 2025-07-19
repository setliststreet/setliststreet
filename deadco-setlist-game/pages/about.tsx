import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function About() {
  const teamMembers = [
    {
      name: 'Alex "The Archivist"',
      role: 'Founder & Lead Developer',
      emoji: '🎸',
      bio: 'Deadhead since \'87 with an obsession for setlist data and perfect show recordings.'
    },
    {
      name: 'Maya "The Designer"',
      role: 'UI/UX & Community Manager',
      emoji: '🎨',
      bio: 'Makes everything cute and ensures our community stays kind and welcoming.'
    },
    {
      name: 'Sam "The Stats Wizard"',
      role: 'Data Engineer',
      emoji: '📊',
      bio: 'Builds the algorithms that power our predictions and scoring systems.'
    },
    {
      name: 'Jordan "The Music Maven"',
      role: 'Content & Partnerships',
      emoji: '🎵',
      bio: 'Works with artists and venues to bring you the most amazing games and prizes.'
    }
  ];

  const milestones = [
    {
      date: 'Summer 2024',
      title: 'The Spark',
      emoji: '💡',
              description: 'Late night setlist debates at a coffee shop led to &quot;what if we made a game out of this?&quot;'
    },
    {
      date: 'Fall 2024',
      title: 'First Prototype',
      emoji: '🛠️',
      description: 'Built the first bingo board generator with 50 friends testing at Dead & Co shows.'
    },
    {
      date: 'Winter 2024',
      title: 'Community Growth',
      emoji: '🌱',
      description: 'Word spread through the community. 1,000 players joined our Discord.'
    },
    {
      date: 'January 2025',
      title: 'Setlist Street Launch',
      emoji: '🚀',
      description: 'Full platform launch with multiple game modes and the cutest design ever!'
    }
  ];

  const values = [
    {
      title: 'Community First',
      emoji: '🤝',
      description: 'We&apos;re fans building for fans. Every decision prioritizes community happiness over profit.'
    },
    {
      title: 'Celebration, Not Gambling',
      emoji: '🎪',
      description: 'This is about celebrating music knowledge and having fun, not creating gambling addictions.'
    },
    {
      title: 'Fairness & Transparency',
      emoji: '⚖️',
      description: 'Open algorithms, clear rules, and honest communication. No hidden fees or surprises.'
    },
    {
      title: 'Respect for Artists',
      emoji: '🎶',
      description: 'We honor the music and artists that inspire us, using their work respectfully and legally.'
    }
  ];

  return (
    <Layout 
      title="Setlist Street - About Us"
      description="Learn about the team and story behind Setlist Street, the cutest setlist prediction platform."
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage: SetlistStreetTheme.gradients.pastel,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              👤 About Setlist Street
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Born from late-night setlist debates and a love for live music, 
              Setlist Street is <span className="font-bold text-pink-300">by fans, for fans</span> — 
              where music knowledge meets community fun!
            </motion.p>
          </motion.div>

          {/* Origin Story */}
          <motion.div
            className="mb-12 p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">☕</div>
              <h2 
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                Our Origin Story
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-white/90 leading-relaxed mb-6">
                It all started in a tiny coffee shop near Berkeley, where a group of Deadheads 
                couldn't stop debating what Dead & Company would open with at their next show. 
                One person said "Bertha," another swore it would be "Jack Straw," and a third 
                insisted on "Deal."
              </p>
              
              <p className="text-white/90 leading-relaxed mb-6">
                              Around 2 AM, fueled by way too much coffee and vintage Grateful Dead bootlegs, 
              someone said those magic words: <span className="font-bold text-yellow-300">
              &quot;What if we made a game out of this?&quot;</span>
              </p>
              
              <p className="text-white/90 leading-relaxed">
                              That night, with laptops scattered across sticky tables and &quot;Fire on the Mountain&quot; 
              playing softly in the background, Setlist Street was born. We&apos;ve been building 
              the cutest, most fun way to celebrate live music ever since!
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 
              className="text-3xl font-bold text-center text-white mb-8"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              🗓️ Our Journey
            </h2>
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-2xl backdrop-blur">
                      {milestone.emoji}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-yellow-300 text-sm font-medium mb-1">
                      {milestone.date}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 
              className="text-3xl font-bold text-center text-white mb-8"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              👥 Meet the Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">{member.emoji}</div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <div className="text-yellow-300 text-sm font-medium mb-3">
                      {member.role}
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed text-center">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 
              className="text-3xl font-bold text-center text-white mb-8"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              💖 Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{value.emoji}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="p-8 rounded-2xl border border-white/20 backdrop-blur text-center"
            style={{ background: SetlistStreetTheme.gradients.aurora }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <div className="text-6xl mb-6">🎼</div>
            <h3 
              className="text-3xl font-bold text-white mb-6"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              Our Mission
            </h3>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
              To create the most joyful, inclusive, and engaging platform for music fans 
              to celebrate their passion for live music through games, community, and 
              friendly competition.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-yellow-300">🎯</span>
                <span>Celebrate Music Knowledge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-300">🤝</span>
                <span>Build Community</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-300">🎪</span>
                <span>Have Fun Together</span>
              </div>
            </div>

            <motion.div
              className="text-white/70 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Whether you're a casual fan or a total music nerd, 
              <br />
              there&apos;s a place for you on Setlist Street! 🏠
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 