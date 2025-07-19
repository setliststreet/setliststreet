import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function Legal() {
  const sections = [
    {
      id: 'disclaimer',
      title: '📄 Legal Disclaimer',
      emoji: '⚖️',
      content: `Setlist Street is a fan-made experience built by and for the live music community. It is in no way affiliated with or endorsed by the Grateful Dead, Dead & Company, Mickey Hart, Bob Weir, John Mayer, Oteil Burbridge, or any current or former band members, their management, or associated record labels.`
    },
    {
      id: 'not-gambling',
      title: '🎲 Not Gambling',
      emoji: '🎯',
      content: `Setlist Street is a skill-based game platform. While players may choose to enter certain contests with entry fees and receive payouts based on results, these outcomes are determined by musical knowledge, historical data, and predictive accuracy. Setlist Street does not offer games of chance and does not constitute gambling as defined by applicable U.S. state or federal laws.`
    },
    {
      id: 'responsibility',
      title: '👶 Responsible Participation',
      emoji: '🛡️',
      content: `All participants must be 18 years or older. Please play responsibly and treat this as a community experience, not a financial investment. Set personal limits and never spend more than you can afford to lose.`
    },
    {
      id: 'copyright',
      title: '💬 Copyright & Fair Use',
      emoji: '📝',
      content: `All band names, logos, song titles, lyrics, and imagery referenced are the property of their respective rights holders and are used in a nominative fair-use context to celebrate the fan culture surrounding live music. If you believe we have used something improperly, please contact us immediately.`
    },
    {
      id: 'data',
      title: '🔒 Data & Privacy',
      emoji: '💾',
      content: `We collect minimal personal information necessary for gameplay and account management. Your data is stored securely and never sold to third parties. See our Privacy Policy for complete details on data handling practices.`
    },
    {
      id: 'liability',
      title: '⚠️ Limitation of Liability',
      emoji: '🛑',
      content: `Setlist Street is provided "as is" without warranties of any kind. We are not liable for any losses, damages, or disputes arising from use of our platform, technical issues, or game outcomes. Participate at your own risk.`
    }
  ];

  return (
    <Layout 
      title="Setlist Street - Legal Disclaimer"
      description="Legal information, disclaimers, and important terms for Setlist Street users."
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
                backgroundImage: SetlistStreetTheme.gradients.galaxy,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              📄 Legal Information
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Important legal information about Setlist Street, 
              our <span className="font-bold text-pink-300">community-driven</span> music prediction platform.
            </motion.p>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            className="mb-8 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 
              className="text-xl font-bold text-white mb-4"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              📋 Quick Navigation
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {sections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-all"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <span>{section.emoji}</span>
                  <span className="font-medium">{section.title.replace(/📄|🎲|👶|💬|🔒|⚠️/, '').trim()}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Legal Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{section.emoji}</div>
                  <h2 
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                  >
                    {section.title}
                  </h2>
                </div>
                
                <p className="text-white/90 leading-relaxed">
                  {section.content}
                </p>

                {section.id === 'copyright' && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-white/80">
                      <strong>Contact us:</strong> If you believe we've used copyrighted material improperly, 
                      please email us at <span className="text-yellow-300">legal@setliststreet.com</span> with 
                      details and we'll address it promptly.
                    </div>
                  </div>
                )}

                {section.id === 'responsibility' && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-red-300">🚫</span>
                      <span>18+ Only</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-yellow-300">⚖️</span>
                      <span>Play Responsibly</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <span className="text-green-300">🤝</span>
                      <span>Community First</span>
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="mt-12 p-6 rounded-2xl border border-white/20 backdrop-blur text-center"
            style={{ background: SetlistStreetTheme.gradients.aurora }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              💬 Questions or Concerns?
            </h3>
            
            <p className="text-white/90 mb-6 leading-relaxed">
              We're committed to operating transparently and within all applicable laws. 
              If you have legal questions, concerns about our practices, or need clarification 
              on any of these policies, please don't hesitate to reach out.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-yellow-300">📧</span>
                <span>legal@setliststreet.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-blue-300">💬</span>
                <span>Join our Discord for community support</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-300">📱</span>
                <span>Follow updates on social media</span>
              </div>
            </div>

            <motion.div
              className="mt-6 text-xs text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Last updated: January 2025 • These terms may be updated periodically with notice
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 