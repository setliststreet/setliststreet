import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function PrivacyPolicy() {
  const privacySections = [
    {
      id: 'overview',
      title: '🔒 Privacy Overview',
      emoji: '👀',
      content: `At Setlist Street, we believe your privacy is fundamental. We collect only the information necessary to provide gameplay features, personalize your experience, and process optional payments. We never sell your data or use it for advertising tracking.`
    },
    {
      id: 'data-collection',
      title: '📊 What We Collect',
      emoji: '📝',
      items: [
        'Email address and username for account creation and login',
        'Game predictions, scores, and gameplay statistics',
        'Payment information (processed securely by Stripe)',
        'Basic usage analytics to improve our platform',
        'Communications when you contact our support team'
      ]
    },
    {
      id: 'data-usage',
      title: '🎯 How We Use Your Data',
      emoji: '⚙️',
      items: [
        'Provide core gameplay features and maintain your account',
        'Calculate scores, rankings, and distribute prizes',
        'Send important game notifications and updates',
        'Improve our platform through anonymous usage analytics',
        'Provide customer support and respond to inquiries'
      ]
    },
    {
      id: 'data-sharing',
      title: '🤝 Data Sharing',
      emoji: '🔐',
      content: `We do not share your personal data with third parties except for: (1) Payment processing through Stripe for paid games, (2) Essential service providers under strict confidentiality agreements, (3) Legal compliance when required by law. We never sell your data or share it for advertising purposes.`
    },
    {
      id: 'security',
      title: '🛡️ Data Security',
      emoji: '🔒',
      content: `Your data is stored securely using industry-standard encryption and security practices. We use Supabase for secure data storage and Stripe for payment processing, both of which maintain SOC 2 compliance and use encrypted transmission protocols.`
    },
    {
      id: 'rights',
      title: '👤 Your Rights',
      emoji: '✊',
      items: [
        'Access your personal data and download your information',
        'Correct inaccurate or incomplete information',
        'Delete your account and all associated data',
        'Opt out of non-essential communications',
        'Request data portability for your game history'
      ]
    }
  ];

  return (
    <Layout 
      title="Setlist Street - Privacy Policy"
      description="Learn how Setlist Street protects your privacy and handles your personal information."
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
              🔒 Privacy Policy
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your privacy matters to us! Learn how we protect your data and 
              what rights you have as a <span className="font-bold text-pink-300">valued member</span> 
              of our music community.
            </motion.p>
          </motion.div>

          {/* Privacy Commitment */}
          <motion.div
            className="mb-8 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h2 
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                Our Privacy Commitment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-green-300 text-2xl mb-2">🚫</div>
                  <div className="font-semibold text-white">No Data Sales</div>
                  <div className="text-white/80">We never sell your personal information</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-300 text-2xl mb-2">🔐</div>
                  <div className="font-semibold text-white">Secure Storage</div>
                  <div className="text-white/80">Bank-level encryption and security</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-300 text-2xl mb-2">✋</div>
                  <div className="font-semibold text-white">Your Control</div>
                  <div className="text-white/80">Delete your data anytime</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {privacySections.map((section, index) => (
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

                {section.id === 'rights' && (
                  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-white/80">
                      <strong className="text-yellow-300">How to exercise your rights:</strong> 
                      Email us at <span className="text-blue-300">privacy@setliststreet.com</span> or 
                      use the data controls in your account settings. We'll respond within 30 days.
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          {/* Data Deletion */}
          <motion.div
            className="mt-8 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">🗑️</div>
              <h2 
                className="text-2xl font-bold text-white"
                style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
              >
                Account Deletion
              </h2>
            </div>
            
            <p className="text-white/90 leading-relaxed mb-4">
              You can delete your account and all associated data at any time. This includes your 
              profile, game history, predictions, and any personal information we've collected.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="font-semibold text-white mb-2">🔧 Self-Service Deletion</div>
                <div className="text-white/80">
                  Go to Account Settings → Privacy → Delete Account to remove your data instantly.
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="font-semibold text-white mb-2">📧 Email Request</div>
                <div className="text-white/80">
                  Send a deletion request to privacy@setliststreet.com with your account details.
                </div>
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
              🤔 Questions About Privacy?
            </h3>
            
            <p className="text-white/90 mb-6 leading-relaxed">
              We're here to help! If you have questions about this privacy policy, 
              want to exercise your data rights, or need clarification about how we 
              handle your information, please reach out.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-yellow-300">📧</span>
                <span>privacy@setliststreet.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-blue-300">⚙️</span>
                <span>Account Settings → Privacy</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-300">💬</span>
                <span>Live chat support</span>
              </div>
            </div>

            <motion.div
              className="mt-6 text-xs text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Last updated: January 2025 • We'll notify you of any significant changes
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 