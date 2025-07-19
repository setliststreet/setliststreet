import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Future: Implement actual login
    console.log('Login:', form);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Layout 
      title="Setlist Street - Login"
      description="Welcome back! Sign in to your Setlist Street account."
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
              <div className="text-5xl mb-4">🔐</div>
              <h1 
                className="text-3xl font-bold mb-2 bg-clip-text text-transparent"
                style={{
                  backgroundImage: SetlistStreetTheme.gradients.galaxy,
                  fontFamily: SetlistStreetTheme.fonts.display,
                }}
              >
                Welcome Back!
              </h1>
              <p className="text-white/80">
                Sign in to your account and start predicting!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-white/80">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-yellow-300 hover:text-yellow-200">
                  Forgot password?
                </a>
              </div>

              <motion.button 
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-6 rounded-xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur disabled:opacity-50 transition-all"
                style={{
                  background: SetlistStreetTheme.components.button.secondary.background,
                  color: SetlistStreetTheme.components.button.secondary.color,
                }}
                whileHover={!loading ? { 
                  scale: 1.02,
                  boxShadow: SetlistStreetTheme.components.button.secondary.hoverShadow
                } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading ? 'Signing In...' : '🎵 Sign In'}
              </motion.button>
            </form>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-white/80 text-sm">
                New to Setlist Street?{' '}
                <a href="/register" className="text-yellow-300 hover:text-yellow-200 font-medium">
                  Create an account
                </a>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="text-center text-white/60 text-xs mb-4">
                Or continue with
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-all text-sm">
                  <span>🎸</span>
                  <span>Spotify</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-all text-sm">
                  <span>🎵</span>
                  <span>Apple</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
} 