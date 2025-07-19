import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function TermsOfService() {
  const termsSections = [
    {
      id: 'acceptance',
      title: '📘 Terms Acceptance',
      emoji: '✋',
      content: `By accessing Setlist Street, creating an account, or participating in any games, you agree to be bound by these Terms of Service and our Privacy Policy. If you don't agree with these terms, please don't use our platform.`
    },
    {
      id: 'eligibility',
      title: '👤 User Eligibility',
      emoji: '🆔',
      items: [
        'You must be at least 18 years old to create an account',
        'You must provide accurate and complete registration information',
        'You are responsible for maintaining the security of your account',
        'One account per person; multiple accounts are prohibited',
        'You must comply with all applicable local, state, and federal laws'
      ]
    },
    {
      id: 'gameplay',
      title: '🎮 Gameplay Rules',
      emoji: '🎯',
      items: [
        'You are responsible for any entries you submit and any wagers you place',
        'All predictions must be submitted before the specified deadline',
        'Prizes are awarded based on accuracy and rankings, not luck',
        'Game results are final once officially calculated and posted',
        'Cheating, manipulation, or exploitation of bugs is strictly prohibited'
      ]
    },
    {
      id: 'payments',
      title: '💰 Payments & Prizes',
      emoji: '💳',
      content: `Entry fees for paid games are non-refundable once submitted. Prizes are distributed based on game rules and final standings. Payment processing is handled by Stripe with industry-standard security. We reserve the right to withhold prizes in cases of suspected fraud or rule violations.`
    },
    {
      id: 'conduct',
      title: '🤝 User Conduct',
      emoji: '⚖️',
      items: [
        'Be respectful and kind to other community members',
        'No harassment, trolling, or abusive behavior will be tolerated',
        'Don\'t spam, post inappropriate content, or disrupt gameplay',
        'Respect intellectual property rights and privacy of others',
        'Report violations or suspicious activity to our moderation team'
      ]
    },
    {
      id: 'modifications',
      title: '🔄 Service Changes',
      emoji: '📝',
      content: `We reserve the right to modify these terms, game rules, or platform features at any time with notice. Continued use of Setlist Street after changes indicates your acceptance of the new terms. We may suspend or terminate accounts for violations of these terms.`
    }
  ];

  return (
    <Layout 
      title="Setlist Street - Terms of Service"
      description="Terms of service and user agreement for Setlist Street platform and games."
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
              📘 Terms of Service
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Welcome to our <span className="font-bold text-blue-300">community</span>! 
              These terms help us maintain a fun, fair, and safe environment for all players.
            </motion.p>
          </motion.div>

          {/* Key Points */}
          <motion.div
            className="mb-8 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 
              className="text-2xl font-bold text-white mb-6 text-center"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              🌟 Key Points
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-red-300 text-2xl mb-2">🔞</div>
                <div className="font-semibold text-white">18+ Only</div>
                <div className="text-white/80">Must be an adult to play</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-blue-300 text-2xl mb-2">🎯</div>
                <div className="font-semibold text-white">Skill-Based</div>
                <div className="text-white/80">Wins based on knowledge</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-yellow-300 text-2xl mb-2">🤝</div>
                <div className="font-semibold text-white">Be Kind</div>
                <div className="text-white/80">Respect other players</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="text-green-300 text-2xl mb-2">⚖️</div>
                <div className="font-semibold text-white">Play Fair</div>
                <div className="text-white/80">No cheating or exploitation</div>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {termsSections.map((section, index) => (
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
                
                {section.content && (
                  <p className="text-white/90 leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start gap-3 text-white/90"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 + itemIndex * 0.05 }}
                      >
                        <span className="text-yellow-300 text-sm mt-1">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                {section.id === 'conduct' && (
                  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-white/80">
                      <strong className="text-yellow-300">Violation Consequences:</strong> 
                      Depending on severity, violations may result in warnings, temporary suspensions, 
                      or permanent account termination. Serious violations may also result in forfeiture 
                      of prizes or entry fees.
                    </div>
                  </div>
                )}

                {section.id === 'payments' && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="font-semibold text-white mb-2">💳 Payment Security</div>
                      <div className="text-white/80">
                        All payments processed by Stripe with bank-level encryption and fraud protection.
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="font-semibold text-white mb-2">🏆 Prize Distribution</div>
                      <div className="text-white/80">
                        Prizes awarded within 48 hours of official game completion and verification.
                      </div>
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          {/* Disclaimers */}
          <motion.div
            className="mt-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">⚠️</div>
                <h2 
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                >
                  Important Disclaimers
                </h2>
              </div>
              
              <div className="space-y-4 text-white/90 text-sm">
                <p>
                  <strong>Service Availability:</strong> Setlist Street is provided "as is" without warranties. 
                  We make no guarantees about uptime, availability, or uninterrupted service.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> Our liability is limited to the amount you've 
                  paid for entry fees in the 30 days prior to any claim.
                </p>
                <p>
                  <strong>Indemnification:</strong> You agree to indemnify Setlist Street against any 
                  claims arising from your use of the platform or violation of these terms.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="mt-12 p-6 rounded-2xl border border-white/20 backdrop-blur text-center"
            style={{ background: SetlistStreetTheme.gradients.aurora }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
            >
              📞 Questions About These Terms?
            </h3>
            
            <p className="text-white/90 mb-6 leading-relaxed">
              We believe in transparency and want you to feel confident about using our platform. 
              If you have questions about these terms or need clarification about any policies, 
              our team is here to help.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-yellow-300">📧</span>
                <span>support@setliststreet.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-blue-300">💬</span>
                <span>Live chat support</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-300">📱</span>
                <span>Discord community</span>
              </div>
            </div>

            <motion.div
              className="mt-6 text-xs text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Last updated: January 2025 • Effective immediately upon posting
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 