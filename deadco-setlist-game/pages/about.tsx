import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/MainLayout';

export default function About() {
  const features = [
    {
      title: 'Real-Time Predictions',
      description: 'Make predictions before and during shows with live scoring updates',
    },
    {
      title: 'Statistical Insights',
      description: 'Access historical data and probability analytics for smarter predictions',
    },
    {
      title: 'Multiple Game Modes',
      description: 'From simple song predictions to complex setlist building challenges',
    },
    {
      title: 'Community Competition',
      description: 'Compete with fellow Deadheads on live leaderboards',
    },
    {
      title: 'Flexible Participation',
      description: 'Play for fun, charity, cash prizes, or sponsored rewards',
    },
    {
      title: 'Live Show Integration',
      description: 'Real-time next song predictions during actual performances',
    },
    {
      title: 'Fair Play Guaranteed',
      description: 'Transparent scoring, secure payments, and verified results',
    }
  ];

  const timeline = [
    {
      date: 'January 2025',
      title: 'Development Begins',
      description: 'Initial concept and prototype development'
    },
    {
      date: 'March 2025',
      title: 'Beta Testing',
      description: 'Closed beta with select community members'
    },
    {
      date: 'June 2025',
      title: 'Pre-Launch',
      description: 'Final testing and community preparation'
    },
    {
      date: 'August 1-3, 2025',
      title: 'GD60 Launch',
      description: 'Live debut at Golden Gate Park shows'
    }
  ];

  return (
    <MainLayout>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                About Setlist Street
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The ultimate prediction game platform for Deadheads, created by fans for fans. 
                Combining statistical analysis with community competition for the GD60 anniversary concerts.
              </p>
            </motion.div>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4 text-gray-400">♪</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                To enhance the live music experience by bringing Deadheads together through friendly 
                competition, statistical insights, and community engagement. We celebrate the 
                beautiful unpredictability of Dead & Company while finding patterns in the music we all love.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  className="flex items-center mb-8 last:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-6 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                        <span className="text-sm text-purple-600 font-medium">{event.date}</span>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Technology Section */}
          <div className="mb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-6 text-gray-400">⚙</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Built with Modern Technology</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Setlist Street uses cutting-edge web technologies to deliver a fast, reliable, 
                  and engaging experience for all users.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <span className="text-blue-600 font-semibold">Frontend</span>
                  <span className="ml-4">Next.js, React, TypeScript</span>
                </div>
                <div className="text-center">
                  <span className="text-green-600 font-semibold">Backend</span>
                  <span className="ml-4">Supabase, PostgreSQL</span>
                </div>
                <div className="text-center">
                  <span className="text-purple-600 font-semibold">Payments</span>
                  <span className="ml-4">Stripe, PayPal</span>
                </div>
                <div className="text-center">
                  <span className="text-orange-600 font-semibold">Hosting</span>
                  <span className="ml-4">Vercel, CDN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="text-center bg-white border border-gray-200 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Join the Community</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Setlist Street is more than just a prediction platform - it's a celebration of the 
              Grateful Dead community and the magic of live music. Join thousands of Deadheads 
              in friendly competition and shared musical passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Get Started
              </a>
              <a href="/rules" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn How to Play
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 