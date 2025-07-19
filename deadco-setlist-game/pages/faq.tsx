import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function FAQ() {
  const faqs = [
    {
      question: 'Is this affiliated with the Grateful Dead or Dead & Company?',
      answer: 'Nope! This is just a fan-made project for fun. We love the music and want to celebrate it through games.',
      emoji: '🎸'
    },
    {
      question: 'How do payouts work for cash games?',
      answer: 'Winners are determined by accuracy and skill. The prize pool is split based on contest rules. Processing fees may apply.',
      emoji: '💰'
    },
    {
      question: 'Can I play multiple games?',
      answer: 'Yes! You can enter as many games as you want. Some shows even allow multiple bingo boards to increase your chances.',
      emoji: '🎯'
    },
    {
      question: 'What happens if I win?',
      answer: 'You will be notified within 24 hours and prizes are distributed within 48 hours of verification.',
      emoji: '🏆'
    },
    {
      question: 'Is this gambling?',
      answer: 'No! This is skill-based gaming based on music knowledge and prediction accuracy, not games of chance.',
      emoji: '🎲'
    },
    {
      question: 'How do I get better at predictions?',
      answer: 'Study setlist history, listen to rehearsal recordings, and join our community for tips from experienced players!',
      emoji: '📚'
    }
  ];

  return (
    <Layout 
      title="Setlist Street - FAQ"
      description="Frequently asked questions about Setlist Street games and platform."
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
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
              ❓ Frequently Asked Questions
            </h1>
            
            <motion.p 
              className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Got questions? We have answers! Here are the most common questions from our community.
            </motion.p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{faq.emoji}</div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold text-white mb-3"
                      style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                    >
                      {faq.question}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
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
              Still Have Questions?
            </h3>
            
            <p className="text-white/90 mb-6">
              Our community is always happy to help! Reach out through any of these channels.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-yellow-300">📧</span>
                <span>support@setliststreet.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-blue-300">💬</span>
                <span>Join our Discord</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-green-300">📱</span>
                <span>Follow us on social</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
} 