import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Future: Implement actual registration
    console.log('Registration:', form);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Layout 
      title="Setlist Street - Register"
      description="Create your free account and start predicting setlists today!"
      showFooter={false}
    >
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎵</div>
              <h1 
                className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: SetlistStreetTheme.gradients.sunset,
                  fontFamily: SetlistStreetTheme.fonts.display,
                }}
              >
                Join Setlist Street!
              </h1>
              <p className="text-white/80">
                Create your free account and start predicting setlists today!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Username
                </label>
                <input 
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="musiclover42"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Password
                </label>
                <input 
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input 
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 backdrop-blur focus:border-white/50 focus:bg-white/15 transition-all"
                />
              </div>

              <motion.button 
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-6 rounded-xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur disabled:opacity-50 transition-all"
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
                {loading ? 'Creating Account...' : '🚀 Create Account'}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-white/80 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-yellow-300 hover:text-yellow-200 font-medium">
                  Sign in here
                </a>
              </p>
            </div>

            {/* Terms */}
            <div className="text-center mt-6 text-xs text-white/60">
              By registering, you agree to our{' '}
              <a href="/terms" className="text-blue-300 hover:text-blue-200">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-blue-300 hover:text-blue-200">Privacy Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 