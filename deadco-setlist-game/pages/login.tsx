import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import {supabase} from '../utils/supabaseClient';
import { useRouter } from 'next/router';
import styles from '../styles/authStyles.module.css';


export default function Login() {
    const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`Login failed: ${error.message}`);
    } else {
      console.log('Login success:', data);
      alert('Login successful!');

  router.push('/');
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address first.');
      return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      alert(`Error sending reset email: ${error.message}`);
    } else {
      alert('Password reset email sent! Check your inbox.');
    }
  };

 return (
    <MainLayout>
                <div className="countdown-outer"></div>

      <div className="bg-white min-h-screen flex items-center justify-center">
        <motion.div
          className={styles.authCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.authKeyIcon}>🔑</div>
            <div className="countdown-outer"></div>
            <h1 className="logo-small-text">Welcome Back</h1>
            <p className="subtitle-font">
              Sign in to your Setlist Street account
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className={styles.form}>
                      <div className="countdown-outer"></div>

            <div className={styles.formField}>
              <label htmlFor="email" className="subtitle-font text-left">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.authInputFancy}
                placeholder="abc@email.com"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="password" className="subtitle-font text-left">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.authInputFancy}
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>


              <div className="text-sm">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div className="countdown-outer"></div>

            <button
              type="submit"
              disabled={loading}
              className={`${styles.authSubmit} w-full mt-4`}
            >

              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

            <div className="countdown-outer"></div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-700">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className={`${styles.authSocialBtn} w-full`}>Google</button>

              <button className={`${styles.authSocialBtn} w-full`}>Facebook</button>
            </div>
          </div>

            <div className="countdown-outer"></div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-purple-600 hover:text-purple-500">
                Sign up
              </Link>
            </p>
          </div>
            <div className="countdown-outer"></div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-sm text-gray-600 mb-4">
              Join thousands of Deadheads predicting setlists!
            </p>
            <div className="flex justify-center space-x-6 text-xs text-gray-500">
              <span className={styles.authFeatures}>Free to Play</span>
              <span className={styles.authFeatures}>15 Game Modes</span>
              <span className={styles.authFeatures}>Live Results</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
                  <div className="countdown-outer"></div>

    </MainLayout>
  );
}
