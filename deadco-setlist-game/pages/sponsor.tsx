import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';
import { supabase } from '../utils/supabaseClient';

interface SponsorForm {
  name: string;
  email: string;
  brand: string;
  message: string;
  sponsorship_type: string;
  budget_range: string;
}

export default function SponsorPage() {
  const [form, setForm] = useState<SponsorForm>({
    name: '',
    email: '',
    brand: '',
    message: '',
    sponsorship_type: 'game',
    budget_range: 'under_500'
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.from('sponsors').insert([{
        ...form,
        created_at: new Date().toISOString()
      }]);
      
      if (error) throw error;
      setSubmitted(true);
    } catch (error: unknown) {
      console.error("Submission error:", error);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout 
      title="Setlist Street - Sponsor a Game"
      description="Partner with Setlist Street to reach thousands of passionate music fans through our engaging setlist prediction games."
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
                backgroundImage: SetlistStreetTheme.gradients.sunset,
                fontFamily: SetlistStreetTheme.fonts.display,
              }}
            >
              🌟 Sponsor Setlist Street
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: SetlistStreetTheme.fonts.body }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Connect your brand with thousands of passionate music fans! 
              Sponsor nightly games, run banners, or partner with us for 
              <span className="font-bold text-yellow-300"> unforgettable experiences</span>.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-300">10K+</div>
                <div className="text-white/80 text-sm">Monthly Players</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-300">500+</div>
                <div className="text-white/80 text-sm">Games per Month</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-300">25+</div>
                <div className="text-white/80 text-sm">Shows per Tour</div>
              </div>
            </motion.div>
          </motion.div>

          {!submitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sponsorship Options */}
              <motion.div
                className="lg:col-span-1 space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <h3 
                    className="text-xl font-bold text-white mb-4"
                    style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                  >
                    🎯 Sponsorship Options
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg">🎮</span>
                      <div>
                        <div className="font-semibold text-white">Game Sponsorship</div>
                        <div className="text-white/80">Sponsor nightly prediction games with branded prizes</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-blue-300 text-lg">📱</span>
                      <div>
                        <div className="font-semibold text-white">Banner Advertising</div>
                        <div className="text-white/80">High-visibility banners in our fan zone</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-green-300 text-lg">🎪</span>
                      <div>
                        <div className="font-semibold text-white">Event Partnerships</div>
                        <div className="text-white/80">Co-hosted experiences and special events</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <span className="text-pink-300 text-lg">❤️</span>
                      <div>
                        <div className="font-semibold text-white">Charity Partnerships</div>
                        <div className="text-white/80">Support causes while building brand goodwill</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                  <h3 
                    className="text-xl font-bold text-white mb-4"
                    style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                  >
                    📊 Why Sponsor Us?
                  </h3>
                  
                  <div className="space-y-3 text-sm text-white/90">
                    <div>• Engaged community of music lovers</div>
                    <div>• High retention and repeat players</div>
                    <div>• Authentic brand integration</div>
                    <div>• Multi-platform visibility</div>
                    <div>• Measurable ROI and analytics</div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                  <h2 
                    className="text-2xl font-bold text-white mb-6"
                    style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                  >
                    🤝 Let's Partner Up!
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Your Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={form.name}
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={form.email}
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Brand / Company *</label>
                      <input 
                        type="text" 
                        name="brand" 
                        value={form.brand}
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                        placeholder="Ripple Coffee Co."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">Sponsorship Type</label>
                      <select 
                        name="sponsorship_type" 
                        value={form.sponsorship_type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                      >
                        <option value="game">🎮 Game Sponsorship</option>
                        <option value="banner">📱 Banner Advertising</option>
                        <option value="event">🎪 Event Partnership</option>
                        <option value="charity">❤️ Charity Partnership</option>
                        <option value="custom">✨ Custom Package</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white/90 text-sm font-medium mb-2">Budget Range</label>
                    <select 
                      name="budget_range" 
                      value={form.budget_range}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                    >
                      <option value="under_500">Under $500/month</option>
                      <option value="500_1000">$500 - $1,000/month</option>
                      <option value="1000_2500">$1,000 - $2,500/month</option>
                      <option value="2500_5000">$2,500 - $5,000/month</option>
                      <option value="over_5000">$5,000+/month</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white/90 text-sm font-medium mb-2">Tell us about your vision</label>
                    <textarea 
                      name="message" 
                      value={form.message}
                      onChange={handleChange}
                      rows={4} 
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur resize-none focus:border-white/50 focus:bg-white/15 transition-all"
                      placeholder="We'd love to sponsor games with coffee-themed prizes and build brand awareness in the music community..."
                    />
                  </div>

                  {error && (
                    <motion.div 
                      className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{
                      background: SetlistStreetTheme.components.button.primary.background,
                      color: SetlistStreetTheme.components.button.primary.color,
                    }}
                    whileHover={!loading ? { 
                      scale: 1.02,
                      boxShadow: SetlistStreetTheme.components.button.primary.hoverShadow
                    } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    {loading ? (
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </motion.div>
                    ) : (
                      '🚀 Submit Sponsorship Inquiry'
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="p-8 rounded-2xl border border-white/20 backdrop-blur"
                style={{ background: SetlistStreetTheme.gradients.aurora }}
              >
                <div className="text-6xl mb-6">🎉</div>
                <h2 
                  className="text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: SetlistStreetTheme.fonts.heading }}
                >
                  Thank You!
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  We've received your sponsorship inquiry and we're excited about the possibilities! 
                  Our partnerships team will be in touch within 24 hours to discuss how we can create 
                  something amazing together.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
                  <div>📧 setliststreet@proton.me</div>
                  <div>📱 Follow us for updates</div>
                  <div>🎵 Keep playing!</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
} 