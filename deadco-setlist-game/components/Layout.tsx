import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import { SetlistStreetTheme } from '../theme/SetlistStreetTheme';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ 
  children, 
  title = "Setlist Street - Dead & Company Prediction Games",
  description = "Predict setlists, play bingo, test your knowledge - the ultimate Dead & Company fan experience!"
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/skull.svg" />
      </Head>

      {/* Clean, professional layout */}
      <div 
        className="min-h-screen"
        style={{
          backgroundColor: SetlistStreetTheme.backgrounds.main,
          fontFamily: SetlistStreetTheme.fonts.primary,
          color: SetlistStreetTheme.components.text.body.color,
        }}
      >
        {/* Professional Navigation Header */}
        <motion.header
          className="sticky top-0 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav 
            className="border-b"
            style={{
              backgroundColor: SetlistStreetTheme.components.navigation.background,
              borderColor: SetlistStreetTheme.colors.accents.borderGray,
              height: SetlistStreetTheme.components.navigation.height,
            }}
          >
            <div 
              className="flex items-center justify-between h-full px-6 mx-auto"
              style={{ maxWidth: SetlistStreetTheme.layout.maxWidth }}
            >
              {/* Clean Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded"
                  style={{
                    backgroundColor: SetlistStreetTheme.colors.primary.charcoal,
                    color: SetlistStreetTheme.colors.neutrals.white,
                  }}
                >
                  <span 
                    className="text-lg font-bold"
                    style={{ fontFamily: SetlistStreetTheme.fonts.display }}
                  >
                    SS
                  </span>
                </div>
                <div>
                  <h1 
                    className="text-xl font-semibold tracking-tight"
                    style={{ 
                      color: SetlistStreetTheme.components.text.heading.color,
                      fontWeight: SetlistStreetTheme.fonts.weights.semibold,
                    }}
                  >
                    Setlist Street
                  </h1>
                  <p 
                    className="text-sm -mt-0.5"
                    style={{ 
                      color: SetlistStreetTheme.components.text.caption.color,
                      fontSize: SetlistStreetTheme.components.text.caption.fontSize,
                    }}
                  >
                    Dead & Company Games
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/test-bingo', label: 'Bingo' },
                  { href: '/test-dragdrop', label: 'Setlists' },
                  { href: '/test-trivia', label: 'Trivia' },
                  { href: '/rules', label: 'Rules' },
                  { href: '/leaderboard', label: 'Leaderboard' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-gray-50"
                    style={{
                      color: SetlistStreetTheme.colors.neutrals.darkGray,
                      fontWeight: SetlistStreetTheme.fonts.weights.medium,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* CTA Button */}
                <Link 
                  href="/sponsor"
                  className="px-4 py-2 text-sm font-medium transition-all rounded-md hover:shadow-md"
                  style={{
                    backgroundColor: SetlistStreetTheme.components.button.primary.background,
                    color: SetlistStreetTheme.components.button.primary.color,
                    border: SetlistStreetTheme.components.button.primary.border,
                  }}
                >
                  Sponsors
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md"
                style={{
                  backgroundColor: SetlistStreetTheme.colors.accents.hoverGray,
                  color: SetlistStreetTheme.colors.neutrals.darkGray,
                }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="flex flex-col space-y-1">
                  <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className="lg:hidden border-t"
                  style={{
                    backgroundColor: SetlistStreetTheme.backgrounds.secondary,
                    borderColor: SetlistStreetTheme.colors.accents.borderGray,
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-6 py-4 space-y-2">
                    {[
                      { href: '/', label: 'Home' },
                      { href: '/test-bingo', label: 'Bingo Games' },
                      { href: '/test-dragdrop', label: 'Setlist Prediction' },
                      { href: '/test-trivia', label: 'Trivia Challenge' },
                      { href: '/rules', label: 'Game Rules' },
                      { href: '/leaderboard', label: 'Leaderboard' },
                      { href: '/sponsor', label: 'Sponsors' },
                    ].map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className="block px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-white"
                        style={{
                          color: SetlistStreetTheme.colors.neutrals.darkGray,
                        }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </motion.header>

        {/* Main Content with Professional Spacing */}
        <main 
          className="mx-auto"
          style={{
            maxWidth: SetlistStreetTheme.layout.maxWidth,
            padding: `${SetlistStreetTheme.layout.sectionSpacing} ${SetlistStreetTheme.layout.containerPadding}`,
          }}
        >
          {children}
        </main>

        {/* Clean Professional Footer */}
        <footer 
          className="border-t mt-16"
          style={{
            backgroundColor: SetlistStreetTheme.backgrounds.footer,
            borderColor: SetlistStreetTheme.colors.accents.borderGray,
          }}
        >
          <div 
            className="mx-auto px-6 py-12"
            style={{ maxWidth: SetlistStreetTheme.layout.maxWidth }}
          >
            <div className="grid gap-8 md:grid-cols-3">
              {/* Brand */}
              <div>
                <h3 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: SetlistStreetTheme.colors.neutrals.white,
                    fontWeight: SetlistStreetTheme.fonts.weights.semibold,
                  }}
                >
                  Setlist Street
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: SetlistStreetTheme.colors.neutrals.gray }}
                >
                  Predict Dead & Company setlists, compete with fellow Deadheads, and celebrate the music that keeps on giving.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 
                  className="text-sm font-medium mb-4"
                  style={{ 
                    color: SetlistStreetTheme.colors.neutrals.white,
                    fontWeight: SetlistStreetTheme.fonts.weights.medium,
                  }}
                >
                  Games
                </h4>
                <div className="space-y-2">
                  {[
                    { href: '/test-bingo', label: 'Bingo' },
                    { href: '/test-dragdrop', label: 'Setlist Prediction' },
                    { href: '/test-trivia', label: 'Trivia' },
                    { href: '/rules', label: 'Rules' },
                  ].map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className="block text-sm transition-colors hover:text-white"
                      style={{ color: SetlistStreetTheme.colors.neutrals.gray }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 
                  className="text-sm font-medium mb-4"
                  style={{ 
                    color: SetlistStreetTheme.colors.neutrals.white,
                    fontWeight: SetlistStreetTheme.fonts.weights.medium,
                  }}
                >
                  Legal
                </h4>
                <div className="space-y-2">
                  {[
                    { href: '/legal', label: 'Legal' },
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/terms', label: 'Terms of Service' },
                  ].map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className="block text-sm transition-colors hover:text-white"
                      style={{ color: SetlistStreetTheme.colors.neutrals.gray }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div 
              className="mt-8 pt-8 border-t text-center"
              style={{ borderColor: SetlistStreetTheme.colors.neutrals.charcoal }}
            >
              <p 
                className="text-sm"
                style={{ color: SetlistStreetTheme.colors.neutrals.gray }}
              >
                © 2025 Setlist Street. Not affiliated with Grateful Dead or Dead & Company.
                <br />
                For entertainment purposes only.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 